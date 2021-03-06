"use strict";

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

class MissedPropertyError extends ValidationError {
    constructor(property) {
        super("Missed required property: " + property);
        this.property = property;
    }
}

class SparseArrayAssignmentError extends ValidationError {
    constructor(property) {
        super(property + " function arguments could not be a sparse array");
        this.property = property;
    }
}

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;

class SeparatedLine {
    constructor(properties) {
        this._values = properties._values;
        this._layer = properties._layer;
    }

    set lineLayer(num) {
        this._layer = num;
    }

    set lineValues(array) {
        this._values = array;
    }

    set specificLineValue(valObj) {
        this.lineValues[valObj.pos] = valObj.val;
    }

    get lineLayer() {
        return this._layer;
    }

    get lineValues() {
        return this._values;
    }


}

class SeparatedLineBuilder {
    constructor(lineProperties) {
        this._line = new SeparatedLine(
            {
                _values: lineProperties._values,
                _layer: lineProperties._layer,
            });
    }

    set lineValues(array) {
        this._line.lineValues = array;
    }

    set specificLineValue(valObj) {
        this._line.specificLineValue = valObj;
    }

    set hasExtraSpaces(bool) {
        this._hasExtraSpaces = bool;
    }

    get lineLayer() {
        return this._line.lineLayer;
    }

    get lineValues() {
        return this._line.lineValues;
    }

    get hasExtraSpaces() {
        return this._hasExtraSpaces;
    }
}

class Funnel {
    _funnelContents = [];
    _delims = ['\\', '/'];
    _isReversed = false;

    constructor(funnelProperties) {
        if (funnelProperties.type !== undefined) {
            if (funnelProperties.type === 0 || funnelProperties.type === 1) {
                this._type = funnelProperties.type;
            } else {
                throw new RangeError('Incorrect funnel type value');
            }
        } else {
            throw new MissedPropertyError('type');
        }
        if (funnelProperties.delims !== undefined) {
            if (funnelProperties.delims[0] !== undefined) {
                this._delims[0] = funnelProperties.delims[0];
            }
            if (funnelProperties.delims[1] !== undefined) {
                this._delims[1] = funnelProperties.delims[1];
            }
        }
    }

    set delims(charArray) {
        if (Array.isArray(charArray) && charArray[0] !== undefined && charArray[1] !== undefined) {
            this._delims = charArray;
        } else {
            throw new SparseArrayAssignmentError('Funnel.delims');
        }
    }

    set leftDelim(char) {
        this._delims[0] = char;
    }

    set rightDelim(char) {
        this._delims[1] = char;
    }

    /**
     *
     * @param {array} values - values you want to fill the funnel with
     */
    fill(...values) {
        if (this._funnelContents.length) {
            for (let i = 0; i < this._funnelContents.length; i++) {
                if (this._funnelContents[i].hasExtraSpaces) {
                    while (this._funnelContents[i].lineValues.includes(' ') && values.length > 0) {
                        this._funnelContents[i].specificLineValue =
                            {val: values.splice(0, 1)[0], pos: this._funnelContents[i].lineValues.indexOf(' ')};
                    }
                    if (!this._funnelContents[i].lineValues.includes(' ')) {
                        this._funnelContents[i].hasExtraSpaces = false;
                    }
                }
            }
            let lastLine = this._funnelContents[this._funnelContents.length - 1];
            if (lastLine.lineValues.length < lastLine.lineLayer) {
                lastLine.lineValues = lastLine.lineValues.concat(values.splice(0, lastLine.lineLayer - lastLine.lineValues.length));
            }
        }

        for (let i = this._funnelContents.length + 1; values.length && i < 6; i++) {
            if (values[i] !== undefined) {
                this._funnelContents.push(new SeparatedLineBuilder({
                    _values: values.splice(0, i),
                    _layer: i,
                }));
            } else {
                this._funnelContents.push(new SeparatedLineBuilder({
                    _values: values.splice(0, values.length),
                    _layer: i,
                }));
            }
        }
    }

    /**
     *
     * @param {number} row - the index of the row the current element is on
     * @param {number} col - the index of the column the current element is on
     * @returns {_.toInteger|*|Number|NumberConstructor|Object.toInteger|number} - the sum of all elements above this element
     */
    calculateWeight(row, col) {
        let line = this._funnelContents[row].lineValues;

        if (this._type === 0) {
            if (line[col] !== undefined && line[col] !== ' ') {
                let weight = line[col].toInteger;
                for (let i = row + 1, j = 0; i < this._funnelContents.length; i += 1, j += 1) {
                    let curLine = this._funnelContents[i].lineValues;
                    for (let k = col; k <= col + j + 1; k += 1) {
                        if (curLine[k] !== undefined && curLine[k] !== ' ') {
                            weight += curLine[k];
                        }
                    }
                }
                return weight;
            }
        } else if (this._type === 1) {
            if (line[col] !== undefined && line[col] !== ' ') {
                let weight = 1;
                for (let i = row + 1, j = 0; i < this._funnelContents.length; i++, j += 1) {
                    let curLine = this._funnelContents[i].lineValues;
                    for (let k = col; k <= col + j + 1; k += 1) {
                        if (curLine[k] !== undefined && curLine[k] !== ' ') {
                            weight += 1;
                        }
                    }
                }
                return weight;
            }
        } else {
            console.log("Funnel elements can only be of two types: 0 or 1");
        }
    }

    /**
     *
     * @returns {string|null} - element that was removed or null if the funnel is empty
     */
    drip() {
        if (this._funnelContents.length) {
            let output = this._funnelContents[0].lineValues[0];
            this._funnelContents[0].specificLineValue = {val: ' ', pos: 0};
            this._funnelContents[0].hasExtraSpaces = true;

            if (this._funnelContents.length > 1) {
                for (let i = 1, j = 0; i < this._funnelContents.length; i += 1) {
                    let curLineLeftEl = this._funnelContents[i].lineValues[j];
                    let curLineRightEl = this._funnelContents[i].lineValues[j + 1];
                    let prevLineEl = this._funnelContents[i - 1].lineValues[j];
                    if (this.calculateWeight(i, j) === this.calculateWeight(i, j + 1) ||
                        this.calculateWeight(i, j) > this.calculateWeight(i, j + 1)) {
                        this._funnelContents[i].specificLineValue = {val: prevLineEl, pos: j};
                        this._funnelContents[i - 1].specificLineValue = {val: curLineLeftEl, pos: j};
                    } else {
                        this._funnelContents[i].specificLineValue = {val: prevLineEl, pos: j + 1};
                        this._funnelContents[i - 1].specificLineValue = {val: curLineRightEl, pos: j};
                        j += 1;
                    }
                    this._funnelContents[i].hasExtraSpaces = true;
                    if (!this._funnelContents[i - 1].lineValues.includes(' ')) {
                        this._funnelContents[i - 1].hasExtraSpaces = false;
                    }
                }
            }
            if (output !== ' ') {
                return output;
            }
            return null;
        }
        return null;
    }

    reverse() {
        this._funnelContents.reverse();
        this._isReversed = !this._isReversed;
    }

    /**
     *
     * @returns {string} - returns a string in a human-friendly form
     */
    toString() {
        let str = '';
        let nums = '';
        let spacesCount;
        if (!this._isReversed) {
            spacesCount = 1;
            for (let i = 5; i > 0; i -= 1) {
                str += this._delims[0];
                for (let j = 0; j < i; j += 1) {
                    if (this._funnelContents[i - 1] !== undefined && this._funnelContents[i - 1].lineValues[j] !== undefined) {
                        nums += this._funnelContents[i - 1].lineValues[j] + (j !== i - 1 ? ' ' : '');
                    } else {
                        nums += ` ${j !== i - 1 ? ' ' : ''}`;
                    }
                }
                str += `${nums + this._delims[1]}\n${' '.repeat(spacesCount)}`;
                nums = '';
                spacesCount += 1;

            }
            return str.substring(0, str.length - 6);
        } else {
            spacesCount = 4;
            let k = 1;
            for (let i = 5; i > 0; i -= 1) {
                str += `${' '.repeat(spacesCount)}${this._delims[1]}`;
                for (let j = 0; j < k; j += 1) {
                    if (this._funnelContents[i - 1] !== undefined && this._funnelContents[i - 1].lineValues[j] !== undefined) {
                        nums += this._funnelContents[i - 1].lineValues[j] + (j !== k - 1 ? ' ' : '');
                    } else {
                        nums += ` ${j !== i + 1 ? ' ' : ''}`;
                    }
                }
                str += `${nums + this._delims[0]}\n`;
                nums = '';
                spacesCount -= 1;
                k += 1;
            }
            return str.substring(0, str.length - 1);
        }
    }
}

exports.default = Funnel;

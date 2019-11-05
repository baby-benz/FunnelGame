"use strict";
let _funnel = _interopRequireDefault(require("../funnel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Functionality_test = require('assert');

describe("Different Delimiters Tests --- Testing for correctness of solution", function () {
    it("It should works for different delimiters.", function () {
        let funnel = new _funnel.default({type: 0, delims: ['\uD83D\uDE00','\uD83D\uDE00']});
        let now = `\uD83D\uDE00         \uD83D\uDE00
 \uD83D\uDE00       \uD83D\uDE00
  \uD83D\uDE00     \uD83D\uDE00
   \uD83D\uDE00   \uD83D\uDE00
    \uD83D\uDE00 \uD83D\uDE00`;
        console.log("Testing with \uD83D\uDE00 delims\nNow the funnel should be:\n" + now);
        Functionality_test.equal(funnel.toString(), now);

        funnel.leftDelim = funnel.rightDelim = '\u0061\u030A';
        now = `\u0061\u030A         \u0061\u030A
 \u0061\u030A       \u0061\u030A
  \u0061\u030A     \u0061\u030A
   \u0061\u030A   \u0061\u030A
    \u0061\u030A \u0061\u030A`;
        console.log("Testing with \u0061\u030A delims\nNow the funnel should be:\n" + now);
        Functionality_test.equal(funnel.toString(), now);

        funnel.leftDelim = funnel.rightDelim = '\u{1F639}';
        now = `\u{1F639}         \u{1F639}
 \u{1F639}       \u{1F639}
  \u{1F639}     \u{1F639}
   \u{1F639}   \u{1F639}
    \u{1F639} \u{1F639}`;
        console.log("Testing with \u{1F639} delims\nNow the funnel should be:\n" + now);
        Functionality_test.equal(funnel.toString(), now);
    })
});

"use strict";
let _funnel = _interopRequireDefault(require("../funnel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Functionality_test = require('assert');

describe("Basic Tests", function () {
    it("It should works for basic tests.", function () {
        let funnel = new _funnel.default({type: 1});
        let now = `\\         /
 \\       /
  \\     /
   \\   /
    \\ /`;
        console.log("Now the funnel is:\n" + now);
        Functionality_test.equal(funnel.toString(), now);

        funnel.fill(1, 2, 3);
        now = `\\         /
 \\       /
  \\     /
   \\2 3/
    \\1/`;
        console.log("Now the funnel is:\n" + now);
        Functionality_test.equal(funnel.toString(), now);

        let tmp = funnel.drip();
        now = `\\         /
 \\       /
  \\     /
   \\  3/
    \\2/`;
        console.log("Now the funnel is:\n"+now);
        Functionality_test.equal(tmp , 1);
        Functionality_test.equal(funnel.toString() , now);

        funnel.fill(4,5,6,7,8,9,0,1,2,3,4,5,6,7);
        now = `\\2 3 4 5 6/
 \\8 9 0 1/
  \\5 6 7/
   \\4 3/
    \\2/`;
        console.log("Now the funnel is:\n" + now);
        Functionality_test.equal(funnel.toString(), now);

        funnel.reverse();
        now = `    /2\\
   /4 3\\
  /5 6 7\\
 /8 9 0 1\\
/2 3 4 5 6\\`;
        console.log("Now the funnel is:\n" + now);
        Functionality_test.equal(funnel.toString(), now);

        funnel.reverse();
        now = `\\2 3 4 5 6/
 \\8 9 0 1/
  \\5 6 7/
   \\4 3/
    \\2/`;
        console.log("Now the funnel is:\n" + now);
        Functionality_test.equal(funnel.toString(), now);
    })
});

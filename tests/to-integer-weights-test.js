"use strict";
let _funnel = _interopRequireDefault(require("../funnel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Functionality_test = require('assert');

describe("ToInteger Weights Tests --- Testing for correctness of solution", function () {
    it("Should work assuming that the weights of the elements are equal to their .toInteger value.", function () {
        let funnel = new _funnel.default({type: 0});
        funnel.fill(8);
        let now = `\\         /
 \\       /
  \\     /
   \\   /
    \\8/`;
        console.log("Testing for fill:\nAfter funnel.fill(8),\nNow the funnel should be:\n" + now);
        Functionality_test.equal(funnel.toString(), now);

        let tmp = funnel.drip();
        now = `\\         /
 \\       /
  \\     /
   \\   /
    \\ /`;
        console.log("Testing for drip():\nfunnel.drip() should return: 8\nNow the funnel should be:\n" + now);
        Functionality_test.equal(tmp, 8);
        Functionality_test.equal(funnel.toString(), now);

        tmp = funnel.drip();
        now = `\\         /
 \\       /
  \\     /
   \\   /
    \\ /`;
        console.log("Testing for drip():\nfunnel.drip() should return: null\nNow the funnel should be:\n" + now);
        Functionality_test.equal(tmp, null);
        Functionality_test.equal(funnel.toString(), now);

        tmp = funnel.drip();
        now = `\\         /
 \\       /
  \\     /
   \\   /
    \\ /`;
        console.log("Testing for drip():\nfunnel.drip() should return: null\nNow the funnel should be:\n" + now);
        Functionality_test.equal(tmp, null);
        Functionality_test.equal(funnel.toString(), now);

        tmp = funnel.drip();
        now = `\\         /
 \\       /
  \\     /
   \\   /
    \\ /`;
        console.log("Testing for drip():\nfunnel.drip() should return: null\nNow the funnel should be:\n" + now);
        Functionality_test.equal(tmp, null);
        Functionality_test.equal(funnel.toString(), now);

        tmp = funnel.drip();
        now = `\\         /
 \\       /
  \\     /
   \\   /
    \\ /`;
        console.log("Testing for drip():\nfunnel.drip() should return: null\nNow the funnel should be:\n" + now);
        Functionality_test.equal(tmp, null);
        Functionality_test.equal(funnel.toString(), now);

        tmp = funnel.drip();
        now = `\\         /
 \\       /
  \\     /
   \\   /
    \\ /`;
        console.log("Testing for drip():\nfunnel.drip() should return: null\nNow the funnel should be:\n" + now);
        Functionality_test.equal(tmp, null);
        Functionality_test.equal(funnel.toString(), now);

        tmp = funnel.drip();
        now = `\\         /
 \\       /
  \\     /
   \\   /
    \\ /`;
        console.log("Testing for drip():\nfunnel.drip() should return: null\nNow the funnel should be:\n" + now);
        Functionality_test.equal(tmp, null);
        Functionality_test.equal(funnel.toString(), now);

        tmp = funnel.drip();
        now = `\\         /
 \\       /
  \\     /
   \\   /
    \\ /`;
        console.log("Testing for drip():\nfunnel.drip() should return: null\nNow the funnel should be:\n" + now);
        Functionality_test.equal(tmp, null);
        Functionality_test.equal(funnel.toString(), now);

        tmp = funnel.drip();
        now = `\\         /
 \\       /
  \\     /
   \\   /
    \\ /`;
        console.log("Testing for drip():\nfunnel.drip() should return: null\nNow the funnel should be:\n" + now);
        Functionality_test.equal(tmp, null);
        Functionality_test.equal(funnel.toString(), now);

        tmp = funnel.drip();
        now = `\\         /
 \\       /
  \\     /
   \\   /
    \\ /`;
        console.log("Testing for drip():\nfunnel.drip() should return: null\nNow the funnel should be:\n" + now);
        Functionality_test.equal(tmp, null);
        Functionality_test.equal(funnel.toString(), now);

        tmp = funnel.drip();
        now = `\\         /
 \\       /
  \\     /
   \\   /
    \\ /`;
        console.log("Testing for drip():\nfunnel.drip() should return: null\nNow the funnel should be:\n" + now);
        Functionality_test.equal(tmp, null);
        Functionality_test.equal(funnel.toString(), now);

        tmp = funnel.drip();
        now = `\\         /
 \\       /
  \\     /
   \\   /
    \\ /`;
        console.log("Testing for drip():\nfunnel.drip() should return: null\nNow the funnel should be:\n" + now);
        Functionality_test.equal(tmp, null);
        Functionality_test.equal(funnel.toString(), now);

        tmp = funnel.drip();
        now = `\\         /
 \\       /
  \\     /
   \\   /
    \\ /`;
        console.log("Testing for drip():\nfunnel.drip() should return: null\nNow the funnel should be:\n" + now);
        Functionality_test.equal(tmp, null);
        Functionality_test.equal(funnel.toString(), now);

        tmp = funnel.fill(4,3,8,4,7,4);
        now = `\\         /
 \\       /
  \\4 7 4/
   \\3 8/
    \\4/`;
        console.log("Testing for fill():\nAfter funnel.fill(4,3,8,4,7,4),\nNow the funnel should be:\n" + now);
        Functionality_test.equal(tmp, null);
        Functionality_test.equal(funnel.toString(), now);

        tmp = funnel.drip();
        now = `\\         /
 \\       /
  \\4   4/
   \\3 7/
    \\8/`;
        console.log("Testing for drip():\nfunnel.drip() should return: 4\nNow the funnel should be:\n" + now);
        Functionality_test.equal(tmp, 4);
        Functionality_test.equal(funnel.toString(), now);
    })
});

const assert = {
    equal: function(a, b) {
        if(a !== b) {
            const err = new Error(`Expected ${a} to equal ${b}`);
            output.append(`Assertion Error: ${err}`);
            throw err;
        }
        output.append(`Assertion correct: ${a} equals ${b}`);
        output.appendChild(document.createElement(`br`));
    }
}

function test(title, func) {
    console.log(this);
    output.append(`Running Test: ${title}`);
    try {
        func();
        output.append(`Test successful`);
    } catch(err) {
        output.append(`Test failed with error: ${err}`);
    }
}

function suite(func) {
    document.addEventListener("DOMContentLoaded", function () {
        func();
    });
}

suite(function() {
    test("Constants are correct", function() {
        assert.equal(NOTE_HZ, 440);
        assert.equal(NOTE_C, 261);
        assert.equal(NOTE_E, 329);
        assert.equal(NOTE_G, 392);
        assert.equal(NOTE_B, 493);
    });
});

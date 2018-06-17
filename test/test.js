let assertCount;

function assert(message, expr) {
    if (!expr) {
        throw new Error(message);
    }

    assertCount += 1;

    return true;
}

function output(text, color) {
    const p = document.createElement('p');
    p.innerHTML = text;
    p.style.color = color;
    document.body.appendChild(p);
}


function testCase(name, tests) {
    assertCount = 0;
    let successful = 0;
    let testCount = 0;
    const hasSetup = typeof tests.setUp === 'function';
    const hasTearDown = typeof tests.tearDown === 'function';

    Object.keys(tests).forEach((key) => {
        if (/^test/.test(key)) {
            testCount += 1;

            try {
                if (hasSetup) {
                    tests.setUp();
                }

                tests[key]();
                output(key, 'green');

                // tearDownメソッドがエラーを投げたらテスト不合格とする
                if (hasTearDown) {
                    tests.tearDown();
                }

                successful += 1;
            } catch (e) {
                output(`${key} failed: ${e.message}`, 'red');

            }
        }
    });

    const color = successful === testCount ? 'green' : 'red';
    output(`<strong>${testCount} tests, ${(testCount - successful)} failures</strong>`, color);
}

testCase('strftime test', {
    setUp: () => {
        this.date = new Date(2009, 9, 2, 22, 14, 45);
    },
    'test format specifier %Y': () => {
        assert('%Y should return full year', this.date.strftime('%Y') === '2009');
    },
    'test format specifier %m': () => {
        assert('%m should return month', this.date.strftime('%m') === '10');
    },
    'test format specifier %d': () => {
        assert('%d should return date', this.date.strftime('%d') === '02');
    },
    'test format specifier %y': () => {
        assert('%y should return year as two digits', this.date.strftime('%y') === '09');
    },
    'test format specifier %F': () => {
        assert('%F should act as %Y-%m-%d', this.date.strftime('%F') === '2009-10-02');
    },
    'test format specifier %D': () => {
        assert('%D should act as %m/%d/%y', this.date.strftime('%D') === '10/02/09');
    }
});

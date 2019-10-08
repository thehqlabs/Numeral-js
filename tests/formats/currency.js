
// Node
if (typeof module !== 'undefined' && module.exports) {
    var numeral = require('../../numeral');
    var expect = require('chai').expect;
}

describe('Currency', function() {
    after(function() {
        numeral.reset();
    });

    it('should format to currency', function() {
        var tests = [
                [0,'$0.00','$0.00'],
                [null,'$0.00','$0.00'],
                [0.99,'$0,0.00','$0.99'],
                [1000.234,'$0,0.00','$1,000.23'],
                [1001,'$ 0,0.[00]','$ 1,001'],
                [1000.234,'0,0.00 $','1,000.23 $'],
                [-1000.234,'0,0.00 $','-1,000.23 $'],
                [-1000.234,'($0,0)','($1,000)'],
                [-1000.234,'(0,0$)','(1,000$)'],
                [-1000.234,'(0,0 $)','(1,000 $)'],
                [-1000.234,'$0.00','-$1000.23'],
                [-1000.234,'$ 0.00','-$ 1000.23'],
                [1230974,'($0.00 a)','$1.23 M'],
                [-1000.234,'$ (0,0)','$ (1,000)'],
                [-1000.234,'$(0,0)','$(1,000)'],
                [-1000.234,'$ (0,0.00)','$ (1,000.23)'],
                [-1000.234,'$(0,0.00)','$(1,000.23)'],
                [-1000.238,'$(0,0.00)','$(1,000.24)'],
                [-1000.234,'$-0,0','$-1,000'],
                [-1000.234,'$ -0,0','$ -1,000'],
                [1000.234,'$ (0,0)','$ 1,000'],
                [1000.234,'$(0,0)','$1,000'],
                [1000.234,'$ (0,0.00)','$ 1,000.23'],
                [1000.234,'$(0,0.00)','$1,000.23'],
                [1000.238,'$(0,0.00)','$1,000.24'],
                [1000.234,'$-0,0','$1,000'],
                [1000.234,'$ -0,0','$ 1,000']
            ],
            i;

        for (i = 0; i < tests.length; i++) {
            expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
        }
    });

    it('should unformat to currency', function() {
        var tests = [
                ['$0.00', 0],
                ['$0.99', 0.99],
                ['$1,000.23', 1000.23],
                ['1,000.23 $', 1000.23],
                ['($1,000)', -1000],
                ['-1,000$', -1000],
                ['$1.23 M', 1230000],
            ],
            i;

        for (i = 0; i < tests.length; i++) {
            expect(numeral(tests[i][0]).value()).to.equal(tests[i][1]);
        }
    });
});

/**
 * Created by jcmurphy on 6/10/17.
 */

//var parser = require('./parse.js');

var tests = {
    good_single: `questiontitle: xxxx
realworldmodelpath: relative/path/no/absolutes.png
idealizedmodelpath: relative/path/no/absolutes.png

assumption_text: xxx1 assumption1 must be on a single line
assumption_type: needed
assumption_points: 1

assumption_text: xxx2 assumption2 can contain: "special characters" &amp; html
assumption_type: unneeded
assumption_points: -1
reason_text: xxx2 this reason relates to the most recently parsed assumption-text
reason_type: true
reason_points: +1
reason_text: xxx2 another1 invariant is #reasons given >= 2
reason_type: false
reason_points: -1

assumption_text: xxx3 assumption1 must be on a single line
assumption_type: needed
assumption_points: 1
`,

    good_multiple: `questiontitle: xxxx
realworldmodelpath: relative/path/no/absolutes.png
idealizedmodelpath: relative/path/no/absolutes.png

assumption_text: xxx1 assumption1 must be on a single line
assumption_type: needed
assumption_points: 1

assumption_text: xxx2 assumption2 can contain: "special characters" &amp; html
assumption_type: unneeded
assumption_points: -1
reason_text: xxx2 this reason relates to the most recently parsed assumption-text
reason_type: true
reason_points: +1
reason_text: xxx2 another1 invariant is #reasons given >= 2
reason_type: false
reason_points: -1

assumption_text: xxx3 assumption3 invariant is #assumptions >= 3 for each question
assumption_type: complicatingfactor
assumption_points: -1
reason_text: xxx3 this reason relates to the most recently parsed assumption-text
reason_type: true
reason_points: +1
reason_text: xxx3 another1 invariant is #reasons given >= 2
reason_type: false
reason_points: -1

questiontitle: zzzz
realworldmodelpath: relative/path/no/absolutes.png
idealizedmodelpath: relative/path/no/absolutes.png

assumption_text: zzz1 assumption1 must be on a single line
assumption_type: needed
assumption_points: 1

assumption_text: zzz2 assumption2 can contain: "special characters" &amp; html
assumption_type: unneeded
assumption_points: -1
reason_text: zzz2 this reason relates to the most recently parsed assumption-text
reason_type: true
reason_points: +1
reason_text: zzz2 another1 invariant is #reasons given >= 2
reason_type: false
reason_points: -1

assumption_text: zzz3 assumption3 invariant is #assumptions >= 3 for each question
assumption_type: complicatingfactor
assumption_points: -1
reason_text: zzz3 this reason relates to the most recently parsed assumption-text
reason_type: true
reason_points: +1
reason_text: zzz3 another1 invariant is #reasons given >= 2
reason_type: false
reason_points: -1
    `,

    bad_noquestion1: `
realworldmodelpath: relative/path/no/absolutes.png
idealizedmodelpath: relative/path/no/absolutes.png

assumption_text: xxx1 assumption1 must be on a single line
assumption_type: needed
assumption_points: 1

assumption_text: xxx2 assumption2 can contain: "special characters" &amp; html
assumption_type: unneeded
assumption_points: -1
reason_text: xxx2 this reason relates to the most recently parsed assumption-text
reason_type: true
reason_points: +1
reason_text: xxx2 another1 invariant is #reasons given >= 2
reason_type: false
reason_points: -1`,

    bad_noquestion2: "",

    bad_norealmodel: `questiontitle: xxxx
idealizedmodelpath: relative/path/no/absolutes.png

assumption_text: xxx1 assumption1 must be on a single line
assumption_type: needed
assumption_points: 1

assumption_text: xxx2 assumption2 can contain: "special characters" &amp; html
assumption_type: unneeded
assumption_points: -1
reason_text: xxx2 this reason relates to the most recently parsed assumption-text
reason_type: true
reason_points: +1
reason_text: xxx2 another1 invariant is #reasons given >= 2
reason_type: false
reason_points: -1`,

    bad_noidealmodel: `questiontitle: xxxx
realworldmodelpath: relative/path/no/absolutes.png

assumption_text: xxx1 assumption1 must be on a single line
assumption_type: needed
assumption_points: 1

assumption_text: xxx2 assumption2 can contain: "special characters" &amp; html
assumption_type: unneeded
assumption_points: -1
reason_text: xxx2 this reason relates to the most recently parsed assumption-text
reason_type: true
reason_points: +1
reason_text: xxx2 another1 invariant is #reasons given >= 2
reason_type: false
reason_points: -1`,

    bad_too_few_assumptions: `questiontitle: xxxx
realworldmodelpath: relative/path/no/absolutes.png
idealizedmodelpath: relative/path/no/absolutes.png

assumption_text: xxx1 assumption1 must be on a single line
assumption_type: needed
assumption_points: 1

assumption_text: xxx2 assumption2 can contain: "special characters" &amp; html
assumption_type: unneeded
assumption_points: -1
`,

    bad_no_needed_assumption: `questiontitle: xxxx
realworldmodelpath: relative/path/no/absolutes.png
idealizedmodelpath: relative/path/no/absolutes.png

assumption_text: xxx1 assumption1 must be on a single line
assumption_type: complicatingfactor
assumption_points: 1

assumption_text: xxx2 assumption2 can contain: "special characters" &amp; html
assumption_type: unneeded
assumption_points: -1

assumption_text: xxx2 assumption2 can contain: "special characters" &amp; html
assumption_type: unneeded
assumption_points: -1
`,

    bad_wrong_assumption_type: `questiontitle: xxxx
realworldmodelpath: relative/path/no/absolutes.png
idealizedmodelpath: relative/path/no/absolutes.png

assumption_text: xxx1 assumption1 must be on a single line
assumption_type: hithere
assumption_points: 1

assumption_text: xxx2 assumption2 can contain: "special characters" &amp; html
assumption_type: unneeded
assumption_points: -1

assumption_text: xxx2 assumption2 can contain: "special characters" &amp; html
assumption_type: unneeded
assumption_points: -1
`,
};

function printdiv(x,y) { if (y == null) y = "output"; document.getElementById(y).innerHTML += x; }

//config = parser.parse(tests['good_single']);
//console.log(JSON.stringify(config, null, 2));
function runtests() {
    for (t in tests) {
        printdiv("Test: " + t + " Status: ");
        try {
            config = parse(tests[t], true);
            printdiv("SUCCEEDED<BR>");
        }
        catch (e) {
            printdiv("FAILED: " + e + "<BR>");
        }
    }
}
// console.log(JSON.stringify(config, null, 2));




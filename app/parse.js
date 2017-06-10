
function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
}

function validate(config) {
    /* TODO
      must hold:
      forall els:
         questiontext, type, points must exist
         assumptions.length >= 3
         assumptions types must contain at least one 'needed'

         foreach assumption:
             text, type, points must exist
             assert type in [needed, notneeded, complicatedfactor]

         any assumptions that are != needed:
             reasons.length >= 2
             reasons types must contain at least one 'true'
             foreach reason:
                text, type, points must exist
                assert type in [true, false]

       if any of the above is violated, throw an error
     */
}

/* Return an array of JSON objects */

function parse(text) {
    var Q = {};
    var kw = "";
    var config  = [];
    var assumptions = [];
    var A = {};
    var reasons = [];
    var R = {};

    for (line of text.split('\n')) {

        kw = /^questiontitle:\s*/;
        if (kw.test(line)) {
            if (!isEmpty(Q)) {
                if (!isEmpty(R)) reasons.push(R);
                if (reasons.length > 0) A['reasons'] = reasons;
                reasons = [];
                R = {};
                if (!isEmpty(A)) assumptions.push(A);
                A = {};
                Q['assumptions'] = assumptions;
                config.push(Q);
            }
            Q = {};
            assumptions = [];
            Q['questiontitle'] = line.replace(kw, "");
        }

        kw = /^realworldmodelpath:\s*/;
        if (kw.test(line)) {
            if (isEmpty(Q)) throw "invalid file format: no questiontitle";
            Q['realworldmodelpath'] = line.replace(kw, "");
        }

        kw = /^idealizedmodelpath:\s*/;
        if (kw.test(line)) {
            if (isEmpty(Q)) throw "invalid file format: no questiontitle";
            Q['idealizedmodelpath'] = line.replace(kw, "");
        }

        kw = /^assumption_text:\s*/;
        if (kw.test(line)) {
            if (isEmpty(Q)) throw "invalid file format: no questiontitle";
            if (!isEmpty(A)) {
                if (!isEmpty(R)) reasons.push(R);
                if (reasons.length > 0) A['reasons'] = reasons;
                reasons = [];
                R = {};
                assumptions.push(A);
            }
            A = {};
            A['assumption_text'] = line.replace(kw, "");
        }

        kw = /^assumption_type:\s*/;
        if (kw.test(line)) {
            if (isEmpty(Q)) throw "invalid file format: no questiontitle";
            if (isEmpty(A)) throw "invalid file format: no assumption_text";
            A['assumption_type'] = line.replace(kw, "");
        }

        kw = /^assumption_points:\s*/;
        if (kw.test(line)) {
            if (isEmpty(Q)) throw "invalid file format: no questiontitle";
            if (isEmpty(A)) throw "invalid file format: no assumption_text";
            A['assumption_points'] = parseInt(line.replace(kw, ""));
        }

        kw = /^\s*reason_text:\s*/;
        if (kw.test(line)) {
            if (isEmpty(Q)) throw "invalid file format: no questiontitle";
            if (assumptions.length == 0) throw "invalid file format: reasons before assumptions";
            if (!isEmpty(R)) {
                reasons.push(R);
            }
            R = {};
            R['reason_text'] = line.replace(kw, "");
        }

        kw = /^\s*reason_type:\s*/;
        if (kw.test(line)) {
            if (isEmpty(Q)) throw "invalid file format: no questiontitle";
            if (assumptions.length == 0) throw "invalid file format: reasons before assumptions";
            R['reason_type'] = line.replace(kw, "");
        }

        kw = /^\s*reason_points:\s*/;
        if (kw.test(line)) {
            if (isEmpty(Q)) throw "invalid file format: no questiontitle";
            if (assumptions.length == 0) throw "invalid file format: reasons before assumptions";
            R['reason_points'] = parseInt(line.replace(kw, ""));
        }

    }

    if (!isEmpty(Q)) {
        if (!isEmpty(R)) reasons.push(R);
        if (reasons.length > 0) A['reasons'] = reasons;
        reasons = [];
        R = {};
        if (!isEmpty(A)) assumptions.push(A);
        Q['assumptions'] = assumptions;
        config.push(Q);
    }

    return config;
}

var x = `questiontitle: xxxx
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
 
`;

// uncomment to test
// config = parse(x);
// console.log(JSON.stringify(config, null, 2));




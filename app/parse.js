//exports.parse = parse; // for testing with nodejs

function assert(iffalse, throwthis) {
    if (! iffalse ) throw throwthis || "Assertion failed";
}

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

        foreach assumption:
            text, type, points must exist
            assert type in [needed, notneeded, complicatedfactor]

        any assumptions that are != needed:
            reasons.length >= 2
            foreach reason:
                text, type, points must exist
                assert type in [true, false]

     if any of the above is violated, throw an error
     */
    assert(config.length > 0, "config file contained no questions");
    for (var i = 0 ; i < config.length ; i++) {
        for (var kw in {'questiontitle': 1, 'realworldmodelpath': 1, 'idealizedmodelpath': 1, 'assumptions': 1}) {
            assert(kw in config[i], kw + " field is missing from one of the questions");
        }
        assert(config[i].assumptions.length >= 3,
            "question must have at least 3 assumptions: " +
            config[i].assumptions.length);
        var atypes = {};
        for (var k = 0 ; k < config[i].assumptions.length ; k++) {
            atypes[config[i].assumptions[k].assumption_type] = 1;
            if (!(config[i].assumptions[k].assumption_type in {'needed': 1, 'unneeded': 1, 'complicatingfactor': 1}))
                throw "assumption_type is invalid: " + config[i].assumptions[k].assumption_type;
        }
        assert ('needed' in atypes, "assumptions must have at least one NEEDED type");
    }

    return config;
}

var parser = function(text, check) {
    "use strict";
    var self = this;
    this.raw = text;
    this.check = (check !== null) ? check : true; // should we validate the text?

    var config = []; // at the end, this is an an array of JSON objects
    var assumptions = [];
    var reasons = [];
    var Q = {};
    var A = {};
    var R = {};

    this.parse_questiontitle = function(kw, x) {
        if (!isEmpty(Q)) {
            if (!isEmpty(R)) reasons.push(R);
            if (reasons.length > 0) A.reasons = reasons;
            reasons = [];
            R = {};
            if (!isEmpty(A)) assumptions.push(A);
            A = {};
            Q.assumptions = assumptions;
            config.push(Q);
        }
        Q = {};
        assumptions = [];
        Q.questiontitle = x.replace(kw, "");
        return Q.questiontitle;
    };

    this.parse_realworldmodelpath = function(kw, x) {
        if (isEmpty(Q)) throw "invalid file format: no questiontitle";
        Q.realworldmodelpath = x.replace(kw, "");
        return Q.realworldmodelpath;
    };

    this.parse_idealizedmodelpath = function(kw, x) {
        if (isEmpty(Q)) throw "invalid file format: no questiontitle";
        Q.idealizedmodelpath = x.replace(kw, "");
        return Q.idealizedmodelpath;
    };

    this.parse_assumption_text = function(kw, x) {
        if (isEmpty(Q)) throw "invalid file format: no questiontitle";
        if (!isEmpty(A)) {
            if (!isEmpty(R)) reasons.push(R);
            if (reasons.length > 0) A.reasons = reasons;
            reasons = [];
            R = {};
            assumptions.push(A);
        }
        A = {};
        A.assumption_text = x.replace(kw, "");
        return A.assumption_text;
    };

    this.parse_assumption_type = function(kw, x) {
        if (isEmpty(Q)) throw "invalid file format: no questiontitle";
        if (isEmpty(A)) throw "invalid file format: no assumption_text";
        A.assumption_type = x.replace(kw, "");
        return A.assumption_type;
    };

    this.parse_assumption_points = function(kw, x) {
        if (isEmpty(Q)) throw "invalid file format: no questiontitle";
        if (isEmpty(A)) throw "invalid file format: no assumption_text";
        A.assumption_points = parseInt(x.replace(kw, ""));
        return A.assumption_points;
    };

    this.parse_reason_text = function(kw, x) {
        if (isEmpty(Q)) throw "invalid file format: no questiontitle";
        if (assumptions.length === 0) throw "invalid file format: reasons before assumptions";
        if (!isEmpty(R)) {
            reasons.push(R);
        }
        R = {};
        R.reason_text = x.replace(kw, "");
        return R.reason_text;
    };

    this.parse_reason_type = function(kw, x) {
        if (isEmpty(Q)) throw "invalid file format: no questiontitle";
        if (assumptions.length === 0) throw "invalid file format: reasons before assumptions";
        R.reason_type = x.replace(kw, "");
        return R.reason_type;
    };

    this.parse_reason_points = function(kw, x) {
        if (isEmpty(Q)) throw "invalid file format: no questiontitle";
        if (assumptions.length === 0) throw "invalid file format: reasons before assumptions";
        R.reason_points = parseInt(x.replace(kw, ""));
        return R.reason_points;
    };


    this.parse = function() {
        var lines = this.raw.split('\n');

        for (var linenum = 0 ; linenum < lines.length ; linenum++) {
            var line = lines[linenum];
            for (var i = 0; i < self.parser_map.length; i++) {
                var kws = self.parser_map[i];
                if (kws.kw.test(line)) {
                    kws.func(kws.kw, line);
                }
            }
        }

        if (!isEmpty(Q)) {
            if (!isEmpty(R)) reasons.push(R);
            if (reasons.length > 0) A.reasons = reasons;
            reasons = [];
            R = {};
            if (!isEmpty(A)) {
                assumptions.push(A);
            }
            Q.assumptions = assumptions;
            config.push(Q);
        }

        if (self.check)
            return validate(config);

        return config;
    };

    this.parser_map = [
        { kw: /^questiontitle:\s*/, func: self.parse_questiontitle },
        { kw: /^realworldmodelpath:\s*/, func: self.parse_realworldmodelpath },
        { kw: /^idealizedmodelpath:\s*/, func: self.parse_idealizedmodelpath },
        { kw: /^assumption_text:\s*/, func: self.parse_assumption_text },
        { kw: /^assumption_type:\s*/, func: self.parse_assumption_type },
        { kw: /^assumption_points:\s*/, func: self.parse_assumption_points },
        { kw: /^\s*reason_text:\s*/, func: self.parse_reason_text },
        { kw: /^\s*reason_points:\s*/, func: self.parse_reason_points },
        { kw: /^\s*reason_type:\s*/, func: self.parse_reason_type },
    ];
};

/* for testing using nodejs... */
/*
var Ptest = `questiontitle: xxxx
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
`;

*/

var Ptest2 = `
questiontitle:Hip Joint Force Analysis
realworldmodelpath:RealWorld1.png
idealizedmodelpath:IdealizedModel1.png

assumption_text:Hip acts as a pivot point (no lifting off the bed)
assumption_type:needed
assumption_points:1

assumption_text:Forces are reasonably approximated using static analysis
assumption_type:needed
assumption_points:1

assumption_text:Patient does not slide on the bed
assumption_type:needed
assumption_points:1

assumption_text:Lower leg remains approximately perpendicular to upper leg
assumption_type:needed
assumption_points:1


assumption_text:Incorrect Assumption #1.1
assumption_type:unneeded
assumption_points:-1
 reason_text:Valid Reason #1.1.1
 reason_type:true
 reason_points:1
 reason_text:Invalid Reason #1.1.2
 reason_type:false
 reason_points:-1
 reason_text:Invalid Reason #1.1.3
 reason_type:false
 reason_points:-1

assumption_text:Incorrect Assumption #1.2
assumption_type:unneeded
assumption_points:-1
 reason_text:Invalid Reason #x.y.z
 reason_type:false
 reason_points:-1
 reason_text:Invalid Reason #hashtag
 reason_type:false
 reason_points:-1
 reason_text:Invalid Reason #HertzRules!
 reason_type:false
 reason_points:-1
 reason_text:Valid
 reason_type:true
 reason_points:1

assumption_text:Complicating Assumption #Who Cares I Am Making All This Up?
assumption_type:unneeded
assumption_points:-1

assumption_text:Incorrect Assumption that includes a lot of text to make certain you can handle it #1.3
assumption_type:unneeded
assumption_points:-1
 reason_text:Valid Reason #ExamplesAreHard
 reason_type:true
 reason_points:1



questiontitle:Second Example
realworldmodelpath:RealWorld2.png
idealizedmodelpath:IdealizedModel2.png

assumption_text:Forces are reasonably approximated using static analysis
assumption_type:needed
assumption_points:1

assumption_text:Lower leg remains approximately perpendicular to upper leg
assumption_type:needed
assumption_points:1

assumption_text:Hip acts as a pivot point (no lifting off the bed)
assumption_type:needed
assumption_points:1

assumption_text:Patient does not slide on the bed
assumption_type:needed
assumption_points:1

`;

// var P = new parser(Ptest2);
// var XX = P.parse();
// console.log(JSON.stringify(XX, null, "  "));

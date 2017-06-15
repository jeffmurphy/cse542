

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
        for (kw in {'questiontitle': 1, 'realworldmodelpath': 1, 'idealizedmodelpath': 1, 'assumptions': 1}) {
            assert(kw in config[i], kw + " field is missing from one of the questions");
        }
        assert(config[i]['assumptions'].length >= 3,
            "question must have at least 3 assumptions: " +
            config[i]['assumptions'].length);
        var atypes = {};
        for (var k = 0 ; k < config[i]['assumptions'].length ; k++) {
            atypes[config[i]['assumptions'][k]['assumption_type']] = 1;
            if (!(config[i]['assumptions'][k]['assumption_type'] in {'needed': 1, 'unneeded': 1, 'complicatingfactor': 1}))
                throw "assumption_type is invalid: " + config[i]['assumptions'][k]['assumption_type'];
        }
        assert ('needed' in atypes, "assumptions must have at least one NEEDED type");
    }

    return config;
}

/* Return an array of JSON objects */

function parse(text, check) {
    var Q = {};
    var kw = "";
    var config  = [];
    var assumptions = [];
    var A = {};
    var reasons = [];
    var R = {};
    if (check == null) check == true;

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

    if (check)
        return validate(config);
    return config;
}


QUnit.test("parse_questiontitle", function(assert) {
    var p = new parser("");
    var r = p.parse_questiontitle(/^questiontitle:\s*/, "questiontitle: hithere");
    assert.ok(r === "hithere", "Passed!");
});

QUnit.test("parse_realworldmodelpath", function(assert) {
    var p = new parser("");
    var r = p.parse_questiontitle(/^questiontitle:\s*/, "questiontitle: hithere");
    assert.ok(r === "hithere", "Passed!");
    r = p.parse_realworldmodelpath(/^realworldmodelpath:\s*/, "realworldmodelpath: hithere");
    assert.ok(r === "hithere", "Passed!");
});

QUnit.test("parse_idealizedmodelpath", function(assert) {
    var p = new parser("");
    var r = p.parse_questiontitle(/^questiontitle:\s*/, "questiontitle: hithere");
    assert.ok(r === "hithere", "Passed!");
    r = p.parse_idealizedmodelpath(/^idealizedmodelpath:\s*/, "idealizedmodelpath: hithere");
    assert.ok(r === "hithere", "Passed!");
});

QUnit.test("parse_assumption_text", function(assert) {
    var p = new parser("");
    var r = p.parse_questiontitle(/^questiontitle:\s*/, "questiontitle: hithere");
    assert.ok(r === "hithere", "Passed!");
    r = p.parse_assumption_text(/^assumption_text:\s*/, "assumption_text: hithere");
    assert.ok(r === "hithere", "Passed!");
});

QUnit.test("parse_assumption_type", function(assert) {
    var p = new parser("");
    var r = p.parse_questiontitle(/^questiontitle:\s*/, "questiontitle: hithere");
    assert.ok(r === "hithere", "Passed!");
    r = p.parse_assumption_text(/^assumption_text:\s*/, "assumption_text: hithere");
    assert.ok(r === "hithere", "Passed!");
    r = p.parse_assumption_type(/^assumption_type:\s*/, "assumption_type: hithere");
    assert.ok(r === "hithere", "Passed!");
});

QUnit.test("parse_assumption_points", function(assert) {
    var p = new parser("");
    var r = p.parse_questiontitle(/^questiontitle:\s*/, "questiontitle: hithere");
    assert.ok(r === "hithere", "Passed!");
    r = p.parse_assumption_text(/^assumption_text:\s*/, "assumption_text: hithere");
    assert.ok(r === "hithere", "Passed!");
    r = p.parse_assumption_points(/^assumption_points:\s*/, "assumption_points: 21");
    assert.ok(r === 21, "Passed!");
    assert.ok(typeof(r) === 'number');
});

QUnit.test("parse_reason_text", function(assert) {
    var p = new parser("");
    var r = p.parse_questiontitle(/^questiontitle:\s*/, "questiontitle: hithere");
    assert.ok(r === "hithere", "Passed!");
    r = p.parse_assumption_text(/^assumption_text:\s*/, "assumption_text: hithere");
    r = p.parse_assumption_text(/^assumption_text:\s*/, "assumption_text: hithere");

    r = p.parse_reason_text(/^\s*reason_text:\s*/, "reason_text: hithere");
    assert.ok(r === "hithere", "Passed!");
});

QUnit.test("parse_reason_points", function(assert) {
    var p = new parser("");
    var r = p.parse_questiontitle(/^questiontitle:\s*/, "questiontitle: hithere");
    assert.ok(r === "hithere", "Passed!");
    r = p.parse_assumption_text(/^assumption_text:\s*/, "assumption_text: hithere");
    r = p.parse_assumption_text(/^assumption_text:\s*/, "assumption_text: hithere");

    r = p.parse_reason_text(/^\s*reason_text:\s*/, "reason_text: hithere");
    assert.ok(r === "hithere", "Passed!");
    r = p.parse_reason_points(/^\s*reason_points:\s*/, "reason_points: 21");
    assert.ok(r === 21, "Passed!");
    assert.ok(typeof(r) === 'number');
});

QUnit.test("reason_type", function(assert) {
    var p = new parser("");
    var r = p.parse_questiontitle(/^questiontitle:\s*/, "questiontitle: hithere");
    assert.ok(r === "hithere", "Passed!");
    r = p.parse_assumption_text(/^assumption_text:\s*/, "assumption_text: hithere");
    r = p.parse_assumption_text(/^assumption_text:\s*/, "assumption_text: hithere");

    r = p.parse_reason_text(/^\s*reason_text:\s*/, "reason_text: hithere");
    assert.ok(r === "hithere", "Passed!");
    r = p.parse_reason_type(/^\s*reason_type:\s*/, "reason_type: hithere");
    assert.ok(r === "hithere", "Passed!");
});


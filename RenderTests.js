QUnit.test('check_atleast_one_selected()->All False',function(assert) {
	var assumptions_ele = [{assumption_text: " ", assumption_type: "needed", assumption_points: 1},{assumption_text: " ", assumption_type: "needed", assumption_points: 1},{assumption_text: " ", assumption_type: "needed", assumption_points: 1},{assumption_text: " ", assumption_type: "needed", assumption_points: 1}];
	var myDiv = document.createElement('assumptions');
	myDiv.id = 'assumptions';
	document.body.appendChild(myDiv);
	
	for (i = 0; i < assumptions_ele.length; i++){
            document.getElementById('assumptions').innerHTML += "<div id='assm_"+i+"'><input type='checkbox' name='all_assumptions_chk_bx' value="+i+" id= chk_"+i+">"+assumptions_ele[i]["assumption_text"]+"<br></div>";
    }	
    var atleast_one_selected = false;
	
    var checkboxes = document.getElementsByName('all_assumptions_chk_bx');
    for (i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == 'checkbox' && checkboxes[i].checked) {
            atleast_one_selected = true;
        }      
    }
	assert.ok(atleast_one_selected === false , "Passed!");
});

QUnit.test('check_atleast_one_selected()->One True',function(assert) {
	var assumptions_ele = [{assumption_text: " ", assumption_type: "needed", assumption_points: 1},{assumption_text: " ", assumption_type: "needed", assumption_points: 1},{assumption_text: " ", assumption_type: "needed", assumption_points: 1},{assumption_text: " ", assumption_type: "needed", assumption_points: 1}];
	var myDiv = document.createElement('assumptions');
	myDiv.id = 'assumptions';
	document.body.appendChild(myDiv);	
	for (i = 0; i < assumptions_ele.length; i++){
            document.getElementById('assumptions').innerHTML += "<div id='assm_"+i+"'><input type='checkbox' name='all_assumptions_chk_bx' value="+i+" id= chk_"+i+">"+assumptions_ele[i]["assumption_text"]+"<br></div>";
    }	
    var atleast_one_selected = false;
	document.getElementsByName('all_assumptions_chk_bx')[0].checked = true;
    var checkboxes = document.getElementsByName('all_assumptions_chk_bx');
    for (i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == 'checkbox' && checkboxes[i].checked) {
            atleast_one_selected = true;
        }      
    }
	assert.ok(atleast_one_selected === true , "Passed!");
});

QUnit.test('Assumptions coloring test', function (assert) {
	var assumptions_ele = [{assumption_text: "Forces are reasonably approximated using static analysis", assumption_type: "needed", assumption_points: 1},{assumption_text: "Lower leg remains approximately perpendicular to upper leg", assumption_type: "needed", assumption_points: 1},{assumption_text: "Hip acts as a pivot point (no lifting off the bed)", assumption_type: "needed", assumption_points: 1},{assumption_text: "Patient does not slide on the bed", assumption_type: "needed", assumption_points: 1}];	
	var green = 0;
	var red = 0;
	var blue = 0;
	for(i=0;i<assumptions_ele.length;i++){
        if(assumptions_ele[i]["assumption_type"]=="needed"){
           green++;}
        else if(assumptions_ele[i]["assumption_type"]=="unneeded"){
           red++;}
    	else if(assumptions_ele[i]["assumption_type"]=="complicatingfactor"){
           blue++;
        }
    }
	var sum = red + green + blue;
	assert.ok(green === 4 , "Passed!");
	
});


QUnit.test('display_reasons()', function(assert) {

all_reasons = [{reason_text: " ", reason_type: "true", reason_points: 1},
{reason_text: " ", reason_type: "false", reason_points: -1},
{reason_text: " ", reason_type: "false", reason_points: -1}];
var assumptions_ele = [{assumption_text: " ", assumption_type: "unneeded", assumption_points: 1},{assumption_text: " ", assumption_type: "unneeded", assumption_points: 1},{assumption_text: " ", assumption_type: "unneeded", assumption_points: 1},{assumption_text: " ", assumption_type: "unneeded", assumption_points: 1}];
	var myDiv = document.createElement('assumptions');
	myDiv.id = 'assumptions';
	document.body.appendChild(myDiv);	
	for (i = 0; i < assumptions_ele.length; i++){
            document.getElementById('assumptions').innerHTML += "<div id='assm_"+i+"'><input type='checkbox' name='all_assumptions_chk_bx' value="+i+" id= chk_"+i+">"+assumptions_ele[i]["assumption_text"]+"<br></div>";
    }	
	var i = 1;
	submit_reasons_set = false;
	
	
	    for (j = 0; j < all_reasons.length; j++){
		temp = "<input type='radio' name='reasons_"+i+"' value="+j+" id = rd_"+j+" >"+all_reasons[j]["reason_text"]+"<br>";
		document.getElementById('assm_'+i).innerHTML += temp;
    }
    
    //show submit button as well once all the radios are loaded. 

    if(submit_reasons_set == false){
              submit_reasons_set = true;
    }
    var expectedResult = '<input type=\'radio\' name=\'reasons_1\' value=2 id = rd_2 > <br>';

	//assert.ok(temp === expectedResult , "Passed!");
	assert.ok((expectedResult === temp && submit_reasons_set == true), "Passed!");
});


QUnit.test('evaluate_reasons_submission()-->First selected, true', function(assert){
	
	var myDiv = document.createElement('assumptions');
	myDiv.id = 'assumptions';
	document.body.appendChild(myDiv);	
	document.getElementById('assumptions').innerHTML +='<div id="assm_4" style="color: red;"><input type="checkbox" name="all_assumptions_chk_bx" value="4" id="chk_4" disabled=""> <br><input type="radio" name="reasons_4" value="0" id="rd_0" disabled=""> <br><input type="radio" name="reasons_4" value="1" id="rd_1" disabled=""> <br><input type="radio" name="reasons_4" value="2" id="rd_2" disabled=""> <br></div>';
	
	reasons = {reasons:[{reason_points:1,reason_text:" ", reason_type:"true"}, {reason_points:-1,reason_text:" ", reason_type:"false"}, {reason_points:-1,reason_text:" ", reason_type:"false"}]};
   	assumption_selected = [4];
	current_points = 0;
	for (each_assm in assumption_selected){	
		each_assm = 4;
		console.log(each_assm);
        var radios = document.getElementsByName('reasons_' + each_assm);
		radios[0].checked = true;
		console.log("Reasons get element");
		console.log(radios);
        document.getElementsByName('reasons_'+each_assm).disabled = true;
        for (i = 0; i < radios.length; i++) {
			console.log(radios[i]);
            radios[i].disabled = true;
            if (radios[i].type == 'radio' && radios[i].checked) {
                console.log("radio selected:"+radios[i].value);
                var reas_seq = radios[i].value;
                current_points += reasons["reasons"][reas_seq]["reason_points"];
            }
        }
    }
    assert.ok(current_points === 1, "Passed!");
});

QUnit.test('evaluate_reasons_submission()-->Second selected, false', function(assert){
	
	var myDiv = document.createElement('assumptions');
	myDiv.id = 'assumptions';
	document.body.appendChild(myDiv);	
	document.getElementById('assumptions').innerHTML +='<div id="assm_4" style="color: red;"><input type="checkbox" name="all_assumptions_chk_bx" value="4" id="chk_4" disabled=""> <br><input type="radio" name="reasons_4" value="0" id="rd_0" disabled=""> <br><input type="radio" name="reasons_4" value="1" id="rd_1" disabled=""> <br><input type="radio" name="reasons_4" value="2" id="rd_2" disabled=""> <br></div>';
	
	reasons = {reasons:[{reason_points:1,reason_text:" ", reason_type:"true"}, {reason_points:-1,reason_text:" ", reason_type:"false"}, {reason_points:-1,reason_text:" ", reason_type:"false"}]};
   	assumption_selected = [4];
	current_points = 0;
	for (each_assm in assumption_selected){	
		each_assm = 4;
		console.log(each_assm);
        var radios = document.getElementsByName('reasons_' + each_assm);
		radios[1].checked = true;
		console.log("Reasons get element");
		console.log(radios);
        document.getElementsByName('reasons_'+each_assm).disabled = true;
        for (i = 0; i < radios.length; i++) {
			console.log(radios[i]);
            radios[i].disabled = true;
            if (radios[i].type == 'radio' && radios[i].checked) {
                // assumption_selected = radios[i].value;
                console.log("radio selected:"+radios[i].value);
                var reas_seq = radios[i].value;
                current_points += reasons["reasons"][reas_seq]["reason_points"];
                console.log("modified points:"+current_points);
				
            }
        }
    }
	console.log(current_points);
    assert.ok(current_points === -1, "Passed!");
});


QUnit.test('evaluate_reasons_submission()-->Third selected, false', function(assert){
	
	var myDiv = document.createElement('assumptions');
	myDiv.id = 'assumptions';
	document.body.appendChild(myDiv);	
	document.getElementById('assumptions').innerHTML +='<div id="assm_4" style="color: red;"><input type="checkbox" name="all_assumptions_chk_bx" value="4" id="chk_4" disabled=""> <br><input type="radio" name="reasons_4" value="0" id="rd_0" disabled=""> <br><input type="radio" name="reasons_4" value="1" id="rd_1" disabled=""> <br><input type="radio" name="reasons_4" value="2" id="rd_2" disabled=""><br></div>';
	
	reasons = {reasons:[{reason_points:1,reason_text:" ", reason_type:"true"}, {reason_points:-1,reason_text:" ", reason_type:"false"}, {reason_points:-1,reason_text:" ", reason_type:"false"}]};
   	assumption_selected = [4];
	current_points = 0;
	for (each_assm in assumption_selected){	
		each_assm = 4;
		console.log(each_assm);
        var radios = document.getElementsByName('reasons_' + each_assm);
		//radios[0].checked = true;
		radios[2].checked = true;
		console.log("Reasons get element");
		console.log(radios);
        document.getElementsByName('reasons_'+each_assm).disabled = true;
        for (i = 0; i < radios.length; i++) {
			console.log(radios[i]);
            radios[i].disabled = true;
            if (radios[i].type == 'radio' && radios[i].checked) {
                console.log("radio selected:"+radios[i].value);
                var reas_seq = radios[i].value;
                current_points += reasons["reasons"][reas_seq]["reason_points"];
                console.log("modified points:"+current_points);				
            }
        }
    }
	console.log(current_points);
    assert.ok(current_points === -1, "Passed!");
});

QUnit.test('evaluate_assumptions_submission()-->Select only the first one', function(assert){
	var myDiv = document.createElement('assumptions');
	myDiv.id = 'assumptions';
	document.body.appendChild(myDiv);	
	document.getElementById('assumptions').innerHTML += '<div id="assm_0" style="color: green;"><input type="checkbox" name="all_assumptions_chk_bx" value="0" id="chk_0" disabled=""> <br></div><div id="assm_1" style="color: green;"><input type="checkbox" name="all_assumptions_chk_bx" value="1" id="chk_1" disabled=""><br></div><div id="assm_2" style="color: green;"><input type="checkbox" name="all_assumptions_chk_bx" value="2" id="chk_2" disabled=""><br></div><div id="assm_3" style="color: green;"><input type="checkbox" name="all_assumptions_chk_bx" value="3" id="chk_3" disabled=""><br></div><div id="assm_4" style="color: red;"><input type="checkbox" name="all_assumptions_chk_bx" value="4" id="chk_4" disabled=""><br></div><div id="assm_5" style="color: red;"><input type="checkbox" name="all_assumptions_chk_bx" value="5" id="chk_5" disabled=""><br></div><div id="assm_6" style="color: red;"><input type="checkbox" name="all_assumptions_chk_bx" value="6" id="chk_6" disabled=""><br></div><div id="assm_7" style="color: red;"><input type="checkbox" name="all_assumptions_chk_bx" value="7" id="chk_7" disabled=""><br></div>';
	console.log(document.getElementById('assumptions'));
	var assumptions_ele = [{assumption_text: "Hip acts as a pivot point (no lifting off the bed)", assumption_type: "needed", assumption_points: 1},{assumption_text: "Forces are reasonably approximated using static analysis", assumption_type: "needed", assumption_points: 1},{assumption_text: "Patient does not slide on the bed", assumption_type: "needed", assumption_points: 1},{assumption_text: "Lower leg remains approximately perpendicular to upper leg", assumption_type: "needed", assumption_points: 1},{assumption_text: "Incorrect Assumption #1.1", assumption_type: "unneeded", assumption_points: -1},{assumption_text: "Incorrect Assumption #1.2", assumption_type: "unneeded", assumption_points: -1},{assumption_text: "Complicating Assumption #Who Cares I Am Making All This Up?", assumption_type: "unneeded", assumption_points: -1},{assumption_text: "Incorrect Assumption that includes a lot of text to make certain you can handle it #1.3", assumption_type: "unneeded", assumption_points: -1}];
	var k = 0; //to populate assumption selected array. Multiple assumptions can be selected. 
    var checkboxes = document.getElementsByName('all_assumptions_chk_bx');
	console.log("evaluate_assumptions_submission");
	console.log(checkboxes);
    submit_reasons_set = false;
	checkboxes[0].checked = true;
	current_points = 0;
	assumption_selected = [0];
    for (i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == 'checkbox' && checkboxes[i].checked) {
            assumption_selected[k] = checkboxes[i].value; // if first checkbox checked then 0 stored in array. 
            if(assumptions_ele[assumption_selected[k]]["assumption_type"]=="needed"){
                console.log("assumption type needed"); 
                current_points+=assumptions_ele[assumption_selected[k]]["assumption_points"];
                console.log("modified points:"+current_points);
                console.log("Score displayed");
            }
            else if(assumptions_ele[assumption_selected[k]]["assumption_type"]=="unneeded" || assumptions_ele[assumption_selected[k]]["assumption_type"]=="complicatingfactor"){
                console.log("assumption type unneeded or complicatingfactor");
                current_points+=assumptions_ele[assumption_selected[k]]["assumption_points"];
                console.log("modified points:"+current_points);
            }
        }
        else{
            //blurr the checkbox
            console.log("checkbox not selected : "+checkboxes[i].value);
            }
        //k is incremented here so as to be able to use k in between. 
        k++;
    }	
	assert.ok(current_points === 1, "Passed!");
});


QUnit.test('evaluate_assumptions_submission()-->Select only the second one', function(assert){
	var myDiv = document.createElement('assumptions');
	myDiv.id = 'assumptions';
	document.body.appendChild(myDiv);	
	document.getElementById('assumptions').innerHTML += '<div id="assm_0" style="color: green;"><input type="checkbox" name="all_assumptions_chk_bx" value="0" id="chk_0" disabled=""> <br></div><div id="assm_1" style="color: green;"><input type="checkbox" name="all_assumptions_chk_bx" value="1" id="chk_1" disabled=""><br></div><div id="assm_2" style="color: green;"><input type="checkbox" name="all_assumptions_chk_bx" value="2" id="chk_2" disabled=""><br></div><div id="assm_3" style="color: green;"><input type="checkbox" name="all_assumptions_chk_bx" value="3" id="chk_3" disabled=""><br></div><div id="assm_4" style="color: red;"><input type="checkbox" name="all_assumptions_chk_bx" value="4" id="chk_4" disabled=""><br></div><div id="assm_5" style="color: red;"><input type="checkbox" name="all_assumptions_chk_bx" value="5" id="chk_5" disabled=""><br></div><div id="assm_6" style="color: red;"><input type="checkbox" name="all_assumptions_chk_bx" value="6" id="chk_6" disabled=""><br></div><div id="assm_7" style="color: red;"><input type="checkbox" name="all_assumptions_chk_bx" value="7" id="chk_7" disabled=""><br></div>';
	console.log(document.getElementById('assumptions'));
	var assumptions_ele = [{assumption_text: "Hip acts as a pivot point (no lifting off the bed)", assumption_type: "needed", assumption_points: 1},{assumption_text: "Forces are reasonably approximated using static analysis", assumption_type: "needed", assumption_points: 1},{assumption_text: "Patient does not slide on the bed", assumption_type: "needed", assumption_points: 1},{assumption_text: "Lower leg remains approximately perpendicular to upper leg", assumption_type: "needed", assumption_points: 1},{assumption_text: "Incorrect Assumption #1.1", assumption_type: "unneeded", assumption_points: -1},{assumption_text: "Incorrect Assumption #1.2", assumption_type: "unneeded", assumption_points: -1},{assumption_text: "Complicating Assumption #Who Cares I Am Making All This Up?", assumption_type: "unneeded", assumption_points: -1},{assumption_text: "Incorrect Assumption that includes a lot of text to make certain you can handle it #1.3", assumption_type: "unneeded", assumption_points: -1}];
	var k = 0; //to populate assumption selected array. Multiple assumptions can be selected. 
    var checkboxes = document.getElementsByName('all_assumptions_chk_bx');
	console.log("evaluate_assumptions_submission");
	console.log(checkboxes);
    submit_reasons_set = false;
	checkboxes[1].checked = true;
	current_points = 0;
	assumption_selected = [1];
    for (i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == 'checkbox' && checkboxes[i].checked) {
            assumption_selected[k] = checkboxes[i].value; // if first checkbox checked then 0 stored in array. 
            if(assumptions_ele[assumption_selected[k]]["assumption_type"]=="needed"){
                console.log("assumption type needed"); 
                current_points+=assumptions_ele[assumption_selected[k]]["assumption_points"];
                console.log("modified points:"+current_points);
                console.log("Score displayed");
            }
            else if(assumptions_ele[assumption_selected[k]]["assumption_type"]=="unneeded" || assumptions_ele[assumption_selected[k]]["assumption_type"]=="complicatingfactor"){
                console.log("assumption type unneeded or complicatingfactor");
                current_points+=assumptions_ele[assumption_selected[k]]["assumption_points"];
                console.log("modified points:"+current_points);
            }
        }
        else{
            //blurr the checkbox
            console.log("checkbox not selected : "+checkboxes[i].value);
            }
        //k is incremented here so as to be able to use k in between. 
        k++;
    }	
	assert.ok(current_points === 1, "Passed!");
});

QUnit.test('evaluate_assumptions_submission()-->Select First and second', function(assert){
	var myDiv = document.createElement('assumptions');
	myDiv.id = 'assumptions';
	document.body.appendChild(myDiv);	
	document.getElementById('assumptions').innerHTML += '<div id="assm_0" style="color: green;"><input type="checkbox" name="all_assumptions_chk_bx" value="0" id="chk_0" disabled=""> <br></div><div id="assm_1" style="color: green;"><input type="checkbox" name="all_assumptions_chk_bx" value="1" id="chk_1" disabled=""><br></div><div id="assm_2" style="color: green;"><input type="checkbox" name="all_assumptions_chk_bx" value="2" id="chk_2" disabled=""><br></div><div id="assm_3" style="color: green;"><input type="checkbox" name="all_assumptions_chk_bx" value="3" id="chk_3" disabled=""><br></div><div id="assm_4" style="color: red;"><input type="checkbox" name="all_assumptions_chk_bx" value="4" id="chk_4" disabled=""><br></div><div id="assm_5" style="color: red;"><input type="checkbox" name="all_assumptions_chk_bx" value="5" id="chk_5" disabled=""><br></div><div id="assm_6" style="color: red;"><input type="checkbox" name="all_assumptions_chk_bx" value="6" id="chk_6" disabled=""><br></div><div id="assm_7" style="color: red;"><input type="checkbox" name="all_assumptions_chk_bx" value="7" id="chk_7" disabled=""><br></div>';
	console.log(document.getElementById('assumptions'));
	var assumptions_ele = [{assumption_text: "Hip acts as a pivot point (no lifting off the bed)", assumption_type: "needed", assumption_points: 1},{assumption_text: "Forces are reasonably approximated using static analysis", assumption_type: "needed", assumption_points: 1},{assumption_text: "Patient does not slide on the bed", assumption_type: "needed", assumption_points: 1},{assumption_text: "Lower leg remains approximately perpendicular to upper leg", assumption_type: "needed", assumption_points: 1},{assumption_text: "Incorrect Assumption #1.1", assumption_type: "unneeded", assumption_points: -1},{assumption_text: "Incorrect Assumption #1.2", assumption_type: "unneeded", assumption_points: -1},{assumption_text: "Complicating Assumption #Who Cares I Am Making All This Up?", assumption_type: "unneeded", assumption_points: -1},{assumption_text: "Incorrect Assumption that includes a lot of text to make certain you can handle it #1.3", assumption_type: "unneeded", assumption_points: -1}];
	var k = 0; //to populate assumption selected array. Multiple assumptions can be selected. 
    var checkboxes = document.getElementsByName('all_assumptions_chk_bx');
	//console.log("evaluate_assumptions_submission");
	//console.log(checkboxes);
    submit_reasons_set = false;
	checkboxes[1].checked = true;
	checkboxes[0].checked = true;
	current_points = 0;
	assumption_selected = [0,1];
    for (i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == 'checkbox' && checkboxes[i].checked) {
            assumption_selected[k] = checkboxes[i].value; // if first checkbox checked then 0 stored in array. 
            if(assumptions_ele[assumption_selected[k]]["assumption_type"]=="needed"){
                //console.log("assumption type needed"); 
                current_points+=assumptions_ele[assumption_selected[k]]["assumption_points"];
                //console.log("modified points:"+current_points);
                //console.log("Score displayed");
            }
            else if(assumptions_ele[assumption_selected[k]]["assumption_type"]=="unneeded" || assumptions_ele[assumption_selected[k]]["assumption_type"]=="complicatingfactor"){
                //console.log("assumption type unneeded or complicatingfactor");
                current_points+=assumptions_ele[assumption_selected[k]]["assumption_points"];
                //console.log("modified points:"+current_points);
            }
        }
        else{
            //blurr the checkbox
            //console.log("checkbox not selected : "+checkboxes[i].value);
            }
        //k is incremented here so as to be able to use k in between. 
        k++;
    }	
	assert.ok(current_points === 2, "Passed!");
});

QUnit.test('evaluate_assumptions_submission()-->Select all four', function(assert){
	var myDiv = document.createElement('assumptions');
	myDiv.id = 'assumptions';
	document.body.appendChild(myDiv);	
	document.getElementById('assumptions').innerHTML += '<div id="assm_0" style="color: green;"><input type="checkbox" name="all_assumptions_chk_bx" value="0" id="chk_0" disabled=""> <br></div><div id="assm_1" style="color: green;"><input type="checkbox" name="all_assumptions_chk_bx" value="1" id="chk_1" disabled=""><br></div><div id="assm_2" style="color: green;"><input type="checkbox" name="all_assumptions_chk_bx" value="2" id="chk_2" disabled=""><br></div><div id="assm_3" style="color: green;"><input type="checkbox" name="all_assumptions_chk_bx" value="3" id="chk_3" disabled=""><br></div><div id="assm_4" style="color: red;"><input type="checkbox" name="all_assumptions_chk_bx" value="4" id="chk_4" disabled=""><br></div><div id="assm_5" style="color: red;"><input type="checkbox" name="all_assumptions_chk_bx" value="5" id="chk_5" disabled=""><br></div><div id="assm_6" style="color: red;"><input type="checkbox" name="all_assumptions_chk_bx" value="6" id="chk_6" disabled=""><br></div><div id="assm_7" style="color: red;"><input type="checkbox" name="all_assumptions_chk_bx" value="7" id="chk_7" disabled=""><br></div>';
	console.log(document.getElementById('assumptions'));
	var assumptions_ele = [{assumption_text: "Hip acts as a pivot point (no lifting off the bed)", assumption_type: "needed", assumption_points: 1},{assumption_text: "Forces are reasonably approximated using static analysis", assumption_type: "needed", assumption_points: 1},{assumption_text: "Patient does not slide on the bed", assumption_type: "needed", assumption_points: 1},{assumption_text: "Lower leg remains approximately perpendicular to upper leg", assumption_type: "needed", assumption_points: 1},{assumption_text: "Incorrect Assumption #1.1", assumption_type: "unneeded", assumption_points: -1},{assumption_text: "Incorrect Assumption #1.2", assumption_type: "unneeded", assumption_points: -1},{assumption_text: "Complicating Assumption #Who Cares I Am Making All This Up?", assumption_type: "unneeded", assumption_points: -1},{assumption_text: "Incorrect Assumption that includes a lot of text to make certain you can handle it #1.3", assumption_type: "unneeded", assumption_points: -1}];
	var k = 0; //to populate assumption selected array. Multiple assumptions can be selected. 
    var checkboxes = document.getElementsByName('all_assumptions_chk_bx');
	//console.log("evaluate_assumptions_submission");
	//console.log(checkboxes);
    submit_reasons_set = false;
	checkboxes[1].checked = true;
	checkboxes[0].checked = true;
	checkboxes[2].checked = true;
	checkboxes[3].checked = true;
	current_points = 0;
	assumption_selected = [0,1,2,3];
    for (i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == 'checkbox' && checkboxes[i].checked) {
            assumption_selected[k] = checkboxes[i].value; // if first checkbox checked then 0 stored in array. 
            if(assumptions_ele[assumption_selected[k]]["assumption_type"]=="needed"){
                //console.log("assumption type needed"); 
                current_points+=assumptions_ele[assumption_selected[k]]["assumption_points"];
                //console.log("modified points:"+current_points);
                //console.log("Score displayed");
            }
            else if(assumptions_ele[assumption_selected[k]]["assumption_type"]=="unneeded" || assumptions_ele[assumption_selected[k]]["assumption_type"]=="complicatingfactor"){
                //console.log("assumption type unneeded or complicatingfactor");
                current_points+=assumptions_ele[assumption_selected[k]]["assumption_points"];
                //console.log("modified points:"+current_points);
            }
        }
        else{
            //blurr the checkbox
            //console.log("checkbox not selected : "+checkboxes[i].value);
            }
        //k is incremented here so as to be able to use k in between. 
        k++;
    }	
	assert.ok(current_points === 4, "Passed!");
});

QUnit.test('evaluate_assumptions_submission()-->Select first five', function(assert){
	var myDiv = document.createElement('assumptions');
	myDiv.id = 'assumptions';
	document.body.appendChild(myDiv);	
	document.getElementById('assumptions').innerHTML += '<div id="assm_0" style="color: green;"><input type="checkbox" name="all_assumptions_chk_bx" value="0" id="chk_0" disabled=""> <br></div><div id="assm_1" style="color: green;"><input type="checkbox" name="all_assumptions_chk_bx" value="1" id="chk_1" disabled=""><br></div><div id="assm_2" style="color: green;"><input type="checkbox" name="all_assumptions_chk_bx" value="2" id="chk_2" disabled=""><br></div><div id="assm_3" style="color: green;"><input type="checkbox" name="all_assumptions_chk_bx" value="3" id="chk_3" disabled=""><br></div><div id="assm_4" style="color: red;"><input type="checkbox" name="all_assumptions_chk_bx" value="4" id="chk_4" disabled=""><br></div><div id="assm_5" style="color: red;"><input type="checkbox" name="all_assumptions_chk_bx" value="5" id="chk_5" disabled=""><br></div><div id="assm_6" style="color: red;"><input type="checkbox" name="all_assumptions_chk_bx" value="6" id="chk_6" disabled=""><br></div><div id="assm_7" style="color: red;"><input type="checkbox" name="all_assumptions_chk_bx" value="7" id="chk_7" disabled=""><br></div>';
	console.log(document.getElementById('assumptions'));
	var assumptions_ele = [{assumption_text: "Hip acts as a pivot point (no lifting off the bed)", assumption_type: "needed", assumption_points: 1},{assumption_text: "Forces are reasonably approximated using static analysis", assumption_type: "needed", assumption_points: 1},{assumption_text: "Patient does not slide on the bed", assumption_type: "needed", assumption_points: 1},{assumption_text: "Lower leg remains approximately perpendicular to upper leg", assumption_type: "needed", assumption_points: 1},{assumption_text: "Incorrect Assumption #1.1", assumption_type: "unneeded", assumption_points: -1},{assumption_text: "Incorrect Assumption #1.2", assumption_type: "unneeded", assumption_points: -1},{assumption_text: "Complicating Assumption #Who Cares I Am Making All This Up?", assumption_type: "unneeded", assumption_points: -1},{assumption_text: "Incorrect Assumption that includes a lot of text to make certain you can handle it #1.3", assumption_type: "unneeded", assumption_points: -1}];
	var k = 0; //to populate assumption selected array. Multiple assumptions can be selected. 
    var checkboxes = document.getElementsByName('all_assumptions_chk_bx');
	//console.log("evaluate_assumptions_submission");
	//console.log(checkboxes);
    submit_reasons_set = false;

	checkboxes[1].checked = true;
	checkboxes[0].checked = true;
	checkboxes[2].checked = true;
	checkboxes[3].checked = true;
	checkboxes[4].checked = true;
	current_points = 0;
	assumption_selected = [0,1,2,3,4];
    for (i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == 'checkbox' && checkboxes[i].checked) {
            assumption_selected[k] = checkboxes[i].value; // if first checkbox checked then 0 stored in array. 
            if(assumptions_ele[assumption_selected[k]]["assumption_type"]=="needed"){
                //console.log("assumption type needed"); 
                current_points+=assumptions_ele[assumption_selected[k]]["assumption_points"];
                //console.log("modified points:"+current_points);
                //console.log("Score displayed");
            }
            else if(assumptions_ele[assumption_selected[k]]["assumption_type"]=="unneeded" || assumptions_ele[assumption_selected[k]]["assumption_type"]=="complicatingfactor"){
                //console.log("assumption type unneeded or complicatingfactor");
                current_points+=assumptions_ele[assumption_selected[k]]["assumption_points"];
                console.log("modified points:"+current_points);
            }
        }
        else{
            //blurr the checkbox
            //console.log("checkbox not selected : "+checkboxes[i].value);
            }
        //k is incremented here so as to be able to use k in between. 
        k++;
    }	
	console.log(current_points);
	assert.ok(current_points > 2 , "Passed!");
});
var questions = [];
var current_points = 0;
var global_question= null;
var assumption_selected = [];
var submit_reasons_set = false;

function display_feedback_for_assumptions(){
    // window.alert("display_feedback_for_assumptions");
    var assumptions_ele = global_question["assumptions"];
    for(i=0;i<assumptions_ele.length;i++){
        // window.alert(i);
        var existing_content = document.getElementById("assm_"+i).innerHTML;
        if(assumptions_ele[i]["assumption_type"]=="needed"){
           // window.alert("needed"); 
           // document.getElementById("assm_"+i).innerHTML = existing_content.replace('<br>',' ');
           // document.getElementById("assm_"+i).innerHTML += "<div class='alert alert-success'><strong>Success!</strong> Indicates a successful or positive action.</div>";
           // document.getElementById("assm_"+i).innerHTML +="<p>hi</p>"
           document.getElementById("assm_"+i).style.color = "green"; 

        }
        else if(assumptions_ele[i]["assumption_type"]=="unneeded"){
           document.getElementById("assm_"+i).style.color = "red"; 

        }
        else if(assumptions_ele[i]["assumption_type"]=="complicatingfactor"){
           document.getElementById("assm_"+i).style.color = "blue"; 

        }
    }
}

function check_atleast_one_selected(){
    var atleast_one_selected = false;

    var checkboxes = document.getElementsByName('all_assumptions_chk_bx');
    for (i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == 'checkbox' && checkboxes[i].checked) {
            atleast_one_selected = true;
        }   
   
    }

    if(atleast_one_selected == false){
        return false;
    }
    return true;
}

function evaluate_assumptions_submission() {
    if(!check_atleast_one_selected()){
        window.alert("Select Assumptions!!!");
        return false;
    }
    var k = 0; //to populate assumption selected array. Multiple assumptions can be selected. 
    var checkboxes = document.getElementsByName('all_assumptions_chk_bx');
    submit_reasons_set = false;
    for (i = 0; i < checkboxes.length; i++) {
        //process only if the checkbox is checked. else just disable the checkbox.
        if (checkboxes[i].type == 'checkbox' && checkboxes[i].checked) {
            assumption_selected[k] = checkboxes[i].value; // if first checkbox checked then 0 stored in array. 
            var assumptions_ele = global_question["assumptions"];
            if(assumptions_ele[assumption_selected[k]]["assumption_type"]=="needed"){
                document.getElementById("chk_"+i).disabled= true;
                console.log("assumption type needed"); 
                current_points+=assumptions_ele[assumption_selected[k]]["assumption_points"];
                console.log("modified points:"+current_points);
                // document.getElementById('score_display_ele').innerHTML = "Score obtained : "+current_points;
                console.log("Score displayed");
                document.getElementById("next").disabled= false;
            }
            else if(assumptions_ele[assumption_selected[k]]["assumption_type"]=="unneeded" || assumptions_ele[assumption_selected[k]]["assumption_type"]=="complicatingfactor"){
                console.log("assumption type unneeded or complicatingfactor");
                document.getElementById("chk_"+i).disabled= true;

                current_points+=assumptions_ele[assumption_selected[k]]["assumption_points"];
                console.log("modified points:"+current_points);
                //Display reasons
                var all_reasons = assumptions_ele[assumption_selected[k]]["reasons"];

                if(all_reasons != null){
                    display_reasons(i,all_reasons);
                }

            }
        }
        else{
            //blurr the checkbox
            console.log("checkbox not selected : "+checkboxes[i].value);
            document.getElementById("chk_"+i).disabled= true;

        }
        //k is incremented here so as to be able to use k in between. 
        k++;
    }
   
    display_feedback_for_assumptions();

    document.getElementById('Submit_assm').hidden = true;

    document.getElementById('score_button_id').innerHTML = "Score: "+current_points;

    return false;

}
function display_reasons(i,all_reasons){

    for (j = 0; j < all_reasons.length; j++){
        document.getElementById('assm_'+i).innerHTML += "<input type='radio' name='reasons_"+i+"' value="+j+" id = rd_"+j+" >"+all_reasons[j]["reason_text"]+"<br>";
    }
    console.log("Reason checkboxes displayed");

    //show submit button as well once all the radios are loaded. 

    if(submit_reasons_set == false){
       document.getElementById('reasons').innerHTML += "<input type='submit' id='submit_reasons' name='Submit_reasons' class='btn btn-primary' value='Submit Reason'>";
       submit_reasons_set = true;
    }
    console.log("Reason submit displayed");

}

function evaluate_reasons_submission(){

    console.log("evaluate_reasons_submission");
    document.getElementById('submit_reasons').hidden = true;

    for (each_assm in assumption_selected){
        var radios = document.getElementsByName('reasons_'+each_assm);
        document.getElementsByName('reasons_'+each_assm).disabled = true;
        for (i = 0; i < radios.length; i++) {
            radios[i].disabled = true;
            if (radios[i].type == 'radio' && radios[i].checked) {
                // assumption_selected = radios[i].value;
                console.log("radio selected:"+radios[i].value);
                var reas_seq = radios[i].value;
                console.log("points for this reason :"+global_question["assumptions"][each_assm]["reasons"][reas_seq]["reason_points"]);
                current_points += global_question["assumptions"][each_assm]["reasons"][reas_seq]["reason_points"];
                console.log("modified points:"+current_points);

            }
        }
    }
    document.getElementById('score_button_id').innerHTML = "Score: "+current_points;
    console.log("Score displayed");
    document.getElementById("next").disabled= false;
    return false;

}



function display_assumptions(q) {
    document.getElementById("questionbody").style.visibility = "visible";
    // document.getElementById('question_ele').innerHTML += "<br>" +"<b>"+q["questiontitle"]+"</b>" + "<br>";
    var assumptions_ele = q["assumptions"];
    create_checkboxes(assumptions_ele);

    //show submit button as well once all the radios are loaded.

    document.getElementById('assumptions').innerHTML += "<input type='submit' name='Submit' id='Submit_assm' class='btn btn-primary' value='Submit'>"+"<br>";

    display_images(q);
    return false;
}

function display_images(q){
    document.getElementById('realworld').innerHTML = "<img src='" + q['realworldmodelpath'] + "' class='img-fluid'/>";
    document.getElementById('idealized').innerHTML = "<img src='" + q['idealizedmodelpath'] + "' class='img-fluid'/>";
}
function create_checkboxes(assumptions_ele){
    for (i = 0; i < assumptions_ele.length; i++){
            document.getElementById('assumptions').innerHTML += "<div id='assm_"+i+"'><input type='checkbox' name='all_assumptions_chk_bx' value="+i+" id= chk_"+i+">"+assumptions_ele[i]["assumption_text"]+"<br></div>";
        }

}

function load_file() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var file = document.forms['aform']['uploadData'].files[0];
        if (file) {
            var fr = new FileReader();
            fr.onload = function(e) {
                try {
                    var p = new parser(e.target.result);
                    questions = p.parse();
                    if (questions.length == 0) alert("That file seems to have no questions.");
                    else {
                        var qn = Math.floor(questions.length * Math.random());
                        var random_question = questions[qn];
                        global_question = random_question;
                        // render_question(random_question);
                        // display_ques(random_question);
                        display_assumptions(questions[qn]);
                    }
                } catch (e) {
                    alert("Something went wrong: " + e);
                }
            };
            fr.readAsText(file);
        }
    }
    else {
        alert('The File APIs are not fully supported in this browser.');
    }
    document.getElementById("all_ins").hidden = true;
    return false;
}

function load_nextquestion(){
   // document.getElementById('question_ele').innerHTML = "Question goes here";
    var rad= document.getElementsByName("selection");
    remove_ele(rad);
    if(document.getElementsByName("reasons")!=null){
        remove_ele(document.getElementsByName("reasons"));
    }
    document.getElementById("assumptions").innerHTML = "";
    document.getElementById("reasons").innerHTML = "";
    // document.getElementById("score_display_ele").innerHTML = "Score obtained : "+current_points;
    document.getElementById("score_display_reasons").innerHTML= " ";
    document.getElementById("next").disabled= true;
    load_file();
}

function remove_ele(ele){
    for(i=0;i<ele.length;i++){
        var id = ele[i].getAttribute('id');
        document.getElementById(id).remove();
    }
}
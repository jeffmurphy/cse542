var questions = [];
var current_points = 0;
var global_question= null;
var assumption_selected = null;

function evaluate_submission() {
    //window.alert("global question "+ global_question['questiontitle']);
    console.log("global question "+ global_question['questiontitle']);
    // document.getElementByName('Submit').style.display = 'block';
    // document.getElementsByName('Submit').style.visibility = "hidden"; 
    document.getElementById('Submit_assm').disabled = true;
    // document.getElementById('id').style.visibility = "hidden"; 
    // document.getElementById('id').style.visibility = "hidden"; 
    // document.getElementById('id').style.visibility = "hidden"; 
    console.log("hiding working");

    var radios = document.getElementsByName('selection');
    for (i = 0; i < radios.length; i++) {
        if (radios[i].type == 'radio' && radios[i].checked) {
            assumption_selected = radios[i].value;
            console.log("radio selected : "+radios[i].value);
        }
    }
    var assumptions_ele = global_question["assumptions"];
    if(assumptions_ele[assumption_selected]["assumption_type"]=="needed"){
        console.log("assumption type needed"); 
        current_points+=assumptions_ele[assumption_selected]["assumption_points"];
        console.log("modified points:"+current_points);
        document.getElementById('score_display_ele').innerHTML = "Score obtained : "+current_points;
        console.log("Score displayed");
        document.getElementById("next").disabled= false;
    }
    else if(assumptions_ele[assumption_selected]["assumption_type"]=="unneeded" || assumptions_ele[assumption_selected]["assumption_type"]=="complicatingfactor"){
        console.log("assumption type unneeded or complicatingfactor");

        current_points+=assumptions_ele[assumption_selected]["assumption_points"];
        console.log("modified points:"+current_points);

        document.getElementById('score_display_ele').innerHTML += "Wrong selection!! Score: "+current_points+"<br>";
        document.getElementById('score_display_ele').innerHTML += "To increase, select reason"+"<br>";

        console.log("Score displayed");


        var all_reasons = assumptions_ele[assumption_selected]["reasons"];

        for (i = 0; i < all_reasons.length; i++){
            document.getElementById('reasons').innerHTML += "<input type='checkbox' name='reasons' value="+i+" id = ch_"+i+" >"+all_reasons[i]["reason_text"]+"<br>";
        }
        console.log("Reason checkboxes displayed");

        //show submit button as well once all the radios are loaded. 

        document.getElementById('reasons').innerHTML += "<input type='submit' name='Submit_reasons' value='Submit Reason'>"+"<br>";

        console.log("Reason submit displayed");

        return false;


    }
    return false;

}

function evaluate_reasons_submission(){
    console.log("evaluate_reasons_submission");

    var checkboxes = document.getElementsByName('reasons');
    for (i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == 'checkbox' && checkboxes[i].checked) {
            // assumption_selected = radios[i].value;
            console.log("checkbox selected:"+checkboxes[i].value);
            var reas_seq = checkboxes[i].value;
            console.log("points for this reason :"+global_question["assumptions"][assumption_selected]["reasons"][reas_seq]["reason_points"]);
            current_points += global_question["assumptions"][assumption_selected]["reasons"][reas_seq]["reason_points"];
            console.log("modified points:"+current_points);

        }
    }
    document.getElementById('score_display_reasons').innerHTML = "Score obtained after reasons: "+current_points+"<br>";
    console.log("Score displayed");
    document.getElementById("next").disabled= false;
    return false;

}



function render_question(q) {
    // window.alert("create question element");

    //document.getElementById('testing').innerHTML = JSON.stringify(q, null, 2);

    document.getElementById("questionbody").style.visibility = "visible";

    document.getElementById('question_ele').innerHTML += "<br>" +"<b>"+q["questiontitle"]+"</b>" + "<br>";

    var assumptions_ele = q["assumptions"];
    // window.alert("assumptions_ele length" + assumptions_ele.length);
    create_radios(assumptions_ele);

    //show submit button as well once all the radios are loaded.

    document.getElementById('assumptions').innerHTML += "<input type='submit' name='Submit' id='Submit_assm' value='Submit'>"+"<br>";

    document.getElementById('realworld').innerHTML = "<img src='" + q['realworldmodelpath'] + "'/>";
    document.getElementById('idealized').innerHTML = "<img src='" + q['idealizedmodelpath'] + "'/>";
    return false;

}

function create_radios(assumptions_ele){
    for (i = 0; i < assumptions_ele.length; i++){
            document.getElementById('assumptions').innerHTML += "<input type='radio' name='selection' value="+i+" id= rad_"+i+">"+assumptions_ele[i]["assumption_text"]+"<br>";
        }

}
  
function load_file() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var file = document.forms['aform']['uploadData'].files[0];
        if (file) {
            var fr = new FileReader();
            fr.onload = function(e) {
                try {
                    questions = parse(e.target.result);
                    if (questions.length == 0) alert("That file seems to have no questions.");
                    else {
                        var qn = Math.floor(questions.length * Math.random());
                        var random_question = questions[qn];
                        global_question = random_question;
                        // render_question(random_question);
                        // display_ques(random_question);
                        render_question(questions[qn]);
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
    return false;
}

function load_nextquestion(){
   document.getElementById('question_ele').innerHTML = "Question goes here";
    var rad= document.getElementsByName("selection");
    remove_ele(rad);
    if(document.getElementsByName("reasons")!=null){
        remove_ele(document.getElementsByName("reasons"));
    }
    document.getElementById("assumptions").innerHTML = "";
    document.getElementById("reasons").innerHTML = "";
    document.getElementById("score_display_ele").innerHTML = "Score obtained : "+current_points;
    document.getElementById("score_display_reasons").innerHTML= " ";
    load_file();
}

function remove_ele(ele){
    for(i=0;i<ele.length;i++){
        var id = ele[i].getAttribute('id');
        document.getElementById(id).remove();
    }
}
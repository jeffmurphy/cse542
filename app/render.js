var questions = [];
var current_points = 0;
var global_question= null;
var assumption_selected = [];
var submit_reasons_set = false;


function evaluate_assumptions_submission() {
    document.getElementById('Submit_assm').hidden = true;
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

                display_reasons(i,all_reasons);
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
       document.getElementById('reasons').innerHTML += "<input type='submit' id='submit_reasons' name='Submit_reasons' value='Submit Reason'>";
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

    document.getElementById('assumptions').innerHTML += "<input type='submit' name='Submit' id='Submit_assm' value='Submit'>"+"<br>";

    display_images(q);
    return false;
}

function display_images(q){
    document.getElementById('realworld').innerHTML = "<img src='" + q['realworldmodelpath'] + "'/>";
    document.getElementById('idealized').innerHTML = "<img src='" + q['idealizedmodelpath'] + "'/>";
}
function create_checkboxes(assumptions_ele){
    for (i = 0; i < assumptions_ele.length; i++){
            document.getElementById('assumptions').innerHTML += "<div id='assm_"+i+"'><input type='checkbox' name='all_assumptions_chk_bx' value="+i+" id= chk_"+i+">"+assumptions_ele[i]["assumption_text"]+"<br></div>";
        }

}

var reader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');

function load_file() {//using ajax. because of security concerns javascript does not provide option to load file. 
    document.getElementById('begin_button').hidden = true;
    document.getElementById('welcome_message').hidden = true;
    reader.open('get', '0questions.txt', true);
    reader.onreadystatechange = genRanQuestion;
    reader.send(null);
}

function genRanQuestion() {
    if(reader.readyState==4) {
        var P = new parser(reader.responseText);
        var questions = P.parse();
        if (questions.length == 0) alert("That file seems to have no questions.");
        else {
            var qn = Math.floor(questions.length * Math.random());
            var random_question = questions[qn];
            global_question = random_question;
            display_assumptions(questions[qn]);
        }

    }
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
    load_file();
}

function remove_ele(ele){
    for(i=0;i<ele.length;i++){
        var id = ele[i].getAttribute('id');
        document.getElementById(id).remove();
    }
}
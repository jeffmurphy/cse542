var questions = [];
var current_points = 0;

function render_question(q) {
    document.getElementById('testing').innerHTML = JSON.stringify(q, null, 2);
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
                        render_question(random_question);
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
    return 1;
}

CSE542 Team Grit Hub 

[![Stories in Ready](https://badge.waffle.io/jeffmurphy/cse542.png?label=ready&title=Ready)](http://waffle.io/jeffmurphy/cse542)
[![Stories in In Progress](https://badge.waffle.io/jeffmurphy/cse542.png?label=in%20progress&title=In%20Progress)](http://waffle.io/jeffmurphy/cse542)

# Web based Quiz App for CSE 542

This is a web application project, which simulates a classroom quiz. The students are presented with a pair graphical images of ideal and real life situations and thereafter the user has to select some appropriate answers. Since the quiz is multiple choice, there can be multiple correct, incorrect or complicating factor answers. 
If a user selects an incorrect answer or a complicating factor then its points will be deducted. But thereafter, it will be presented with a set of reasons, which explains why the selected option was incorrect. If the user selects an incorrect reason then more points will be deducted, otherwise it will be granted points for selecting correct reason.

The questions and options are stored the example_official.txt file.
Questions are parsed using parse.js file.
The questions and the options are displayed on browser with test.html.
The scores are evaluated using render.js.

Code Organization:
	a. Render.js: The score is evaluated and questions from the parse.js are rendered with render.js functions.
		1.	evaluate_assumptions_submission(): Evaluated scores on the basis of reason selected.
		2.	display_reasons(i,all_reasons): Displays reason for incorrect option or complicating factor.
		3.	evaluate_reasons_submission(): Evaluates if the reason submitted is correct and evaluates the score after submission.
		4.	display_assumptions(q): Display assumptions related to the randomly selected question.
		5.	display_images(q): Loads and display pair of images related to the question selected from parse.js.
		6.	load_questions(): Selects and loads a question randomly.
		7.	load_nextquestion(): Upon the 'Next' button click, this function clears the screen and replace the page content with a new question set.
		8.	remove_ele(ele): Removes the selected element from the screen.
	
	b. Parse.js: 
	/*PLEASE ADD SOME DESCRIPTION HERE*/



INSTRUCTIONS:

1) To begin the quiz, go to the folder titled "app" and double click test.html to start the quiz.
2) You will be presented with a web application which will open on your web browser.
3) You will be presented with a random question from the questions present in example_official.txt
4) Select one of the options and click "Submit"
5) Scores will be displayed at the top right of the screen.


## Adding and updating Questions.
Suggestions for adding new questions and information related to the question is presented in the file titled 0questions.txt itself.

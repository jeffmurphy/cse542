/**
 * Created by jcmurphy on 6/27/17.
 */

/* instructions: do not edit the 'var' line or the final line
   (containing `;) of the file

   you may edit the configuration text itself. the parser will
   validate what you enter when you load the quiz into your
   webbrowser (by opening 'index.html' in this folder)
 */

var questions_config = `
questiontitle:Hip Joint Force Analysis
realworldmodelpath:../data/RealWorld1.png
idealizedmodelpath:../data/IdealizedModel1.png

assumption_text:Hip acts as a pivot point (no lifting off the bed)
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

assumption_text:Lower leg remains approximately perpendicular to upper leg
assumption_type:needed
assumption_points:1

assumption_text:Forces are reasonably approximated using static analysis
assumption_type:needed
assumption_points:1

assumption_text:Patient does not slide on the bed
assumption_type:needed
assumption_points:1

assumption_text:Complicating Assumption #Who Cares I Am Making All This Up?
assumption_type:complicatingfactor
assumption_points:-1

assumption_text:Incorrect Assumption that includes a lot of text to make certain you can handle it #1.3
assumption_type:unneeded
assumption_points:-1
 reason_text:Valid Reason #ExamplesAreHard
 reason_type:true
 reason_points:1


questiontitle:Second Example
realworldmodelpath:../data/RealWorld2.png
idealizedmodelpath:../data/IdealizedModel2.png

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

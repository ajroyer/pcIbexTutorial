//How to get the Profilic ID from the user:

PennController( "consent" ,
        newHtml("consent form", "consent.html")
            .print()
        ,
        newTextInput("id")
            .settings.log()
            .settings.before( newText("before", "Please enter your unique participant ID") )
            .print()
        ,
        newText("warning", "Please enter your ID first")
            .settings.color("red")
            .settings.bold()
        ,
        newButton("consent button", "By clicking this button I indicate my consent")
            .print()
            .wait(  // Make sure the TextInput has been filled
                getTextInput("id")
                    .testNot.text("")
                    .failure( getText("warning").print() )
            )
        ,   // Create a Var element before going to the next screen
        newVar("ParticipantID")
            .settings.global()          // Make it globally accessible
            .set( getTextInput("id") )  // And save the text from TextInput
)                   // Now we can save the ID
.log( "ParticipantID", getVar("ParticipantID") );


// Good example of how to do a judgement scale
PennController.Template( "input.csv" ,
    row => PennController( "rating" ,
        newText( "sentence" , row.Sentence )
        ,
        newScale("judgment",    "cold", "cool", "lukewarm", "warm", "hot")
            .settings.log()             // Record
            .settings.labelsPosition("top")
            .settings.before( getText("sentence") )
            .settings.size("auto")
            .print()
            .wait()
    )
        .log( "ParticipantID", getVar("ParticipantID") )
        .log( "Group" , row.Group )
        .log( "Sentence" , row.Sentence )
);

// Add CSS to the textInput box
newText("frame", "framed")
    .settings.css("border", "solid 1px black")


// Analysis in R -> https://osf.io/t72h6/wiki/R%20Data%20analyses/

// Adding a host -> https://www.pcibex.net/wiki/penncontroller-addhost/

// Check that audio is preloaded -> https://www.pcibex.net/wiki/penncontroller-checkpreloaded/

// SetCounter to keep track of participants -> https://www.pcibex.net/wiki/penncontroller-setcounter/

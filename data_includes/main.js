PennController.ResetPrefix(null)

//Set the sequence of presentation for the experiment
PennController.Sequence( "welcome" , "consent" ,"instructionsPage", rshuffle(rshuffle(startsWith("crit_e"),startsWith("crit_l"),startsWith("crit_n")),rshuffle(startsWith("fill_e"),startsWith("fill_l"),startsWith("fill_n"))) , "debriefing",  "send", "final" )


// Set the command for sending the results
PennController.SendResults( "send" )



//Preload all of the criticl and filler stimuli audio files
PennController.PreloadZip("https://ajroyer.github.io/PilotAudio-001-015.zip")
PennController.PreloadZip("https://ajroyer.github.io/PilotAudio-016-030.zip")
PennController.PreloadZip("https://ajroyer.github.io/PilotAudio-031-045.zip")
PennController.PreloadZip("https://ajroyer.github.io/PilotAudio-046-060.zip")
PennController.PreloadZip("https://ajroyer.github.io/PilotAudio-fillers.zip")

//Welcome trial
PennController( "welcome",
    newText("<h1>Welcome!</h1>")
      .print()
    ,
    newTextInput("id")
      .settings.log()
      .settings.before( newText("before", "Please enter your Profilic ID: ") )
      .print()
    ,
    newText("warning", "<br>Please enter your ID first")
      .settings.color("red")
      .settings.bold()
    ,
    newButton("consent button", "Continue to consent page")
      .print()
      .settings.size(150,100)
      .wait(  // Make sure the TextInput has been filled
        getTextInput("id")
          .testNot.text("")
          .failure( getText("warning").print() )
      )
    ,   // Create a Var element before going to the next screen
    newVar("ParticipantID")
      .settings.global()          // Make it globally accessible
      .set( getTextInput("id") )  // And save the text from TextInput
).log( "ParticipantID", getVar("ParticipantID") );





//Collect consent from the participant
PennController( "consent",
    defaultText
        .print()
        .settings.css("font-size", "50px")
    ,
    newText("<h2>Consenting Process</h2>")
    ,
    newText("<p> Below is a consent form you will need to read. After reading, please press the 'I consent to participating' button. If you do not consent, please close the page</p>")
    ,
    newHtml("consent", "consent.html")
        .settings.css("border", "solid 5px black")
        .print()
    ,
    newButton("I consent to participating")
        .print()
        .settings.size(250,100)
        .settings.center()
        .wait()
)
.log( "uniqueid" , PennController.GetURLParameter( "id" ) )



// Instructions
PennController( "instruct1",
  defaultText
      .print()
      .settings.css("font-size", "50px")
  ,
  newText("title", "<h1>Instructions</h1>")
  ,
  newText("part1","<p>Thanks for choosing to participate in this experiment</p>")
  ,
  newButton("Continue")
      .print()
      .wait()
  ,
  newKey("space", " ")
      .wait()
)



// Experiment
PennController.Template(
  PennController.GetTable( "testdesign.csv" )
                  .setGroupColumn( "list" ),
  row => PennController( row.cond,

//    newAudio("continue.wav")
//      .play()
    newImage("x", "x.png")
    .print()
    ,
    newTimer("buffer",500)
      .start()
      .wait()
    ,
    getImage("x")
    .remove()
    ,
    newAudio("audioFilename", row.wavname)
        .play()
    ,
    newScale("likert", "Completely<br>Unacceptable<br>1","2","3","Unsure<br>4","5","6","Completely<br>Acceptable<br>7")
        .settings.log()
        .settings.keys("1","2","3","4","5","6","7")
        .settings.labelsPosition("top")
        .settings.size(500)
        .print()
    ,
    newText("spaceToCont", "Please press the spacebar afte<br>you make your selection to continue")
      .print()
    ,
    getAudio("audioFilename")
       .wait()
    ,
    newKey("space"," ")
      .wait(getScale("likert").test.selected())
  )
  .log( "List" , row.list )
  .log( "Item"   , row.item   )
  .log( "BreakLoc" , row.breakLoc )
  .log( "Plurality" , row.plurality )
  .log( "Grammaticality"  , row.grammaticality  )
  .log( "Condition" , row.cond )
  .log( "AudioFile", row.wavname )
)


//Debreifing questionnaire
PennController( "debriefing",
    defaultText
        .print()
    ,
    newText("<h1>Debriefing Questions</h1>")
    ,
    newText("<h2>Please answer all of the questions below about your experience participating in the experiment.</h2>")
    ,
    newText("<h3>Did anything about the sentences or questions stand out to you? Did you notice any type of patterns?</h3>")
    ,
    newTextInput("question1", "")
    .settings.log()
    .settings.lines(0)
    .settings.size(800, 200)
    .print()
    ,
    newText("<h3>What kind of strategy did you use for answering the questions?<br></h3>")
    ,
    newTextInput("question2", "")
    .settings.log()
    .settings.lines(0)
    .settings.size(800, 200)
    .print()
    ,
    newText("<h3>What do you think the researchers are interested in testing in this study?<br></h3>")
    ,
    newTextInput("question3", "")
    .settings.log()
    .settings.lines(0)
    .settings.size(800, 200)
    .print()
    ,
    newText("<h3>What other thoughts or comments do you have about the experiment?<br></h3>")
    ,
    newTextInput("question4", "")
    .settings.log()
    .settings.lines(0)
    .settings.size(800, 200)
    .print()
    ,
    newButton("Submit responses")
        .print()
        .wait()

)



//Instructions for Dialect Survery


//Dialect survey
PennController.Template(
  PennController.GetTable( "dialectdesign.csv" )
                .setGroupColumn( "list" ),
  row => PennController( row.cond,
    newAudio("audioFilename", row.wavname)
        .play()
    ,
    newScale("dialectLikert", "Completely<br>Unacceptable<br>1","2","3","Unsure<br>4","5","6","Completely<br>Acceptable<br>7")
        .settings.log()
        .settings.keys("1","2","3","4","5","6","7")
        .settings.labelsPosition("top")
        .settings.size(500)
        .print()
    ,
    newText("spaceToCont", "<br><br><br><br><br>Please press the spacebar afte<br>you make your selection to continue")
      ,settings.center()
      .settings.bold()
      .print()
    ,
    newKey("space"," ")
      .wait(getScale("dialectLikert").test.selected())
  )
  .log( "DS-Condition" , row.cond )
  .log( "DS-AudioFile", row.wavname )
  .log( "DS-List" , row.list )
  .log( "DS-Item"   , row.item   )
  .log( "DS-Plurality" , row.plurality )
)







//Confirmation of participation
PennController( "final" ,
    newText("<p>Thank you for your participation!</p>")
        .print()
    ,
    newText("<p><a href='https://app.prolific.co/submissions/complete?cc=P314XMGQ'>Click here to validate your participation.</a></p>")
        .print()
    ,
    newButton("void")
        .wait()
)

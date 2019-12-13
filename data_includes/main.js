PennController.ResetPrefix(null)
PennController.Sequence( "welcome" , "consent" ,"instructionsPage" , "debriefing", "send", "final" )

PennController.SendResults( "send" )

PennController.PreloadZip("http://processing.linguistics.ucla.edu/experiments/audio/ar_thesis/PilotAudio.zip")

//Welcome trial
PennController( "welcome",
    newText("<h1>Welcome!</h1>")
      .print()
    ,
    newAudio("hosttest","001_e_p_spl.wav")
    .print()
    .wait()
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

PennController( "consent",
    defaultText
        .print()
        .settings.css("font-size", "large")
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

PennController( "instructionsPage",
  newHtml("instructions", "instructions.html")
    .print()
    ,
newButton("Continue")
    .print()
    .wait()
)

// Experiment
PennController.Template( PennController.GetTable( "testdesign.csv" ) ,
  row => PennController( "rating",

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
    newScale("likert", "1","2","3","4","5")
        .settings.log()
        .settings.keys("1","2","3","4","5")
        .settings.labelsPosition("top")
        .settings.before( newText("unacceptable", "completely unacceptable") )
        .settings.after(  newText("acceptable", "completely acceptable")   )
        .settings.size(500)
        .settings.css("font-size", "2em")
        .print()
    ,
    getAudio("audioFilename")
       .wait()
    ,
    newKey("space"," ")
      .wait(getScale("likert").test.selected())
  )
  .log( "Item"   , row.item   )
  .log( "BreakLoc" , row.breakLoc )
  .log( "Plurality" , row.plurality )
  .log( "Grammaticality"  , row.grammaticality  )
  .log( "Condition" , row.cond )
  .log( "AudioFile", row.wavname )
)

PennController.Template( PennController.GetTable( "dialectdesign.csv" ) ,
  row => PennController( "dialectrating",

//    newAudio("continue.wav")
//      .play()
    newText("<h2>On a scale of 1 (Strongly diagree) to 7 (Strongly agree)</h2>")
    ,
    newText("<h3>'This sentence is acceptable to me and I could imagine myself saying it'</h3>")
    ,
    newScale("dialectlikert", "1","2","3","4","5","6","7")
        .settings.log()
        .settings.keys("1","2","3","4","5","6","7")
        .settings.labelsPosition("top")
        .settings.before( newText("Strongly Disagree", "Strongly Agree") )
        .settings.after(  newText("Strongly Disagree", "Strongly Agree")   )
        .settings.size(500)
        .settings.css("font-size", "2em")
        .print()
    ,
    newAudio("audioFilename", row.wavname)
        .play()
    ,
    getAudio("audioFilename")
       .wait()
    ,
    newKey("space"," ")
      .wait(getScale("dialectlikert").test.selected())
  )
  .log( "Item"   , row.item   )
  .log( "BreakLoc" , row.breakLoc )
  .log( "Plurality" , row.plurality )
  .log( "Grammaticality"  , row.grammaticality  )
  .log( "Condition" , row.cond )
  .log( "AudioFile", row.wavname )
)

PennController( "debriefing",
    defaultText
        .print()
    ,
    newText("<h1>Debriefing Questions</h1>")
    ,
    newText("<p>Please answer the questions below about your experience participating in the experiment.</p>")
    ,
    newText("<h3>When listening to the sentences and answering the questions, did anything about the sentences <br> or questions stand out to you? Did you notice any type of patterns?<br></h3>")
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

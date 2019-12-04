PennController.ResetPrefix(null)
PennController.Sequence( "welcome" , "consent" ,"instructionsPage" , "debriefing", "send", "final" )

PennController.SendResults( "send" )

//Welcome trial
PennController( "welcome",
    defaultText
       .print()
    ,
    newText("<h1>Welcome!</h1>")
    ,
    newButton("Continue")
      .print()
      .settings.size(150,100)
      .wait()
)

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

PennController( "debriefing",
    defaultText
        .print()
    ,
    newText("<h1>Debriefing Questions</h1>")
    ,
    newText("<p>Please answer the questions below about your experience participating in the experiment.</p>")
    ,
    newTextInput("question1", "When listening to the sentences and answering the questions, did anything about the sentences or questions stand out to you? Did you notice any type of patterns?")
    .settings.log()
    .settings.lines(2)
    .settings.size(400, 200)
    .print()
    ,
    newTextInput("question2", "What kind of strategy did you use for answering the questions?")
    .settings.log()
    .settings.lines(2)
    .settings.size(400, 200)
    .print()
    ,
    newTextInput("question3", "What do you think the researchers are interested in testing in this study?")
    .settings.log()
    .settings.lines(2)
    .settings.size(400, 200)
    .print()
    ,
    newTextInput("question4", "What other thoughts or comments do you have about the experiment?")
    .settings.log()
    .settings.lines(2)
    .settings.size(400, 200)
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
    newText("<p><a href='https://www.put.your/platform/confirmation/link.here'>Click here to validate your participation.</a></p>")
        .print()
    ,
    newButton("void")
        .wait()
)

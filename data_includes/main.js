PennController.ResetPrefix(null)
PennController.Sequence( "welcome" , "consent" ,"instructionsPage" , randomize("rating") , "final" )

//Welcome trial
PennController( "welcome",
    defaultText
       .print()
    ,
    newText("<h1>Welcome!</h1>")
    ,
    newButton("Continue")
      .print()
      .wait()
)

PennController( "consent",
    defaultText
        .print()
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
    newImage("x.png")
    .print()
    ,
    newTimer("buffer",500)
      .start()
      .wait()
    ,
    newAudio("audioFilename", row.wavname)
        .play()
    ,
    newScale("likert", "1","2","3","4","5")
        .settings.log()
        .settings.keys("1","2","3","4","5")
        .settings.labelsPosition("top")
        .settings.before( newText("acceptable", "completely acceptable") )
        .settings.after(  newText("unacceptable", "completely unacceptable")   )
        .settings.size("auto")
        .print()
    ,
    getAudio("audioFilename")
       .wait()
    ,
    newKey("space"," ")
      .wait()
  )
  .log( "Item"   , row.item   )
  .log( "BreakLoc" , row.breakLoc )
  .log( "Plurality" , row.plurality )
  .log( "Grammaticality"  , row.grammaticality  )
  .log( "Condition" , row.cond )
  .log( "AudioFile", row.wavname )
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

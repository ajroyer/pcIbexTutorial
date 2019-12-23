PennController.ResetPrefix(null)

//Set the sequence of presentation for the experiment
PennController.Sequence( "welcome" , "consent" ,"instruct1", "instruct2", "instruct3", "instruct4", "prac1", rshuffle(rshuffle(startsWith("crit_e"),startsWith("crit_l"),startsWith("crit_n")),rshuffle(startsWith("fill_e"),startsWith("fill_l"),startsWith("fill_n"))) , "debriefing",  "send", "final" )


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
      .settings.css("font-size", "2em")
      .settings.center()
      .print()
    ,
    newCanvas("welcomescreen", 720,150)
      .print()
      .settings.add( 0,50,newTextInput("id")
                              .settings.log()
                              .settings.before( newText("before", "Please enter your Profilic ID: ") )
                              .print()
                    )
      .settings.center()
    ,
    newText("warning", "<br>Please enter your ID first")
      .settings.color("red")
      .settings.bold()
      .settings.css("font-size", "2em")
      .settings.center()
    ,
    newButton("consent button", "Submit")
      .print()
      .settings.css("font-size", "2em")
      .settings.center()
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
        .settings.css("font-size", "1.5em")
    ,
    newText("<h2>Consenting Process</h2>")
    ,
    newText("<p> Below is a consent form you will need to read.<br>After reading, please press the 'I consent to participating' button.<br>If you do not consent, please close this page</p>")
    ,
    newHtml("consent", "consent.html")
        .settings.css("font-size", "1em")
        .settings.size(720,1280)
        .settings.center()
        .print()
    ,
    newButton("I consent")
        .print()
        .settings.size(200,100)
        .settings.center()
        .settings.css("font-size","2em")
        .wait()
)
.log( "uniqueid" , PennController.GetURLParameter( "id" ) )



// Instructions
PennController( "instruct1",
  defaultText
      .print()
      .settings.css("font-size", "1.5em")
      .settings.center()
  ,
  newText("title", "<h1>Instructions</h1>")
  ,
  newText("part1","<p>Thank you for choosing to participate in this experiment.</p>")
  ,
  newText("details1", "<p>Your task is to listen to a series of sentences and judge how 'acceptable' each sentence is for you as a speaker of English.</p>").settings.size(720,50)
  ,
  newText("details3","<p> When making your judgements on the acceptability of the sentences, please disregard any lessons you may have been taught about what 'proper' English is supposed to be.</p>")
  .settings.size(720,150)
  ,
  newText("details324", "<p>You are to rely on your own intuitions as a native speaker of English. Your intuitions about what sounds more or less accetable are neither right nor wrong.</p>")
  .settings.size(720,125)
  ,
  newText("details2", "<p>After about half of the sentences, you will be asked a comprehension question about the sentence you just heard, so make sure you are paying attention to what you hear.</p>")
  .settings.size(720,150)
  ,
  newButton("Continue")
      .print()
      .settings.size(200,100)
      .settings.center()
      .settings.css("font-size","2em")
      .wait()

)

PennController( "instruct2",
  defaultText
      .print()
      .settings.css("font-size", "1.5em")
      .settings.center()

  ,
  newText("title", "<h1>Instructions</h1>")
  ,
  newText("scaling", "<p> You will judge the acceptability of the sentences you hear on a 1 through 7 scale, 1 being 'Competely Unacceptable' and 7 being 'Completely Acceptable'. A rating of 4 is an 'Unsure' repsonse, meaning that you honestly can't make a decision either way on a sentence.</p>")
  .settings.size(720,150)
  ,
  newText("details2", "<p> If a sentence is 'Completely Acceptable' to you, then it sounds totally fine and understandable to you. On the other hand, if a sentence sounds totally wrong to you, you would judge it as 'Competely Unacceptable'. </p>")
  .settings.size(720,150)

  ,
  newButton("Continue")
      .print()
      .settings.size(200,100)
      .settings.center()
      .settings.css("font-size","2em")
      .wait()

)

PennController( "instruct3",
  defaultText
      .print()
      .settings.css("font-size", "1.5em")
      .settings.center()
  ,
  newText("title", "<h1>Instructions</h1>")
  ,
  newText("details3", "<p> For example, you may judge a sentence like, 'The kittens in the box are only a few months old.' as 'Competely Acceptable'. On the other hand, you may judge a sentence like 'The mayor and him wife left the play shortly after it began.' to be 'Completely Unacceptable'. You may have been thinking that if 'him' were replaced with 'his', that would make this sentence more acceptable.  </p>")
  .settings.size(720,250)
  ,
  newText("details2", "<p> Other sentences may sound more or less acceptable than the examples here, so please use the full scale 1-7 scale when judging the acceptability of the sentence. </p>")
  .settings.size(720,150)
  ,
  newButton("Continue")
      .print()
      .settings.size(200,100)
      .settings.center()
      .settings.css("font-size","2em")
      .wait()

)


PennController( "instruct4",
  defaultText
      .print()
      .settings.css("font-size", "1.5em")
      .settings.center()
  ,
  newText("title", "<h1>Instructions</h1>")
  ,
  newText("details1","<p> You will now do some practice trials to familiarize yourself with the task.</p>")
  ,
  newText("details2", "<p> After the sentence has played, rate how acceptable you find it to be on a scale from 1 to 7.<br>You may either use your mouse to select your response or use the number keys on your keyboard.<br>After you have made your selection, press the spacebar to continue to the next trial.</p>")
  ,
  newText("details3", "<p> Occasionally a question will appear after you have made your judgmenet.<br>You will have two answers to choose from for the question.<br>Please use the 'f' key to select the answer on the left side of the screen<br>or the 'j' key to select the answer on the right side of the screen.</p>")
  ,
  newButton("Start Practice")
      .print()
      .settings.size(200,100)
      .settings.center()
      .settings.css("font-size","2em")
      .wait()

)



// Practice trials

PennController("prac1",
  newText("title", "<h2>Practice Trial #1</h2>")
,
newImage("x", "x.png")
.print()
.settings.center()
,
newTimer("buffer",500)
  .start()
  .wait()
,
getImage("x")
.remove()
,
newAudio("prac1sound", "prac1.wav")
    .play()
,
newScale("practice1Likert", "Completely<br>Unacceptable<br>1","2","3","Unsure<br>4","5","6","Completely<br>Acceptable<br>7")
    .settings.log()
    .settings.keys("1","2","3","4","5","6","7")
    .settings.labelsPosition("top")
    .settings.size(720)
    .settings.center()
    .settings.cssContainer("font-size", "3em")
    .print()
,
newText("spaceToCont", "<br><br><br>Press spacebar to continue")
  .print()
  .settings.css("font-size", "1.5em")
  .settings.center()
,
getAudio("prac1sound")
   .wait()
,
newKey("space"," ")
  .wait(getScale("practice1Likert").test.selected())

)






PennController("prac2",

)

PennController("prac3",

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
    .settings.center()
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
        .settings.size(720)
        .settings.center()
        .settings.cssContainer("font-size", "3em")
        .print()
    ,
    newText("spaceToCont", "<br><br><br>Press spacebar to continue")
      .print()
      .settings.css("font-size", "1.5em")
      .settings.center()
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
      .settings.center()
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

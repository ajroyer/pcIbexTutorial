//Required at the start of the file
PennController.ResetPrefix(null)

PennController.DebugOff()

PennController.SetCounter()

//Set the sequence of presentation for the experiment
PennController.Sequence( "welcome" , "consent" , "demographics", "langback","instruct1", "instruct2", "instruct3", "instruct4", "prac1", "prac1Q", "prac2", "prac3", "prac4", "prac4Q", "instruct5", rshuffle(rshuffle(startsWith("crit_e"),startsWith("crit_l"),startsWith("crit_n")),rshuffle(startsWith("fill_e"),startsWith("fill_l"),startsWith("fill_n"))) , "instruct6" , "debriefing", "instruct7" , randomize("d_s","d_p") , "send", "final" )

//Create the command for sending the results
PennController.SendResults( "send" )

//Preload all of the criticl and filler stimuli audio files
//URL *must* be https secured because PCIbex Farm is https secured
PennController.PreloadZip("https://ajroyer.github.io/PilotAudio-001-015.zip")
PennController.PreloadZip("https://ajroyer.github.io/PilotAudio-016-030.zip")
PennController.PreloadZip("https://ajroyer.github.io/PilotAudio-031-045.zip")
PennController.PreloadZip("https://ajroyer.github.io/PilotAudio-046-060.zip")
PennController.PreloadZip("https://ajroyer.github.io/PilotAudio-fillers.zip")

//Welcome trial
PennController( "welcome",
    //Create title for page
    newText("<h1>Welcome!</h1>")
      .settings.css("font-size", "2em")
      .settings.center()
      .print()
    ,
    //Create reminder about headphones
    newText("headphones", "This experiment requires that you listen to audio through headphones.")
      .print()
      .settings.color("red")
      .settings.center()
      .settings.css("font-size","1.5em")
    ,
    //Make canvas for no real reason other than it was in the original tutorial
    //It would also be fine just ot input the "newTextInput" in along side the "newText" commands
    newCanvas("welcomescreen", 720,100)
      .print()
      .settings.add( 0,50,newTextInput("profilicid")
                              .settings.log()
                              .settings.before( newText("before", "Please enter the first letter of your name: ") )
                              .print()
                    )
      .settings.center()
    ,
    //Create warning text
    newText("warning", "<br>Please enter the first letter of your name before continuing")
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
        getTextInput("profilicid")
          .testNot.text("")
          //If the text input has anything in it, all is good, elsewise, print the warning message
          .failure( getText("warning").print() )
      )
    ,   // Create a Var element before going to the next screen
    newVar("firstInitial")
      .settings.global()          // Make it globally accessible
      .set( getTextInput("profilicid") )  // And save the text from TextInput
).log( "firstInitial", getVar("firstInitial") )
.log( "uniqueid", PennController.GetURLParameter("id") );





//Collect consent from the participant
PennController( "consent",
    defaultText
        .print()
        .settings.css("font-size", "1.5em")
        .settings.center()
    ,
    newText("<h2>Consenting Process</h2>")
    ,
    newText("<p> Below is a consent form you will need to read.<br>After reading, please press the 'I consent' button.<br>If you do not consent, please close this page</p>")
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
).log( "uniqueid" , PennController.GetURLParameter( "id" ) )




//Demographics Details
PennController( "demographics",
    //Create title for page
    newText("<h1>Language background questionnaire</h1>")
      .settings.css("font-size", "2em")
      .settings.center()
      .print()
    ,
    newText("<h1>University of California, Los Angeles</h1>")
      .settings.css("font-size", "0.5em")
      .settings.center()
      .print()
    ,
    //Create instructions for the experiment
    newText("expInstr", "Thank you for participating in this research study. Please fill out all the following information. If you prefer not to answer a particular question, you may leave it blank:")
      .print()
      .settings.center()
      .settings.css("font-size","1.5em")
    ,
     newTextInput("ageQ","Please enter your age in years")
    	.log()
    	.lines(0)
    	.print()
    ,    
    newDropDown("transQ", "Please indicate whether or not you are transgender?")
    	.add("yes","no")
    	.print()
    ,
    newDropDown("genderQ", "Please indicate your gender")
    	.add("man","woman","non-binary","gender non-conforming","other (fill in below)")
    	.print()
    ,
    newTextInput("otherGenderQ","If you answered 'other' above, please answer here")
    	.log()
    	.lines(0)
    	.print()
    ,
  	newDropDown("ethQ1", "Please indicate your race and/or ethnicity")
    	.add("African", "Black", "Carribean", "East Asian", "Latinx/Hispanic", "Middle Eastern", "Native American", "Pacific Islander", "South Asian", "White", "Other" )
    	.print()    
    ,
     	newDropDown("ethQ2", "Please make an additional race and/or ethnicity selection here if necessary")
    	.add("African", "Black", "Carribean", "East Asian", "Latinx/Hispanic", "Middle Eastern", "Native American", "Pacific Islander", "South Asian", "White", "N/A" )
    	.select("N/A")
    	.print()    
     ,
     	newDropDown("ethQ3", "Please make an additional race and/or ethnicity selection here if necessary")
    	.add("African", "Black", "Carribean", "East Asian", "Latinx/Hispanic", "Middle Eastern", "Native American", "Pacific Islander", "South Asian", "White", "N/A" )
    	.select("N/A")
    	.print()
 	,
    newDropDown("impedQ", "Do you have any known speech or hearing impairment?")
    	.add("yes","no")
    	.print()
    ,
     newTextInput("impedYesQ","If yes, please explain:")
    	.log()
    	.lines(0)
    	.print()
    ,
    newButton("submit", "Submit")
      .print()
      .settings.css("font-size", "2em")
      .settings.center()
      .settings.size(150,100)
      .wait()
).log( "uniqueid", PennController.GetURLParameter("id") );







//Language Background details
PennController( "langback",
    //Create title for page
    newText("<h1>Language background questionnaire</h1>")
      .settings.css("font-size", "2em")
      .settings.center()
      .print()
    ,
    newText("<h1>University of California, Los Angeles</h1>")
      .settings.css("font-size", "0.5em")
      .settings.center()
      .print()
    ,
    newDropDown("nativeEngQ", "Do you consider yourself to be a native speaker of American English (i.e. you started hearing/speaking English regularly before 12 years old)?")
    	.add("yes","no")
    	.print()
    ,
    newTextInput("notEngQ","If you answered 'no' above, please write in what you do consider to be your native language.")
    	.log()
    	.lines(0)
    	.print()
    ,
    newTextInput("otherLangQ","What language(s) did you hear in the home as a child (from birth to 13 years old?")
    	.log()
    	.lines(0)
    	.print()
    ,
    newTextInput("nonNativeLangQ","Do you speak and/or understand any languages other than your native language(s)? What age did you start learning these languages?")
    	.log()
    	.lines(0)
    	.print()    
    ,
    newTextInput("What places have you lived (6+months) and how old were you while you were living in those places? (For example 'Location: Central Ohio, Age: birth to 21. Location: Los Angeles, Age: 21 to 27.')")
    	.log()
    	.lines(5)
    	.prin
    ,
    newButton("submit", "Submit")
      .print()
      .settings.css("font-size", "2em")
      .settings.center()
      .settings.size(150,100)
      .wait()
).log( "uniqueid", PennController.GetURLParameter("id") );










// Instructions
PennController( "instruct1",
  defaultText
      .print()
      .settings.css("font-size", "1.5em")
      .settings.center()
  ,
  newText("title", "<h1>Instructions</h1>")
  ,
  newText("part1","<p>Thank you for choosing to participate. In this experiment, you will be completing two tasks.</p>")
    .settings.size(720,50)
  ,
  newText("details1", "<p>Your first task is to listen to a series of sentences and judge how 'acceptable' each sentence is for you as a speaker of English.</p>")
    .settings.size(720,50)
  ,
  newText("detailsfsf3","<p> When making your judgements on the acceptability of the sentences, please disregard any lessons you may have been taught about what 'proper' English is supposed to be.</p>")
    .settings.size(720,150)
  ,
  newText("details324", "<p>You are to rely on your own intuitions as a native speaker of English. Your intuitions about what sounds more or less accetable are not necessarily right or wrong.</p>")
    .settings.size(720,125)
  ,
  newText("details2", "<p> About half of the sentences are followed by a comprehension question about the sentence you just heard, so make sure you are paying attention.</p>")
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
  newText("details3", "<p> For example, you may judge a sentence like, 'The kittens in the box are only a few months old.' as 6 or 7. On the other hand, you may judge a sentence like 'The mayor and him wife left the play shortly after it began.' to be a 1 or 2. You may have been thinking that if 'him' were replaced with 'his', that would make this sentence more acceptable.  </p>")
  .settings.size(720,200)
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
  .settings.size(720,100)
  ,
  newText("details2", "<p> After the sentence has played, rate how acceptable you find it to be on a scale from 1 to 7. You may either use your mouse or the number keys on your keyboard to make your selection. Press the spacebar to continue to the next trial.</p>")
  .settings.size(720,150)
  ,
  newText("details3", "<p> Occasionally a question will appear after you have made your judgement. You will have two answers to choose from for the question. You may either use your mouse or the 'F' and 'J' keys on your keyboard to make your selection. </p>")
  .settings.size(720,150)
  ,
  newText("details9", "<p> Before beginning, take a moment to adjust your volume to a comfortable level. </p>")
  .settings.size(720,150)
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
    .print()
    .settings.center()
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

PennController("prac1Q",
  newText("title", "<h2>Practice Trial #1</h2>")
    .print()
    .settings.center()
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
  newText("right", "daytime")
    .settings.css("font-size","2em")
  ,
  newText("wrong", "nighttime")
    .settings.css("font-size","2em")
  ,
  newText("f","'F'")
    .settings.css("font-size","1em")
  ,
  newText("j","'J'")
    .settings.css("font-size","1em")
  ,
  newText("question1", "What time of day was it?")
    .settings.css("font-size","2em")
    .print()
  ,
  newCanvas(500,300)
    .settings.add( -100, 50, getText("right"))
    .settings.add( 250, 50, getText("wrong"))
    .settings.center()
    .print()
  ,
  newCanvas(500,300)
    .settings.add( -50, 100, getText("f"))
    .settings.add( 300, 100, getText("j"))
    .settings.center()
    .print()
  ,
  newSelector()
    .settings.add( getText("right"), getText("wrong"))
    .shuffle()
    .settings.keys( "F", "J")
    .settings.log()
    .wait()

)



PennController("prac2",
  newText("title", "<h2>Practice Trial #2</h2>")
    .print()
    .settings.center()
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
  newAudio("prac2sound", "prac2.wav")
    .play()
  ,
  newScale("practice2Likert", "Completely<br>Unacceptable<br>1","2","3","Unsure<br>4","5","6","Completely<br>Acceptable<br>7")
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
getAudio("prac2sound")
   .wait()
,
newKey("space"," ")
  .wait(getScale("practice2Likert").test.selected())

)

PennController("prac3",
  newText("title", "<h2>Practice Trial #3</h2>")
    .print()
    .settings.center()
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
  newAudio("prac3sound", "prac3.wav")
    .play()
  ,
  newScale("practice3Likert", "Completely<br>Unacceptable<br>1","2","3","Unsure<br>4","5","6","Completely<br>Acceptable<br>7")
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
getAudio("prac3sound")
   .wait()
,
newKey("space"," ")
  .wait(getScale("practice3Likert").test.selected())

)

PennController("prac4",
  newText("title", "<h2>Practice Trial #4</h2>")
    .print()
    .settings.center()
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
  newAudio("prac4sound", "prac4.wav")
    .play()
  ,
  newScale("practice4Likert", "Completely<br>Unacceptable<br>1","2","3","Unsure<br>4","5","6","Completely<br>Acceptable<br>7")
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
getAudio("prac4sound")
   .wait()
,
newKey("space"," ")
  .wait(getScale("practice4Likert").test.selected())

)

PennController("prac4Q",
  newText("title", "<h2>Practice Trial #4</h2>")
    .print()
    .settings.center()
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
  newText("right", "Amazon")
    .settings.css("font-size","2em")
  ,
  newText("wrong", "Microsoft")
    .settings.css("font-size","2em")
  ,
  newText("f","'F'")
    .settings.css("font-size","1em")
  ,
  newText("j","'J'")
    .settings.css("font-size","1em")
  ,
  newText("question1", "Which company is it?")
    .settings.css("font-size","2em")
    .print()
  ,
  newCanvas(500,300)
    .settings.add( -100, 50, getText("right"))
    .settings.add( 250, 50, getText("wrong"))
    .settings.center()
    .print()
  ,
  newCanvas(500,300)
    .settings.add( -50, 100, getText("f"))
    .settings.add( 300, 100, getText("j"))
    .settings.center()
    .print()
  ,
  newSelector()
    .settings.add( getText("right"), getText("wrong"))
    .shuffle()
    .settings.keys( "F", "J")
    .settings.log()
    .wait()

)


PennController( "instruct5",
  defaultText
    .print()
    .settings.css("font-size", "1.5em")
    .settings.center()
  ,
  newText("title", "<h1>Instructions</h1>")
  ,
  newText("details1","<p> You have completed the practice trials!</p>")
    .settings.size(720,100)
  ,
  newText("details2", "<p> If the audio was too soft or loud in the practice trials, please adjust your volume level accordingly before beginning the experiment.</p>")
    .settings.size(720,100)
  ,
  newButton("Start Experiment")
    .print()
    .settings.size(200,100)
    .settings.center()
    .settings.css("font-size","2em")
    .wait()

)






// Experiment
PennController.Template(
  PennController.GetTable( "fulldesign.csv" )
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
    newText("questionOrNah",row.question)
    ,
    newKey("space"," ")
      .wait(getScale("likert").test.selected())
    ,
    getText("questionOrNah")
      .testNot.text("")
      .success(
        getScale("likert")
          .remove()
        ,
        getText("spaceToCont")
          .remove()
        ,
        getImage("x")
          .print()
          .settings.center()
        ,
        newTimer("buffer2",500)
          .start()
          .wait()
        ,
        getImage("x")
          .remove()
        ,
        newText("correct", row.answerCorrect)
          .settings.css("font-size","2em")
          .settings.center()
        ,
        newText("incorrect", row.answerIncorrect)
          .settings.css("font-size","2em")
          .settings.center()
        ,
        newText("f","'F'")
          .settings.css("font-size","1em")
          .settings.center()
        ,
        newText("j","'J'")
          .settings.css("font-size","1em")
          .settings.center()
        ,
        getText("questionOrNah")
          .settings.center()
          .settings.css("font-size","2em")
          .print()
        ,
        newCanvas(500,400)
          .settings.add( -100, 50, getText("correct"))
          .settings.add( 250, 50, getText("incorrect"))
          .settings.center()
          .print()
        ,
        newCanvas(500,400)
          .settings.add( -50, 150, getText("f"))
          .settings.add( 300, 150, getText("j"))
          .settings.center()
          .print()
        ,
        newSelector()
          .settings.add( getText("correct"), getText("incorrect"))
          .shuffle()
          .settings.keys( "F", "J")
          .settings.log()
          .wait()


      )










// Useful for .success and .failure -> https://www.pcibex.net/wiki/ontology/s

  )
  .log( "uniqueid" , PennController.GetURLParameter( "id" ) )
  .log( "List" , row.list )
  .log( "Item"   , row.item   )
  .log( "BreakLoc" , row.breakLoc )
  .log( "Plurality" , row.plurality )
  .log( "Grammaticality"  , row.grammaticality  )
  .log( "Condition" , row.cond )
  .log( "AudioFile", row.wavname )
)

//Debriefing Instructions

PennController( "instruct6",
  defaultText
    .print()
    .settings.css("font-size", "1.5em")
    .settings.center()

  ,
  newText("title", "<h1>Instructions</h1>")
  ,
  newText("details1", "<p> You have completed the first task! Next, you will be answering a few questions about the task you just completed.</p>")
    .settings.size(720,150)
  ,
  newButton("Continue")
    .print()
    .settings.size(200,100)
    .settings.center()
    .settings.css("font-size","2em")
    .wait()

)

//Debreifing questionnaire
PennController( "debriefing",
    defaultText
      .settings.center()
      .settings.css("font-size", "1.5em")
      .settings.size(720,75)
    ,
    defaultTextInput
      .settings.log()
      .settings.lines(0)
      .settings.size(720, 75)
      .settings.center()
      .print()
    ,
    newText("<h1>Debriefing Questions</h1>")
      .print()
    ,
    newText("<h3>Please answer all of the questions below about your experience participating in the previous task.</h2>")
      .print()
    ,
    newText("q1text","<p>Q1: Did anything about the sentences or questions stand out to you?<br>Did you notice any patterns?</p>")
      .print()
    ,
    newTextInput("question1", "")
    ,
    newText("q2text","<p>Q2: What kind of strategy did you use for answering the questions?<br></p>")
      .print()
    ,
    newTextInput("question2", "")
    ,
    newText("q3text","<p>Q3: What do you think the researchers are interested in testing in this study?<br></p>")
      .print()
    ,
    newTextInput("question3", "")
    ,
    newText("q4text","<p>Q4: What other thoughts or comments do you have about the experiment?<br></p>")
      .print()
    ,
    newTextInput("question4", "")
    ,
    newText("warn", "Please fill in answers to all questions before continuing.")
    .settings.color("red")
    .settings.bold()
    ,
    newButton("Submit responses")
      .settings.size(200,100)
      .settings.css("font-size","2em")
      .settings.center()
      .print()
      .wait(
            getTextInput("question1")
              .testNot.text("")
              .and(getTextInput("question2")
                      .testNot.text(""))
              .and(getTextInput("question3")
                      .testNot.text(""))
              .and(getTextInput("question4")
                      .testNot.text(""))
              //If the text input has anything in it, all is good, elsewise, print the warning message
              .failure( getText("warn").print() )

      )

)

//Instructions for Dialect Survery
PennController( "instruct7",
  defaultText
      .print()
      .settings.css("font-size", "1.5em")
      .settings.center()

  ,
  newText("title", "<h1>Instructions</h1>")
  ,
  newText("details1", "<p> For your last task, you will judge the acceptability of a few sentences just as you did in the previous experiment. This time though, you will only have 'Acceptable', 'Unsure', and 'Unacceptable' as your choices.</p>")
  .settings.size(720,150)
  ,
  newButton("Start Task")
      .print()
      .settings.size(200,100)
      .settings.center()
      .settings.css("font-size","2em")
      .wait()

)

//Dialect survey
PennController.Template(
  PennController.GetTable( "dialectdesign.csv" )
                .setGroupColumn( "list" ),
  row => PennController( row.cond,
    newAudio("audioFilename", row.wavname)
        .play()
    ,
    newScale("dialectLikert", "Unacceptable","Unsure","Acceptable",)
        .settings.log()
        .settings.keys("1","2","3")
        .settings.labelsPosition("top")
        .settings.size(720)
        .print()
    ,
    newText("spaceToCont", "<br><br><br>Press spacebar to continue")
      .print()
      .settings.css("font-size", "1.5em")
      .settings.center()
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
    defaultText
      .settings.css("font-size","1.5em")
      .settings.center()
      .print()
    ,
    newText("<p>You're all done!</p>")
    ,
    newText("<p>Thank you very much for your participation.</p>")
    ,
    newText("<p><a href='https://app.prolific.co/submissions/complete?cc=P314XMGQ'>Click here to validate your participation.</a></p>")
    ,
    newButton("void")
        .wait()
)

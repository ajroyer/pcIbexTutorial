PennController.ResetPrefix(null)
PennController.Sequence( "consent" , "final" )

PennController( "consent",
    defaultText
        .print()
    ,
    newText("<h2>Consenting Process</h2>")
    ,
    newText("<p> Below is a consent form you will need to read. After reading, please press the 'I consent to participating' button. If you do not consent, please close the page</p>")
    ,
//    newHtml("consent", "consent.html")
//        .print()
//    ,
    newButton("I consent to participating")
        .print()
        .wait()
)
.log( "uniqueid" , PennController.GetURLParameter( "id" ) )

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

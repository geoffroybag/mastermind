// array de couleur 
var arrayDepart = ["white","violet","yellow","green"]

// array resultat
var arrayResult = [];


// Random pick 4 numbers in arrayDepart to log the code to break (without doublons)
function masterMind(){
    while(arrayResult.length<4){
      var randomIndex = Math.floor(Math.random() * arrayDepart.length)
      if (arrayResult.indexOf(arrayDepart[randomIndex])==-1){
        arrayResult.push(arrayDepart[randomIndex])
      }
    }
    return arrayResult
}

// arrayGuess
var arrayGuess = [0,0,0,0];

// test if arrayGuess is correct
function testGuess(){
    var whiteGuess = 0
    var blackGuess = 0

    //test whites
    arrayGuess.forEach(function(oneColor){
      if(arrayResult.indexOf(oneColor)>-1){
        whiteGuess++
      }
    });
    //test blacks
    for(i=0;i<arrayGuess.length;i++){
      if(arrayGuess[i]===arrayResult[i]){
        blackGuess++
      }
    }
    whiteGuess = whiteGuess-blackGuess
    var Result =  "white : " + whiteGuess + " & black : "+blackGuess;
    console.log(Result)
}

/////////////interactions///////////////////
var holder = 0;

// select hole to add color : show selection by different border and remove all colors from hole selected
$(".hole").click(function () {
    holder = 0;
    var button = $(event.target);
    holder = (button.attr('name'));
    button.removeClass("yellow white violet green")
    button.addClass("selected");
    button.next().removeClass("selected");
    button.next().next().removeClass("selected");
    button.next().next().next().removeClass("selected");
    button.prev().removeClass("selected");
    button.prev().prev().removeClass("selected");
    button.prev().prev().prev().removeClass("selected");
});

// push the color picked to the chosen hole
$(".color-section").click(function () {
  // if(count==2){
  //       var buttonColor = $(event.target);
  //   arrayGuess[holder-1]=buttonColor.attr('name')
  //   console.log(arrayGuess);  
  //   var pushColor1 = document.getElementsByName("1");
  //   $(pushColor1).removeClass("yellow white violet green");
  //   $(pushColor1).addClass(arrayGuess[0]);
  //   var pushColor2 = document.getElementsByName("2")
  //   $(pushColor2).removeClass("yellow white violet green");
  //   $(pushColor2).addClass(arrayGuess[1]);
  //   var pushColor3 = document.getElementsByName("3")
  //   $(pushColor3).removeClass("yellow white violet green");
  //   $(pushColor3).addClass(arrayGuess[2]);
  //   var pushColor4 = document.getElementsByName("4")
  //   $(pushColor4).removeClass("yellow white violet green");
  //   $(pushColor4).addClass(arrayGuess[3]);
  // }
  // if(count>2){
    var buttonColor = $(event.target);
    arrayGuess[holder-1]=buttonColor.attr('name')
    console.log(arrayGuess);  
    var pushColor1 = document.getElementsByName("1");
    $(pushColor1[pushColor1.length-1]).removeClass("yellow white violet green");
    $(pushColor1[pushColor1.length-1]).addClass(arrayGuess[0]);
    var pushColor2 = document.getElementsByName("2")
    $(pushColor2[pushColor2.length-1]).removeClass("yellow white violet green");
    $(pushColor2[pushColor2.length-1]).addClass(arrayGuess[1]);
    var pushColor3 = document.getElementsByName("3")
    $(pushColor3[pushColor3.length-1]).removeClass("yellow white violet green");
    $(pushColor3[pushColor3.length-1]).addClass(arrayGuess[2]);
    var pushColor4 = document.getElementsByName("4")
    $(pushColor4[pushColor4.length-1]).removeClass("yellow white violet green");
    $(pushColor4[pushColor4.length-1]).addClass(arrayGuess[3]);
  // }

});


var count = 2






// check button
$(".btn-check").click(function () {
    // run function to test if arrays are equal
    testGuess();

    // block clics on previous divs after test
    $(".guess").addClass("blocked")
    $(".hole").removeClass("selected")
    
    
    // create new div for new guess
    var newGuess = $(
    '<div class="guess" name=guess'+count+'">'+ count +
    '  <div class="hole" name="1"></div>' +
    '  <div class="hole" name="2"></div>' +
    '  <div class="hole" name="3"></div>' + 
    '  <div class="hole" name="4"></div>' +
    '</div>');
  
    // insert new div 
    $(".btn-check").before(newGuess);
    count +=1 

    //reset arrayGuess
    arrayGuess = [0,0,0,0]

    //function click for new Guess
    newGuess.find(".hole").click(function(){
          holder = 0;
        var button = $(event.target);
        holder = (button.attr('name'));
        button.removeClass("yellow white violet green")
        button.addClass("selected");
        button.next().removeClass("selected");
        button.next().next().removeClass("selected");
        button.next().next().next().removeClass("selected");
        button.prev().removeClass("selected");
        button.prev().prev().removeClass("selected");
        button.prev().prev().prev().removeClass("selected"); 
  })

})


// get mastermind at loading of page
$(document).ready(function(){
    masterMind();
    });
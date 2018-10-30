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
var whiteGuess = 0
var blackGuess = 0

// test if arrayGuess is correct
function testGuess(){
  whiteGuess = 0
  blackGuess = 0

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
    button.siblings().removeClass("selected");
    if(arrayGuess[holder-1]!==0){
      console.log("hi")
    }
});


// push the color picked to the chosen hole
$(".color-section").click(function () {
    var buttonColor = $(event.target);
    console.log($(event.target));
    // arrayGuess[holder-1]=buttonColor.attr('name')
    console.log(arrayGuess); 

    var selectedHole = $(".selected")
    $(selectedHole).removeClass("yellow white violet green");
    $(".selected").addClass(arrayGuess[0]);

    console.log(arrayGuess[0])
    $(selectedHole).removeClass("yellow white violet green");
    $(selectedHole).addClass(arrayGuess[1]);

    $(selectedHole).removeClass("yellow white violet green");
    $(selectedHole).addClass(arrayGuess[2]);

    $(selectedHole).removeClass("yellow white violet green");
    $(selectedHole).addClass(arrayGuess[3]);  


});

var count = 1

// check button
$(".btn-check").click(function () {
    // run function to test if arrays are equal
    testGuess();
    var resBW = $(
      '<div>B= '+blackGuess+'<br> W= '+ whiteGuess+'</div>')
    var tempRes = document.getElementsByName("tempresult"+count)
    $(tempRes).html(resBW)
    // block clics on previous divs after test
    $(".guess").addClass("blocked")
    $(".hole").removeClass("selected")
   
    count +=1
    
    if(blackGuess<4){
    // create new div for new guess
    var newGuess = $(
      '<div class="guess" name=guess'+count+'">'+ count +
      '  <div class="hole" name="1"></div>' +
      '  <div class="hole" name="2"></div>' +
      '  <div class="hole" name="3"></div>' + 
      '  <div class="hole" name="4"></div>' +
      '  <div class="temp-result" name = "tempresult'+count+'"></div>' +
      '</div>');

      // insert new div 
      $(".btn-check").before(newGuess);
       

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
        }
    else {
      $(".result").css({"opacity":"1"});;
      $(".result").css({"display":"flex"});;
    }
    
})


// get mastermind at loading of page
$(document).ready(function(){
    masterMind();
    $(".result-1").addClass(arrayResult[0]);
    $(".result-2").addClass(arrayResult[1]);
    $(".result-3").addClass(arrayResult[2]);
    $(".result-4").addClass(arrayResult[3]);
    });

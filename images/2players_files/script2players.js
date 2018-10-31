// array de couleur 
var arrayDepart = ["white","blue","yellow","green", "red", "violet"]

// array resultat
var arrayResult = [0,0,0,0];


// Random pick 4 numbers in arrayDepart to log the code to break (without doublons)
function masterMind2Players(){
    
    
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
    $(".color-section").removeClass("blocked")
    var button = $(event.target);
    holder = (button.attr('name'));
    button.removeClass("yellow white blue green red violet")
    button.addClass("selected");
    button.siblings().removeClass("selected");
    if(arrayGuess[holder-1]!==0){
      console.log("hi")
    }
});

 
// CODE PART /// push the color picked to the chosen hole
$(".color-hide").click(function () {
 
  var buttonColor = $(event.target);
  arrayResult[holder-1]=buttonColor.attr('name')
  console.log(arrayResult); 

  var selectedHole = $(".selected")
  selectedHole.removeClass("yellow white blue green red violet");
  selectedHole.addClass(arrayResult[holder-1]);
  if(holder<4){
  holder++
  selectedHole.next().addClass("selected")
  selectedHole.removeClass("selected")
}
});

// push the color picked to the chosen hole
$(".color-section").click(function () {
 
    var buttonColor = $(event.target);
    arrayGuess[holder-1]=buttonColor.attr('name')
    console.log(arrayGuess); 
  
    var selectedHole = $(".selected")
    selectedHole.removeClass("yellow white blue green red violet");
    selectedHole.addClass(arrayGuess[holder-1]);
    if(holder<4){
    holder++
    selectedHole.next().addClass("selected")
    selectedHole.removeClass("selected")
  }    
});



$(".btn-hide").click(function () {
    $(".section-enter-code").css({"display":"none"})
    $(".section-guess-the-code").css({"display":"flex"})

})


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
    $(".color-section").addClass("blocked")
    $(".hole").removeClass("selected")

   
    count +=1
    
    if(blackGuess<4){
    // create new div for new guess
    var newGuess = $(
      '<div class="guess" name=guess'+count+'">'+
        '<div class="subdiv-number">'+count+'</div>' +
        ' <div class="subdiv-hole"> ' + 
          '  <div class="hole" name="1"></div>' +
          '  <div class="hole" name="2"></div>' +
          '  <div class="hole" name="3"></div>' + 
          '  <div class="hole" name="4"></div>' + 
      ' </div>' +
      '  <div class="subdiv-res temp-result" name = "tempresult'+count+'"></div>' +
      '</div>');

      // insert new div 
      $(".result").after(newGuess);
       

      //reset arrayGuess
      arrayGuess = [0,0,0,0]

      //function click for new Guess
      newGuess.find(".hole").click(function(){
            holder = 0;
            $(".color-section").removeClass("blocked")
          var button = $(event.target);
          holder = (button.attr('name'));
          button.removeClass("yellow white blue green red violet")
          button.addClass("selected");
          button.siblings().removeClass("selected"); 
    })
        }
    else {
      $(".result").css({"opacity":"1"});;
      $(".result").css({"display":"flex"});;
      $(".hole-result").css({"display":"flex"});;
      $("footer").css({"display":"flex"});;
      
    }
    
})


// get mastermind2Players at loading of page
$(document).ready(function(){
    masterMind2Players();
    $(".result-1").addClass(arrayResult[0]);
    $(".result-2").addClass(arrayResult[1]);
    $(".result-3").addClass(arrayResult[2]);
    $(".result-4").addClass(arrayResult[3]);
    $("section").css({"display":"flex"})
    $(".btn-play").css({"display":"none"})
    $(".btn-play2").css({"display":"none"})
    $(".section-guess-the-code").css({"display":"none"})
    });

// let's play !
  $(".btn-play").click(function(){
    $("section").css({"display":"flex"})
    $(".btn-play").css({"display":"none"})
    $(".btn-play2").css({"display":"none"})
  })

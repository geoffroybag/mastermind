// array de couleur 
var arrayDepart = ["white","blue","yellow","green", "red", "violet"]

// array resultat
var arrayResult = [];


// Random pick 4 numbers in arrayDepart to log the code to break (without doublons)
function masterMindHardcore(){
    while(arrayResult.length<4){
      var randomIndex = Math.floor(Math.random() * arrayDepart.length)
        arrayResult.push(arrayDepart[randomIndex])
    }
    return arrayResult
}

$(".btn-help").hover(function(){
  $(".help-section").css({"display":"flex"})
}, 
function(){$(".help-section").css({"display":"none"})}
)

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


var count = 1

// check button
$(".btn-check").click(function () {
    // run function to test if arrays are equal
    testGuess();
    var tempRes = document.getElementsByName("tempresult"+count)
    $(tempRes).addClass("bw")
    if (blackGuess==4 && whiteGuess==0){
      $(tempRes).addClass("b4w0")
    }
    if (blackGuess==3 && whiteGuess==1){
      $(tempRes).addClass("b3w1")
    }
    if (blackGuess==3 && whiteGuess==0){
      $(tempRes).addClass("b3w0")
    }
    if (blackGuess==2 && whiteGuess==2){
      $(tempRes).addClass("b2w2")
    }
    if (blackGuess==2 && whiteGuess==1){
      $(tempRes).addClass("b2w1")
    }
    if (blackGuess==2 && whiteGuess==0){
      $(tempRes).addClass("b2w0")
    }
    if (blackGuess==1 && whiteGuess==3){
      $(tempRes).addClass("b1w3")
    }
    if (blackGuess==1 && whiteGuess==2){
      $(tempRes).addClass("b1w2")
    }
    if (blackGuess==1 && whiteGuess==1){
      $(tempRes).addClass("b1w1")
    }
    if (blackGuess==1 && whiteGuess==0){
      $(tempRes).addClass("b1w0")
    }
    if (blackGuess==0 && whiteGuess==4){
      $(tempRes).addClass("b0w4")
    }
    if (blackGuess==0 && whiteGuess==3){
      $(tempRes).addClass("b0w3")
    }
    if (blackGuess==0 && whiteGuess==2){
      $(tempRes).addClass("b0w2")
    }
    if (blackGuess==0 && whiteGuess==1){
      $(tempRes).addClass("b0w1")
    }
    if (blackGuess==0 && whiteGuess==0){
      $(tempRes).addClass("b0w0")
    }

    // block clics on previous divs after test
    $(".guess").addClass("blocked")
    $(".color-section").addClass("blocked")
    $(".hole").removeClass("selected")
   
    count +=1

    if(count > 8 && blackGuess<4){
      console.log("game over")
      $(".result").css({"display":"flex"});
      $(".hole-result").css({"display":"flex"});
      $(".btn-check").css({"display":"none"});
      $(".color-section").css({"display":"none"});
      setTimeout(function(){
        $("section").css({"display":"none"})
      }, 2000);
      setTimeout(function(){
        $(".try-again").css({"display":"flex"})
      }, 2000);
      // setTimeout(function(){
      //   $(".background").addClass("transparent")
      // }, 2000);
    }
    
    if(blackGuess<4 && count < 9){
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
    if (blackGuess == 4) {
      $(".result").css({"display":"flex"});;
      $(".hole-result").css({"display":"flex"});
      setTimeout(function(){
        $(".well-done").css({"display":"flex"})
      }, 2000);
      setTimeout(function(){
        $(".background").addClass("transparent")
      }, 2000);
    }
    
})


// get mastermindHardcore at loading of page
$(document).ready(function(){
    masterMindHardcore();
    $(".color-section").addClass("blocked")
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
    $(".header-bottom").css({"display":"none"})
  })


  $('.count').each(function () {
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    }, {
        duration: 4000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});



$(document).ready( function(){


  $(".burger-menu").click(function() {
    $(".burger-menu").addClass("moveIn").removeClass("moveOut").css("display", "flex");
    $(this).addClass("moveOut").css("display", "none");
    var id = this.id;
    //nav show up
    if( id == "nav-menu") {
      $("#nav ul").addClass("fadeIn").removeClass("fadeOut").css("paddingTop", "5rem");
    } else {
      $("#nav ul").addClass("fadeOut").removeClass("fadeIn").css("paddingTop", "0");
    } 

  });


  //mobile nave scroll background style effect
  $(window).on("scroll", function() {
    var scrollNavBackground = $("nav div").offset().top;
    // console.log(scrollNavBackground);
    if (scrollNavBackground > 500 ) {
      $("#nav div").addClass("fadeWhite");
      $("#showcase").stop().animate({
        opacity: "0.2",
      }, 500);
    } else {
      $("#nav div").removeClass("fadeWhite");
      $("#showcase").stop().animate({
        opacity: "1",
      }, 500);
    } 

    if (scrollNavBackground > 1300) {
      $("#showcase").css("display", "none");
    } else {
      $("#showcase").css("display", "block");
    }

  });

  //explore button
  $("#showcase .explore").click(function() {
    var distanza  = $("#about").offset().top - 40;
    $("html, body").animate({scrollTop:distanza}, 1000);
  })

  //nav click scroll to content
  $("#nav a").on("click", function() {
    var distanza = $(this.hash).offset().top - 40;
    $("html, body").animate({scrollTop:distanza}, 600);
    $("#nav ul").addClass("fadeOut").removeClass("fadeIn").css("paddingTop", "0");
    $("#nav .burger-menu").last().removeClass("moveIn").addClass("moveOut").css("display", "none");
    $("#nav .burger-menu").first().removeClass("moveOut").addClass("moveIn").css("display", "flex");

    if ($(this).attr("href") == "#showcase") {
      // $("html, body").animate({scrollTop:0}, 1000);
      tornaHome();
    }
  });


  // torna home button
  $(".fa-caret-up").click(function() {
    tornaHome();

  });

  $(window).scroll(function() {
    var distanzaHtml = $("html").scrollTop();
    var distanza = $("#about").offset().top - 400;

    if (distanza <= distanzaHtml) {
      // var tornaHomeBtn = $(".fa-caret-up");
      $("body .fa-caret-up").css("display", "block");
    } else {
      $("body .fa-caret-up").css("display", "none");
    }
  });

  //#menu accordion
  $(".menu i").on("click", function() {
    console.log("working");
    if($(this).hasClass("arrow")) {
      $(this).removeClass("arrow");
      $(".menu p").text("View Menu");
      $(this).siblings(".menu ul").slideUp(400);
      $(".menu i").removeClass("up").addClass("down");
    } else {
      $(".menu > i").removeClass("up").addClass("down");
      $(this).removeClass("down").addClass("up");
      $(".menu p").text("View Menu");//change the text 
      $(this).siblings("p").text("Close Menu");
      $(".menu i").removeClass("arrow"); //change arrow
      $(this).addClass("arrow");
      $(".menu ul").slideUp(400);  //content slide
      $(this).siblings(".menu ul").slideDown(400);
    }
  });

  //Light box
  $("#gallery .gallery-images img").bind("click", function() {
    // $(this).css("opacity", "0.4").next().css("display", "block");
    $("#gallery .gallery-images img").css("opacity", "1").next().css("display", "none")
    $(this).css("opacity", "0.4").next().css("display", "block");
  });
  

  //funzionalita di form

  $("#iscrizione").on("submit", function(e) {
    e.preventDefault();
    var contaErrori = 0;
    var controlloFinale = true;

    $("span.errore").remove();
    $("#iscrizione input,#iscrizione select").removeClass("err");

    $("#iscrizione input,#iscrizione select").each(function() {

      var controllo = campoObligatorio($(this),$(this).attr("type"));

      if (controllo != undefined && controllo != false) {

        contaErrori++;

        if (contaErrori == 1) {
          $(this).after("<span class='errore'>" + $(this).attr("data-label") + " Obligatorio</span>")
          $(".errore").fadeIn(300);
          } else {
            $(this).addClass("err");    
          }
          controlloFinale = false;
        }
    });
  });

  //Calendar
  
  $("#calendario").datepicker({
    showAnim: "",
    numberOfMonth: 1,
    minDate: new Date(),
    dateFormat: "dd/mm",
  });

  //Testimonial Slider
  $("#testimonials .next").on("click", function(){
    var currentTest = $('.test-attivo');
    var nextTest = currentTest.next();

    if (nextTest.length){
      currentTest.removeClass("test-attivo").fadeOut();
      nextTest.addClass("test-attivo");
    }
  });

  $("#testimonials .prev").on("click", function(){
    var currentTest = $('.test-attivo');
    var prevTest = currentTest.prev();

    if (prevTest.length){
      currentTest.removeClass("test-attivo");
      prevTest.addClass("test-attivo").css("display", "block");
    }
  });



});//chiudo il ready.document



function tornaHome() {
  $("html, body").animate({scrollTop:0}, 1000);
};

function campoObligatorio(campo, tipo) {

  switch (tipo) {
    case "text":
      if (campo.val().length < 2 || $.isNumeric(campo.val())) {
        return true;
      } else {
        return false;
      }
      break;
    
    case "number":
      if (campo.val().length < 6) {
        return true;
      } else {
        return false;
      }
      break;
  
    case "select":
      if ($("option:selected", campo).val() == 0) {
        console.log("working")
        return true;
      } else {
        return false;
      }
      break;
    
    case "date":
      // if ( isNaN(campo.val()) == false ) {
      //   return true;
      // } else {
      //   return false;
      // }
    break;
  }
};
// function setHeaderScroll() {
//   var height = $(document).outerHeight() - $(window).outerHeight(),
//     perc = ($(window).scrollTop()/height*100);
//   $('#bar').css({"backgroundPosition": "left "+perc+"%"});
//   console.log(perc);
// }

$(document).ready(function(){
  $('.sliding-panel-button,.sliding-panel-fade-screen,.sliding-panel-close').on('click touchstart',function (event) {
    $('.sliding-panel-content,.sliding-panel-fade-screen').toggleClass('is-visible');
    event.preventDefault();
  });
});

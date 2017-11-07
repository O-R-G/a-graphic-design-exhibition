(function() {
  // Content toggle
  $('.asterisk').click(function() {
    $('.videos').toggleClass('hide-video');
    $('.about-the-show').toggle();
  });

  // Video fullscreen
  $('.video').click(function() {
    var e = $(this).find('iframe').get(0);
    if (e.requestFullscreen) {
        e.requestFullscreen();
    } else if (e.webkitRequestFullscreen) {
        e.webkitRequestFullscreen();
    } else if (e.mozRequestFullScreen) {
        e.mozRequestFullScreen();
    } else if (e.msRequestFullscreen) {
        e.msRequestFullscreen();
    }
  });
})();

// Setup jump to
// TODO FIX
function onYouTubeIframeAPIReady() {
    var player215 = new YT.Player('vis215', {
      events: {
        'onReady': onPlayerReady
      }
    });
    var player216 = new YT.Player('vis216', {
      events: {
        'onReady': onPlayerReady
      }
    });
    var player415 = new YT.Player('vis415', {
      events: {
        'onReady': onPlayerReady
      }
    });

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
      console.log("ready");
    }
}

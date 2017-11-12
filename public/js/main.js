(function() {
  var start = true;
  var ready = false;
  $('body').click(function() {
    console.log('click');
    if (start && ready) {
      start = false;
      setTimeout(function() { $('#read-more').toggleClass('hide-text'); }, 10000);
      $('.videos').toggleClass('hide-videos');
      $('.videos').toggleClass('show-videos');
      $('.videoWrapper').toggleClass('active');

      playVideo('vis215');
      playVideo('vis216');
      playVideo('vis415');
    }
  })
  // Content toggle
  $('#read-more').click(function() {
    $('.videos').hide();
    $('#full-text').show();
    $('#read-more').hide();
    $('#read-less').show();
  });

  $('#read-less').click(function() {
    $('.videos').show();
    $('#description').show();

    $('#hello').show();
    $('#read-more').show();
    $('#full-text').hide();

    $('#students').hide();
    $('#colophon').hide();
    $('#read-less').hide();
  });

  $('#students-show').click(function() {
    $('#description').hide();
    $('#students').show();
     $(window).scrollTop(0);
  });

  $('#colophon-show').click(function() {
    $('#description').hide();
    $('#colophon').show();
  });

  // Video fullscreen
  $('.videoWrapper').click(function() {
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

  // Setup jump to
  function playVideo(id) {
    var player = new YT.Player(id, {
      events: {
        'onReady': function(event) {
          setTime(event, id);
        },
        'onStateChange': function(state) {
          stateChange(state, id);
        }
      }});
  }

  function setTime(event, id) {
    $.get('/timestamp/' + id, function(data) {
      event.target.playVideo();
      event.target.seekTo(data.time);
    });
  }

  function stateChange(state, id) {
    if (state.data !== YT.PlayerState.PLAYING) {
      state.target.playVideo();
    }
  }

  window.onYouTubeIframeAPIReady = function() {
    ready = true;
  }
})();

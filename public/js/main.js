(function() {
  var start = true;
  var allReady = false;
  $('body').click(function() {
    console.log('click');
    if (start && allReady) {
      start = false;
      setTimeout(function() { $('#read-more').toggleClass('hide-text'); }, 10000);

      $('.videos').toggleClass('hide-videos');
      $('.videos').toggleClass('show-videos');
      $('.videoWrapper').toggleClass('active');

      if (player215) {
        player215.playVideo();
      }
      if (player216) {
        player216.playVideo();
      }
      if (player415) {
        player415.playVideo();
      }
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
  function setTime(event, id) {
    $.get('/timestamp/' + id, function(data) {
      event.target.playVideo(); // double play
      event.target.seekTo(data.time);
      console.log('ready');
      ready[id] = true;
      checkReady();
    });
  }

  function checkReady() {
    if (ready.vis215 && ready.vis216 && ready.vis415) {
      console.log('all ready');
      allReady = true;
      $('.dots').hide();
    }
  }

  function stateChange(state, id) {
    if (state.data == YT.PlayerState.PLAYING) {
      console.log('playing ' + id);
    }
  }
  var ready = {
    'vis215': false,
    'vis216': false,
    'vis415': false
  };
  var player215, player216, player415;
  window.onYouTubeIframeAPIReady = function() {
      player215 = new YT.Player('vis215', {
        events: {
          'onReady': function(event) {
            setTime(event, 'vis215');
          },
          'onStateChange': function(state) {
            stateChange(state, 'vis215');
          }
        }});
      player216 = new YT.Player('vis216', {
        events: {
          'onReady': function(event) {
            setTime(event, 'vis216');
          }
        }});
      player415 = new YT.Player('vis415', {
          events: {
            'onReady': function(event) {
              setTime(event, 'vis415');
            }
          }});
  }
})();

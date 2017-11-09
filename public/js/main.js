(function() {
  var start = true;
  $('body').click(function() {
    if (start) {
      start = false;
      $('#read-more').toggleClass('hide-more');
      $('#read-more').toggleClass('show-more');

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
    $('.videoWrapper').toggleClass('hide-video');
    $('#full-text').show();
    $('#read-more').hide();
    $('#read-less').show();
  });

  $('#read-less').click(function() {
    $('.videoWrapper').toggleClass('hide-video');
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
      event.target.seekTo(data.time);
    });
  }

  var player215, player216, player415;
  window.onYouTubeIframeAPIReady = function() {
      player215 = new YT.Player('vis215', {
        events: {
          'onReady': function(event) {
            setTime(event, 'vis215');
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

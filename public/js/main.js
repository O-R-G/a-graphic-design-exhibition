(function() {
  var start = true;
  $('body').click(function() {
    if (start) {
      start = false;
      $('.read-more').toggleClass('hide-text');
      $('.videos').toggleClass('hide-videos');
      $('.videos').toggleClass('show-videos');
      $('.videoWrapper').toggleClass('active');
    }
  })
  // Content toggle
  $('.read-more').click(function() {
    $('.videoWrapper').toggleClass('hide-video');
    $('.full-text').toggleClass('hide-text');
    $('.read-more').toggleClass('hide-text');
  });

  $('.read-less').click(function() {
    $('.videoWrapper').toggleClass('hide-video');
    $('.full-text').toggleClass('hide-text');
    $('.read-more').toggleClass('hide-text');
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
})();

// Setup jump to
function setTime(event, id) {
  $.get('/timestamp/' + id, function(data) {
    event.target.seekTo(data.time);
  });
}

function onYouTubeIframeAPIReady() {
    var player215 = new YT.Player('vis215', {
      events: {
        'onReady': function(event) {
          setTime(event, 'vis215');
        }
      }});
    var player216 = new YT.Player('vis216', {
      events: {
        'onReady': function(event) {
          setTime(event, 'vis216');
        }
      }});
      var player415 = new YT.Player('vis415', {
        events: {
          'onReady': function(event) {
            setTime(event, 'vis415');
          }
        }});
}

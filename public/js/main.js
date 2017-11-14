$(function() {
  // console.log('ready');
  var start = true;
  var ready = false;

  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  $('body').click(go);
  $('.about-the-show').click(go);

  function go() {
    if (start && ready) {
      start = false;
      setTimeout(function() {
        $('#read-more').toggleClass('hide-text');
        $('.videoWrapper').toggleClass('active');
        }, 10000);
      $('.title').show();
      $('iframe').toggleClass('hide-videos');
      $('iframe').toggleClass('show-videos');

      playVideo('vis215');
      playVideo('vis216');
      playVideo('vis415');
    }
  }
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
});

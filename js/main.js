$(function() {
  var start = true;
  var ready = false;

  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.onYouTubeIframeAPIReady = function() {
    ready = true;
  }

  $('body').click(go);
  $('.about-the-show').click(go);

  var loc = window.location;
  console.log(loc.hash);

  switch (loc.hash) {
    case '#about':
      readMore();
      break;
    case '#students':
      readMore();
      showStudents();
      break;
    case '#colophon':
      readMore();
      showColophon();
      break;
  }

  function setHash(hash) {
    if(history.pushState) {
      history.pushState(null, null, hash);
    }
    else {
      location.hash = hash;
    }
  }

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

  function readMore() {
    $('.videos').hide();
    $('#full-text').show();
    $('#read-more').hide();
    $('#read-less').show();

    setHash('#about');
  }

  function readLess() {
    $('.videos').show();
    $('#description').show();

    $('#hello').show();
    $('#read-more').show();
    $('#full-text').hide();

    $('#students').hide();
    $('#colophon').hide();
    $('#read-less').hide();

    setHash('/');
  }

  function showStudents() {
    $('#description').hide();
    $('#students').show();
     $(window).scrollTop(0);

     setHash('#students');
  }

  function showColophon() {
    $('#description').hide();
    $('#colophon').show();

    setHash('#colophon');
  }

  // Content toggle
  $('#read-more').click(readMore);

  $('#read-less').click(readLess);

  $('#students-show').click(showStudents);

  $('#colophon-show').click(showColophon);

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
    $.get('/timestamp.php?courseID=' + id, function(data) {
      var parsed = JSON.parse(data)
      event.target.playVideo();
      event.target.seekTo(parsed.time);
    });
  }

  function stateChange(state, id) {
    if (state.data !== YT.PlayerState.PLAYING) {
      state.target.playVideo();
    }
  }
});

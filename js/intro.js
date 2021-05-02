function init () {
  document.getElementById("text-init").innerHTML = "<h4>A <a href='https://en.wikipedia.org/wiki/Mathematician'>Mathematician</a> and Engineer; But <br />I'm also a <a href='https://en.wikipedia.org/wiki/Programmer'>Programmer</a>.</h4>";
  document.getElementById("mybtn").innerHTML = "<button onclick='stop()'><h4>Hi! I'm Alan Matzumiya</h4></button>";
  }
function stop () {
  document.getElementById("text-init").innerHTML = "";
  document.getElementById("mybtn").innerHTML = "<button onclick='init()'><h4>Click Me!</h4></button>";
  }

$( function () {
    var index = 0;
    let videoLocation = circuitApi.url_content + "circuitalminds.github.io/main/musicApp/music_data_list.json";
    let videoRequest = new XMLHttpRequest();
    videoRequest.open('GET', videoLocation);
    videoRequest.responseType = 'json';
    videoRequest.send();
    videoRequest.onload = function() {
        const videoData = videoRequest.response;
        circuitApi.music_app.song_list = videoData['music_data_list'];
        index = Math.round(Math.random() * (videoData['music_data_list'].length - 1));
        setPlayer(index);
    };
});
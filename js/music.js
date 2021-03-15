function nextSong( playList ) {
      song = playList[Math.floor(Math.random() * 100)];
      document.getElementById("play-song").innerHTML = song.name;
      document.getElementById("play-media").src = song.url;
      document.getElementById("play-media").play();
}

function shareVideo() {
      var el = document.createElement('textarea');
      shareURL = "https://circuitalminds.github.io/music?share_song=" + encodeURI(document.getElementById("play-song").textContent);
      el.value = shareURL;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      alert("Link Copied: " + el.value);
      document.body.removeChild(el);
}

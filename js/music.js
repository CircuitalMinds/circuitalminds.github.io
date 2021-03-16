var playList;
var musicApp = document.getElementById('music-app');
var searchList = document.getElementById("search-list");
var songRequest = document.URL.replace("github.io", "herokuapp.com/get_template");
var search;

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

var getData = $.get(songRequest);
getData.done( function( data ) {
      playList = data['playlist'];
      musicApp.innerHTML = data['music_app'];      
});
    
function youtubeSearch() {
    search = document.getElementById('yt-search').value;
    searchList.innerHTML = '<li><div data-role="progress" data-type="line"></div></li>';
    var searchData = $.get("https://circuitalminds.herokuapp.com/youtube/search/" + search);
    searchData.done( function( data ) {
       var dataList = data['search_data'];
       var lenData = dataList.length;
       searchList.innerHTML = "";

       for (var j = 0; j < lenData; j++) {
           row = document.createElement("li");
           row.setAttribute("class", "cell");

           title = document.createElement("p");
           title.setAttribute("class", "card-header w-100");
           title.textContent= dataList[j]['video_title'];
           row.appendChild(title);

           thumb = document.createElement("img");
           thumb.setAttribute("class", "card-content w-100");
           thumb.setAttribute("src", dataList[j]["thumbnail"]);
           row.appendChild(thumb);

           btn = document.createElement("button");
           btn.textContent = "Download Video";
           btn.setAttribute("class", "card-content w-100 button primary text-center fg-teal fg-light-hover bg-light bg-teal-hover");
           btn.setAttribute("onClick", "youtubeDownloader('" + dataList[j]['video_url'] + "')");
           row.appendChild(btn);

           searchList.appendChild(row);
       }

    });
};

function youtubeDownloader(url) {
    var urlData = $.get("https://circuitalminds.herokuapp.com/check_data/select", {"url": url});
};

function shareVideo() {
      var el = document.createElement('textarea');
      shareURL = "https://circuitalminds.github.io/music?share_song=" + encodeURI(document.getElementById("play-song").textContent);
      el.value = shareURL;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      alert("Link Copied: " + el.value);
      document.body.removeChild(el);
};

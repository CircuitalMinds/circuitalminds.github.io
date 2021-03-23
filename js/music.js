var currentSong = document.getElementById('play-song');
var playMedia = document.getElementById('play-media');
var searchList = document.getElementById("search-list");
var musicApp = document.getElementById('music-app');
var playList;
var listNames;
    
var getData = $.get(urlRequests + "api/get_music_app");
getData.done( function( data ) {
      playList = data['playlist'];
      listNames = data['list_names'];
      musicApp.innerHTML = data['music_app'];
});        

function endSong() {
    nameSong = listNames[listNames.indexOf(currentSong.textContent) + 1];
    playMedia.setAttribute("src", playList[nameSong]);
    currentSong.innerHTML = nameSong;
    playMedia.play();
};

function youtubeSearch(search) {
    searchList.innerHTML = '<li><div data-role="progress" data-type="line"></div></li>';
    var searchData = $.get(urlRequests + "api/get_youtube_search_list", {"title": encodeURI( document.getElementById("yt-search").value) });
    searchData.done( function( data ) {
       var dataList = data['search_list'];
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
           thumb.setAttribute("src", dataList[j]["video_image"]);
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
    var urlData = $.get(urlRequests + "check_data/select", {"url": url});
};

function shareVideo() {
    var el = document.createElement('textarea');
    song = encodeURI(listNames[listNames.indexOf(currentSong.textContent)]);
    shareURL = "https://circuitalminds.github.io/music?play_song=" + song;
    el.value = shareURL;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    alert("Link Copied: " + el.value);
    document.body.removeChild(el);
};

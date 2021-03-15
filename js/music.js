var currentSong = document.getElementById('play-song');
var playMedia = document.getElementById('play-media');
var searchList = document.getElementById("search-list");

function endSong() {
    indexSong = parseInt(indexSong) + 1;
    getSong( indexSong );
};

function songFromList(id) {
    indexSong = parseInt(id);
    getSong( indexSong );
};

function getSong(song_id) {
    var getData = $.get("/music/play", {"song_id": song_id});
    getData.done( function( data ) {
       playMedia.setAttribute("src", data['url']);
       currentSong.innerHTML = data['name'];
       playMedia.play();
    });
};

function youtubeSearch(search) {
    waitLabel = document.createElement("li");
    waitLabel.innerHTML = '<div data-role="progress" data-type="line"></div>';
    searchList.appendChild(waitLabel);
    var searchData = $.get("/youtube/search/" + search);
    searchData.done( function( data ) {
       var dataList = data['search_data'];
       var lenData = dataList.length;
       searchList.innerHTML = "";

       for (var j = 0; j < lenData; j++) {
           row = document.createElement("li");
           rowContent = document.createElement("ul");
           rowContent.setAttribute("class", "group-list horizontal text-center");

           element1 = document.createElement("li");
           element1.textContent= dataList[j]['video_title'];
           rowContent.appendChild(element1);

           element2 = document.createElement("li");
           url = document.createElement("a");
           url.setAttribute("class", "text-center fg-teal")
           url.setAttribute("href", dataList[j]["video_url"]);
           url.textContent = dataList[j]["video_url"];
           element2.appendChild(url);
           rowContent.appendChild(element2);

           element3 = document.createElement("li");
           element3.textContent = "Get Song";
           element3.setAttribute("class", "button primary text-center fg-teal fg-light-hover bg-light bg-teal-hover");
           element3.setAttribute("onClick", "youtubeDownloader('" + dataList[j]['video_url'] + "')");
           rowContent.appendChild(element3);

           row.appendChild(rowContent);
           searchList.appendChild(row);
       }

    });
};

function youtubeDownloader(url) {
    var urlData = $.get("/check_data/select", {"url": url});
};

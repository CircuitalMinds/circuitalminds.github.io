let VahnGraff = $("#vahngraff")[0];
VahnGraff.Videos = {};
VahnGraff.Metadata = {};

VahnGraff.urlData = function ( x ) {
    return [
        "{{ site.static_url }}/data/videos", x
    ].join("/");
};
VahnGraff.getVideo = function ( n ) {
    V = this.Videos[n];
    vData = {"index": n, "id": V.id.replace(V.id.split("-")[0] + "-", "")};
    vData.url = [
        "https://raw.githubusercontent.com/circuitalmynds",
        "music_" + V.id.replace("-" + vData.id, ""), "main/videos", V.name
    ].join("/");
    metadata = this.Metadata[vData.id];
    Object.keys(metadata).map(
        k => vData[k.replace("og:", "").replace("twitter:", "")] = metadata[k]
    );
    return vData;
};
VahnGraff.setData = function ( data, x ) {
    Ks = Object.keys(data);
    for ( k of Ks ) {
        x[k] = data[k];
    };
    return;
};
VahnGraff.Player = VahnGraff.querySelector("video");
VahnGraff.playerData = VahnGraff.Player.dataset;
VahnGraff.setPlayer = function ( opt ) {
    function start() {
        vData = VahnGraff.getVideo(VahnGraff.playerData.videoSelected);
        VahnGraff.Player.setAttribute("src", vData.url);
        VahnGraff.querySelector("#video-title").innerHTML = vData.title;
        setTimeout(function() {
            VahnGraff.Player.play();
            $("#results")[0].style.display = "none";
        }, 500);
    };
    if ( typeof(opt) == "number" ) {
        VahnGraff.playerData.videoSelected = opt;
        return start();
    } else if ( opt == "pause" ) {
        return VahnGraff.Player.pause();
    } else {
        if ( opt == "play" ) {
            VahnGraff.Player.play();
        } else {
            VahnGraff.playerData.videoSelected = parseInt(
                VahnGraff.playerData.videoSelected
            ) + {"previous": -1, "next": 1}[opt];
            return start();
        };
    };
};
VahnGraff.playerData.onEnd = function () { Vahngraff.setPlayer("next") };
VahnGraff.playerData.onPlay = function () { Vahngraff.setPlayer("play") };
VahnGraff.playerData.onPause = function () { Vahngraff.setPlayer("pause") };
VahnGraff.playerData.onChange = function () { Vahngraff.setPlayer("play") };
["pause", "play", "previous", "next"].map(
    ID => VahnGraff.querySelector("#" + ID).onclick = function () {VahnGraff.setPlayer(ID)}
);
VahnGraff.getRandom = function () {
    return VahnGraff.getVideo(randomInt(
        0, Object.keys(VahnGraff.Videos).length
    ));
};
(function() {
    Vol = {};
    Vol.Setter = Vector.Grid(0, 1, 10);
    Vol.Data = Vol.Setter[0];
    Vol.setDown = function() {
      volIndex = Vol.Setter.indexOf(Vol.Data);
      if ( volIndex > 0 ) {
            Vol.Data = Vol.Setter[volIndex - 1];
      } else {
            Vol.Data = Vol.Setter[0];
      };
      VahnGraff.Player.volume = Vol.Data;
    };
    Vol.setUp = function() {
      volIndex = Vol.Setter.indexOf(Vol.Data);
      if ( volIndex < Vol.Setter.length - 1 ) {
            Vol.Data = Vol.Setter[volIndex + 1];
      } else {
            Vol.Data = Vol.Setter[Vol.Setter.length - 1];
      };
      VahnGraff.Player.volume = Vol.Data;
    };
    VahnGraff.querySelector("#volume-minus").onclick = Vol.setDown;
    VahnGraff.querySelector("#volume-plus").onclick = Vol.setUp;
})();

VahnGraff.playerData.Poster = "/{{ site.img }}/apps/poster.gif";
VahnGraff.playerData.randomMode = VahnGraff.querySelector("#random").checked;
VahnGraff.querySelector("#random").onchange = function () {
	VahnGraff.playerData.randomMode = VahnGraff.querySelector("#random").checked;
};
VahnGraff.Feeds = {
    "id": "feeds",
    "delay": 10e3,
    "getFeed": function () {
        v = VahnGraff.getRandom();
        return `<li class="button card-content bg-darkTeal bg-dark-hover fg-light"
                onclick="VahnGraff.setPlayer( ${v.index} );">
                <img class="avatar" src="${v.image}">
                <span class="label">${v.title}</span>
                <span class="second-label">${v.duration}</span>
        </li>`;
    },
    "setFeed": function ( Id, getFeed ) {
        $("#" + Id)[0].innerHTML = Range(0, 4).map(
            i => getFeed()
        ).join("\n");
    },
    "display": function () {
        setInterval(
            this.setFeed,
            this.delay,
            this.id,
            this.getFeed
        );
    }
};

$( function () {
    requestObj.get(
        VahnGraff.urlData("all.json"),
        function ( data ) {
            VahnGraff.setData(data, VahnGraff.Videos);
        }
    );
    requestObj.get(
        VahnGraff.urlData("metadata.json"),
        function ( data ) {
            VahnGraff.setData(data, VahnGraff.Metadata);
        }
    );
    VahnGraff.Player.poster = VahnGraff.playerData.Poster;
    jklSearch.Render();
    VahnGraff.Feeds.display();
});
function toggleFullScreen(obj) {
    if (!document.fullscreenElement) {
        obj.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        };
    };
};
document.addEventListener("keypress", function(e) {
    if (e.key === 'Enter') {
      toggleFullScreen(VahnGraff.Player);
    }
}, false);
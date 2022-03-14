let VahnGraff = $("#vahngraff")[0];
VahnGraff.Videos = {
    data: {}, metadata: {},
    get: function ( i ) {
        var v = this.data[i];
        var id = v.id.replace(v.id.split("-")[0] + "-", "");
        var meta = this.metadata[id];
        var url = [
            "https://raw.githubusercontent.com/circuitalmynds",
            "music_" + v.id.replace("-" + id, ""), "main/videos", v.name
        ].join("/");
        var y = {
            index: i,
            id: id,
            url: url
        };
        Object.keys(meta).map(
            key => y[key.replace("og:", "").replace("twitter:", "")] = meta[key]
        );
        return y;
    },
    set: function () {
        Http.Get(
            Static.Data.videos.all,
            function ( x ) { MapKeys( x, function ( k ) { VahnGraff.Videos.data[k] = x[k] } ) }
        );
        Http.Get(
            Static.Data.videos.metadata,
            function ( x ) { MapKeys( x, function ( k ) { VahnGraff.Videos.metadata[k] = x[k] } ) }
        );
    },
    getRandom: function () {
        return this.get( Sample.Int( 0, Object.keys(this.data).length ) );
    }
};

VahnGraff.Player = {
    get: function () { return VahnGraff.querySelector( "video" ) },
    setPoster: function () {
        this.get().poster = "/{{ site.img }}/apps/poster.gif";
    },
    setVolume: function () {
        var Vol = {
            setter: Vector().Grid(0, 1, 10),
            data: 0.9,
            index: function () {
                return this.setter.indexOf(this.data);
            },
            set: function ( value ) {
                var volume = this.get();
                volume = value;
                this.data = value;
            }
        };
        function setDown () {
            var index = Vol.index();
            if ( index > 0 ) {
                Vol.set( Vol.setter[index - 1] );
            } else {
                Vol.set( Vol.setter[0] );
            };
        };
        function setUp () {
            var index = Vol.index();
            if ( index < Vol.setter.length - 1 ) {
                Vol.set( Vol.setter[index + 1] );
            } else {
                Vol.set( Vol.setter[Vol.setter.length - 1] );
            };
        };
        $("#volume-minus")[0].onclick = Vol.setDown;
        $("#volume-plus")[0].onclick = Vol.setUp;
    },
    randomMode: function () { return VahnGraff.querySelector("#random").checked },
    start: function () {
        var player = this.get();
        var v = VahnGraff.Videos.get(player.dataset.videoSelected);
        player.setAttribute("src", v.url);
        VahnGraff.querySelector("#video-title").innerHTML = v.title;
        setTimeout(function() {
            player.play();
            $("#results")[0].style.display = "none";
        }, 500);
    },
    setVideo: function ( x ) {
        var player = this.get();
        if ( typeof(x) == "number" ) {
            player.dataset.videoSelected = x;
            this.start();
        } else if ( x.startsWith("https") ) {
            var videos = VahnGraff.Videos.data;
            x = x.replace("https://i.ytimg.com/vi/", "").split("/")[0];
            var y = Object.keys(videos).filter(
                i => videos[i].id.split("-")[1] == x
            )[0];
            player.dataset.videoSelected = y;
            this.start();
        } else if ( x == "pause" ) {
            player.pause();
        } else {
            if ( x == "play" ) {
            player.play();
            } else {
                player.dataset.videoSelected = parseInt(
                    player.dataset.videoSelected
                ) + {"previous": -1, "next": 1}[x];
                this.start();
            };
        };
    },
    setFullScreen: function () {
        var x = this.get();
        document.addEventListener( "keypress", function( e ) {
            if ( e.key === "Enter" ) {
                if ( !document.fullscreenElement ) {
                    x.requestFullscreen();
                } else {
                    if ( document.exitFullscreen ) {
                        document.exitFullscreen();
                    };
                };
            };
        }, false );
    },
    set: function () {
        var player = this.get();
        player.dataset.onEnd = function () {VahnGraff.Player.setVideo("next")};
        player.dataset.onPlay = function () {Vahngraff.Player.setVideo("play")};
        player.dataset.onPause = function () {Vahngraff.Player.setVideo("pause")};
        player.dataset.onChange = function () {Vahngraff.Player.setVideo("play")};
        ["pause", "play", "previous", "next"].map(
            ID => VahnGraff.querySelector("#" + ID).onclick = function () {VahnGraff.Player.setVideo(ID)}
        );
        this.setVolume();
        this.setFullScreen();
        this.setPoster();
    }
};
VahnGraff.Feeds = {
    id: "feeds",
    delay: 10e3,
    getFeed: function () {
        var v = VahnGraff.Videos.getRandom();
        return `<li class="button card-content bg-darkTeal bg-dark-hover fg-light"
                onclick="VahnGraff.Player.setVideo( ${v.index} );">
                <img class="avatar" src="${v.image}">
                <span class="label">${v.title}</span>
                <span class="second-label">${v.duration}</span>
        </li>`;
    },
    setFeed: function ( Id, getFeed ) {
        $("#" + Id)[0].innerHTML = Range(0, 4).map(
            i => getFeed()
        ).join("\n");
    },
    set: function () {
        setInterval(
            this.setFeed,
            this.delay,
            this.id,
            this.getFeed
        );
    }
};
VahnGraff.init = function () {
    this.Videos.set();
    this.Player.set();
    this.Feeds.set();
};
$( function () { VahnGraff.init() });

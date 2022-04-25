$( function () {
    function setPlayer () {
        var x = $( "video" )[0];
        x.poster = fromStatic( '{{ app.player.poster }}' ).url;
        x.volume = 0.9;
        x.videos = {}; x.metadata = {};
        var r = fromStatic( "data/videos" );
        r.get( "all.json", function ( data ) {
            var keys = getKeys( data );
            x.totalVideos = keys.length;
            for ( i of keys ) { x.videos[i] = data[i] };
        });
        r.get( "metadata.json", function ( data ) {
            for ( i of getKeys(data) ) { x.metadata[i] = data[i] };
        });
        function videoUrl ( v, id ) {
            return [
                '{{ app.videos_root }}', v.id.replace("-" + id, ""), "main/videos", v.name
            ].join("/");
        };
        function videoId ( v ) {
            return v.id.replace(v.id.split("-")[0] + "-", "");
        };
        x.getVideo = function ( i ) {
            var y = {index: i};
            var video = this.videos[i];
            y.id = videoId( video );
            y.url = videoUrl( video, y.id );
            var meta = this.metadata[y.id];
            for ( key of getKeys(meta) ) {
                y[ Replace(key, ["og:", "twitter:"]) ] = meta[key];
            };
            return y;
        };
        x.getRandom = function () {
            return this.getVideo( RandInt(0, this.totalVideos) );
        };
        var fx = x.dataset;
        fx.onPlay = function () {
            var v = x.getVideo( this.videoSelected );
            x.setAttribute( "src", v.url );
            $("#video-title")[0].innerHTML = v.title;
            setTimeout(function() {
                x.play();
                $("#results")[0].style.display = "none";
            }, 500);
        };
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
    };

    $( "#play" )[0].onclick = function () {
        $( "video" )[0].play();
    };
    $( "#pause" )[0].onclick = function () {
        $( "video" )[0].pause();
    };
    $( "#previous" )[0].onclick = function () {
        $( "video" )[0].previous();
    };
    $( "#next" )[0].onclick = function () {
        $( "video" )[0].next();
    };
    $("#volume-plus")[0].onclick = function () {
        var x = $( "video" )[0];
        if ( x.volume < 0.9 ) {
            x.volume += 0.1;
        } else {
            x.volume = 1;
        };
    };
    $("#volume-minus")[0].onclick = function () {
        var x = $( "video" )[0];
        if ( x.volume > 0.1 ) {
            x.volume -= 0.1;
        } else {
            x.volume = 0;
        };
    };
    $("#random")[0].onclick = function () {
        $( "video" )[0].dataset.randomMode = this.checked;
    };

    function setFeeds () {
        var feeds = $( "#feeds" )[0];
        var videoList = range(0, 4);
        function getFeeds () {
            for ( var i = 0; i < videoList.length; i++ ) {
                var v = $( "video" )[0].getRandom();
                videoList[i] = `<li class="button card-content bg-darkTeal bg-dark-hover fg-light"
                        onclick="$( "video" )[0].getVideo( ${v.index} );">
                        <img class="avatar" src="${v.image}">
                        <span class="label">${v.title}</span>
                        <span class="second-label">${v.duration}</span>
                </li>`;
            };
            feeds.innerHTML = videoList.join( "\n" );
        };
        setTimeout( function () {
            setInterval( getFeeds, 8e3 );
        }, 1e3 );
    };
    setPlayer();
    setFeeds();
});
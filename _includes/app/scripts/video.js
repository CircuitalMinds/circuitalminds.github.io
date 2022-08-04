$( function () {
    var videoApp = $( "video" )[0];

    getitems({
        poster: '/{{ site.img }}/app/{{ app.player.poster }}',
        volume: 0.9,
        videolist: []
    }).map( e => videoApp[e[0]] = e[1] );

    videoApp.dataset.videoSelected = 0;

    videoApp.start = function () {
        var video = this.videolist[ this.dataset.videoSelected ];
        this.src = video.url;
        $("#video-title")[0].innerHTML = video.title;
        setTimeout(function() {
            videoApp.play();
            $("#results")[0].style.display = "none";
        }, 500);
    };

    document.addEventListener( "keypress", function( e ) {
        if ( e.key === "Enter" ) {
            if ( !document.fullscreenElement ) {
                videoApp.requestFullscreen();
            } else {
                if ( document.exitFullscreen ) {
                    document.exitFullscreen();
                };
            };
        };
    }, false );

    videoApp.playVideo = function ( i, shuffled ) {
        this.dataset.randomMode = shuffled;
        if ( shuffled ) {
            i = random( 0, this.videolist.length );
        };
        this.dataset.videoSelected = i;
        this.start();
    };

    $( "#play" )[0].onclick = function () {        
        videoApp.play();
    };
    $( "#pause" )[0].onclick = function () {
        videoApp.pause();
    };
    $( "#previous" )[0].onclick = function () {  
        videoApp.playVideo( 
            Number(videoApp.dataset.videoSelected) - 1, $( "#random" )[0].checked
        );
    };
    $( "#next" )[0].onclick = function () {
        videoApp.playVideo( 
            Number(videoApp.dataset.videoSelected) + 1, $( "#random" )[0].checked
        );
    };

    videoApp.onended = function() {
        $( "#next" )[0].click();
    }

    $("#volume-plus")[0].onclick = function () {
        if ( videoApp.volume < 0.9 ) {
            videoApp.volume += 0.1;
        } else {
            videoApp.volume = 1;
        };
    };
    $("#volume-minus")[0].onclick = function () {
        if ( videoApp.volume > 0.1 ) {
            videoApp.volume -= 0.1;
        } else {
            videoApp.volume = 0;
        };
    };

    function setFeeds () {
        var feeds = $( "#feeds" )[0];
        var videolist = range(0, 4);
        function getFeeds () {
            for ( var i = 0; i < videolist.length; i++ ) {
                var video = videoApp.videolist[ random(0, videoApp.videolist.length) ];
                videolist[i] = `<li class="button card-content bg-darkTeal bg-dark-hover fg-light"
                        onclick="$( 'video' )[0].playVideo( '${video.index}', false );">
                        <img class="avatar" src="${video.image}">
                        <span class="label">${video.title}</span>
                        <span class="second-label">${video.duration}</span>
                </li>`;
            };
            feeds.innerHTML = videolist.join( "\n" );
        };
        setInterval( getFeeds, 10e3 );
    };

    function searchModal () {
		var m = getElement( "class", "search-modal" );
		getElement( "id", "jkl-results" ).addEventListener(
			"click", function ( r ) {
		        videoApp.playVideo( r.target.id.split( "-" )[0], false );
			}
		);
		getElement( "id", "query" ).onclick = function() {
			m.style.display = "block";
			var h = bodySize( 0.10 ).h;
			m.queryNodes( ".search-modal-body").map( 
                qi => qi.style.height = h 
            );
		};
		m.query( "span.search-close" ).map( 
            ci => ci.onclick = function () { m.style.display = "none" }			
		);
		window.onclick = function( event ) {
			if ( event.target == m ) {
				m.style.display = "none";
			};
		};
	};

	fromStatic( "data/videos" ).getjson(
        "dataset.json", function ( data ) {
            for ( n of Object.keys( data ) ) {
                var v = data[n];
                v.index = n;
                videoApp.videolist.push(v);
            };
            setFeeds();
            searchModal();
            getVideoSearch( videoApp.videolist );
        }
    );
});

$( function () {
    var videoApp = $( "video" )[0];

    getitems({
        poster: fromStatic( '{{ app.player.poster }}' ).url,
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
		var M = El.queryCls( "search-modal" );
		El.queryID( "jkl-results" ).addEventListener(
			"click", function ( e ) {
		        videoApp.playVideo( e.target.id.split( "-" )[0], false );
			}
		);
		El.queryID( "query" ).onclick = function() {
			M.style.display = "block";
			var h = bodySize( 0.10 ).h;
			M.iterNodes( ".search-modal-body", function( e ) { e.style.height = h } );
		};
		M.iterAll(
			"span.search-close", function( e ) {
				e.onclick = function() { M.style.display = "none" };
			}
		);
		window.onclick = function( event ) {
			if ( event.target == M ) {
				M.style.display = "none";
			};
		};
	};

	fromStatic( "data/videos" ).get(
        "dataset.json", function ( data ) {
            for ( n of Object.keys( data ) ) {
                var v = data[n];
                v.index = n;
                videoApp.videolist.push(v);
            };
            setFeeds();
            searchModal();
            SimpleJekyllSearch({
                searchInput: $( "#query" )[0],
                resultsContainer: $( "#jkl-results" )[0],
                json: videoApp.videolist,
                searchResultTemplate: `<li id='{index}' class='button card-content bg-darkTeal bg-dark-hover fg-light'>
                    <img id='{index}-image' class='avatar' src='{image}'>
                    <span id='{index}-title' class='label'>{title}</span>
                    <span id='{index}-duration' class='second-label'>{duration}</span>
                </li>`,
                noResultsText: "<li class='button card-content bg-darkTeal bg-dark-hover fg-light'>Video Not Found</li>"
            });
        }
    );
});

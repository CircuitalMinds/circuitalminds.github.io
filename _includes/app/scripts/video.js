/*
==================================================
    Module: Video-Loader
==================================================
*/

class VPlayer {
    constructor() {

        this.video = $("#media-player")[0];
        this.video.list = [];

        this.search = {
            modal: $(".search-modal")[0],
            init: function () {

                var video = $("#media-player")[0];
                Http( appData.urldata ).getjson(
                    "videos/dataset.json",
                    function (req) {
                        req.forEach( function (vdata) {
                            if (vdata.title) {
                                vdata.index = video.list.length;
                                video.list.push(vdata);
                            };
                        } );
                        SimpleJekyllSearch( {
                            searchInput: $("#query")[0],
                            resultsContainer: $("#jkl-results")[0],
                            json: req,
                            searchResultTemplate: appData.search_template.result,
                            noResultsText: appData.search_template.not_found                    
                        } );
                    }
                );

            }
        };

    }
};

var player = new VPlayer();

$( function() {

    player.video.poster = appData.videoposter;
    player.video.volume = 0.9;
    player.video.dataset.videoSelected = 0;

    player.currentVideo = function () {

        var videoplayer = player.video;
        return videoplayer.list[ 
            videoplayer.dataset.videoSelected 
        ];
    
    };   
    
    player.randomIndex = function () {
        
        return random(
            0, player.video.list.length
        );
    
    };
    
    player.shuffled = function () {

        return $("#random")[0].checked;

    }

    player.start = function () {
        var video = player.currentVideo();
        player.video.src = encodeURI( video.url );
        $("#video-title")[0].innerHTML = video.title;
        setTimeout(function () {
            player.video.play();
            $("#results")[0].style.display = "none";
        }, 1e3 );
    };
  
    player.playVideo = function ( i ) {        
        player.video.dataset.videoSelected = i;
        player.start();
    };

    $("#play")[0].onclick = function () {
        
        var n = Number( 
            player.video.dataset.videoSelected 
        );
        if ( n.toString() == "NaN" ) {
            player.playVideo( player.randomIndex() );
        } else {
            player.video.play();
        };
        
    };

    $("#pause")[0].onclick = function () {
        player.video.pause();
    };

    $("#previous")[0].onclick = function () {
        
        var n = Number( 
            player.video.dataset.videoSelected 
        );
        if ( n.toString() == "NaN" || player.shuffled() ) {
            player.playVideo( player.randomIndex() );
        } else {
            player.playVideo( n - 1 );
        };
        
    };
    
    $("#next")[0].onclick = function () {
        
        var n = Number( 
            player.video.dataset.videoSelected 
        );
        if ( n.toString() == "NaN" || player.shuffled() ) {
            player.playVideo( player.randomIndex() );
        } else {
            player.playVideo( n + 1 );
        };
        
    };

    player.video.onended = function () {
        $("#next")[0].click();
    };

    $("#volume-plus")[0].onclick = function () {
        if (player.video.volume < 0.9) {
            player.video.volume += 0.1;
        } else {
            player.video.volume = 1;
        };
    };
    $("#volume-minus")[0].onclick = function () {
        if (player.video.volume > 0.1) {
            player.video.volume -= 0.1;
        } else {
            player.video.volume = 0;
        };
    };

    document.addEventListener( "keypress", function ( e ) {
        if ( e.key === "Enter" ) {
            if ( !document.fullscreenElement ) {
                player.video.requestFullscreen();
            } else {
                if ( document.exitFullscreen ) {
                    document.exitFullscreen();
            };
            };
        };
    }, false );

    $( "#jkl-results" )[0].addEventListener(        
        "click", function ( r ) {
            player.playVideo( 
                r.target.id.split("-")[0]
            );
        }     

    );

    $( "#query" )[0].onclick = function () {
        
        var modal = player.search.modal;        
        var h = round( window.innerHeight * 0.45) + "px";    
        modal.style.display = "block";    
        
        getvalues( 
            modal.querySelector( ".search-modal-body" ).childNodes 
        ).map( e => e.style.height = h );
        
        getvalues( modal.querySelectorAll( "span.search-close" ) ).map(
            q => q.onclick = function () { 
                modal.style.display = "none";
            }
        );

        window.onclick = function ( event ) {
            if ( event.target == modal ) {
                modal.style.display = "none";
            };
        };
    };


    function setFeeds() {
        
        var feeds = $("#feeds")[0];
        var videolist = range(0, 4);
        function getFeeds() {
            for (var i = 0; i < videolist.length; i++) {
                var video = player.video.list[random(0, player.video.list.length)];
                videolist[i] = `<li class="button card-content bg-darkTeal bg-dark-hover fg-light"
                        onclick="player.playVideo( '${video.index}' );">
                        <img class="avatar" src="${video.image}">
                        <span class="label">${video.title}</span>
                        <span class="second-label">${video.duration}</span>
                </li>`;
            };
            feeds.innerHTML = videolist.join("\n");
        };
        getFeeds();
        setInterval( getFeeds, 15e3 );

    };

    setTimeout( function () {
        player.search.init();
        setTimeout( function () {
            setFeeds();                    
        }, 1e3 );
    }, 1e3 );

} );

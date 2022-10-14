function fullScreenEvent( element ) {

    document.addEventListener( 
        "keypress", function ( e ) {
        if ( e.key === "Enter" ) {
            if ( !document.fullscreenElement ) {
                element.requestFullscreen();
            } else {
                if ( document.exitFullscreen ) {
                    document.exitFullscreen();
                };
            };
        };
    }, false );

};

$(function () {
    
    var videoApp = $( 
        'video[data-role=video-player]' 
    )[0];
    
    videoApp.getData = function ( key, from_attribute ) {                
        if ( type( from_attribute ) == "string" ) {
            return this[ from_attribute ][ key ];
        } else {        
            return this[ key ];
        };
    };
    videoApp.setData = function ( key, value, from_attribute ) {
        if ( type( from_attribute ) == "string" ) {
            this[ from_attribute ][ key ] = value;
        } else {        
            this[ key ] = value;
        };
    };
    
    getitems( {   
        poster: '/{{ site.img }}/app/{{ video.poster }}',
        volume: 0.9,
        videolist: []
    } ).map( v => videoApp.setData( v[0], v[1] ) );
    
    videoApp.setData( "videoSelected", 0, "dataset" );

    videoApp.start = function () {
        var video = this.videolist[this.dataset.videoSelected];
        this.src = encodeURI( video.url );
        $("#video-title")[0].innerHTML = video.title;
        setTimeout(function () {
            videoApp.play();
            $("#results")[0].style.display = "none";
        }, 500);
    };

    fullScreenEvent( videoApp );

  
    videoApp.playVideo = function (i, shuffled) {
        this.dataset.randomMode = shuffled;
        if (shuffled) {
            i = random(0, this.videolist.length);
        };
        this.dataset.videoSelected = i;
        this.start();
    };

    $("#play")[0].onclick = function () {
        videoApp.play();
    };
    $("#pause")[0].onclick = function () {
        videoApp.pause();
    };
    $("#previous")[0].onclick = function () {
        videoApp.playVideo(
            Number(videoApp.dataset.videoSelected) - 1, $("#random")[0].checked
        );
    };
    $("#next")[0].onclick = function () {
        videoApp.playVideo(
            Number(videoApp.dataset.videoSelected) + 1, $("#random")[0].checked
        );
    };

    videoApp.onended = function () {
        $("#next")[0].click();
    }

    $("#volume-plus")[0].onclick = function () {
        if (videoApp.volume < 0.9) {
            videoApp.volume += 0.1;
        } else {
            videoApp.volume = 1;
        };
    };
    $("#volume-minus")[0].onclick = function () {
        if (videoApp.volume > 0.1) {
            videoApp.volume -= 0.1;
        } else {
            videoApp.volume = 0;
        };
    };

    function setFeeds( delay=30 ) {
        var feeds = $("#feeds")[0];
        var videolist = range(0, 4);
        function getFeeds() {
            for (var i = 0; i < videolist.length; i++) {
                var video = videoApp.videolist[random(0, videoApp.videolist.length)];
                videolist[i] = `<li class="button card-content bg-darkTeal bg-dark-hover fg-light"
                        onclick="$( 'video' )[0].playVideo( '${video.index}', false );">
                        <img class="avatar" src="${video.image}">
                        <span class="label">${video.title}</span>
                        <span class="second-label">${video.duration}</span>
                </li>`;
            };
            feeds.innerHTML = videolist.join("\n");
        };
        getFeeds();
        setInterval( getFeeds, Number(`${delay}e3`) );
    };    

    fromStatic("data/videos").getjson(
        "dataset.json", function (data) {
            var titles = [];
            for ( x of getvalues( data ) ) {
                if ( isdefined( x.title ) && x.title != "" ) {
                    titles.push( x.title );
                };
            };
            titles.sort();
            for ( v of getvalues(data)) {                                                
                v.index = titles.indexOf( v.title );
                videoApp.videolist[ v.index ] = v;
            };

            setFeeds();

            var search = $( ".search-modal" )[0];
            var result = $( "#jkl-results" )[0];
            var query = $( "#query" )[0];

            result.addEventListener(        
                "click", function ( r ) {
                    videoApp.playVideo( 
                        r.target.id.split("-")[0], false
                    );
                }        
            );
            
            query.onclick = function () {        
                search.style.display = "block";
                var h = bodySize(0.10).h;
                getvalues( 
                    search.querySelector( ".search-modal-body" ).childNodes 
                ).map( e => e.style.height = h );
            };

            getvalues( search.querySelectorAll( "span.search-close" ) ).map(
                q => q.onclick = function () { 
                    search.style.display = "none";
                }
            );

            window.onclick = function ( event ) {
                if ( event.target == search ) {
                    search.style.display = "none";
                };
            };

            var Config = {
                searchInput: query,
                resultsContainer: result,
                json: [],
                searchResultTemplate: `
                    <li id='{index}' class='button card-content bg-darkTeal bg-dark-hover fg-light'>
                        <img id='{index}-image' class='avatar' src='{image}'>
                        <span id='{index}-title' class='label'>{title}</span>
                        <span id='{index}-duration' class='second-label'>{duration}</span>
                    </li>
                `,
                noResultsText: `
                    <li class='button card-content bg-darkTeal bg-dark-hover fg-light'>Video Not Found</li>
                `
            };
        
            function addData ( data ) {
                Config.json = [ ...Config.json, ...data ];
            };
        
            function initSearch () {
                SimpleJekyllSearch( Config );
            };

            addData ( videoApp.videolist );
            initSearch();

        }
    );

});

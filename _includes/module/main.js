// Import Modules
/*
==================================================
    Search-Query
==================================================
*/

function getVideoSearch ( videolist ) {
    SimpleJekyllSearch({
        searchInput: $( "#query" )[0],
        resultsContainer: $( "#jkl-results" )[0],
        json: videolist,
        searchResultTemplate: `<li id='{index}' class='button card-content bg-darkTeal bg-dark-hover fg-light'>
            <img id='{index}-image' class='avatar' src='{image}'>
            <span id='{index}-title' class='label'>{title}</span>
            <span id='{index}-duration' class='second-label'>{duration}</span>
        </li>`,
        noResultsText: "<li class='button card-content bg-darkTeal bg-dark-hover fg-light'>Video Not Found</li>"
    });
};    

function getSearchQuery () {
    SimpleJekyllSearch({
        "noResultsText": "<li class='search-no-item'>No results found</li>",
        "searchInput": $( "#js-search-input" )[0],
        "resultsContainer": $( "#js-results-container" )[0],
        "searchResultTemplate": [
            "<li class='search-item bg-cover' style='background-image: url( {image} );'>",
            "<a class='search-link' href='{url}'><p class='tag'>{title}<p></a>",
            "</li>"
        ].join("\n"),
        "json": "/search.json"
    });
};

function getJupyterNotebooks () {
    var nb = Http(
        "https://raw.githubusercontent.com/CircuitalMinds/jupyter"        
    );
    nb.root = "";
    nb.content = {};    

    nb.getjson( 
        "main/dataset.json", function ( x ) {
            nb.root = x.root;
            for ( i of getkeys( x.content ) ) {
                var topic = x.content[i];
                var y = {topic: i, content: []};
                for ( m of getkeys(topic) ) {
                    yi = {module: m, files: []};
                    var files = topic[m];
                    for ( file of files ) {
                        yi.files.push({
                            name: file.name,
                            url: [nb.root, file.path].join("/"),
                        });
                    };
                    y.content.push( yi );
                };
                nb.content[i] = y;
            };
        }
    );

    nb.setdata = function ( id, topic ) {
        var xdata = "";
        var tdata = this.content[topic];
        for ( t of tdata.content ) {
            tbody = "<ul>";
            for ( fi of t.files ) {
                tbody += '<li><a href="' + fi.url + '">' + fi.name + '</a></li>';
            };
            tbody +=  "</ul>";
            xdata += getDropDown( topic + "_" + t.module, {header: t.module, body: tbody} );            
        };
        var ydata = getDropDown( topic, {header: topic, body: xdata} );
        $( "#" + id )[0].innerHTML = ydata;
    };

    return nb;
};

/*
==================================================
    Builtins
==================================================
*/
function Timer() {
    return {
        counter: {
            value: 0,
            next: function () { this.value += 1 },
            back: function () { this.value -= 1 },
            reset: function () { this.value = 0 }
        },
        init: function ( n, delay=1e3, new_counter=true ) {
            var log = console.log;
            var counter = this.counter;
            if ( new_counter ) {
                counter.reset();
            };
            log( "starting to count" )
            var interval = setInterval( function () {
                if ( counter.value < n ) {
                    counter.next();
                    log( "i="+counter.value );
                } else {
                    clearInterval( interval );
                    log( "count terminated" );
                };
            }, delay );
        },
        sleep: function ( t ) {
            var log = console.log;
            log( "start sleeping..." );
            this.init( t );
            setTimeout( function () { log( "wake up !!!" ) }, ( t + 1 ) * 1e3 );
        },
        clock: function () {
            var t = new Date();
            var tdata = {};
            tdata.full = t.toLocaleTimeString();
            [ ["Hours","hr"], ["Minutes", "min"], ["Seconds", "sec"] ].map(
                s => tdata[ s[1] ] = t[ "get" + s[0] ]()
            );
            return tdata;
        },
        date: function () {
            var d = new Date();
            return d.toLocaleDateString();
        }
    };
};


function fromStatic ( path ) {
    return Http( ["{{ site.static_url }}", path].join("/") );
};


function getClockTime ( id ) {
    setInterval( function () {
        var time = new Date();
        $( "#" + id )[0].innerHTML = time.toLocaleTimeString();
    }, 1e3);
};

function getDateTime ( id ) {
    var today = new Date();
    $( "#" + id )[0].innerHTML = today.toLocaleDateString();
    
}

function createLogin ( id, btn_id ) {
	var login = getElement( "id", id );
	getElement( "id", btn_id ).onclick = function() {
    	getElement( "class", "menu-close" ).click();
    	login.show();
	};
	login.query( "span.close" ).map(
		ei => ei.onclick = function () { login.hide() }
	);
	window.onclick = function( event ) {
		if ( event.target == login ) {
			login.hide();
		};
	};	
};

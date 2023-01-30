// Import Modules

{% include module/utils.js %}

{% include module/plot.js %}

/*
==================================================
    BUILTINS
==================================================
*/

{% assign app = site.data.app %}

var app = Http( '{{ site.app }}' );

app.env = function () {
    return '{{ jekyll.environment }}';
};

function fromStatic ( path ) {
    return Http( ['{{ site.static_url }}', path].join("/") );
};

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

function getLogIn () {

    var login = $( "#login-data" )[0];
    login.get = login.querySelector( ".login-button" );
    login.get.onclick = function () {
        print({
            username: login.querySelector( "input[name=username]" ).value,
            password: login.querySelector( "input[name=password]" ).value
        });
    };

};

function getJupyter ( topic ) {

    function getDropDown ( id, content ) {

        var Header = content.header;
        var Body = content.body;
        return `{%
            include {{ site.module-element.accordion }}
            id='${id}' header='${Header}' body='${Body}'
        %}`;

    };

    function handler ( x ) {

        var content = x.content;
        var outdata = "";
        var tbody = "";

        for ( m of getkeys( content[topic] ) ) {
            var mbody = "<ul>";
            for ( xi of content[topic][m] ) {
                mbody += '<li><a href="' + [x.root, xi.path].join("/") + '">' + xi.name.replace(".ipynb", "") + '</a></li>';
            };
            mbody +=  "</ul>";
            tbody += getDropDown(
                topic + "_" + m,
                { header: "Module " + m, body: mbody }
            );
        };
        outdata += getDropDown(
            topic,
            {
                header: topic.split( "_" ).map(
                    ti => ti[0].toUpperCase() + ti.slice(1)
                ).join( " " ),
                body: tbody
            }
        );

        $( "#jupyter-" + topic )[0].innerHTML = outdata;

    };

    fromStatic( "data" ).getjson( 
        "notebooks.json", handler
    );

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


function createConsole () {
    var x = $( "#console" )[0];
    
    x.innerHTML = [
        '<div class="console-out" ></div>',
        '<input class="console-in" type="text" />',
        '<button class="console-run" > Run </button>'
    ].join( "\n" );

    var input = x.querySelector( ".console-in" );
    var output = x.querySelector( ".console-out" );

    x.querySelector( ".console-run" ).onclick = function () {
        output.innerHTML = eval( input.value );
    };

};


function saveFile ( name, data ) {
    data = JSON.stringify( data, null, 4 );
    if ( typeof( Blob ) != "undefined" ) {
        var textFileAsBlob = new Blob(
            [data],
            {type: 'text/plain'}
        );
        var downloadLink = document.createElement("a");
        downloadLink.download = name;
        if ( window.webkitURL != null ) {
            downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        } else {
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = document.body.removeChild(event.target);
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }
        downloadLink.click();
    } else {
        var pp = document.createElement('a');
        pp.setAttribute(
            'href', 
            'data:text/plain;charset=utf-8,' + encodeURIComponent( data )
        );
        pp.setAttribute('download', name);
        pp.onclick = document.body.removeChild(event.target);
        pp.click();
    };
};

function getTemplate ( id, content_id ) {

    var template = $( "#" + id )[0];
    var content = $( "#" + content_id )[0];
    cloned = template.content.cloneNode( true );
    content.textContent = cloned.textContent;

};


function initSocket () {
    
    function message ( name ) {
        return print({
            starting: "starting to count",
            sleeping: "start sleeping...",
            terminated: "count terminated"
        }[name]);
    };

    var socket = {
        kill: function ( id ) {
            if ( this.register[id] != undefined  ) {
                delete this.register[id];
            };
        },
        register: {}
    };    

    socket.create = function ( id ) {

        var sock = {};        
        
        sock.id = id;
        sock.connected = false;
        
        sock.data = {}; 
        sock.task = null;
        sock.connect = function () {
            this.connected = true;
        };
        sock.disconnect = function () {
            this.connected = false;
        };

        counter = {};
        counter.value = 0;
        counter.next = function () {
            this.value += 1;
        };
        counter.back = function () {
            this.value -= 1;
        };
        counter.reset = function () {
            this.value = 0;
        };        
        sock.counter = counter;

        sock.do_task = function ( func, secs, delay=1 ) {                               
            sock.counter.reset();
            message( "starting" );
            sock.task = setInterval( function () {
                if ( sock.counter.value < secs ) {
                    sock.counter.next();
                    print( "i="+sock.counter.value );
                    func();
                } else {
                    clearInterval( sock.task );
                    message( "terminated" );
                };
            }, delay * 1e3 );            
        
        };

        sock.sleep = function ( t ) {
            message( "starting" );            
            setTimeout(
                function () { 
                    print( "wake up !!!" );
                },
            t * 1e3 );
        };

        socket.register[id] = sock;

    };

    return socket;

};


/*
==================================================
    Site-Data
==================================================
*/


var currentPage = '{{ page.title }}';
var sitePages = [];

{%- for p in site.pages -%}
{%- if p.title -%}
sitePages.push({
    "title": '{{ p.title }}',
    "name": '{{ p.name }}',
    "image": '{{ p.image }}',
    "url": '{{ p.url }}',
    "path": '{{ p.path }}',
    "tags": {{ p.tags | split: ", " | jsonify }}
});
{%- endif -%}
{%- endfor -%}

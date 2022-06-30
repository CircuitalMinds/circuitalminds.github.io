// Import Modules
/*
==================================================
    Built-Module and Include
==================================================
    Search-Register
==================================================
*/
let Tasks = {
    list: [],
    add: function( i ) {         
        this.list.push(i); this.load()
    },
    load: function () {  
        if ( $( "body" )[0].onload == undefined ) {
            $( "body" )[0].onload = function() { 
                var tasks = Tasks.list;
                for ( var i = 0; i < tasks.length; i++ ) { tasks[i]() }
            }
        }
    }
};

function getSearchQuery ( Config ) {
    SimpleJekyllSearch( Config );
};
/*
==================================================
    Built-Timer
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

function Http ( url ) {
    return {
        url: url, getUrl: function ( x ) {
            if ( x != undefined ) {
                return [
                    url, ( getType( x ) == "array" ) ? x.join("/") : x
                ].join("/");
            } else {
                return url;
            };
        },
        get: function ( path, handler=print, dtype="json" ) {
            if ( dtype == "json" ) {
                $.getJSON(
                    this.getUrl( path ), 
                    (data) => setTimeout( () => handler(data), 200 )
                );
            } else if ( dtype == "text" ) {
                getRequest( 
                    this.getUrl( path ), 
                    (data) => setTimeout( () => handler(data.responseText), 200 ) 
                );
            };
        }
    };
};

/*
==================================================
    Utils
==================================================
*/

function type ( x ) {
    var xtype = typeof( x );
    if ( xtype == "object" ) {
        return (
            x.length != undefined 
        ) ? "array" : xtype;
    } else {
        return xtype;
    };
};

function print ( x ) {
    console.log(
        ( type( x ) == "object" ) ? JSON.stringify( y ) : y 
    );
};

function round ( x ) {
    return Math.round( x );
};

function abs ( x ) {
    return Math.abs( x );
};

function random ( a, b ) {
    var r = Math.random();
    if ( a != undefined && b != undefined ) {
        return a + round( r * abs( b - a ) )
    } else {
        return r;
    };
};

function range ( a, b, dx=1 ) {
    if ( b == undefined ) {
        b = a; a = 0;
    };
    return Array.from(
        {length: (b - a - 1) / dx + 1}, ( _, i ) => a + ( i * dx )
    );
};

function grid ( a, b, n ) {
    var dx = (b - a) / n;
    return range(0, n + 1).map( i => a + i * dx );
};

function getkeys ( x ) {
    return Object.keys( x );
};
function getvalues ( x ) {
    return Object.values( x );
};
function getitems ( x ) {
    return Object.entries( x );
};
// Import Modules
/*
==================================================
    Built-Module and Include
==================================================
    Search-Register
==================================================
*/
function jklSearch ( data ) {
    ["searchInput", "resultsContainer"].map(
        i => data[i]=$( "#" + data[i] )[0]
    );
    $( "body" )[0].onload = function () {
        SimpleJekyllSearch( data )
    };
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
        get: function ( path, handler=print ) {
            $.getJSON(
                this.getUrl( path ), (data) => setTimeout( () => handler(data), 200 )
            );
        }
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

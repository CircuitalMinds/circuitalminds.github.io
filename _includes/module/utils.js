
/*
==================================================
    Utils
==================================================
*/

function isdefined ( x ) {
    return x != undefined;
}

function type ( x ) {
    var xtype = typeof( x );
    if ( xtype == "object" ) {
        return (
            isdefined( x.length ) 
        ) ? "array" : xtype;
    } else {
        return xtype;
    };
};

function print ( x ) {
    console.log(
        ( type( x ) == "object" ) ? JSON.stringify( x ) : x
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

function Http ( url="/" ) {
    
    var obj = {
        url: url, 
        seturl: function ( path ) {
            return ( isdefined( path ) ) ? [url, path].join("/") : url;
        }
    };

    obj.getjson = function ( path, handler=print ) {
        $.getJSON(
            this.seturl( path ),
            ( data ) => setTimeout( 
                () => handler( data ), 200 
            )
        );
    };

    obj.get = function ( path, handler=print ) {
        var req = new XMLHttpRequest();
        req.open( "GET", this.seturl( path ) );
        req.send();
        req.onreadystatechange = function () { 
            setTimeout( function () {                 
                handler( req.responseText );
            }, 200 );
        };
    };
    
    obj.post = function ( path, req, handler=print ) {
        $.post(
            this.seturl( path ), req,
            ( data ) => setTimeout( 
                () => handler( data ), 200
            )
        );
    };

    return obj;    
};


function bodySize ( scale=1.0 ) {
    var y = document.body;
    return {
        w: round( y.clientWidth * scale ) + "px",
        h: round( y.clientHeight * scale ) + "px"
    };
};


function getElement ( q, v, first=true ) {    
    if ( q == "id" ) {        
        var e = $( "#" + v )[0];
        setElement( e );
        return e;        
    } else if ( q == "class" || q == "tag" ) {
        var e = $( ( q == "class" ) ? "." + v : v );
        if ( first ) {
            e = e[0];
            setElement( e );
            return e;
        } else {
            for ( x of getitems( e ) ) {
                var ei = x[1];
                setElement( ei );
                e[x[0]] = ei;
            };
            return e;
        };
    };
};

function createElement ( name, content="" ) {
    var e = document.createElement( name );
    e.innerHTML = content;
    return e;
};

function setElement ( e ) {
    
    e.getsize = function () {
        var size = this.getBoundingClientRect();
        return {
            w: size.width,
            h: size.height,
            x: size.x,
            y: size.y
        };
    };

    e.pos = function () {
        var pos = this.getBoundingClientRect();
        return {
            x: [pos.left, pos.right], 
            y: [pos.bottom, pos.top], 
            w: pos.width, 
            h: pos.height
        };
    };

    e.setX = function ( x ) {
        var dx = this.pos().w;
        this.style.left = x + "px";
        this.style.width = dx + "px";
    };
    e.setY = function ( y ) {
        var dy = this.pos().h;
        this.style.bottom = y + "px";
        this.style.height = dy + "px";
    };
    e.setW = function ( w ) {
        this.style.width = w + "px";
    };
    e.setH = function ( h ) {
        this.style.height = h + "px";
    };

    e.hide = function () {
        this.style.display = "none";        
    };
    e.show = function () {
        this.style.display = "block";
    };

    e.copy = function () {
        return this.cloneNode(true);
    };

    e.queryNodes = function ( cls, func ) {
        return getvalues( this.querySelector( cls ).childNodes );
    };
    e.query = function ( cls ) {
        return getvalues( this.querySelectorAll( cls ) );
    };

};


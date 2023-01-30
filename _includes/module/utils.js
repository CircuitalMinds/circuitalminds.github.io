/*
==================================================
    Module: Utils
==================================================
*/

/*
--------------------------------------------------------------------------------------------------------------
    Sub-Module: Object
--------------------------------------------------------------------------------------------------------------
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

function callable ( func ) {
    return type( func ) == "function";
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

function sample ( data, size ) {
    var xn;
    size = ( size > data.length  ) ? data.length : size;
    var xdata = [data[ random( 0, data.length - 1 ) ]];
    while ( xdata.length < size ) {
        xn = data[ random( 0, data.length - 1 ) ];
        if ( xdata.indexOf( xn ) == -1 ) {
            xdata.push( xn );
        };
    };
    return xdata;
};

function Precision ( x , n ) {      
  	var xn = Math.trunc( x );
  	var yn = Math.trunc( ( x - xn ) * 10 ** n );
    return parseFloat( xn + "." + yn );
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

function merge ( x, y ) {
    var xy;
    if ( type( x ) == "object" && type( y ) == "object" ) {
        xy = { ...x, ...y };
    } else if ( type( x ) == "array" && type( y ) == "array" ) {
        xy = [ ...x, ...y ].sort();
    };
    return xy;
};

function show( e ) {
  e.style.display = "block";
};

function hide( e ) {
  e.style.display = "none";
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


function getDate () {
    var tdata = new Date();
    var date = {};
    date.full = tdata.toLocaleTimeString();
    var keyvalues = [
        ["Hours","hr"],
        ["Minutes", "min"],
        ["Seconds", "sec"]
    ];
    for ( x of keyvalues ) {
        date[ x[1] ] = tdata[ "get" + x[0] ]();
    };
    return date;
};


function openwindow ( url ) {

    return window.open(
        url, "_blank",
        Object.entries( {
            toolbar: "yes",
            scrollbars: "yes",
            resizable: "yes",
            top: 500,
            left: 500,
            width: 400,
            height: 400
        } ).map(
            v => `${v[0]}=${v[1]}`
        ).join( "," )
    );

};

function fadeEvent ( id ) {

    $( "#" + id ).click( function () {
        $("#div1").fadeIn();
        $("#div2").fadeIn("slow");
        $("#div3").fadeIn(3000);
    } );

};


function createBrowser () {

    var browser = {};

    browser.page = {
        "youtube": "https://www.youtube.com",
        "github": "https://github.com",
        "facebook": "https://www.facebook.com"
    };

    browser.open = function( url ) {
        window.location = url;
    };

    browser.loadPage = function () {
        window.scrollTo( 0, this.scrollMaxY );
    };

    return browser;

};

class ClassObject {
    constructor(name) {
        this.name = name;
        this.data = {};
    }
    Data() {
        console.log(this.nombre + ' starting');
    }
};

class createObject extends ClassObject {
    Data() {
        super.Data();
        console.log(this.nombre + ' finish');
    }
};

/*
--------------------------------------------------------------------------------------------------------------
    Sub-Module: Http-Methods
--------------------------------------------------------------------------------------------------------------
*/

function joinpath(url={ root: "", path: "", pathlist: [] }) {
    if ( url.root.endsWith("/") ) {
        url.root = url.root.slice(0, -1)
    };
    if ( type(url.path) == "string" ) {
        if ( url.path.startsWith("/") ) {
            url.path = url.path.slice(1)
        };
        return [url.root, url.path].join("/");
    } else if ( type(url.pathlist) == "array" ) {
        return [url.root].concat(url.pathlist).join("/");
    };
};

function redirectTo ( url ) {
    window.location.href = url;
};


function Http ( url="/" ) {
    
    var obj = {
        url: url, 
        seturl: function ( path ) {
            if ( isdefined( path ) ) {
                return [
                    url, path[0].replace( "/", "" ) + path.slice(1)
                ].join( "/" );
            } else {
                return url;
            };
        }
    };

    obj.urlparse = function ( path, data ) {
        if ( type( data ) == "object" ) {
            return path + "?" + getitems(data).map(
                x => `${x[0]}=${x[1]}`
            ).join( "&" );            
        } else {
            return path;
        };
    };

    obj.getjson = function ( path, handler=print, req={} ) {
        $.getJSON(
            this.seturl( path ), req,
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
        print( this.seturl( path ) );
        $.post(
            this.seturl( path ), req,
            ( data ) => setTimeout( 
                () => handler( data ), 200
            )
        );
    };

    return obj;    
};

function AsyncProcess ( func, data ) {

    function Resolve () {
      return new Promise( 
        result => {
          setTimeout( () => { result( func(data) ) }, 2e3 )
        }
      );
    };
    
    async function Exec () {
      const result = await Resolve();
      console.log(result);
    };
  
    return Exec;
  
  };
  
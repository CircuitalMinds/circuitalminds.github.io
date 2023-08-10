/*
==================================================
    Module: Utils
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


function winSize () {

    var xy = {
        w_val: function ( scale=1.0 ) {
            return round( window.innerWidth ) * scale;
        },
        h_val: function ( scale=1.0 ) {
            return round( window.innerHeight ) * scale;
        },
        w: function ( scale=1.0 ) {
            return this.w_val( scale ) + "px";
        },
        h: function( scale=1.0 ) {
            return this.h_val( scale ) + "px";
        }
    };

    return xy;

};

function show ( e ) {
    e.style.display = "block";
};
function hide ( e ) {
    e.style.display = "none";
};

function getElement ( q, v, first=true ) {
    if ( q == "id" ) {
        var e = tquery( q, v );
        return e;
    } else if ( q == "class" || q == "tag" ) {
        var e = $( ( q == "class" ) ? "." + v : v );
        if ( first ) {
            var e = tquery( q, v );
            return e;
        } else {
            for ( x of getitems( e ) ) {
                var ei = x[1];
                ei = tquery( q, ei );
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


/*
--------------------------------------------------------------------------------------------------------------
    Sub-Module: Http-Methods
--------------------------------------------------------------------------------------------------------------
*/


function Http ( url="/" ) {

    var xhttp = {
        url: ( url == "/" ) ? document.URL.slice(0, -1) : url,
        data: {},
        timeout: 5e2
    };

    xhttp.urlparse = function ( params ) {
         return this.url + "?" + getitems( params ).map(
            x => x[0] + "=" + x[1]
         ).join("&");
    };

    xhttp.getjson = function ( path, func=print ) {
        var xurl = [this.url, path].join("/");
        var req = this.data;
        var tout = this.timeout;
        $.getJSON(
            xurl, req, function( data ) {
               setTimeout( function () {
                    if ( callable( func ) ) {
                        func( data );
                    };
               }, tout );
            }
        );
    };
    
    
    xhttp.get = function ( path, func=print ) {
        var xurl = [this.url, path].join("/");
        var tout = this.timeout;
        var req = new XMLHttpRequest();
        req.open( "GET", xurl );
        req.send();
        req.onreadystatechange = function () {
            setTimeout( function () {
                if ( callable( func ) ) {
                    func( req.responseText );
                };
            }, tout );
        };
    };

    xhttp.post = function ( path, req, func=print ) {
        var xurl = [this.url, path].join("/");
        var tout = this.timeout;        
        $.post(
        xurl, req, function ( data ) {
            setTimeout( function () {
                if ( callable( func ) ) { func( req.responseText ) };                
            }, tout );
        } );
    };

    return xhttp;

};

function getsize ( e ) {
    var size = e.getBoundingClientRect();
    return {
        w: size.width,
        h: size.height,
        x: size.x,
        y: size.y
    };
};

function getpos ( e ) {
    var p = e.getBoundingClientRect();
    return {
        x: [p.left, p.right],
        y: [p.bottom, p.top],
        w: p.width,
        h: p.height
    };
};

function copy ( e ) {
    return e.cloneNode(true);
};

function getnodes ( e, cls ) {
    return getvalues( e.querySelectorAll( cls ) );
};

function getchild ( e, cls ) {
    return getvalues( e.querySelector( cls ).childNodes );
};

function setsize ( e, name, value ) {

    var efunc = {
        x: function () {
            var dx = getpos( e ).w;
            e.style.left = value + "px";
            e.style.width = dx + "px";
        },
        y: function () {
            var dy = getpos( e ).h;
            e.style.bottom = value + "px";
            e.style.height = dy + "px";
        },
        w: function () {
            e.style.width = value + "px";
        },
        h: function () {
            e.style.height = value + "px";
        }
    };
    efunc[ name ]();

};

function tquery ( q, v, first=true ) {

    function setter ( e ) {
        e.getsize = function () {
            return getsize( e );
        };
        e.pos = function () {
            return getpos( e );
        };
        e.hide = function () {
            hide( e );
        };
        e.show = function () {
            show( e );
        };
        e.copy = function () {
            return copy( e );
        };
        e.nodes = function ( cls ) {
            return getnodes( e, cls );
        };
        e.child = function ( cls ) {
            return getchild( e, cls );
        };
        e.setX = function ( value ) {
            setsize( e, "x", value );
        };
        e.setY = function ( value ) {
            setsize( e, "y", value );
        };
        e.setW = function ( value ) {
            setsize( e, "w", value );
        };
        e.setH = function ( value ) {
            setsize( e, "h", value );
        };
        return e;
    };

    if ( q == "id" ) {
        var e = $( "#" + v )[0];
        return setter( e );
    } else if ( q == "class" || q == "tag" ) {
        var e = $( ( q == "class" ) ? "." + v : v );
        if ( first ) {
            return setter( e[0] );
        } else {
            for ( x of getitems( e ) ) {
                e[x[0]] = setter( x[1] );                
            };
            return e;
        };
    };

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

function reloadPage () {
    window.location.reload;
};

function datatype ( value ) {
    
    if ( value === null ) {
        return "null";
    }

    const baseType = typeof value

    if (!["object", "function"].includes( baseType )) {
        return baseType;
    }  

    const tag = value[Symbol.toStringTag];

    if ( typeof tag === "string" ) {
        return tag;
    }

    if (
        baseType === "function" &&
        Function.prototype.toString.call(value).startsWith("class")
    ) {
        return "class";
    }
    
    const className = value.constructor.name;
    
    if ( typeof className === "string" && className !== "" ) {
        return className;
    }

    return baseType;

};
  

function DictObj ( data ) {
    this.data =  ( typeof data == "object" ) ? data : {};  
    this.clean = function () {
      this.data = {};
    };    
    this.get = function ( key ) {
      return this.data[key];
    };      
    this.set = function ( dataset ) {
      var xdata = this.data;
      this.data = { ...xdata, ...dataset };
    };
    this.print = function () {
      console.log(this.data);
    };
  };
  
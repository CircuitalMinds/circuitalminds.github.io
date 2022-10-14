
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

function IsoGraph () {

    var plt = $( "#iso-graph" )[0];

    plt.builder = {
        data: {{ site.data.graph | jsonify }},
        create: function ( id ) {

            var e = $( "#" + id )[0];
            var size = e.getBoundingClientRect();
            e.innerHTML = [
                "<canvas",
                "style='display: inline-block; max-width: 100%; max-height: 100%;'",
                "width=" + size.width, "height=" + size.height,
                "></canvas>"
            ].join(" ");

            var fig = e.querySelector( "canvas" );
            var ctx = fig.getContext( "2d" );
            var grd = ctx.createLinearGradient( 0, 0, fig.width, fig.height );

            e.setW = function ( w ) {
                this.style.width = String(w) + "%";
            };
            e.setH = function ( h ) {
                this.style.height = String(h) + "%";
            };
            e.addGrad = function ( name ) {
                var colors = plt.builder.getPalette( name );
                var size = colors.length;
                for ( var i = 0; i < colors.length; i++ ) {
                    grd.addColorStop( (i + 1) / size, colors[i] );
                };
                ctx.fillStyle = grd;
                ctx.fillRect( 0, 0, fig.width, fig.height );
                ctx.strokeStyle = grd;
            };
            e.plot = function ( x, y ) {
                ctx.lineWidth = 1;
                ctx.beginPath();
                function point ( n ) {
                    ctx.moveTo(x[n], fig.height - y[n]);
                    ctx.lineTo(x[n+1], fig.height - y[n+1]);
                    ctx.stroke();
                };
                for ( var n = 0; n < x.length - 1; n++ ) {
                    point( n );
                };
            };
            e.clear = function () {
                ctx.clearRect(
                    0, 0, fig.width, fig.height
                );
            };
            e.strokeTxt = function ( text, x, y ) {
                ctx.strokeText( text, x, fig.height - y );
            };

            return e;
        },
        getColor: function ( name ) {
            if ( isdefined(name) ) {
                return this.data.color[name];
            } else {
                return "#" + sample(
                    "0123456789ABCDEF", 6
                ).join("");
            };
        },
        getPalette: function ( name ) {
            if ( isdefined(name) ) {
                return this.data.palette[name];
            } else {
                return this.data.palette.main;
            };
        }
    };

};

function Figure ( id ) {
    var e = $( "#" + id)[0];
    var fg = "#a20025";
    var bg = "#1ba1e2";
    var grid = {
        size: 25,
        x0: { number: 1, suffix: '' },
        y0: { number: 1, suffix: '' },
        xf: 5,
        yf: 5
    };
    var ctx = e.getContext("2d");
    var w = e.width;
    var h = e.height;
    var xn = Math.floor( h / grid.size );
    var yn = Math.floor( w / grid.size );

    for ( var i = 0; i <= xn; i++ ) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        if ( i == grid.xf ) {
            ctx.strokeStyle = fg;
        } else {
            ctx.strokeStyle = bg;
        };
        if ( i == xn ) {
            ctx.moveTo( 0, grid.size * i );
            ctx.lineTo( w, grid.size * i );
        } else {
            ctx.moveTo( 0, grid.size * i + 0.5 );
            ctx.lineTo( w, grid.size * i + 0.5 );
        };
        ctx.stroke();
    };

    for ( i = 0; i <= yn; i++ ) {
        ctx.beginPath();
        ctx.lineWidth = 1;

        if( i == grid.yf ) {
            ctx.strokeStyle = fg;
        } else {
            ctx.strokeStyle = bg;
        };
        if( i == yn ) {
            ctx.moveTo( grid.size * i, 0 );
            ctx.lineTo( grid.size * i, h );
        } else {
            ctx.moveTo( grid.size * i + 0.5, 0 );
            ctx.lineTo( grid.size * i + 0.5, h );
        };
        ctx.stroke();
    };

    ctx.translate(grid.yf * grid.size, grid.xf * grid.size);

    for( i = 1; i < ( yn - grid.yf ); i++ ) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = bg;
        ctx.moveTo(grid.size*i+0.5, -3);
        ctx.lineTo(grid.size*i+0.5, 3);
        ctx.stroke();

        // Text value at that point
        ctx.font = '9px Arial';
        ctx.textAlign = 'start';
        ctx.fillText(grid.x0.number*i + grid.x0.suffix, grid.size*i-2, 15);
    };

    for(i=1; i<grid.yf; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = bg;

        // Draw a tick mark 6px long (-3 to 3)
        ctx.moveTo(-grid.size*i+0.5, -3);
        ctx.lineTo(-grid.size*i+0.5, 3);
        ctx.stroke();

        // Text value at that point
        ctx.font = '9px Arial';
        ctx.textAlign = 'end';
        ctx.fillText(-grid.x0.number*i + grid.x0.suffix, -grid.size*i+3, 15);
    };

    for( i = 1; i < (xn - grid.xf ); i++ ) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = bg;

        // Draw a tick mark 6px long (-3 to 3)
        ctx.moveTo(-3, grid.size*i+0.5);
        ctx.lineTo(3, grid.size*i+0.5);
        ctx.stroke();

        // Text value at that point
        ctx.font = '9px Arial';
        ctx.textAlign = 'start';
        ctx.fillText(
            -grid.x0.number * i + grid.x0.suffix, 8, grid.size * i + 3
        );
    };

    for( i = 1; i < grid.xf; i++ ) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = bg;

        ctx.moveTo( -3, -grid.size * i + 0.5 );
        ctx.lineTo( 3, -grid.size * i + 0.5 );
        ctx.stroke();

        ctx.font = '9px Arial';
        ctx.textAlign = 'start';
        ctx.fillText(
            grid.y0.number * i + grid.y0.suffix, 8, - grid.size * i + 3
        );
    };
};


function Particles ( id ) {
    var e = $( "#"+ id )[0];
    var ctx = e.getContext("2d");
    ctx.globalAlpha = 0.5;
    var colors = {{ site.data.graph.palette.spectral | jsonify }};

    function generate() {
        return colors[random( 0, colors.length )];
    };

    function getsize() {
        return e.getBoundingClientRect();
    };

    var cursor = {x: 0.5 * e.width, y: 0.5 * e.height};
    var particlesArray = [];

    generateParticles(200);
    anim();

    addEventListener(
        "mousemove",
        ( v ) => {
            var size = getsize();
            cursor.x = v.clientX - size.x;
            cursor.y = v.clientY - size.y;
        }
    );

    addEventListener(
        "touchmove",
        ( v ) => {
            v.preventDefault();
            var size = getsize();
            cursor.x = v.touches[0].clientX - size.x;
            cursor.y = v.touches[0].clientY - size.y;
        },
        { passive: false }
    );

    addEventListener(
        "resize",
        () => resize()
    );

    function generateParticles(amount) {
      for (let i = 0; i < amount; i++) {
        particlesArray[i] = new Particle(
          e.width / 2,
          e.height / 2,
          2,
          generate(),
          0.1
        );
      };
    };

    function generateColor() {
      let hexSet = "0123456789ABCDEF";
      let finalHexString = "#";
      for (let i = 0; i < 6; i++) {
        finalHexString += hexSet[Math.ceil(Math.random() * 15)];
      };
      return finalHexString;
    };

    function resize() {
      var size = getsize();
      e.height = 750;
      e.width = size.width
    };

    function Particle(x, y, particleTrailWidth, strokeColor, rotateSpeed) {
      this.x = x;
      this.y = y;
      this.particleTrailWidth = particleTrailWidth;
      this.strokeColor = strokeColor;
      this.theta = Math.random() * Math.PI * 2;
      this.rotateSpeed = rotateSpeed;
      this.t = Math.random() * 150;

      this.rotate = () => {
            const p = {
              x: this.x,
              y: this.y,
            };
            this.theta += this.rotateSpeed;
            this.x = cursor.x + Math.cos(this.theta) * this.t;
            this.y = cursor.y + Math.sin(this.theta) * this.t;
            ctx.beginPath();
            ctx.lineWidth = this.particleTrailWidth;
            ctx.strokeStyle = this.strokeColor;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(this.x, this.y);
            ctx.stroke();
        };
    };

    function anim () {
        requestAnimationFrame( anim );
        ctx.fillStyle = "rgba(0,0,0,0.05)";
        ctx.fillRect(0, 0, e.width, e.height);
        particlesArray.forEach(
            (particle) => particle.rotate()
        );
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

function initClock ( id ) {

    function clock() {

        var t = getDate();
        var ctx = $( "#" + id )[0].getContext('2d');
        ctx.save();
        ctx.clearRect(0, 0, 150, 150);
        ctx.translate(75, 75);
        ctx.scale(0.4, 0.4);
        ctx.rotate(-Math.PI / 2);
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'white';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.save();
        for (var i = 0; i < 12; i++) {
            ctx.beginPath();
            ctx.rotate(Math.PI / 6);
            ctx.moveTo(100, 0);
            ctx.lineTo(120, 0);
            ctx.stroke();
        };
        ctx.restore();
        ctx.save();
        ctx.lineWidth = 5;
        for (i = 0; i < 60; i++) {
            if (i % 5!= 0) {
                ctx.beginPath();
                ctx.moveTo(117, 0);
                ctx.lineTo(120, 0);
                ctx.stroke();
            };
            ctx.rotate(Math.PI / 30);
        };
        ctx.restore();
        t.hr = t.hr >= 12 ? t.hr - 12 : t.hr;
        ctx.fillStyle = 'black';
        ctx.save();
        ctx.rotate(
            t.hr * (Math.PI / 6) + (Math.PI / 360) * t.min + (Math.PI / 21600) * t.sec
        );
        ctx.lineWidth = 14;
        ctx.beginPath();
        ctx.moveTo(-20, 0);
        ctx.lineTo(80, 0);
        ctx.stroke();
        ctx.restore();
        ctx.save();
        ctx.rotate(
            (Math.PI / 30) * t.min + (Math.PI / 1800) * t.sec
        );
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(-28, 0);
        ctx.lineTo(112, 0);
        ctx.stroke();
        ctx.restore();
        ctx.save();
        ctx.rotate(t.sec * Math.PI / 30);
        ctx.strokeStyle = '#D40000';
        ctx.fillStyle = '#D40000';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(-30, 0);
        ctx.lineTo(83, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.restore();
        ctx.beginPath();
        ctx.lineWidth = 14;
        ctx.strokeStyle = '#325FA2';
        ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.restore();
        window.requestAnimationFrame( clock );

    };

    window.requestAnimationFrame( clock );

};

function fadeEvent ( id ) {
    
    $( "#" + id ).click( function () {
        $("#div1").fadeIn();
        $("#div2").fadeIn("slow");
        $("#div3").fadeIn(3000);
    } );

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

function redirectTo ( url ) {

    window.location.href = url;

}




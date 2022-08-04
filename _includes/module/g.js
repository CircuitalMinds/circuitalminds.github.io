function getType ( y ) {
    var name = typeof( y );
    if ( name == "object" ) {
        if ( y.length != undefined ) {
            return "array";
        } else { return name };
    } else { return name };
};

function Replace ( y, w ) {
    if ( getType( w ) == "array" ) {
        w.map( wi => y=y.replaceAll( wi, "" ) );
        return y;
    } else {
        return y.replaceAll( w, "" );
    };
};

function Abs ( x ) {
    return Math.abs( x );
};
function Round ( x ) {
    return Math.round( x );
};
function Tf ( name ) {
    return Math[ name.toLowerCase() ];
};
function Ct ( name ) {
    return Math[ name.toUpperCase() ];
};
function Precision ( x, n ) {
    var xn = Tf( "trunc" )( x );
  	var yn = Tf( "trunc" )( ( xn - n ) * 10 ** n );
    return parseFloat( xn + "." + yn );
};
function Prod ( y ) {
    return y.reduce( function ( i, j ) { return i * j }, 1.0 );
};
function Sum ( y ) {
    return y.reduce( function ( i, j ) { return i + j }, 0.0 );
};
function Fact ( n ) {
    return Prod( Range(1, n + 1) );
};
function RandInt ( start, stop ) {
    var L = Abs( stop - start );
    var Xr = Round( Math.random() * L );
    return start + Xr;
};
function getSample ( y, size ) {
    if ( size > y.length) {
        size = y.length;
    };
    var ys = [];
    var yi = y[RandInt( 0, y.length - 1)];
    ys.push(yi);
    while ( ys.length < size ) {
        yi = y[RandInt( 0, y.length - 1)];
        if ( ys.indexOf(yi) == -1 ) {
            ys.push(yi);
        };
    };
    return ys;
};
function getKeys ( y ) {
    return Object.keys( y );
};
function getValues ( y ) {
    return Object.values( y );
};
function getItems ( y ) {
    return Object.entries( y );
};
function Dict ( y ) {
    let dict = {};
    dict.isDict = function ( x ) {
        return getType( x ) == "object";
    };
    dict.data = ( dict.isDict( y ) ) ? y : {};
    [
        ["keys", getKeys],
        ["values", getValues],
        ["items", getItems]
    ].map(
        v => dict[v[0]] = function ( x ) {
            var t = ( x ) ? x : this.data;
            return v[1]( t );
        }
    );
    dict.get = function ( q ) {
        return this.data[q];
    };
    dict.set = function ( k, v ) {
        this.data[k] = v;
    };
    dict.update = function ( x ) {
        if ( this.isDict( x ) ) {
            for ( v of this.items( x ) ) {
                this.set( v[0], v[1] );
            };
        };
    };
    dict.len = function ( x ) {
        return this.keys( x ).length;
    };
    dict.pop = function ( key ) {
        delete this.data[key];
    };
    dict.clear = function () {
        this.data = {};
    };
    return dict;
};
function List ( y ) {
    let list = {};
    list.isArray = function ( x ) {
        return getType( x ) == "array";
    };
    list.data = ( list.isArray( y ) ) ? y : [];
    list.len = function ( x ) {
        return ( x ) ? x.length : this.data.length;
    };
    list.index = function ( x ) {
        return this.data.indexOf( x );
    };
    list.append = function ( x ) {
        this.data.push(x);
    };
    list.extend = function ( x ) {
        if ( this.isArray( x ) ) {
            for ( i of x ) {
                this.append( i );
            };
        };
    };
    list.pop = function ( i ) {
        var z = [];
        for ( n of Range(this.len()) ) {
            if ( n != i ) {
                z.push(this.data[n]);
            };
        };
        this.data = z;
    };
    list.remove = function ( x ) {
        var i = this.index(x);
        if ( i != -1 ) {
            this.pop( i );
        };
    };
    list.get = function ( i, j ) {
        if ( i != undefined && j == undefined ) {
            if ( i < 0 ) {
                return this.data.slice(i);
            } else {
                return this.data[i];
            };
        } else if ( i != undefined && j != undefined ) {
            return this.data.slice( i, j );
        };
    };
    list.clear = function () {
        this.data = [];
    };
    return list;
};
function Merge ( x, y ) {
    if ( isType( x, "object" ) && isType( y, "object" ) ) {
        var xy = { ...x, ...y };
        return xy;
    } else if ( isType( x, "array" ) && isType( y, "array" ) ) {
        var xy = [ ...x, ...y ];
        return xy.sort();
    };
};

function iter ( x, g ) {
    var k, v;
    var w = {};
    for ( key of getKeys( x ) ) {
        k, v = g( key , x[key] );
        w[k] = v;
    };
    return w;
};

function filter ( x, g ) {
    var w = ( getType == "array" ) ? [] : {};
    for ( i of getKeys( x ) ) {
        if ( g( i, x[i] ) ) {
            w[i] = x[i];
        };
    };
    return w;
};


function All ( x ) {
    return x.reduce( ( xi, yi ) => xi + yi, 0 ) == x.length;
};
function Any ( x ) {
    return x.reduce( ( xi, yi ) => xi + yi, 0 ) != 0;
};


function setattr( x, k, v ) {
    if ( All([k, v].map( i => getType( i ) == "array" )) ) {
        Range( k.length ).map( i => x[k[i]] = v[i] );
    } else {
        x[k] = v
    };
};

function getattr( x, k ) {
    if ( getType( k ) == "array" ) {
        return k.map( ki => x[ki] );
    } else {
        return x[k];
    };
};

function Vect ( x ) {
    let X = {};
    X.isVector = function ( y ) {
        return getType( y ) == "array";
    };
    X.isNumber = function ( y ) {
        return getType( y ) == "number";
    };
    X.data = ( X.isVector( x ) ) ? x : [];
    X.len = function ( y ) {
        if ( this.isVector( y ) ) {
            return y.length;
        } else {
            return this.data.length;
        };
    };
    X.append = function ( y ) {
        if ( this.isNumber( y ) ) {
            this.data.push( y );
        };
    };
    X.extend = function ( y ) {
        if ( this.isVector( y ) ) {
            for ( yi of y ) {
                this.append( yi );
            };
        };
    };
    X.clear = function () {
        this.data = [];
    };
    X.sum = function ( y ) {
        var yn = [];
        if ( this.isNumber(y) ) {
            for ( var i = 0; i < this.len(); i++ ) {
                yn.push(this.data[i] + y);
            };
        } else if ( this.isVector( y ) ) {
            for ( var i = 0; i < this.len(); i++ ) {
                yn.push(this.data[i] + y[i]);
            };
        };
        return yn;
    };
    X.prod = function ( y ) {
        var yn = [];
        if ( this.isNumber(y) ) {
            for ( var i = 0; i < this.len(); i++ ) {
                yn.push(this.data[i] * y);
            };
        } else if ( this.isVector(y) ) {
            for ( var i = 0; i < this.len(); i++ ) {
                yn.push(this.data[i] * y[i]);
            };
        };
        return yn;
    };
    X.zeros = function ( n ) {
        return Range(0, n).map( i => 0.0 );
    };
    X.grid = function ( a, b, n ) {
        var dx = (b - a) / n;
        return Range(0, n + 1).map( i => a + i * dx );
    };
    X.dot = function ( y ) {
        return this.prod( y ).reduce( ( xi, yi ) => xi + yi );
    };
    X.norm = function () {
        return Fw.get( "sqrt" )(
            Fw.get( "abs" )( this.dot(this.data) )
        );
    };
    X.unitary = function () {
        return this.prod( 1.0 / this.norm() );
    };
    X.eval = function ( f ) {
        if ( getType(f) == "function" ) {
            return this.data.map( xi => f( xi ) );
        };
    };
    return X;
};
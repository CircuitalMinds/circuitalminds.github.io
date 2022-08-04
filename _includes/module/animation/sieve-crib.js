function Coordinate ( e ) {
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
};

function newCanvas ( e, w, h ) {
    e.innerHTML = [
        "<canvas",
        "style='display: inline-block; max-width: 100%; max-height: 100%;'",
        "width=" + w + "px", "height=" + h + "px",
        "></canvas>"
    ].join(" ");
    return e.querySelector( "canvas" );
};

function sieveCrib ( n ) {
    var crib = $( "#sieve-crib" )[0];
    Coordinate( e );
    var pos = e.pos();
    var dw  = pos.w / 10;
    var anim = newCanvas( crib, pos.w, dw + dw * n / 10 );
    var primes = [2, 3, 5, 7];
    var prod = 1.0
    canvasObj.setGradient( obj.context );
            obj.context.strokeStyle = gradient;
            obj.context.beginPath();
            obj.context.stroke();
            obj.context.font = "15px Arial";
};


    sieveCrib: function ( N, Id="sieveCrib" ) {
            viewObj = $("#" + Id)[0];
            $("#" + Id + "-n")[0].innerHTML = N;
            obj = canvasObj.setModel( viewObj );
            Dx = obj.width / 10;
            obj.height = Dx + Dx * N / 10;
            primeNumbers = [];
            Prod = 1.0;
            setGenerator = [2, 3, 5, 7];
            gradient = canvasObj.setGradient( obj.context );
            obj.context.strokeStyle = gradient;
            obj.context.beginPath();
            obj.context.stroke();
            obj.context.font = "15px Arial";
            function setCrib ( Col, Row, n ) {
                if ( setGenerator.indexOf(n) != -1 ) {
                    primeNumbers.push( 1.0 / (1.0 - n ** -2) );
                    obj.context.strokeText(n, Row * Dx + Dx / 4, Col * Dx + 3 * Dx / 4);
                } else if ( setGenerator.filter( x => n % x != 0 ).length == 4 ) {
                    primeNumbers.push( 1.0 / (1.0 - n ** -2) );
                    obj.context.strokeText(n, Row * Dx + Dx / 4, Col * Dx + 3 * Dx / 4);
                };
            };
            Cn = 1;
            for ( var i = 0; i < N / 10; i++ ) {
                for (var j = 0; j < 10; j++ ) {
                    if ( Cn > 1 ) {
                        setCrib( i, j, Cn );
                    };
                    obj.context.rect(j * Dx, i * Dx, Dx, Dx);
                    Cn += 1;
                };
            };
            gradient = canvasObj.setGradient( obj.context );
            obj.context.strokeStyle = gradient;
            obj.context.stroke();
            $("#" + Id + "-Cn")[0].innerHTML = primeNumbers.length;
            primeNumbers.map( x => Prod *= x );
            $("#" + Id + "-Pi")[0].innerHTML = Math.sqrt( 6.0 * Prod );
    }
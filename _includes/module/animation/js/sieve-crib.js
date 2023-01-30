$( function () {

    var plt = IsoGraph();

    var sieve = $( "#sieve-crib" )[0];
    sieve.phi = sieve.querySelector( ".sieve-phi" );
    sieve.pi = sieve.querySelector( ".sieve-pi" );
    sieve.n = sieve.querySelector( ".sieve-n" );
    sieve.slide = sieve.querySelector( ".sieve-slide" );
    sieve.fig = plt.create( "sieve-fig" );
    var fig = sieve.fig.querySelector( "canvas" );
    sieve.fig.ctx = fig.getContext( "2d" );

    sieve.slide.onchange = function () {
        var w = fig.width / 10;
        sieve.fig.setH( w + w * ( this.value / 10 ) );
        sieve.table.iter( this.value );
    };
    sieve.table = {
        generator: [2, 3, 5, 7],
        isPrime: function ( i ) {
            if ( i <= 7 ) {
                return this.generator.indexOf( i ) != -1;
            } else {
                return this.generator.filter(
                    e => i % e != 0
                ).length == 4;
            };
        },
        iter: function ( n ) {
            var xn = 1;
            var w = fig.width / 10;
            print(w);
            sieve.fig.ctx.beginPath();
            sieve.fig.ctx.stroke();
            for ( var i = 0; i < n / 10; i++ ) {
                for (var j = 0; j < 10; j++ ) {
                    if ( this.isPrime( xn ) ) {
                        sieve.fig.strokeTxt( xn, j * w + w / 4, i * w + 3 * w / 4 );
                    };
                    sieve.fig.ctx.rect(j * w, i * w, w, w);
                    xn += 1;
                };
            };
            sieve.fig.ctx.stroke();
        }
    };
    sieve.fig.ctx.font = "15px Arial";
    sieve.slide.oninput = function () { sieve.table.iter( sieve.slide.value ) };

} );
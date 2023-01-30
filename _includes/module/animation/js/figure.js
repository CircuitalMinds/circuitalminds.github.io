$( function () {
    var e = $( "#anim-figure")[0];
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
} );

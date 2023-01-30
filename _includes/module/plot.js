function IsoGraph () {

    var plt = {
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
                var colors = plt.getPalette( name );
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

    return plt;

};
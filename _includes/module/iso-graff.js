$( function () {

    var Iso = $( "#iso-graff" )[0];

    Iso.color = {
        data: {{ site.data.cfg.style | jsonify }}
    };
    Iso.color.get = function ( name ) {
        return this.data.color[name];
    };
    Iso.color.palette = function ( name ) {
        return this.data.palette[name];
    };
    Iso.color.random = function () {
        var c = "#";
        var x = "0123456789ABCDEF";
        var h = x.length - 1;
        for ( var i = 0; i < 6; i++ ) {
            c += x[ Math.round( Math.random() * h ) ];
        };
        return c;
    };
    Iso.createGradient = function ( fig, name="main" ) {
        var grd = fig.ctx.createLinearGradient( 0, 0, fig.width, fig.height );
        var colors = this.color.palette( name );
        var size = colors.length;
        for ( var i = 0; i < colors.length; i++ ) {
            grd.addColorStop( (i + 1) / size, colors[i] );
        };
        return grd;
    };
    Iso.sty = function ( fig, grd ) {
        fig.fill = function () {
            fig.ctx.fillStyle = grd;
            fig.ctx.fillRect( 0, 0, fig.width, fig.height );
        };
        fig.stroke = function () {
            fig.ctx.strokeStyle = grd;
        };
    };

    Iso.create = function ( id ) {
        var e = $( "#" + id )[0];
        var size = e.getBoundingClientRect();
        e.innerHTML = [
            "<canvas",
            "style='display: inline-block; max-width: 100%; max-height: 100%;'",
            "width=" + size.width, "height=" + size.height,
            "></canvas>"
        ].join(" ");

        var fig = e.querySelector( "canvas" );

        fig.setX = function ( x ) { this.width = x };
        fig.setY = function ( y ) { this.height = y };

        fig.ctx = fig.getContext( "2d" );
        var grd = Iso.createGradient( fig );
        Iso.sty( fig, grd );

        fig.plot = function ( x, y ) {
            this.ctx.strokeStyle = "white";
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(x, this.height - y);
            for ( var i = 0; i < x.length; i++ ) {
                this.ctx.lineTo(x[i], this.height - y[i]);
                this.ctx.stroke();
            };
        };

        fig.clear = function () {
            this.ctx.clearRect(
                0, 0, this.width, this.height
            );
        };
        e.fig = fig;

    };
});
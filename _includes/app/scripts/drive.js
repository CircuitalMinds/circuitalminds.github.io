$( function () {
    ( function getStorage () {
        var fdata = {};
        var folders = getValues( $(".folders")[0].querySelectorAll("ul") );
        folders.map(
            fi => fdata[ fi.className.split( "-" )[1] ] = fi
        );
        function getFile ( y ) { return [
            "<li><a>", [y.name, y.date, y.size].join(" "),
            '<span class="icon mif-file-empty fg-teal"></span>',
            "</a></li>"
        ].join("") };
        fromStatic("data").get( "storage.json", function ( data ) {
            var cont = Object.entries( data.content );
            for ( x of cont ) {
                fdata[ x[0] ].innerHTML = x[1].files.map(
                    xi => getFile( xi )
                ).join( "\n" );
            };
        });
    } )();
    $( "#log-in" ).on( "click", function () {
        console.log( "logged" );
    });
    var viewer = $( ".viewer" )[0];
    viewer.closeAll = function () {
        $( ".viewer-default" ).css( "display", "block" );
        $( ".viewer-data" )[0].innerHTML = "";
    };
    viewer.open = function () {
        $( ".viewer-default" ).css( "display", "none" );
    };
    viewer.newFile = function () {
        return $( ".viewer-create" )[0].querySelector( "embed" ).cloneNode(true);
    };
    viewer.openJson = function () {
        var f = this.newFile();
        this.open();
        f.setAttribute( "type", "application/json" );
        $( ".viewer-data" )[0].appendChild( f );

    };
    $( ".close" ).on( "click", viewer.closeAll );
});
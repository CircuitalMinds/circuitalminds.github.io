function SideBar ( opt ) {
    
    var bar = $( "#mySidebar" )[0];
    var overlay = $( "#myOverlay" )[0];

    function close () {            
        hide( bar); hide( overlay );
    };

    function open () {
        if ( bar.style.display === 'block' ) {
            close();
        } else {
            show( bar ); show( overlay );
        };
    };
    
    if ( opt == "open" ) {
        open();
    } else if ( opt == "close" ) {
        close();
    };
};

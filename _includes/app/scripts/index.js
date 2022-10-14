function SideBar ( opt ) {
    
    var sidebar = $( "#mySidebar" )[0];
    var overlay = $( "#myOverlay" )[0];

    if ( opt == "open" ) {
        if ( sidebar.style.display === 'block') {
            sidebar.style.display = 'none';
            overlay.style.display = "none";
        } else {
            sidebar.style.display = 'block';
            overlay.style.display = "block";
        };
    } else if ( opt == "close" ) {
        sidebar.style.display = "none";
        overlay.style.display = "none";
    };

};

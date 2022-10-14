function getUser() {
    return $("#user-data")[0];
};

function InvalidEvent ( x ) {
    var y  = $( x );
    y.addClass( "ani-ring" );
    setTimeout( function () {
        y.removeClass( "ani-ring" );
    }, 1e3);
};
function getLogin ( e ) {
    $( "#api" )[0].getlogin({  
        email: e.querySelector( 
            'input[placeholder="Email"]' 
        ).value,
        password: e.querySelector( 
            'input[placeholder="Password"]'
        ).value
    });
};

function login ( form ) {
    
    var req = {
        email: form.querySelector( 'input[name="email"]' ).value,
        password: form.querySelector( 'input[name="password"]' ).value
    };

    Http( 
        '{{ site.api_url }}' 
    ).post( 
        '/login/', req,
        function ( res ) {
            var msg = $( "#response-message" )[0];
            msg.innerHTML = ( res.authorized ) ? "Authorized" : "Unauthorized";
        }
    );

};

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

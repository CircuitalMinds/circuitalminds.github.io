function InvalidEvent ( x ) {
    var y  = $( x );
    y.addClass( "ani-ring" );
    setTimeout( function () {
        y.removeClass( "ani-ring" );
    }, 1e3);
};
function Login () {
    Http.Post(
        Http.Url(),
        {
            email: $( 'input[placeholder="Email"]' )[0].value,
            password: $( 'input[placeholder="Password"]' )[0].value
        },
        Print
    );
};
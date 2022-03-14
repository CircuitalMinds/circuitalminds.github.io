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
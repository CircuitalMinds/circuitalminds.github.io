let Api = $("#api-root")[0];
Api.Url = Str.join( ["http://192.168.50.7:5000", "api"] );
Api.Data = {
    q: [
      ".c-newsletter-form",
      ".social-profiles",
      "#login-data",
      ".footer-social",
      ".share-list",
      ".fb-like",
      "#disqus_thread"
    ]
};
Api.htmlQuery = function ( x ) {
    var i = List(
        this.Data.q.map( qi => qi.replace( qi[0], "" ) )
    ).index( x );
    return ( i ) ? $( this.Data.q[i] )[0] : undefined;
};

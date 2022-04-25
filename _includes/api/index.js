$( function () {
    let api = $( "#api-root" )[0];
});


function fromStatic ( path ) {
    return Http([
        "{{ site.static_url }}",
        ( getType(path) == "array" ) ? path.join("/") : path
    ].join("/"));
};


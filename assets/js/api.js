var Api = new Object();
Api.responses = {
    data: [],
    scheme: function ( url, datatype="json" ) {
        var obj = {request: url, response: ( datatype == "json" ) ? {} : "" };
        return obj;
    }
};

Api.call = function ( method, query, params={} ) {
    isMethod = ( method != undefined ) ? this.Data.methods.indexOf(method) : false;
    isQuery = ( query != undefined ) ? this.Data.books.indexOf(query) : false;
    isQuery = ( query != undefined ) ? this.Data.resources.indexOf(query) : false;
    if ( isMethod || isQuery ) {
        url = [this.Data.url, method, query].join("/");
        if ( Object.keys(params).length > 0 ) {
            url += "?" + Object.keys(params).map( x => x + "=" + params[x] ).join("&");
        };
        obj = this.responses.scheme(url);
        $.get(url).done(function (data) {
            console.log(data);
            obj.response = data;
            this.responses.data.push(obj);
        });
    } else {
        return {response: "request invalid"};
    };
};

Api.getGeolocation = function() {
    if ( navigator.geolocation ) {
        navigator.geolocation.watchPosition(
            function ( position ) {
                ["latitude", "longitude"].map(
                    console.log(position.coords[k])
                );
            }
        );
    };
    console.log(this.Data.geolocation);
};
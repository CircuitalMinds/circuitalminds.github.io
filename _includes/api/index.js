$( function () {
    let api = $( "#api" )[0];

    api.Login = {
        get: function () {
            return {
                user: $("input[name=username]")[0],
                pwd: $("input[name=password]")[0]
            }
        }
    };

    let Drive = {
        url: '{{ site.url }}/storage',
        folders: ["documents", "pictures", "videos", "notebooks"],
        data: {}
    };
    Drive.getFolder = function ( name ) {
        Http( this.url ).get( name, function ( r ) { Drive.data[name] = r }, "text" );
    };
    api.Drive = Drive;    
});


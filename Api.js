var Api = {
    url: 'https://circuitalminds.github.io',
    logo: 'https://avatars.githubusercontent.com/u/75770878?s=400&u=85be0810ccfb5f56a393f71cf971021f087c5a59&v=4',
    applications: ['chat_app', 'video_app'],
    notebooks: {},
    geolocation: {latitude: '', longitude: '', accuracy: ''}    
};
Api.get_location = function () {
    var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
    };
    function success( position ) {
        var data = position.coords;
        Object.keys(Api.geolocation).map( k => Api.geolocation[k] = data[k] );
    };
    function error( err ) {
        console.warn(
            'ERROR(' + err.code + '): ' + err.message
        );
    };
    navigator.geolocation.getCurrentPosition(
        success, error, options
    );
};

Api.get_notebooks = function () {
    function get_data (topic) {
        url = [
            "https://raw.githubusercontent.com/alanmatzumiya",
            topic, "main/notebooks_data.json"
        ].join("/");
        Api.notebooks[topic] = {};
        Api.notebooks[topic] = Api.get(url);
    };
    ['engineering-basic', 'data_analysis'].map(
        topic => get_data(topic)
    );    
};    
Api.notebooks.set_data = function ( topic, module ) {
    data_list = Api.notebooks[topic][module];
    return [
        "<ul>",
        data_list.map(
            l => ['<li><p><a href="', l.url_app, '" >', l.name.replace('.ipynb', ''), '</a></p></li>'].join('')
        ).join("\n"),
        "</ul>"                 
    ].join("\n");
};

function init_app () {
    url = 'https://circuitalminds.github.io';
    function app_scheme ( data ) {
        this.url = url;
        this.data = get_request(this.url + '/search.json');
        app_scheme.prototype.get = function ( query ) {
            result = filter_object(this.data, query);
            if ( result.length != 0 ) {
                return result;
            } else {
                return 'data not found';
            };
        };
    };
    class create_app extends app_scheme {
        get (q) {
            return super.get(q);
        };
    };
    app = new create_app();
    return app;
};

function App ( name ) {
    if ( Api.applications.indexOf(name) != undefined ) {
        var Obj = $("#" + name)[0];
        Obj.src = '"' + [Api.url, name].join('/') + '/"';
        Obj.img = '"' + Api.logo + '"';
        Obj.open_view = [
            '<iframe src=' + Obj.src,
            'class="image fit"', 'allow="accelerometer;', 'autoplay;', 'encrypted-media;',
            'gyroscope;', 'picture-in-picture"', 'allowfullscreen="true"', 'width="100%"',
            'height="300px"', 'frameborder="0"',
            '></iframe>'
        ].join(" ");
        Obj.close_view = [
            '<img src=' + Obj.img,
            'class="container reveal-in"',
            'style="width: 100%; border: 1px solid #1abc9c;" >'
        ].join(" ");
        Obj.open = function () { this.innerHTML = this.open_view };    
        Obj.close = function () { this.innerHTML = this.close_view };
        return Obj;
    };
};

function time_clock () {
    var clock_obj = $('#time-clock')[0];
    if ( clock_obj != undefined ) {
        start = setInterval( function () {
            datetime = new Date();
            clock_obj.innerHTML = [
                datetime.toLocaleDateString(),
                datetime.toLocaleTimeString()                
            ].join(" - ");
        }, 1000);
    };
};
window.onload = function () {
    time_clock();
};
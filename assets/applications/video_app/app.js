var App = $("#video-media")[0];
App.video_title = $('#video-title')[0];
App.random = $("#random")[0];
App.set_volume = function ( option ) {
    if ( option == '+' & this.volume != 1 ) {
        this.volume += 0.1;
    } else if ( option == '-' & this.volume != 0 ) {
        this.volume -= 0.1;
    };
};
App.onplay = function () {this.play()};
App.onpause = function () {this.pause()};
function set_video_data ( data ) {
    data_list = Object.keys(data);
    key_list = [
            'video_id', 'description', 'duration',
            'interaction_count', 'keywords', 'image', 'url'
    ];
    for ( v of data_list ) {
        w = data[v];
        t = w.title;
        video_object.data[t] = {};
        video_object.list.push(t);
        key_list.map( k => video_object.data[t][k] = w[k] );
    };
};
function get_videos () {
    var request = new XMLHttpRequest();
    request.open('GET', video_object.url);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        var data = request.response;
      	set_video_data(data);
    };
};
App.set = function ( data ) {
    v = video_object.get_video(data);
    this.video_title.innerHTML = v.title;
    this.src = v.data.url;
};
App.get = function ( option ) {
    if ( this.random.checked || this.video_title.textContent == '' ) {
        this.set(video_object.get_random_title());
    } else {
        n = video_object.list.indexOf(this.video_title.textContent) + {'previous': -1, 'next': 1}[option];
        if ( 0 <= n < video_object.list.length ) {
            this.set(n);
        } else {
            this.set(video_object.get_random_title());
        };
    };
    this.play();
};
function get_query ( q ) {
    if ( q == '' ) {
        search_template.set_data('');
    } else if ( search_template.query != q ) {
        results = video_object.get_matches(q).map( x => video_object.get_video(x) );
        search_template.query = q;
        if ( results.length == 0 ) {
            search_template.set_data(search_template.get_list(''));
        } else {
            rows = '';
            for ( var i = 0; i < results.length; i++ ) {
                if ( i < 10 ) {
                    v = results[i];
                    rows += search_template.get_row(v.index, v.title, v.data) + '\n';
                } else {
                    break;
                };
            };
            search_template.set_data(search_template.get_list(rows));
        };
        return results;   
    };
};
var colors = [
    "#040404",
    "#d71839",
    "#9e0843",
    "#3469a2",
    "#69c1a4",
    "#f3dc9a",
    "#61122f",
    "#0b2e4d",
    "#1d4b60",
    "#2d050c",
    "#820e23"
];
$("#colors-1")[0].innerHTML = colors.map(
    c => '<div class="cell-md-1" style="background-color: ' + c + ';"></div>'
).join("\n");
$("#colors-2")[0].innerHTML = colors.reverse().map(
    c => '<div class="cell-md-1" style="background-color: ' + c + ';"></div>'
).join("\n");
function set_feed ( index, title, data ) {
    $("#feed")[0].innerHTML = search_template.get_row(index, title, data);
};
function time_clock () {
  start = setInterval( function () {
      clock_obj = $('#time-clock')[0];
      date_obj = $('#date')[0];
      datetime = new Date();
      date_obj.innerHTML = datetime.toLocaleDateString();
      clock_obj.innerHTML = datetime.toLocaleTimeString();
  }, 1000);
};
window.setInterval( function () {
    t = video_object.get_random_title();
    v = video_object.get_video(t);
    set_feed(v.index, v.title, v.data);
}, 5000);
$( document ).ready(function() {
    get_videos();
    App.poster = "https://circuitalminds.github.io/static/images/pages/julia.gif";
    if ( $('#time-clock')[0] != undefined ) {
        time_clock();
    };
});
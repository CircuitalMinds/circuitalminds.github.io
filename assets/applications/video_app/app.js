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
        search_template.reset();
    } else if ( search_template.query != q ) {
        results = video_object.get_matches(q).map( x => video_object.get_video(x) );
        search_template.query = q;
        if ( results.length > 0 ) {
            search_template.pages = [];            
            rows = [];
            for ( var i = 0; i < results.length; i++ ) {
                if ( rows.length == 3 ) {
                    search_template.pages.push(search_template.get_list(rows.join('\n')));
                    rows = [];
                } else {                    
                    v = results[i];
                    rows.push(search_template.get_row(v.index, v.title, v.data));
                };
            };
            if ( rows.length > 0 ) {
                search_template.pages.push(search_template.get_list(rows.join('\n')));
            };
            search_template.set_data();
        };
    };
};

function set_colors ( colors_data ) {
    function colors_row ( data ) {
        return data.map( c => 
            '<div class="cell-md-1" style="background-color: ' + c + ';"></div>'
        ).join("\n");
    };
    colors_top.innerHTML = colors_row(colors_data);
    colors_bottom.innerHTML = colors_row(colors_data.reverse());
};

function range (start, stop, step=1) {
    return Array.from(
    	  {length: (stop - start - 1) / step + 1}, (_, i) => start + (i * step)
    );
};
var randint = ( a, b ) => ( a + Math.round(Math.random() * (b - a)) );
var is_element = ( e, data ) => ( data.indexOf(e) != -1 );
function random_array ( a, b, n ) {
    var array_data = [];  	
    while ( array_data.length < n ) {
        ri = randint(a, b);
        if ( is_element(ri, array_data) == false ) {
            array_data.push(ri);
        };
    };
    return array_data;
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
    feed_list = $("#feed-playlist")[0];
    rows = '';
    for ( var i = 0; i < 4; i++ ) {
        t = video_object.get_random_title();
        v = video_object.get_video(t);
        rows += search_template.get_row(v.index, v.title, v.data) + '\n';
    };
    feed_list.innerHTML = rows;
}, 5000);
$( document ).ready(function() {
    App.poster = "https://circuitalminds.github.io/assets/img/pages/julia.gif";
    if ( $('#time-clock')[0] != undefined ) {
        time_clock();
    };
});
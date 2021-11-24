function set_iframe ( id, url, w='100%', h='300px' ) {
    $(`#${id}`)[0].innerHTML = `<iframe src="${url}" class="image fit" width="${w}" height="${h}"
            allow="accelerometer; autoplay; encrypted-media; gyroscope;
            picture-in-picture" allowfullscreen="true" frameborder="0">
    </iframe>`;
};

function open_form( Id ) {
    $("#" + Id)[0].style.display = "block";
};
  
function close_form( Id ) {
    $("#" + Id)[0].style.display = "none";
};

function object_size ( obj ) {
    return [
      obj.clientWidth, obj.clientHeight
    ];
};

function object_resize ( obj, w, h ) {
    obj.style.width = w + 'px';
    obj.style.height = h + 'px';
}

function object_boundary ( obj ) {
    var rect = obj.getBoundingClientRect();
    return {
      top: rect.top,  bottom: rect.bottom,
      left: rect.left, right: rect.right
    };
};

function demoDragMoveEvent(el, pos){
    $('#-pos-x').text(pos.x);
    $('#-pos-y').text(pos.y);
};

function GetColor ( w ) {
    if ( typeof(w) == 'string' ) {
        return Object.values(Colors).filter(
            c => c.toLowerCase().match(w.toLowerCase()) != null
        )
    } else if ( typeof(w) == 'number' ) {
        return Colors[w]
    }
};

function time_clock () {
    var clock_obj = document.querySelectorAll('div[id="time-clock"]');
    function set_clock ( obj ) {
        if ( obj != undefined ) {
            start = setInterval( function () {
                datetime = new Date();
                obj.innerHTML = [
                    datetime.toLocaleDateString(),
                    datetime.toLocaleTimeString()                
                ].join(" - ");
            }, 1000);
        };  
    };
    for ( obj of clock_obj ) {
        set_clock(obj);
    };
};

function SetImageView ( static_path ) {
    function OnMouse( cover ) {
        return function () { showImage(cover) }
    };
    function OnClick( cover ) {
        return function () { showImage(cover) }
    };
	Img = $("div.img");
    Object.keys(Img).map(
    	k => Img[k].onclick = function () {
            name = this.style['background-image'].split('(\"')[1].split('\")')[0].split('/').reverse()[0];
            showImage(static_path + '/images/blog/posts/' + name)
        }
    );
   	Divs = $('div[data-role="tile"]');
   	Links = $('a[data-role="tile"]');
  	for ( x of [Divs, Links] ) {
  	    y = Object.values(x).filter( c => c.dataset != undefined ).filter( ci => ci.dataset.cover != undefined );
		for ( w of y ) {
		    if ( w.href != '' ) {
		        w.onmouseover = OnMouse(w.dataset.cover);
		    } else {
		        w.onclick = OnClick(w.dataset.cover);
		    };
		};
    };
};
function showImage ( image ){
    Metro.dialog.create({
        title: "Animation demo",
        content: '<img src="' + image + '" >',
        onShow: function(){
            var el = $(this);
            el.addClass("ani-swoopInTop");
            setTimeout(function(){
                el.removeClass("ani-swoopInTop");
            }, 500);
        },
        onHide: function(){
            console.log("hide");
            var el = $(this);
            el.addClass("ani-swoopOutTop");
            setTimeout(function(){
                //el.removeClass("ani-swoopOutTop");
            }, 5000);
        }
    });
};

$(function () {        
    var clockObj = $("#clock")[0];
    var dateObj = $("#date")[0];    
    setInterval( function () {
        datetime = new Date();
        if ( clockObj != undefined ) {
            clockObj.innerHTML = datetime.toLocaleTimeString();
        };
        if ( dateObj != undefined ) {        
            dateObj.innerHTML = datetime.toLocaleDateString();
        };
    }, 1000);
});

function set_colors ( colors_data ) {        
    return colors_data.map(
        c => `<div class="cell-md-1" style="background-color: ${c};"></div>`
    ).join("\n");
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

function colorGrad ( colors ) {
    return 'background-image: linear-gradient(60deg, ' + colors.map(
        c => `${c} ${Math.round(100 / colors.length) * colors.indexOf(c)}%, `
    ).join('') + '#1abc9c 100%); background-size: cover;';
};
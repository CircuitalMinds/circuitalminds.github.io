function open_form() {
    $("#myForm")[0].style.display = "block";
};
  
function close_form() {
    $("#myForm")[0].style.display = "none";
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

function randomPointOnCircle(radius) {
  angle = Math.random() * 2 * Math.PI;
  return {x: radius * Math.cos(angle),
          y: radius * Math.sin(angle)};
};

function set_modal ( button_id, modal_id, content ) {
    modal = document.getElementById(modal_id);  
    modal.innerHTML = [
        '<div class="modal-content">', 
        '<div class="modal-header">',
        '<span class="close">&times;</span>',
        '<h2>', content.header, '</h2>',
        '</div>',
        '<div class="modal-body">', content.body, '</div>',
        '<div class="modal-footer">',
        '<h3>', content.footer, '</h3>',
        '</div>',
        '</div>'
    ].join("\n");
    close = modal.querySelector('span');
    modal_button = document.getElementById(button_id);
    modal_button.onclick = function() {
        modal.style.display = "block";
    };
    close.onclick = function() {
        modal.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        };
    };
};

function set_accordion ( id, content ) {
    accordion = document.getElementById(id);
    accordion.innerHTML = [
        '<div class="accordion accordion-flush" id="' + id + '">',
        '<div class="accordion-item">',
        '<h2 class="accordion-header" id="flush-heading-' + id + '">',
        '<button class="accordion-button collapsed bg-darklight fg-teal ontouch" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-' + id + '" aria-expanded="false" aria-controls="flush-collapse-' + id + '">',
        content.header,
        '</button>',
        '</h2>',
        '<div id="flush-collapse-' + id + '" class="accordion-collapse collapse bg-darklight" aria-labelledby="flush-heading-' + id + '" data-bs-parent="#' + id + '">',
        '<div class="accordion-body">', content.body, '</div>',
        '</div>',
        '</div>',
        '</div>'
    ].join("\n");
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
}


function Time_Clock () {
    window.onload = function () {
        obj = $('#clock')[0];                
        if ( obj != undefined ) {    
            init = setInterval( function () {  
                datetime = new Date();
                obj.innerHTML = datetime.toLocaleTimeString();  
            }, 1000);
        };        
    };
};

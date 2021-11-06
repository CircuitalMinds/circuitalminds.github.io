function GetRequest (
    url, handler={
        response: {},
        get: () => ( this.response ),
        get_data: function ( X, Y=this.response ) {
            Object.keys(X).map( k => Y[k] = X[k] );
        }
}) {
var response_data = {};         
$.ajax({
   type: 'GET',
   dataType: 'json',
   url: url,
   success: function( data ) {
       handler.get_data(data);
       console.log(response_data);
       }
   });
  return handler;
};
function get_request ( url_data ) {
		let request_url = url_data;
		var request_data = new Object;
		let request = new XMLHttpRequest();
		request.open('GET', request_url);
		request.responseType = 'json';
		request.send();
		request.onload = function() {
			data = request.response;
			Object.keys(data).forEach( k => request_data[k] = data[k] );
		};
		return request_data;
	};
	function get ( url ) {
		response = get_request(url);
		setTimeout( () => {
			return response;
		}, 2000);
};

  
function DocumentQuery ( element={all_matches: true} ) {
    var data;
    get_data = ( q ) => (
        element.all_matches == true 
    ) ? data=$(q) : data=$(q)[0];
    if ( element.id != undefined ) {
        get_data('#' + element.id);        
    } else {
        if ( element.name != undefined && element.key == undefined ) {
            get_data(element.name);
        } else if ( element.name != undefined && element.key != undefined && element.value != undefined ) {
            if ( element.key == 'cls' ) {
                get_data(element.name + '.' + element.value);
            } else {
                get_data([
                    element.name, 
                    '[', element.key, '="', element.value, '"]'
                ].join(''));
            };
        };    
    };        
    return data;
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


function iter_string ( str, start, end ) {
    var new_string = '';
    for ( var i = start; i < end; i++ ) { 
        new_string += str[i];
    };
    return new_string;
};

function startswith_upper ( str ) {
    return str[0] + iter_string(str, 1, str.length);
};

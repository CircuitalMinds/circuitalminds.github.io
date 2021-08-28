var Api = {
    url: 'https://circuitalminds.github.io',
    geolocation: {},
    resources: {},
    request_data: {},
    storage: {}
};

Api.template_builder = function ( object_name ) {
    function set_attrs ( attrs_data ) {
        return Object.keys(attrs_data).map(
            key => key + '="' + attrs_data[key] + '"'
        ).join(' ');
    };
    var prototypes_data = {
        img: {
            attrs: {
                "src": '',
                "class": 'container reveal-in',
                "style": 'width : 100%; border: 1px solid #1abc9c;'
            },
            get_object: function ( src ) {
                this.attrs.src = src;
                return '<img ' + set_attrs(this.attrs) + '>';
            }
        },
        iframe: {
            attrs: {
                "src": '', "height": '100%', "width": '100%', "class": 'image fit',
                "frameborder": '0',
                "allow": 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
                "allowfullscreen": 'true'
            },
            get_object: function ( src ) {
                this.attrs.src = src;
                return '<iframe ' + set_attrs(this.attrs) + '></iframe';
            }
        }
    };
    return prototypes_data[object_name];
};

Api.get_tag = function ( name, attr_name='', attr_value='' ) {
    if ( attr_name == '' & attr_value == '' ) {
        return $(name);
    } else if ( attr_value == '' ) {
        return $(name + '[' + attr_name + ']');
    } else {
        obj_data = $(name + '[' + attr_name + '="' + attr_value + '"]');
        if ( obj_data.length == 1 ) {
            return obj_data[0];
        } else {
            return obj_data;
        };
    };
};

Api.set_metadata = function ( attr_name, attr_value, content_value ) {
    obj = get_tag('meta', attr_name, attr_value)
    obj.setAttribute('content', content_value);
};

Api.filter_object = function ( data, target='all' ) {
    if ( target == 'all' ) {
        return data;
    } else if ( data.length != undefined ) {
  		return data.filter( e => e == target );
    } else {
        return Object.keys(data).filter( e => e == target );
    }
}

Api.create_object = function ( dict_data={} ) {
    obj = {};
    if ( dict_data == {} ) {
        return obj;
    } else {
        Object.keys(dict_data).map( k => obj[k] = dict_data[k] );
        return obj;
    };
};

Api.create_array = function ( size, start=0, step=1 ) {
    new_array = [];
    counter = start;
    while ( counter < start + size ) {
        new_array.push(counter);
        counter += step;
    };
    return new_array;
};

Api.partitions = function ( array_data, n ) {
    sn = Math.ceil(array_data.length / n);
    arrays = create_array(sn).map(
        s => create_array(n, s * n, 1)
    );
    return arrays.map( arr => arr.map( x => array_data[x] ) );
};

Api.iter_array = function ( data, start, end ) {
  iter_data = [];
  for ( var i = start; i < end; i++ ) {
       if ( i == data.length ) {
           break;
       } else {
           iter_data.push(data[i]);
       };
  };
  return iter_data;
};

Api.get = function ( url, datatype='', type='GET' ) {
  	options = {
      url: url, type: type, dataType: datatype
    };
   	var response = new Object;
  	options.url = url;
  	if ( datatype == '' ) {
  	    options.dataType = url.split('/').reverse()[0].split('.')[1];
  	};
  	if ( options.dataType == 'json' ) {
        options.success = function ( data ) {
            Object.keys(data).map( k => response[k] = data[k] );
        };
    } else {
      	if ( options.dataType != 'html' ) {
      		options.dataType = '';
        };
      	options.success = function ( data ) {
        	response.data = data;
        };
    }
   	$.ajax(options);
    return response;
};

Api.query_data = Api.get('data/query.json');
Api.query = function ( q ) {
    return this.query_data[q];
};

Api.create_template = function ( data, selector='' ) {
    doc = document.createElement('template');
    doc.innerHTML = data;
    content = doc.content;
    if ( selector == '' ) {
        return content;
    } else {
        return content.querySelectorAll(selector);
    }
};
Api.add_listener = function ( ) {
    var obj = document;
    for ( n in obj ) {
        if ( typeof( obj[n] ) == 'object' ) {
            obj[n].addEventListener("mousedown", function (event) {
                console.log(obj[n]);
            });
        }
    };
};

Api.Git = function ( data='', repo='' ) {
    g = {
        url: "https://api.github.com",
        user: "circuitalminds"
    };
    response = response_data();
    function get_data (q) {
        $.get(q, function ( data ) { response['data'] = data } );
    };
    if ( data == '' & repo == '' ) {
        get_data([g.url, "users", g.user, "repos"].join('/'));
    } else if ( data == 'repos' & repo != '' ) {
        get_data([g.url, data, g.user, repo].join('/'));
    };
    return response;
};

Api.get_location = function () {
    var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
    };
    function success( position ) {
        var data = position.coords;
        ['latitude', 'longitude', 'accuracy'].map( k=> location_data[k] = data[k] );
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


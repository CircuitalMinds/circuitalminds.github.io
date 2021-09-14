


function get_request ( url, datatype='json' ) {
    if ( datatype == 'json' ) {
        response_data = {};
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            success: function( request_data ) {
                for ( key in request_data ) {
                    response_data[key] = request_data[key]
                }
            }
        });
        return response_data;
    } else if ( datatype == 'html' ) {
        var html_file = document.createElement('template');
        $.ajax({
            type: 'GET',
            url: url,
            success: function( request_data ) {
                html_file.innerHTML = request_data;
            }
        });
        return html_file;
    }
};


var web_url = 'https://circuitalminds.github.io';

function get_template ( url, tag='' ) {
    template = get_request(url, 'html');
    return template.content;
};

function AppObject ( data ) {
    this.data = data;
    AppObject.prototype.get = function ( query ) {
        if ( this.data[query] != undefined ) {
            return this.data[query];
        } else {
            return 'data not found'
        };
    };
};

class CreateApp extends AppObject {
    get(q) {
        return super.get(q);
    };
};

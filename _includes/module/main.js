// Import Modules

{% include module/utils.js %}

{% include module/plot.js %}

/*
==================================================
    BUILTINS
==================================================
*/

{% assign app = site.data.app %}

var app = Http( '{{ site.app }}' );

app.env = function () {
    return '{{ jekyll.environment }}';
};

function fromStatic ( path ) {
    return Http( ['{{ site.static_url }}', path].join("/") );
};

function createLogin ( id, btn_id ) {
	var login = tquery( "id", id );
    
    $( "#" + btn_id )[0].onclick = function() {
    	$( ".menu-close" )[0].click();
    	login.show();
	};
	
    var closebtn = $( "#" + id + " span.close" );    
    closebtn[0].onclick = function () { login.hide() };
    closebtn[1].onclick = function () { login.hide() };
	
    window.onclick = function( event ) {
		if ( event.target == login ) {
			login.hide();
		};
	};	

};

function getLogIn () {

    var login = $( "#login-data" )[0];
    login.get = login.querySelector( ".login-button" );
    login.get.onclick = function () {
        print({
            username: login.querySelector( "input[name=username]" ).value,
            password: login.querySelector( "input[name=password]" ).value
        });
    };

};

function getJupyter ( topic ) {

    function getDropDown ( id, content ) {

        var Header = content.header;
        var Body = content.body;
        return `{%
            include {{ site.module-element.accordion }}
            id='${id}' header='${Header}' body='${Body}'
        %}`;

    };

    function handler ( x ) {

        var content = x.content;
        var outdata = "";
        var tbody = "";

        for ( m of getkeys( content[topic] ) ) {
            var mbody = "<ul>";
            for ( xi of content[topic][m] ) {
                mbody += '<li><a href="' + [x.root, xi.path].join("/") + '">' + xi.name.replace(".ipynb", "") + '</a></li>';
            };
            mbody +=  "</ul>";
            tbody += getDropDown(
                topic + "_" + m,
                { header: "Module " + m, body: mbody }
            );
        };
        outdata += getDropDown(
            topic,
            {
                header: topic.split( "_" ).map(
                    ti => ti[0].toUpperCase() + ti.slice(1)
                ).join( " " ),
                body: tbody
            }
        );

        $( "#jupyter-" + topic )[0].innerHTML = outdata;

    };

    fromStatic( "data" ).getjson( 
        "notebooks.json", handler
    );

};

/*
==================================================
    Builtins
==================================================
*/


function saveFile ( name, data ) {
    data = JSON.stringify( data, null, 4 );
    if ( typeof( Blob ) != "undefined" ) {
        var textFileAsBlob = new Blob(
            [data],
            {type: 'text/plain'}
        );
        var downloadLink = document.createElement("a");
        downloadLink.download = name;
        if ( window.webkitURL != null ) {
            downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        } else {
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = document.body.removeChild(event.target);
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }
        downloadLink.click();
    } else {
        var pp = document.createElement('a');
        pp.setAttribute(
            'href', 
            'data:text/plain;charset=utf-8,' + encodeURIComponent( data )
        );
        pp.setAttribute('download', name);
        pp.onclick = document.body.removeChild(event.target);
        pp.click();
    };
};

function getTemplate ( id, content_id ) {

    var template = $( "#" + id )[0];
    var content = $( "#" + content_id )[0];
    cloned = template.content.cloneNode( true );
    content.textContent = cloned.textContent;

};




/*
==================================================
    Site-Data
==================================================
*/


var currentPage = '{{ page.title }}';
var sitePages = [];

{%- for p in site.pages -%}
{%- if p.title -%}
sitePages.push({
    "title": '{{ p.title }}',
    "name": '{{ p.name }}',
    "image": '{{ p.image }}',
    "url": '{{ p.url }}',
    "path": '{{ p.path }}',
    "tags": {{ p.tags | split: ", " | jsonify }}
});
{%- endif -%}
{%- endfor -%}

---
layout: page
title: Applications
permalink: /applications/
image: zeta_function.gif
---


{% for app in site.view_apps %}
### {{ app.caption }}

***

<button value="open" onclick="manager_app('{{ app.id }}', this.value)">Open</button>
<button value="close" onclick="manager_app('{{ app.id }}', this.value)">Close</button>
<div id="{{ app.id }}" class="container">
<img class="container reveal-in" style="width : 100%; border: 1px solid #1abc9c;" src="{{site.img}}/demo/{{app.image}}">
</div>

***
{% endfor %}

<script>
var Templates = "https://circuitalminds.github.io/templates/";
var Static = "https://circuitalminds.github.io/static/";
var Apps = {
	"desktop": {template: Templates + 'desktop'},
	"music_app": {template: Templates + 'applications/music_app'},
	"console_app": {template: Templates + 'applications/console_app'},
	"chat_app": {template: Templates + 'applications/chat_app'},
	"inbox_app": {template: Templates + 'applications/inbox_app'}
};

for ( name in Apps ) {
	Apps[name].image = $("#" + name)[0].getElementsByClassName("container reveal-in")[0].src;
};

function open_app ( data_src ) {
    iframe_object =  '<iframe src="SRC" '.replace("SRC", data_src)
                     + 'height="550px" width="100%" class="image fit" frameborder="0" '
                     + 'allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=true'
                     + ' ></iframe>';
    return iframe_object
};

function close_app ( data_src ) {
    img_object = '<img src="SRC" '.replace("SRC", data_src)
                 + 'class="container reveal-in" style="width : 100%; border: 1px solid #1abc9c;" >';
    return img_object;
}

function manager_app ( name, status ) {    
	App = Apps[name];
    if ( status == "open" ) {
        template = open_app(App.template);
        view_app = document.getElementById(name);
        view_app.innerHTML = template;
    } else if ( status == "close" ) {        
        template = close_app(App.image);
        view_app = document.getElementById(name);
        view_app.innerHTML = template;
    };
};

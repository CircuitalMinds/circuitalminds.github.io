---
layout: page
title: Desktop App
permalink: /desktop_app/
image: zeta_function.gif
---

<div id="desktop_app" class="container"></div>

***

{% for pic in site.picsdemo %}
<img class="container reveal-in" style="width : 100%; border: 1px solid #1abc9c;" src="{{site.img}}/demo/{{pic}}">
{% endfor %}


<script>
var App = document.getElementById("desktop_app");
App.innerHTML = Object_App("iframe", App.id);

function getGraph() {
    let graphRequestURL = '';
    let requestGraph = new XMLHttpRequest();
    var a = '&a=' + document.getElementById("a").textContent;
    var b = '&b=' + document.getElementById("b").textContent;
    var n = '&n=' + document.getElementById("n").textContent;
    var func = '&function=' + document.getElementById("function").value;
    console.log(graphRequestURL + a + b + n + func);
    requestGraph.open('GET', graphRequestURL + a + b + n + func);
    requestGraph.responseType = 'json';
    requestGraph.send();
    requestGraph.onload = function() {
        jsonGraph = requestGraph.response;
        document.getElementById("graph").innerHTML = jsonGraph["output"];
    };
};
</script>


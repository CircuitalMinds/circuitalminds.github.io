---
layout: page
title: Desktop App
permalink: /desktop_app/
image: zeta_function.gif
---

<div id="desktop" class="container"></div>

***

{% for pic in site.picsdemo %}
<img class="container reveal-in" style="width : 100%; border: 1px solid #1abc9c;" src="{{site.img}}/demo/{{pic}}">
{% endfor %}


<script>
var App = document.getElementById("desktop");
App.innerHTML = Object_App("iframe", App.id);
</script>


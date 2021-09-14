---
layout: page
title: Resources
permalink: /resources
image: zeta_function.gif
---

### Video App

***

<button onclick="video_app.open()">Open</button>
<button onclick="video_app.close()">Close</button>
<div id="video_app" class="container">
<img class="container reveal-in" style="width : 100%; border: 1px solid #1abc9c;" src="{{ site.logo }}">
</div>
<script>
var video_app = new Object;
window.onload = function () {
    video_app = App('video_app');
};
</script>

***
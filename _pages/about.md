---
layout: page
title: About
image: about.jpg
permalink: /about/
---

{% include page/about.html %}

<video id="videofile"></video>
<script>

const videofile = document.getElementById("videofile");
const obj_url = URL.createObjectURL(blob);
videofile.src = obj_url;
videofile.play();
URL.revokeObjectURL(obj_url);

</script>
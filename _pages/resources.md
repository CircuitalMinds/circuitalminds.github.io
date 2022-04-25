---
layout: page
title: Resources
image: resources.png
permalink: /resources/
---

<div id="console-out"></div>
<input type="text" id="console-in"/>
<button id="console-run">Run</button>
<script>
$(  function () {
    var Out = $("#console-out")[0];
    var In = $("#console-in")[0];
    $("#console-run")[0].onclick = function () {
        Out.innerHTML =  eval( In.value );
    };
});
</script>

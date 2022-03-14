---
layout: page
title: About
image: about.jpg
permalink: /about/
---

<div class="wh-100-10-center"> 
{% for item in site.data.page.about %}
<div class="wh-100-100-left ontouch">
{{ item[0] | capitalize }}: {{ item[1] }}
</div>
{% endfor %}
</div>

### By Name

***

{% for x in site.data.colors.byName %}
<p style="color: {{ x[1] }};">{{ x[0] }}: {{ x[1] }}</p><div class="row wh-60-30-right" style="background: {{ x[1] }};"></div>
{% endfor %}

***

### Spectral 

***

{% for x in site.data.colors.Spectral %}
<p style="color: {{ x }};">{{ x }}</p><div class="row wh-60-30-right" style="background: {{ x }};"></div>
{% endfor %}

*** 

### Palette

*** 

{% for x in site.data.colors.Palette %}
<p style="color: {{ x }};">{{ x }}</p><div class="row wh-60-30-right" style="background: {{ x }};"></div>
{% endfor %}

*** 

### Special

*** 

{% for x in site.data.colors.Special %}
<p style="color: {{ x[1] }};">{{ x[0] }}: {{ x[1] }}</p><div class="row wh-60-30-right" style="background: {{ x[1] }};"></div>
{% endfor %}

***

<div class="container solid-border">
{% include snippet/iframe.html url_page="/vahngraff/" w="100%" h="512" %}

{% include snippet/iframe.html src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d27895.489657428087!2d-110.964439!3d29.078030000000002!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xcf527709b7555a3!2sUniversidad%20de%20Sonora%20-%20UNISON!5e0!3m2!1ses-419!2smx!4v1630257214462!5m2!1ses-419!2smx" %}

<iframe width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://virtualsky.lco.global/embed/index.html?longitude=-111.02386000000001&latitude=29.0878&projection=lambert&showstarlabels=true&showorbits=true&ecliptic=true&meridian=true&gridlines_az=true&gridlines_eq=true&gridlines_gal=true&live=true" allowTransparency="true"></iframe>

</div>

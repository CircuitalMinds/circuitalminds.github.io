---
layout: page
category: topics
title: Introduction 
image: topics.png
permalink: /topics/jupyter-intro/
---

<p>{{ site.data.jupyter.description.Intro }}</p>
{% capture intro_html %}
<ul>
{% for v in site.data.jupyter.content.Intro %}
<li><a href="{{ site.data.jupyter.url }}/{{ v[1] }}">{{ v[0] | replace:'.ipynb','' }}</a></li>
{% endfor %}
</ul>
{% endcapture %}
{% include module/element/accordion.html id="Introduction" header="Introduction" body=intro_html %}
---
layout: page
title: Topics
image: topics.png
permalink: /topics/
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

{% for x in site.data.jupyter.content %}
{% assign t=x[0] %}
{% if t != 'Intro' %}
{% include resource/jupyter.html topic=t %}
{% endif %}
{% endfor %}
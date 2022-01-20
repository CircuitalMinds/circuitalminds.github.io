---
layout: page
title: Topics
image: topics.png
permalink: /topics/
---

{% assign intro=site.data.notebooks.introduction %}
{% assign engineering=site.data.notebooks.engineering %}
{% assign science_data=site.data.notebooks.science_data %}

<p>Introduction. Getting Started with Python</p>
{% capture intro_html %}
<ul>
{% for x in intro.files %}
<li><a href="{{ intro.url }}/{{ x }}">{{ x | replace:'.ipynb','' }}</a></li>
{% endfor %}
</ul>
{% endcapture %}
{% include snippet/accordion.html id=intro.id header=intro.title body=intro_html %}

<p>Python In Engineering. Some Applications in Engineering</p>
{% capture engineering_html %}
{% for i in engineering.modules %}
{% assign module=engineering[i] %}
{% capture module_html %}
<ul>{% for x in module.files %}<li><a href="{{ module.url }}/{{ x }}">{{ x | replace:'.ipynb','' }}</a></li>{% endfor %}</ul>
{% endcapture %}
{% include snippet/accordion.html id=module.id header=module.title body=module_html %}
{% endfor %}
{% endcapture %}
{% include snippet/accordion.html id=engineering.id header=engineering.title body=engineering_html %}

<p>Python In Data Analysis. Data Analysis, Good Practices</p>
{% capture science_data_html %}
{% for i in science_data.modules %}
{% assign module=science_data[i] %}
{% capture module_html %}
<ul>{% for x in module.files %}<li><a href="{{ module.url }}/{{ x }}">{{ x | replace:'.ipynb','' }}</a></li>{% endfor %}</ul>
{% endcapture %}
{% include snippet/accordion.html id=module.id header=module.title body=module_html %}
{% endfor %}
{% endcapture %}
{% include snippet/accordion.html id=science_data.id header=science_data.title body=science_data_html %}
---
layout: page
title: Topics
image: topics.png
permalink: /topics/
---

{% assign nbs=site.data.nbs %}

<p>Introduction. Getting Started with Python</p>
{% capture intro_html %}
<ul>
{% for x in nbs.topics.introduction %}
<li><a href="{{ nbs.url }}/introduction/{{ x }}">{{ x | replace:'.ipynb','' }}</a></li>
{% endfor %}
</ul>
{% endcapture %}
{% include snippet/accordion.html id="introduction" header="Introduction" body=intro_html %}

<p>Python In Engineering. Some Applications in Engineering</p>
{% capture engineering_html %}
{% for module in nbs.topics.engineering %}
{% for v in module %}
{% assign ID=v[0] | replace:'module_','engineering-' %}
{% assign Header=v[0] | replace:'module_','Module ' %}
{% assign Mn=v[0] %}
{% assign Xn=v[1] %}
{% endfor %}
{% capture module_html %}
<ul>{% for x in Xn %}<li><a href="{{ nbs.url }}/engineering/{{ Mn }}/{{ x }}">{{ x | replace:'.ipynb','' }}</a></li>{% endfor %}</ul>
{% endcapture %}
{% include snippet/accordion.html id=ID header=Header body=module_html %}
{% endfor %}
{% endcapture %}
{% include snippet/accordion.html id="engineering" header="Engineering" body=engineering_html %}

<p>Python In Data Analysis. Data Analysis, Good Practices</p>
{% capture science_data_html %}
{% for module in nbs.topics.science_data %}
{% for v in module %}
{% assign ID=v[0] | replace:'module_','science_data-' %}
{% assign Header=v[0] | replace:'module_','Module ' %}
{% assign Mn=v[0] %}
{% assign Xn=v[1] %}
{% endfor %}
{% capture module_html %}
<ul>{% for x in Xn %}<li><a href="{{ nbs.url }}/science_data/{{ Mn }}/{{ x }}">{{ x | replace:'.ipynb','' }}</a></li>{% endfor %}</ul>
{% endcapture %}
{% include snippet/accordion.html id=ID header=Header body=module_html %}
{% endfor %}
{% endcapture %}
{% include snippet/accordion.html id="science_data" header="Science Data" body=science_data_html %}
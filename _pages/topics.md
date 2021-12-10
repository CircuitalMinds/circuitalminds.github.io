---
layout: page
title: Topics
image: topics.png
permalink: /topics/
---

Python Topics

{% for folder in site.storage.folders %}


<p>{{ folder }}</p>
{% assign folders=site.data.storage[folder].folders %}
{% for fn in folders %}
<p>{{ folder }}/{{ fn[0] }}</p>
{% for fi in fn[1].files %}
<a href="{{ site.storage.path }}/{{ folder }}/{{ fn[0] }}/{{ fi }}">{{ fi | escape }}</a>
{% endfor %}
{% endfor %}
{% assign files=site.data.storage[folder].files %}
{% for fi in files %}
<a href="{{ site.storage.path }}/{{ folder }}/{{ fi }}">{{ fi | escape }}</a>
{% endfor %}

{% endfor %}

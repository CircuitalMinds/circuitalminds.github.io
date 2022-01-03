---
layout: page
title: Projects
image: projects.jpg
permalink: /projects/
---

### Jupyter Service

***

<h4>Una introduccion al lenguaje para aquellos quienes desean explorarlo, 
    es posible mediante los recursos que puedes encontrar en el siguiente enlace.
</h4>
{% assign nbs = site.data.notebooks %}
{% assign introduction = nbs.introduction.data %}
{% assign engineering = nbs.engineering.data %}
{% assign science_data = nbs.science_data.data %}
<p>Introduction. Getting Started with Python</p>
<div id="Introduction" class="accordion accordion-flush initial-gradient">
    <ul>
    {% for nb in introduction %}    
    <li class="mainbutton ontouch" onclick="window.location='{{nb.url}}';">{{ nb.name }}</li>
    {% endfor %}
    </ul>    
</div>

***

<p>Python In Engineering. Some Applications in Engineering</p>
{% for module in engineering %}  
<div id="Module-1-{{ forloop.index }}" class="accordion accordion-flush initial-gradient">  
<ul>
    {% for nb in module %}
    <li class="mainbutton ontouch" onclick="window.location='{{nb.url}}';">{{ nb.name }}</li>
    {% endfor %}
</ul>    
</div>

{% endfor %}

***

<p>Python In Data Analysis. Data Analysis, Good Practices</p>
{% for module in science_data %}  
<div id="Module-2-{{ forloop.index }}" class="accordion accordion-flush initial-gradient">  
<ul>
{% for nb in module %}
<li class="mainbutton ontouch" onclick="window.location='{{nb.url}}';">{{ nb.name }}</li>
{% endfor %}
</ul>    
</div>
{% endfor %}

***

<p>
    Debemos tomar en cuenta que los objetivos en relacion al uso de Python,
    han logrado ser muy diversos. Por el momento, se desea cubrir de la mejor manera posible
    dos areas de interes que con sus respectivos recursos ya estan disponibles para iniciarte 
    en ellas, y que podras encontrarlos desde los siguientes enlaces.
</p>    
<p>
    Proximamente se daran a conocer nuevos recursos para quienes les interese 
    profundizar en el tema, pues el objetivo es explorar este lenguaje obteniendo nuevas 
    posibilidades para sacar mejor provecho de esta herramienta.
</p>

***

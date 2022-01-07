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
<p>Introduction. Getting Started with Python</p>
<div id="Introduction" class="accordion accordion-flush initial-gradient"> 
</div>

***

<p>Python In Engineering. Some Applications in Engineering</p>
<div id="engineering" class="accordion accordion-flush initial-gradient"></div>

***

<p>Python In Data Analysis. Data Analysis, Good Practices</p>
<div id="science-data" class="accordion accordion-flush initial-gradient"></div>

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
<script>
let Notebooks = new Object();
function setNbs ( nbs, name ) {
    obj = $("#" + name)[0];
    for ( module of nbs.data ) {
        modData = [
            "<ul>", module.map(
                x => '<li><a href="' + x.url + '">' + x.name + '</a></li>'
            ).join("\n"), "</ul>"
        ].join("\n");
        console.log(modData);
    };  
}
$(function () {
    requestObj.get(
        "{{ site.static_url }}/data/notebooks.json", 
        function ( data ) {
            Notebooks = data;
            setTimeout( function () {
                Object.keys(Notebooks).map( name => setNbs( Notebooks[name], name ) );
            }, 200);
        }
    );    
});    
</script>

***

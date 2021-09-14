---
layout: page
title: Topics
image: pages/courses.jpg
permalink: /topics
---

<h4>Una introduccion al lenguaje para aquellos quienes desean explorarlo, es posible mediante los recursos que puedes encontrar en el siguiente enlace.</h4>

***

Introduction. Getting Started with Python
    
<div id="introduction"></div>

***

Python In Engineering. Some Applications in Engineering    

<div id="engineering"></div>

***

Python In Data Analysis. Data Analysis, Good Practices

<div id="science_data"></div>

***

<p>Debemos tomar en cuenta que los objetivos en relacion al uso de Python, han logrado ser muy diversos. Por el momento, se desea cubrir de la mejor manera posible
dos areas de interes que con sus respectivos recursos ya estan disponibles para iniciarte en ellas, y que podras encontrarlos desde los siguientes enlaces.</p>

<p>Proximamente se daran a conocer nuevos recursos para quienes les interese profundizar en el tema, pues el objetivo es explorar este lenguaje obteniendo nuevas posibilidades para sacar mejor provecho de esta herramienta.</p>

***

<script>
function row ( url, name ) {
    return ['\n<li>', '<a href="', url, '">', name, '</a>', '</li>'].join('');
};
var topic = {introduction: '<ul>', engineering: [], science_data: []};
{% for nb in site.data.notebooks.introduction %}
  topic.introduction += row('{{nb.url}}', '{{nb.name}}');
{% endfor %}
topic.introduction += '\n</ul>';
set_accordion(
    'introduction',
    {
      header: 'Introduction',
      body: topic.introduction
    }
);

index = 1;
Div = '';
{% for module in site.data.notebooks.engineering %}
Div += '<div id="engineering-' + index + '"></div>\n';
ul = '<ul>';
{% for nb in module %}
  ul += row('{{nb.url}}', '{{nb.name}}');
{% endfor %}
ul += '\n</ul>';
topic.engineering.push(ul);
index += 1;
{% endfor %}          
document.getElementById('engineering').innerHTML = Div;

index = 1;
Div = '';
{% for module in site.data.notebooks.science_data %}
Div += '<div id="science_data-' + index + '"></div>\n';
ul = '<ul>';
{% for nb in module %}
  ul += row('{{nb.url}}', '{{nb.name}}');
{% endfor %}
ul += '\n</ul>';
topic.science_data.push(ul);
index += 1;
{% endfor %}          
document.getElementById('science_data').innerHTML = Div;
for ( var n = 0; n < topic.engineering.length; n++ ) {
    m = n + 1;
    set_accordion(
        'engineering-' + m,
        {
            header: 'Module ' + m,
            body: topic.engineering[n]
        }
    );
};
for ( var n = 0; n < topic.science_data.length; n++ ) {
    m = n + 1;
    set_accordion(
        'science_data-' + m,
        {
            header: 'Module ' + m,
            body: topic.science_data[n]
        }    
    );
};
</script>
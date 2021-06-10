---
layout: post
title: Data Analysis, Good Practices
date: 2020-10-16 20:16:55 +0300
image: posts/data_analysis.jpg
tags: [Data Analysis]
---
> <h3><strong>"Modulos de Practicas Basicas y Avanzadas en Analisis de Datos abarcando desde: Conceptos Basicos en Estadistica; Extraccion, Limpieza y Representacion de Datos; Simulacion de Modelos de Prediccion; Y Otras Muchas Mas Aplicadas a Diversas Areas de Interes".</strong></h3>

***

__Nota:__ El orden sugerido para cada modulo, pero no necesario, esta dado por sus respectivas ```Listas de Links```, los cuales los dirigira a la aplicacion que contiene el ```Notebook``` indicado por su nombre respectivamente. 


__Recordar:__ No se requiere instalar nada para empezar a usar la aplicacion, pero si desea crear sus propios ```Notebooks``` se recomienda guardarlos antes de cerrar la sesion.


__Importante:__ Cualquier duda o sugerencia se le agradecera dejando su comentario al final de este Post, pero primero que nada aprovechar al maximo; Y recordar que la contraseña para todos los __Notebooks__ es:   ```circuitalminds```

***

### Module 1

__Descripcion:__ Sin Asignar Aun.

***

<div id="module_1"></div>

***

### Module 2

__Descripcion:__ Sin Asignar Aun.

***

<div id="module_2"></div>

***

### Module 3

__Descripcion:__ Sin Asignar Aun.

***

<div id="module_3"></div>

***

### Module 4

__Descripcion:__ Sin Asignar Aun.

***

<div id="module_4"></div>

***

### Module 5

__Descripcion:__ Sin Asignar Aun.

***

<div id="module_5"></div>

***

### Module 6

__Descripcion:__ Sin Asignar Aun.

***

<div id="module_6"></div>

***

### Module 7

__Descripcion:__ Sin Asignar Aun. 

***

<div id="module_7"></div>

***

<script>
var notebooks = {};
var modules = 7;
let requestURL = 'https://raw.githubusercontent.com/alanmatzumiya/data_analysis/main/notebooks_data.json';
let requestData = new XMLHttpRequest();
requestData.open('GET', requestURL);
requestData.responseType = 'json';
requestData.send();

requestData.onload = function() {
    const jsonData = requestData.response;
    notebooks = jsonData;
    for (var m=1; m < modules + 1; m++) {
        getNotebooks( "module_" + m.toString() );
    }
};

function getNotebooks ( module ) {
    var module_notebooks = notebooks[module];
    var text = "<ul>";
    for (var j = 0; j < module_notebooks.length; j++) {
        text += '<li><p><a href="' + module_notebooks[j]["url_app"] + '">' + module_notebooks[j]["name"].replace(".ipynb", "") + '</a></p></li>';   
    }                               
    document.getElementById(module).innerHTML = text + '</ul>';  
};                              
</script>

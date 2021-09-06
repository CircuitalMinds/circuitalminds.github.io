---
layout: post
title: Some Applications in Engineering
date: 2020-10-16 20:16:55 +0300
image: posts/engineering.jpeg
tags: [Python in Engineering]
---
> <h3><strong>"Modulos de Aplicaciones en Ingenieria para Usuarios Principiantes y Avanzados en Areas como: Ecuaciones Diferenciales, Termodinamica, Ingenieria de Procesos, Teoria de Control, Y Muchas Otras Mas de Interes".</strong></h3>

***

__Nota:__ El orden sugerido para cada modulo, pero no necesario, esta dado por sus respectivas ```Listas de Links```, los cuales los dirigira a la aplicacion que contiene el ```Notebook``` indicado por su nombre respectivamente. 


__Recordar:__ No se requiere instalar nada para empezar a usar la aplicacion, pero si desea crear sus propios ```Notebooks``` se recomienda guardarlos antes de cerrar la sesion.


__Importante:__ Cualquier duda o sugerencia se le agradecera dejando su comentario al final de este Post, pero primero que nada aprovechar al maximo; Y recordar que la contraseña para todos los __Notebooks__ es:   ```circuitalminds```

***

[**Module 1. 12 steps to Navier-Stokes**](#)

__Descripcion:__ This is a practical module for learning the foundations of Computational Fluid Dynamics (CFD) by coding solutions to the basic partial differential equations that describe the physics of fluid flow. The module was part of a course taught by [Prof. Lorena Barba](http://lorenabarba.com) between 2009 and 2013 in the Mechanical Engineering department at Boston University (Prof. Barba since moved to the George Washington University). 

__Nota:__ The module assumes only basic programming knowledge (in any language) and some background in partial differential equations and fluid mechanics. The "steps" were inspired by ideas of Dr. Rio Yokota, who was a post-doc in Prof. Barba's lab until 2011, and the lessons were refined by Prof. Barba and her students over several semesters teaching the CFD course. 

__Cita:__ Barba, Lorena A., and Forsyth, Gilbert F. (2018). CFD Python: the 12 steps to Navier-Stokes equations. _Journal of Open Source Education_, **1**(9), 21, https://doi.org/10.21105/jose.00021

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
let requestURL = 'https://raw.githubusercontent.com/alanmatzumiya/engineering-basic/main/notebooks_data.json';
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

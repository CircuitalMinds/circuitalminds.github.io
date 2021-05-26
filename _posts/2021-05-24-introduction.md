---
layout: post
title:  Introduction
date:   2020-10-16 20:16:55 +0300
image:  posts/introduction.jpg
tags:   [Introduction]
---
> <h3><strong>"Modulo Basico de Python: Aspectos basicos del lenguaje y sus librerias mas fundamentales".</strong></h3>

***

En este primer modulo de nuestro curso veremos una introduccion del lenguaje ```Python``` conociendo sus caracteristicas mas relevantes con el objetivo de
familiarizar al usuario con esta plataforma dandole una nocion acerca del uso de ```Sentencias```, ```Funciones``` y algunas practicas usando las ```Librerias``` que son consideradas de mayor uso. 


El orden sugerido del module, pero no necesario, esta dado por la siguiente ```Lista de Links```, los cuales los dirigira a la aplicacion que contiene el ```Notebook``` indicado por su nombre respectivamente. 


__Recordar:__ No se requiere instalar nada para empezar a usar la aplicacion, pero si desea crear sus propios ```Notebooks``` se recomienda guardarlos antes de cerrar la sesion.


__Importante:__ Cualquier duda o sugerencia se le agradecera dejando su comentario al final de este Post, pero primero que nada aprovechar al maximo; Y recordar que la contraseña para todos los __Notebooks__ es:   ```circuitalminds```

***

<div id="module_0"></div>

***

<script>
var notebooks;
var module = "module_0";
let requestURL = 'https://raw.githubusercontent.com/alanmatzumiya/engineering-basic/main/notebooks_data.json';
let requestData = new XMLHttpRequest();
requestData.open('GET', requestURL);
requestData.responseType = 'json';
requestData.send();

requestData.onload = function() {
    const jsonData = requestData.response;
    notebooks = jsonData[module];        
    var text = "<ul>";
    for (var j = 0; j < notebooks.length; j++) {
            text += '<li><p><a href="' + notebooks[j]["url_app"] + '">' + notebooks[j]["name"].replace(".ipynb", "") + '</a></p></li>';   
    }                               
    document.getElementById(module).innerHTML = text + '</ul>';
};
</script>

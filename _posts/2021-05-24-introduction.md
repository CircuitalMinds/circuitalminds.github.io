---
layout: post
title: Introduction
date: 2020-10-16 20:16:55 +0300
image: posts/introduction.jpg
tags: [Introduction]
---
> <h3><strong>"Modulo Basico de Python: Aspectos basicos del lenguaje y sus librerias mas fundamentales".</strong></h3>

***

En este primer modulo de nuestro curso veremos una introduccion del lenguaje ```Python``` conociendo sus caracteristicas mas relevantes con el objetivo de
familiarizar al usuario con esta plataforma dandole una nocion acerca del uso de ```Sentencias```, ```Funciones``` y algunas practicas usando las ```Librerias``` que son consideradas de mayor uso. 


El orden sugerido del module, pero no necesario, esta dado por la siguiente ```Lista de Links```, los cuales los dirigira a la aplicacion que contiene el ```Notebook``` indicado por su nombre respectivamente. 


__Recordar:__ No se requiere instalar nada para empezar a usar la aplicacion, pero si desea crear sus propios ```Notebooks``` se recomienda guardarlos antes de cerrar la sesion.


__Importante:__ Cualquier duda o sugerencia se le agradecera dejando su comentario al final de este Post, pero primero que nada aprovechar al maximo; Y recordar que la contraseña para todos los __Notebooks__ es:   ```circuitalminds```

***

<div class="item">   
<embed class="image fit" type="text/html" src="http://127.0.0.1:5200" width="100%">
  <header>
    <h3>Video App</h3>
  </header>
</div>

***

<div class="accordion accordion-flush" id="accordionFlushExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed bg-darklight fg-teal ontouch" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        Contenido
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse bg-darklight"      
         aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div id="module_0" class="accordion-body"></div>
    </div>  
  </div>
</div>

***

<h2>Bottom Modal</h2>

<!-- Trigger/Open The Modal -->
<button id="myBtn">Open Modal</button>

<!-- The Modal -->
<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <div class="modal-header">
      <span class="close">&times;</span>
      <h2>Modal Header</h2>
    </div>
    <div class="modal-body">
      <p>Some text in the Modal Body</p>
      <p>Some other text...</p>
    </div>
    <div class="modal-footer">
      <h3>Modal Footer</h3>
    </div>
  </div>

</div>

<script>
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
</script>
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
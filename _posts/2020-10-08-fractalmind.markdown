---
layout: post
title:  What does it mean to feel millions of dreams come real?
date:   2020-10-08 10:30:55 +0300
image:  posts/fractalmind.jpg
tags:   [Cantor]
---
> <h3><strong>"Se repiten en multitud, liberandose en aparente anarquía preciosa estructura pintada en fragmentos disjuntos; El Infinito expresando su arte más auténtico".</strong></h3>

***

<link rel="stylesheet" href="{{site.css}}/fractal.css">

Aprender un lenguaje nuevo e intentar formalizarlo, conlleva actos con diálogos internos que quizás en algunas ocasiones no será posible contar con alguna conclusión inmediata e inclusive girar de forma irracional por caminos equívocos; Y un escape posible es volver al inicio de todo, una y otra vez si fuese necesario. En matemáticas, obtener una prueba clara y coherente logrando su perfeccion, recurrir a prácticas de meditación es una necesidad para transportarnos al pensamiento abstracto, y asi obtener argumentos elementales para la construcción de un lenguaje que pueda sostener su claridad al mínimo detalle posible.

***

La existencia del ser humano tal y como la conocemos, ha sido posible por su manera de cuestionar en consciencia la percepción de su entorno para llevar a acabo meditaciones persistentes que liberan el alma ante la curiosad. Definitivamente, alguna de estas cuestiones relacionan la existencia de una posible formulacion o descripcion formal y legible del ``` Infinito ``` de manera consciente, y que no requiera verificacion como una necesidad. Lograr dicho objetivo ha sido un camino largo y complejo para aquellas grandes mentes que han sido insistentes, y que en algunas etapas aparento carecer de sentido siendo algun absurdo de origen linguistico, pero no era posible contar con algun argumento que lo verifique. 

***

Sin embargo, desde el punto de vista de las matemáticas, fue posible indagar en esta clase de cuestiones gracias a una continua construcción de lenguajes simbólicos y bien estructurados para transformar aquellas barreras del pensamiento en desafíos intelectuales; Y que han sido resueltos para darnos respuestas o al menos las ideas elementales para conjeturar razonablemente. Como una consecuencia de aquellos desafíos, el infinito se fue presentando en relacion al surgimiento de distintas corrientes del pensamiento logico, y que notablemente los números primos han sido un papel importante para aquellos que les apasiona la naturaleza de los números. 

***

Dicha relación, y que posiblemente dió el interés a temas relacionados, fue acerca de la infinitud de los números primos que se le atribuye a Euclides por sus obras detalladas acerca de ellos, y que además, en epocas no tan distantes surgieron construcciones muy ingeniosas como la conocida Criba de Erastotenes como una técnica para hallar todos los números primos $$p_i$$ que son menores a cualquier número natural $$n$$ dado.  Precisamente, su desarrollo da como resultado una tabla como la que es mostrada debajo. 

***

<div class="container">
    <div class="row">
    <p>Cantidad de Números Primos \(\Phi (n)=\) <span id="var-pn"></span></p>
    </div>
    <div class="row">
        <p>\(\displaystyle{ \pi = \sqrt{6 \cdot \prod_{i=1}^{\infty} \frac{1}{1-(p_{i})^{-2}} } = \prod_{i=1}^{\infty} f_{i}}\)</p>
    </div>
    <div class="row">
        <p>\(\displaystyle{ \pi \approx \prod_{i=1}^{\Phi (n)} f_{i} = }\) <span id="var-pi"></span></p>
    </div>
    <div class="row">
        <p> \(n=\) <span id="var-n"></span></p>
    </div>
    <div class="slidecontainer">
        <input id='pn' value="10" type="range" class="slider" min="1" max="50" step="1" oninput="initCrib()"/>
    </div>
    <br>
    <div class="row">
    <canvas id='crib' width='505px' height='660px' style='display: inline-block; max-width: 100%; max-height: 100%;'></canvas>
    </div>
    <br>           
</div>

***

Esta es una construcción meramente intuitiva, donde inicialmente son fijados los primeros cuatro números primos en la tabla, es decir, los números $$2, 3, 5$$, y $$7$$, y que posteriormente se procede eliminando a todos sus múltiplos. Como podemos observar, el botón deslizable configura un valor natural $$n$$ para reconstruir la tabla con esta misma cantidad de elementos en la cuadrícula que representan a cada uno de sus antecesesores, es decir, todos los naturales $$m$$ tales que $$0 < m \leq n$$. Pero, sólamente algunos números de la cuadrícula son mostrados a propósito, debido a que estos son los números primos restantes que fueron denotados por $$p_i$$, y que posteriormente son usados para calcular el valor aproximado de $$\pi$$ dado por un producto de factores que relacionan a cada $$p_i$$, los cuales son indexados por $$i=1,2, \dots,\Phi(n)$$, donde $$\Phi(n)$$ es una función que da la cantidad de números primos menores a $$n$$.  

***

En efecto, esta interpretación nos muestra que el pensamiento matemático también puede ser reconstruido a través de prácticas inspiradas en el arte pero que son intelectualmente fundamentadas. Además, esto nos permite ver mas allá de los detalles en cuestión para observar caracteristicas que surgen de manera natural.

***

En algunas ocasiones, estos números han sido nombrados como números mágicos debido a que por aparente casualidad surgen en una gran variedad de situaciones, y hay quienes los describen de manera poética como los átomos de los números. En realidad, lo anterior esta relacionado con el Teorema Fundamental de la Artimetica, el cual nos asegura que todo número natural $$n$$ diferente de cero tiene una única representación dada por algún producto de factores primos, es decir, $$\displaystyle{ n=\prod_{i=1}^{m} p_{i}^{m_i} }$$ para algunos naturales $$m$$, y $$m_i$$ con $$i=1, \dots, m$$. 

***

Esta obra de arte de las matemáticas, la cual fue iniciada por el ya mencionado Euclides, y que posteriormente fue finalizada formalmente por el conocido Carl Friedrich Gauss, dando respuesta a muchas cuestiones acerca de las relaciones ya mencionadas de los números primos, pero la cuestión de un posible concepto del Infinito aún está demasiado lejos desde aquí. 

***

Sin embargo, fue posible en consciencia diversas maneras para dialogar estos asuntos debido a que grandes mentes persistentes, y que por amor al arte, reconstruyeron todo un lenguaje que asegura coherencia captando el detalle mas minimo, tal y como cuando un dramaturgo escribe sus obras o un poeta describe rigurosamente sus creaciones con las expresiones mas precisas. Asi es, el descubrimiento no es una accion de cientificos, es una clase de ```Arte```, que requiere la necesidad de documentar, indagar, y cuestionar por manera de arte para destapar los origenes de absurdos que puedan surgir pero sin temer por la posibilidad de hallar absolutamente nada, dando lugar a mentes ciclicas.

***

><p>" En matemáticas, el arte de proponer una pregunta debe considerarse de mayor valor que resolverlo."</p>. — Georg Cantor (1845-1918).

***

Esta mente cíclica reconocida por ``` Cantor ``` era un aficionado al arte de las preguntas dificiles. Clasificado a veces como un filosofo explorando las matematicas, y quizas como poeta en este lenguaje dejandonos elegantes obras de arte que constituyen las ideas elementales de lo que hacemos llamar por ``` Infinito ```, o mas bien dicho, los Infinitos. En dichas obras, fueron descritos como objetos matematicos que pueden ser caracterizados por sus tamaños, diferenciandose unos de otros, pero sin embargo, este desarrollo resulta no ser tan trivial pero da al menos un camino seguro y verificable para una comprensión acertada acerca del Infinito. 

***

Afortunadamente, muchos que lograron una comprensión profunda de este enfoque fueron capaces de representar dichos objetos en base a estructuras geométricas que fueron nombradas por Fractales, los cuales estan conformados por infinitos componentes con exactamente la mismas apariencias disponiendo de una estructura esencial que se reitera en distintas escalas.

***

Hoy en día son conocidas una gran variedad de objetos geometricos que presentan estas caracteristicas fractales, pero en particular existe uno que nace de un conjunto dado por $${\displaystyle C =\bigcap _{n=1}^{\infty }E_{n}}$$, donde cada subconjunto $$E_{n}$$ es la union de $$2^{n}$$ intervalos de longitud $$3^{-n}$$ que están contenidos en el intervalo $$[0, 1]$$, y además se satisface $${\displaystyle E_{1}\supset E_{2}\supset E_{3}\supset ...}$$. Este conjunto lleva el nombre de ``` Cantor ```, que debido a su construcción produce el conocido fractal de ``` Cantor ```, tal y como es mostrado debajo.

***

<h3>Fractal del Conjunto de Cantor.</h3>
<div class="container">
    <button id="cantorBtn" class="button show" onclick="initCantor()">Mostrar</button>
    <br>
    <div id="cantor" class="row"></div>
    <br>    
    <div class="row">
        <p>Numero de Particiones \(C_n =\) <span id="var-fn">5</span></p>
    </div>
    <div class="slidecontainer">
        <input id='fn' value="5" type="range" class="slider" min="0" max="10" step="1" oninput="initCantor()"/>
    </div>    
</div>    

***

Este conjunto no solamente es especial por su característica fractal, ya que logró desafiar la intuición geometrica cuando Cantor demostró de una manera muy peculiar que esté conjunto es de medida cero, y si esto ya parecia extraño, mostró tambien que la cantidad de elementos de este conjunto es exactamente la misma que la del intervalo $$[0, 1]$$. Sin embargo, por estás mismas ideas surgieron otros tipos de fractales que han llamado la atención de muchos, y una de ellas es un fractal conocido como Sierpinsky, el cual parte inicialmente de un triángulo equilátero para obtener tres fracciones iguales de este mismo preservando su forma en proporcion, y que posteriormente son fraccionados de forma consecutiva.

***

<h3>Triangulo de Sierpiński.</h3>
<div class="container">
    <button id="sierpinBtn" class="button show" onclick="initSierpin()">Mostrar</button>
    <div class="row">
    <canvas id='sierpin' width='505px' height='660px' style='display: inline-block; max-width: 100%; max-height: 100%;'></canvas>
    </div>
    <br>    
    <div class="row">
        <p>Numero de Particiones \(S_n = \) <span id="var-sn">6</span></p>
    </div>
    <div class="slidecontainer">
        <input id='depthStepper' value="6" type="range" class="slider" min="1" max="10" step="1" oninput="initSierpin()"/>
    </div>    
</div>    

Puede uno imaginarse en aquellos momentos lo absurdo que era pensar que existen distintas formas y tamaños de lo que llamamos infinito, pero debido a esto aprendimos que no se deben descartar ideas solo por aparentar ser absurdas, y solamente hacerlo cuando sea posible algun argumento válido que lo demuestre. 

***

><p> "Nadie nos expulsará del paraíso que Cantor ha creado para nosotros. El producto más asombroso del pensamiento matemático, y una de las realizaciones más bellas de la actividad humana en el dominio de lo puramente inteligible."</p>. — David Hilbert (1862-1943).

***

Aunque la geometria de los fractales no este relacionada con el azar, aparentemente sus estructuras asimilan este comportamiento, y debido a esto, son relacionados con lo caotico; o mas bien, aquello que presenta incertidumbre con dinamicas irregulares. En general, estos objetos pueden estar presentes en cualquier dinamica que produce ciclos preservando similitudes entre si, tal como sucede en los llamados atractores de Lorenz que son mostrados debajo.   

***

<div class="container">
    <h3>Lorenz Attractor: Butterfly Effect</h3>
    <p>Si observamos, al modificar los deslizadores es posible que las trayectorias se muevan sin rumbo hacia afuera del plano como si existiera algun tipo de repulsion. Otro caso posible es el que vemos inicialmente, ocurriendo lo contrario produciendo trayectorias que se mantienen cerca de una zona girando a su alrededor tal como es la dinamica de los planetas del sistema solar que son atraidos por el Sol, y que ademas producen una figura conocida como El Efecto Mariposa.
    </p>  
    <br>
    <div class="row">
      <p>\( \displaystyle \frac{dx}{dt}=a(y-x) \), \(\hspace{1.7cm} x_0=\) <span id="var-x0">0</span></p> 
    </div>
    <div class="slidecontainer">
    <input id="x0" value="0" type="range" class="slider" min="-40" max="40" step="0.5" oninput="initLorenz()"/>
    </div>
    <div class="row">
      <p>\( \displaystyle \frac{dy}{dt}=x(b-z)-y \), \(\hspace{1cm} y_0=\) <span id="var-y0">1</span></p>
    </div>
    <div class="slidecontainer">
    <input id="y0" value="1" type="range" class="slider" min="-40" max="40" step="0.1" oninput="initLorenz()"/>
    </div>
    <div class="row">   
      <p>\( \displaystyle \frac{dz}{dt}=xy-cz \), \(\hspace{1.9cm} z_0=\) <span id="var-z0">10</span></p>
    </div>
    <div class="slidecontainer">
    <input id="z0" value="10" type="range" class="slider" min="-40" max="40" step="0.1" oninput="initLorenz()"/>
    </div>  
</div>
      
<div id="lorenz" class="container"></div>

<p>Con los siguientes parámetros es posible observar que para asegurar un comportamiento de atracción se requieren valores de signos opuestos, y en caso contrario para producir una repulsión.</p>
<div class="container">
    <div class="row">
      <p>\(a=\) <span id="var-a">-6</span></p>
    </div>
    <div class="slidecontainer">
    <input id="a" value="-6" type="range" class="slider" min="-40" max="40" step="0.1" oninput="initLorenz()"/>
    </div>
    <div class="row">  
      <p>\(b=\) <span id="var-b">28</span></p>
    </div>
    <div class="slidecontainer">  
    <input id="b" value="28" type="range" class="slider" min="-40" max="40" step="0.1" oninput="initLorenz()"/>
    </div>
    <div class="row">
      <p>\(c=\) <span id="var-c">0</span></p>
    </div>
    <div class="slidecontainer">  
      <input id="c" value="0" type="range" class="slider" min="-40" max="40" step="0.1" oninput="initLorenz()"/>
    </div>
</div>

***

<div class="container">
<p>
    Otra clase de fractales pueden ser generados mediante la siguiente recursión definida sobre el plano complejo,
</p>
<p>
    \({\displaystyle {\begin{cases}z_{0}=z\in \mathbb {C} &{\text{(término inicial)}}\qquad \\z_{n+1}=z_{n}^{2}+c&{\text{(sucesión recursiva)}}\end{cases}}}\)    
</p>
<p>
    Estás ecuaciones pueden llegar a definir una extensa familia de fractales, y una de ellas está dado por el conjunto de Julia que contiene todos los números complejos que satisfacen \({\displaystyle | z_{n} | \leq 4}\), generando el fractal de Julia que es mostrado debajo y que puede alterar su forma tocando cualquier punto a su alrededor.
</p>    
<br>    
<div class="container"><iframe allowfullscreen="allowfullscreen" width="505px" height="300px" style='display: inline-block; width: 100%; max-height: 100%;' title="inline-website-frame" src="https://alanmatzumiya.github.io/fractals/Julia/"></iframe></div>
</div>

***

<div class="container">
    <p>Usando la ecuación anterior, y fijando un valor inicial \(z_{0}=0\), para establecer el conjunto de números complejos tales que \({\displaystyle | z_{n} | \leq 4}\), nos define el conocido fractal de Mandelbrot. Precisamente, este es el mismo de la imagen que fue mostrada en el inicio de este post pero con una configuración diferente de colores pero que pueden ser modificados en los deslizadores debajo, que además permiten mover coordenadas para obtener otras vistas de la misma imagen.</p>
    <br>
    <button id="mandelBtn" class="button show" onclick="initMandel()">Mostrar</button>
    <br>
    <h4>Coordenadas</h4>
    <br>
    <div class="row">
      <p>\(z_p=\) <span id="var-zoom">200</span></p>
    </div>
    <div class="slidecontainer">
    <input id="zoom" value="200" type="range" class="slider" min="1" max="1000" step="1" oninput="initMandel()"/>
    </div>
    <div class="row">  
      <p>\(x_p=\) <span id="var-xp">-200</span></p>
    </div>
    <div class="slidecontainer">  
    <input id="xp" value="-200" type="range" class="slider" min="-1000" max="1000" step="1" oninput="initMandel()"/>
    </div>
    <div class="row">
      <p>\(y_p=\) <span id="var-yp">0</span></p>
    </div>
    <div class="slidecontainer">  
      <input id="yp" value="0" type="range" class="slider" min="-1000" max="1000" step="1" oninput="initMandel()"/>
    </div>
    <br>
    <div class="row">
        <canvas id='mandel' width='505px' height='660px' style='display: inline-block; max-width: 100%; max-height: 100%;'></canvas>
    </div>
    <br>
    <h4>Colores</h4>
    <br>
    <div class="row">
      <p>\(r=\) <span id="var-red">100</span></p>
    </div>
    <div class="slidecontainer">
    <input id="red" value="100" type="range" class="slider" min="0" max="255" step="1" oninput="initMandel()"/>
    </div>
    <div class="row">  
      <p>\(g=\) <span id="var-green">0</span></p>
    </div>
    <div class="slidecontainer">  
    <input id="green" value="0" type="range" class="slider" min="0" max="255" step="1" oninput="initMandel()"/>
    </div>
    <div class="row">
      <p>\(b=\) <span id="var-blue">100</span></p>
    </div>
    <div class="slidecontainer">  
      <input id="blue" value="100" type="range" class="slider" min="0" max="255" step="1" oninput="initMandel()"/>
    </div>
</div>

***

No se requiere ser un genio para divagar en esta clase de arte matematico, solamente liberando inquietud y deseo por conocer nuevas formas de todo lo perceptible es suficiente; Y si alguno de tus sueños fuera descubrir un fractal que inspire radicalmente al arte moderno, tal sueño fuera replicado ``` Un millon de veces ```, y segun ``` Cantor ``` da igual si fueran ``` Infinitas ```.

***

<div class="container">
<p>Si te intereso algun fractal o cualquier otro similar a los que fueron mostrados en este post, puedes encontrarlos en el codigo fuente de esta pagina desde tu navegador; Pero tambien pudiera ser posible iniciando una discusion para generar retroalimentacion. Y porsupuesto, cualquiera que contribuya de alguna manera en el arte es digno de un lugar donde pueda ser contemplado, tal como el autor del tema que he dejado para concluir.</p> 
<br>
<iframe width="505px" height="300px" src="https://www.youtube.com/embed/Gm1kC6xcRlE?list=PL9tY0BWXOZFtUDxjYHtFVrpsI0jmPopPr" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>    
<canvas id='pixel' width='505px' height='100px' style='display: inline-block; max-width: 100%; max-height: 100%;'></canvas>
</div>

***

<script type="text/javascript" src="{{site.js}}/criba.js"></script>
<script type="text/javascript" src="{{site.js}}/sierpinski.js"></script> 
<script type="text/javascript" src="{{site.js}}/cantor.js"></script>
<script type="text/javascript" src="{{site.js}}/lorenz.js"></script> 
<script type="text/javascript" src="{{site.js}}/mandelbrot.js"></script>
<script type="text/javascript" src="{{site.js}}/animationPixel.js"></script>

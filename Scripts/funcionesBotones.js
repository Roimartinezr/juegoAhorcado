function addEvent(element, eventName, callback) {
    if (element.addEventListener) {
        element.addEventListener(eventName, callback, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, callback);
    } else {
        element["on" + eventName] = callback;
    }
}
function iniciar() {
    
    
    let palabras = JSON.parse(localStorage.getItem('palabras'))
    let cuerpo = document.querySelector("body div#cuerpo")

    //generar una palabra aleatoria
    let aleatorio = Math.ceil(Math.random() * ((palabras.length-1) - 0) + 0)
    console.log(palabras.length)
    let palabraAleatoria = palabras[parseInt(aleatorio)]
    console.log(palabraAleatoria)
    localStorage.setItem('palabraAl', JSON.stringify(palabraAleatoria))
    console.log(palabraAleatoria)

    //mostramos los huecos de la palabra aleatoria
    let palabraMuestra = []
    let palabraMostrar = ""
    for(let i=0; i<palabraAleatoria.length; i++) {
        palabraMuestra[i] = "_"
        palabraMostrar += " "+palabraMuestra[i]
    }
    cuerpo.innerHTML = ""
    cuerpo.innerHTML += "<div id='dibujo'><label id='vida'>Vida:</label><label id='vida2'>6</label><br></div>"
    let dibujo = document.querySelector("div#dibujo")
    dibujo.innerHTML += "<div id='imagen'></div>"
    cuerpo.innerHTML += "<h3 id='palabraLinea'>"+palabraMostrar+"</h3>"
    cuerpo.innerHTML += "<div id='busqueda'>"+"<input type='text' id='letra' size='1' maxlength='1' onkeyup='enterProbar()'>"+"<a id='boton_probar' href='javascript:' onclick='probar()'>➤</a>"+"</div>"
    cuerpo.innerHTML += "<div id='resolver'><div id='texto'><input type='text' placeholder='Resolver' size='10' onkeyup='enterResolver()'></div><div id='boton'><a href='javascript:' onclick='resolver()'>➤</a></div></div>"
    cuerpo.innerHTML += "<div id='descartadas'><h4>Letras descartadas:</h4></div>"
    let box = document.getElementById("letra")
    box.focus()
    let titulo = document.querySelector("header h1")
    titulo.setAttribute("id","prueba")
    
    let dibujoW = document.querySelector("div#cuerpo div#dibujo div#imagen")
    let imagen = document.createElement("img")
    imagen.setAttribute("src","./Scripts/Imagen/ahorcado6.png")
    dibujoW.appendChild(imagen)


}


function probar() {
    let vida = document.querySelector("div#dibujo label#vida2").textContent
    let palabra = JSON.parse(localStorage.getItem('palabraAl'))
    let palabraPantalla = document.getElementById("palabraLinea").textContent
    let letra = document.getElementById("letra").value
    let palabraMostrar = []
    let puntos = 0

    
    let descartadas = []
    let contMalas = 0

    //Para que si introducimos una mayúscula, se detecte como minúscula
    letra = letra.toLowerCase()

    //Para que si introducimos una letra acentuada el programa la detecte como sin acentuar
    if (letra == "á") {
        letra = "a"
    }else if(letra == "é"){
        letra = "e"
    }else if(letra == "í") {
        letra = "i"
    }else if(letra == "ó") {
        letra = "0"
    }else if(letra == "ú" || letra == "ü") {
        letra = "u"
    }

    if(palabra.includes(letra)) {
    }else {
        descartadas[contMalas] = letra
        contMalas++
        vida = parseInt(vida)-1
    }
    let vidaMostrada = document.getElementById("vida2")
    vidaMostrada.innerHTML = vida
    let dibujoW = document.querySelector("div#cuerpo div#dibujo div#imagen")
    let imagen = document.createElement("img")
    imagen.setAttribute("src","./Scripts/Imagen/ahorcado"+vida+".png")
    dibujoW.innerHTML= " "
    dibujoW.appendChild(imagen)
    if(vida == "0") {
        let cuerpo = document.querySelector("body div#cuerpo")
        cuerpo.innerHTML = "<h1 id='lost'>Has Perdido</h1>"
        cuerpo.innerHTML += "<div id='imagenLost'><img src='./Scripts/Imagen/loser2.gif'></div>"
        cuerpo.innerHTML += "<h3>La palabra era: "+palabra
        cuerpo.innerHTML += "<a id='reiniciar' href='javascript:' onclick='iniciar()'></a>"
        let j = document.getElementById("reiniciar")
        j.focus()
    }


    
    for(let i=0; i<palabraPantalla.length; i++) {
        palabraMostrar[i] = palabraPantalla[i]
    }
    for(let i=0; i<palabra.length; i++) {
        if(palabra[i] == letra) {
            palabraMostrar[(i*2)+1]= letra
        }
    }
    let palabraFinal = ""
    for(let i=0; i<palabraMostrar.length; i++) {
        palabraFinal += palabraMostrar[i]
        if(palabraFinal[i].length === 1 && palabraFinal[i].match(/[a-z]/i)) {
            puntos += 1
        }
    }

    let box = document.getElementById("letra")
    box.value = null
    box.focus()
    let lineasPantalla = document.getElementById("palabraLinea")
    lineasPantalla.innerHTML = palabraFinal
    
    let probadas = document.getElementById("descartadas")
    probadas.innerHTML += "<h5 class='descartadas'></h5>"
    let h5 = document.querySelector("div h5.descartadas")
    for(let i=0; i<descartadas.length; i++) {
        h5.innerHTML += descartadas[i]+" "
    } 
    

    if(puntos == palabraFinal.length/2) {
        let cuerpo = document.querySelector("body div#cuerpo")
        cuerpo.innerHTML = "<h1 id='win'>¡Has ganado!</h1>"
        cuerpo.innerHTML += "<div id='imagenLost'><img src='./Scripts/Imagen/bailecito.gif'></div>"
        cuerpo.innerHTML += "<h3 id='resultado'>La palabra era: "+palabra+"</h3>"
        cuerpo.innerHTML += "<a id='reiniciar' href='javascript:' onclick='iniciar()'></a>"
        let j = document.getElementById("reiniciar")
        j.focus()
    }
}
function enterProbar() {
    addEvent(document, "keydown", function (e) {
        var press = e.keyCode
        if(press == 13) {
            probar()
        }
    });
}

function resolver() {
    let textoResolver = document.querySelector("div#resolver div#texto input").value
    if( textoResolver != "") {
        let palabra = JSON.parse(localStorage.getItem('palabraAl'))

        //pasamos la palabra a minúsculas por si se introdujo alguna mayúscula
        textoResolver= textoResolver.toLowerCase()

        //quitamos los acentos
        if (textoResolver.includes("á")) {
            textoResolver = textoResolver.replace("á", "a")
        }else if (textoResolver.includes("é")) {
            textoResolver = textoResolver.replace("é", "e") 
        }else if (textoResolver.includes("í")) {
            textoResolver = textoResolver.replace("í", "i") 
        }else if (textoResolver.includes("ó")) {
            textoResolver = textoResolver.replace("ó", "o") 
        }else if (textoResolver.includes("ú") || textoResolver.includes("ü")) {
            textoResolver = textoResolver.replace("ú", "u") 
            textoResolver = textoResolver.replace("ü", "u")
        }
        
        
        if (textoResolver == palabra) {
            let cuerpo = document.querySelector("body div#cuerpo")
            cuerpo.innerHTML = "<h1 id='win'>¡Has ganado!</h1>"
            cuerpo.innerHTML += "<div id='imagenLost'><img src='./Scripts/Imagen/bailecito.gif'></div>"
            cuerpo.innerHTML += "<h3 id='resultado'>La palabra era: "+palabra+"</h3>"
            cuerpo.innerHTML += "<a id='reiniciar' href='javascript:' onclick='iniciar()'></a>"
            let j = document.getElementById("reiniciar")
            j.focus()
        }else {
            cuerpo.innerHTML = "<h1 id='lost'>Has Perdido</h1>"
            cuerpo.innerHTML += "<div id='imagenLost'><img src='./Scripts/Imagen/loser2.gif'></div>"
            cuerpo.innerHTML += "<h3>La palabra era: "+palabra
            cuerpo.innerHTML += "<a id='reiniciar' href='javascript:' onclick='iniciar()'></a>"
            let j = document.getElementById("reiniciar")
            j.focus()
        }
    }
}
function enterResolver() {
    addEvent(document, "keyup", function (e) {
        var press = e.keyCode
        if(press == 13) {
            resolver()
        }
    });
}
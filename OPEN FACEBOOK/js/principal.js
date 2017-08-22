function addEvents() {
    var enviar = document.getElementById("publicar");
    enviar.addEventListener("click", publicar);

    var filas = document.getElementsByTagName("tr");
    for (var i = 0; i < filas.length; i++) {
        filas[i].addEventListener("click", function (event) {
            postSeleccionado(this);
        }, true);
    }
    var editar = document.getElementById("editar");
    editar.addEventListener("click", editarPost);

    var eliminar = document.getElementById("eliminar");
    eliminar.addEventListener("click", eliminarPost);

    var cerrarSesion = document.getElementById("cerrarSesion");
    cerrarSesion.addEventListener("click", cerrarSesion);
}
addEvents();

function postSeleccionado(row) {
    var user = localStorage.getItem("usuarioLogueado");
    if (row.attributes[0].value == user) {
        if (document.getElementsByClassName("trselected").length > 0) {
            var element = document.getElementsByClassName("trselected");
            element[0].removeAttribute("class");
        }
        row.className = "trselected";
    } else {
        alert("Lo sentimos! No tiene derechos de autor");
        cargarTabla();
    }
}

function cerrarSesion() {
    localStorage.removeItem("usuarioLogueado");
    location.href = "login.html";
}

function publicar() {
    var publicacion = document.getElementById("publicacion").value;
    var publicaciones = [];
    if (publicacion != "") {
        publicacion = nuevoPost(publicacion);
        if (localStorage.getItem('publicaciones')) {
            publicaciones = JSON.parse(localStorage.getItem('publicaciones'));
            publicaciones.push(publicacion);
            localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
        } else {
            publicaciones.push(publicacion);
            localStorage.setItem('publicaciones', JSON.stringify(publicaciones));

        }
    } else {
        alert("Lo sentimos! No se puede publicar en blanco");
    }
    document.getElementById("publicacion").value = "";
    cargarTabla();
}

function nuevoPost(post) {
    var usLog = localStorage.getItem("usuarioLogueado");
    var nPublicacion = {
        texto: post,
        user: usLog,
    };
    return nPublicacion;
}

function cargarTabla() {
    var post;
    var usuarioLogueado = document.getElementById("usLogueado");
    usuarioLogueado.innerText = localStorage.getItem("usuarioLogueado");
    document.getElementById("publicacion").focus();
    var publicaciones = JSON.parse(localStorage.getItem("publicaciones"));
    var tabla = document.getElementById("publicaciones-rec");
    tabla.innerHTML = null;
    if (localStorage.getItem("publicaciones")) {
        for (var i = 0; i < publicaciones.length; i++) {
            post = publicaciones[i];
            var fila = "<tr name=\"" + post.user + "\"><td>" + post.texto + "</td></tr>";
            tabla.innerHTML = tabla.innerHTML + fila;
        }
    }
    addEvents();
}
cargarTabla();

function editarPost() {
    if (document.getElementsByClassName("trselected").length != 0) {
        var filaSeleccionada = document.querySelectorAll("tr.trselected")[0].innerText;
        document.getElementById("publicacion").value = filaSeleccionada;

        var bPublicar = document.getElementById("publicar");
        bPublicar.removeEventListener("click", publicar);
        bPublicar.value = "Guardar cambios";
        bPublicar.addEventListener("click", guardarCambios);

    }
     else {
        alert("Debe seleccionar una publicación");
    }
}

function guardarCambios() {
    var nuevaPublicacion = document.getElementById("publicacion").value;
    if (nuevaPublicacion != "") {
        var antiguaPublicacion = document.querySelectorAll("tr.trselected")[0].innerText;
        var publicaciones = JSON.parse(localStorage.getItem('publicaciones'));
        var aux;

        for (var i = 0; i < publicaciones.length; i++) {
            aux = publicaciones[i];
            if (aux.text == antiguaPublicacion) {
                publicaciones[i].text = nuevaPublicacion;
                break;
            }
        }
        localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
        alert("Publicacion editada con éxito");
        document.getElementById("publicacion").focus();
        cargarTabla();
    } else {
        alert("Haz tu publicación!");
    }
}

function eliminarPost() {
    if (document.getElementsByClassName("trselected").length != 0) {
        var mensaje = confirm("Seguro de eliminar la publicación?");
        if (mensaje) {
            var filaSeleccionada = document.querySelectorAll("tr.trselected")[0].innerText;
            var posts = JSON.parse(localStorage.getItem('publicaciones'));

            for (var i = 0; i < posts.length; i++) {
                if (posts[i].texto == filaSeleccionada) {
                    if (posts.length != 1) {
                        posts.splice(i, 1);
                        localStorage.setItem('publicaciones', JSON.stringify(posts));
                        break;
                    } else {
                        localStorage.removeItem("publicaciones");
                        break;
                    }
                }
            }

            alert("Publicación eliminada con éxito!");
            cargarTabla();
            addEvents();
        }
    } else {
        alert("Debe seleccionar una publicación");
    }
}
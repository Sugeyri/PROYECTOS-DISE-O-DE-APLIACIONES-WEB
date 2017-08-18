function annadirEventos() {
    cargarTabla();
    var btnCrear = document.getElementById("guardar");
    btnCrear.addEventListener("click", crearUsuario);

    var filas = document.getElementsByTagName("tr");
    for (var i = 0; i < filas.length; i++) {
        filas[i].addEventListener("click", function (event) {
            filaSeleccionada(this);
        }, true);
    }

    var btnEditar = document.getElementById("editar");
    btnVer.addEventListener("click", editar);
    var btnEliminar = document.getElementById("eliminar");
    btnEliminar.addEventListener("click", eliminar);

}

annadirEventos();

function filaSeleccionada(row) {
    if (document.getElementsByClassName("trselected").length > 0) {
        var aux = document.getElementsByClassName("trselected");
        aux[0].removeAttribute("class");
    }
    row.className = "trselected";
}

function crearUsuario() {
    var usuario = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        usuario: document.getElementById("usuario").value,
        correo: document.getElementById("correo").value,
        pass: document.getElementById("clave").value,
        npass: document.getElementById("nclave").value,
    };

    abrirSesion(usuario);
}

function abrirSesion(Usuario) {
    var usuarios = JSON.parse(localStorage.getItem('usuarios'));
    if ((Usuario.nombre != "") && (Usuario.apellido != "") && (Usuario.correo != "") && (Usuario.pass != "") && (Usuario.npass != "")) {
        if (usuarios == null) {
            if (Usuario.pass != Usuario.npass) {
                alert("Las contraseñas son diferentes!");
            } else {
                guardarUsuario(Usuario);
                limpiarCampos();
                alert("Usuario registrado!");
                location.href = "menu-principal.html";
            }
        } else {
            var elemento;
            for (var i = 0; i < usuarios.length; i++) {
                elemento = usuarios[i];
                if (elemento.correo == Usuario.correo) {
                    alert(Usuario.correo + " ya se encuentra registrado!");
                    document.getElementById("correo").focus();
                    break;
                } else if (elemento.usuario == Usuario.usuario) {
                    alert(Usuario.usuario + " ya se encuentra registrado!");
                    document.getElementById("usuario").focus();
                    break;
                } else if (Usuario.pass != Usuario.npass) {
                    alert("Las contraseñas son diferentes!");
                    document.getElementById("clave").focus();
                    break;
                } else {
                    guardarUsuario(Usuario);
                    limpiarCampos();
                    alert("Usuario registrado!");
                    location.href = "menu-principal.html";
                    break;
                }
            }
        }
    } else {
        alert("Debe llenar todos los campos!");
    }
}

function guardarUsuario(Usuario) {
    var usuarios = [];
    if (localStorage.getItem('usuarios')) {
        usuarios = JSON.parse(localStorage.getItem('usuarios'));
    }
    usuarios.push(Usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    cargarTabla();
}

function limpiarCampos() {
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("usuario").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("clave").value = "";
    document.getElementById("nclave").value = "";
}

function cargarTabla() {
    var user;
    var users = JSON.parse(localStorage.getItem("usuarios"));
    var tabla = document.getElementById("usuarios-tabla");
    tabla.innerHTML = null;

    if (localStorage.getItem("usuarios")) {
        for (var i = 0; i < users.length; i++) {
            user = users[i];
            var fila = "<tr><td>" + user.nombre + "</td><td>" + user.apellido + "</td><td>" + user.usuario + "</td><td>" + user.correo + "</td></tr>";
            tabla.innerHTML = tabla.innerHTML + fila;
        }
    }
    annadirEventos();
}
cargarTabla();

function eliminar() {
    if (document.getElementsByClassName("trselected").length != 0) {
        var mensaje = confirm("¿Seguro de eliminar el registro seleccionado?");
        if (mensaje) {
            var filaSeleccionada = document.querySelectorAll("tr.trselected")[2].innerText;
            var usuarios = JSON.parse(localStorage.getItem("usuarios"));

            for (var i = 0; i < usuarios.length; i++) {
                if (usuarios[i].usuario == filaSeleccionada) {
                    if (usuarios.length != 1) {
                        usuarios.splice(i, 1);
                        localStorage.setItem('usuarios', JSON.stringify(usuarios));
                        break;
                    } else {
                        localStorage.removeItem("usuarios");
                        break;
                    }
                }
            }
            alert("Registro eliminado!");
            annadirEventos();
        }
    } else {
        alert("Debes seleccionar un registro!");
    }
}

function editar(){
    if (document.getElementsByClassName("trselected").length != 0) {
        var filaSeleccionada = document.querySelectorAll("tr.trselected")[0].innerText;
        document.getElementById("nombre").value = filaSeleccionada;

        var gCambios = document.getElementById("guardar");
        gCambios.removeEventListener("click", guardarUsuario);
        gCambios.value = "Guardar Cambios";
        gCambios.addEventListener("click", guardarEdicion);

        if (document.getElementById("cancelar") == null) {
            var cancelar = document.createElement("button");
            cancelar.id = "cancelar";
            var text = document.createTextNode("Cancelar");
            cancelar.appendChild(text);
            cancelar.addEventListener("click", cancelar);
            cancelar.className = "btn btn-danger";
            document.getElementById("buttons").appendChild(cancelar);
        }
    } else {
        alert("Debes seleccionar un registro!");
    }
}


function guardarEdicion(){
	var nNombre = document.getElementById("nombre").value;
	if (nNombre != "") {
		var aNombre = document.querySelectorAll("tr.trselected")[0].innerText;
		var usuarios = JSON.parse(localStorage.getItem('usuarios'));
		var aux;

		for (var i = 0; i < usuarios.length; i++) {
			aux = usuarios[i];
			if (aux.text == aNombre) {
				usuarios[i].text = nNombre;
				break;
			}
		}
		localStorage.setItem('usuarios', JSON.stringify(usuarios));
		cancelar();
		alert("Registro actualizado");
		document.getElementById("nombre").focus();
		cargarTabla();
	} else {
		alert("Agregue el nuevo usuario");
	}
}

function cancelar() {
	document.getElementById("nombre").value = "";
	document.getElementById("guardar").value = "Agregar";
	annadirEventos();
	var padre = document.getElementById("buttons");
	var hijo = document.getElementById("cancelar");
	padre.removeChild(hijo);
}
function annadirEventos() {
	var bIngresar = document.getElementById("ingresar");
	bIngresar.addEventListener("click", verificarDatos);
	var bInvitado = document.getElementById("invitado");
	bInvitado.addEventListener("click", invitado);
}
annadirEventos();

function invitado(){
	location.href = "inicio.html";
}

function verificarDatos() {
	var nUsuario = document.getElementById("user").value;
	var pass = document.getElementById("pass").value;

	if (nUsuario == "" || pass == "") {
		alert("Lo sentimos! Hay campos vacios!");
	} else {
		var users = JSON.parse(localStorage.getItem('usuarios'));
		var element;

		for (var i = 0; i < users.length; i++) {
			element = users[i];
			if (nUsuario == element.usuario) {
				if (pass == element.pass) {
					localStorage.setItem("usuarioLogeado", nUsuario);
					location.href = "menu-principal.html";
					break;
				} else {
					alert("Lo sentimos! Contraseña incorrecta!")
					break;
				}
			} else if (i == users.length - 1) {
				limpiarCampos();
				alert("Lo sentimos! " + nUsuario + " no se encuentra registrado.")
			}
		}
	}
}

function limpiarCampos() {
	document.getElementById("user").value = "";
	document.getElementById("pass").value = "";
}
function addEvents() {
	var button = document.getElementById("crear");
	button.addEventListener("click", nuevoUsuario);
}
addEvents();

function registrarse(nUser) {
	var users = JSON.parse(localStorage.getItem('users'));
	if ((nUser.correo != "") && (nUser.userName != "") && (nUser.pass != "") && (nUser.newpass != "")) {
		if (users == null) {
			if (nUser.pass != nUser.newpass) {
				alert("Las contraseñas no coinciden");
			} else {
				crearUsuario(nUser);
				limpiar();
				alert("Registrado con éxito!");
				location.href = "login.html";
			}
		} else {
			var element;
			for (var i = 0; i < users.length; i++) {
				element = users[i];
				if (element.correo == nUser.correo) {
					alert( nUser.correo + " Ya está registrado");
					document.getElementById("correo").focus();
					break;
				} else if (element.userName == nUser.userName) {
					alert("El nombre de usuario " + User.userName + " ya existe!");
					document.getElementById("nombre").focus();
					break;
				} else if (nUser.pass != nUser.newpass) {
					document.getElementById("pass").focus();
					alert("Contraseñas no coinciden");
					break;
				} else {
					crearUsuario(nUser);
					alert("Registrado con éxito!");
					limpiar();
					location.href = "login.html";
					break;
				}
			}
		}
	}else {
		alert("Debe llenar todos los campos");
	}
}

function crearUsuario(Usuario) {
	var users = [];
	if (localStorage.getItem('users')) {
		users = JSON.parse(localStorage.getItem('users'));
	}
	users.push(Usuario);
	localStorage.setItem('users', JSON.stringify(users));
}

function nuevoUsuario() {
	var usuario = {
		correo: document.getElementById("correo").value,
		userName: document.getElementById("nombre").value,
		pass: document.getElementById("pass").value,
		newpass: document.getElementById("newpass").value,
	};
	registrarse(usuario);
}

function limpiar() {
	document.getElementById("nombre").value = "";
	document.getElementById("correo").value = "";
	document.getElementById("pass").value = "";
	document.getElementById("newpass").value = "";
}
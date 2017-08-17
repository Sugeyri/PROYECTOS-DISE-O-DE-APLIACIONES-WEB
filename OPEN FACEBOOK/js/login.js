function addEvents() {
	var clickBoton = document.getElementById("ingresar");
	clickBoton.addEventListener("click", verificarDatos);
}
addEvents();



function verificarDatos() {
	var userName = document.getElementById("usuario").value;
	var pass = document.getElementById("pass").value;

	if (userName == "" || pass == "") {
		alert("Debe llenar los campos requeridos");
	} else {
		var users = JSON.parse(localStorage.getItem('users'));
		var element;

		for (var i = 0; i < users.length; i++) {
			element = users[i];
			if (userName == element.userName) {
				if (pass == element.pass) {
					localStorage.setItem("usuarioLogueado", userName);
					location.href = "C:\Users\Toshiba\Documents\UTN\V CUATRI\APLICACION WEB\PROYECTOS-DISE-O-DE-APLIACIONES-WEB\OPEN FACEBOOK\principal.html";
					break;
				} else {
					alert("Contraseña incorrecta.")
					break;
				}
			} else if (i == users.length - 1) {
				limpiar();
				alert("Lo sentimos! El usuario " + userName + " no está registrado.")
			}
		}
	}
}

function limpiar() {
	document.getElementById("usuario").value = "";
	document.getElementById("pass").value = "";
}

$(document).ready(function() {
    $('#boton-guardar').click(function () {
        var nom = document.getElementById("nombre").value;
        var apel = document.getElementById("apellido").value;
        var correo = document.getElementById("correo").value;
        var tel = document.getElementById("telefono").value;

        localStorage.setItem("Nombre", nom);
        localStorage.setItem("Apellido", apel);
        localStorage.setItem("Correo", correo);
        localStorage.setItem("Telefono", tel);

        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("correo").value = "";
        document.getElementById("tel").value = "";
    });
});

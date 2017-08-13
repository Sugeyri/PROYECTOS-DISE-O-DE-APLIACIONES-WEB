

$(document).ready(function() {
    $('#agregar').click(function () {
      var nuevoCliente= {codigo : document.getElementById("codigo").value, nombre: document.getElementById("nombre").value,
ruta: document.getElementById("ruta").value, responsable: document.getElementById("responsable").value, 
direccion: document.getElementById("direccion").value, telefono: document.getElementById("telefono").value};

localStorage.setItem('datos-cliente', JSON.stringify(nuevoCliente));

 document.getElementById("codigo").value =""; 
 document.getElementById("nombre").value ="";
 document.getElementById("ruta").value ="";
 document.getElementById("responsable").value ="";
 document.getElementById("direccion").value ="";
 document.getElementById("telefono").value ="";

    });
});
	
	

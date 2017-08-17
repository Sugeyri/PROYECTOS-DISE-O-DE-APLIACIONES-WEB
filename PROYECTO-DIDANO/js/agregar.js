var listaCliente = [];

$(document).ready(function () {
	$('#agregar').click(function () {
		var nuevoCliente = {
			codigo: document.getElementById("codigo").value,
			nombre: document.getElementById("nombre").value,
			ruta: document.getElementById("ruta").value,
			responsable: document.getElementById("responsable").value,
			direccion: document.getElementById("direccion").value,
			telefono: document.getElementById("telefono").value
		};

		console.log(nuevoCliente);
		listaCliente.push(nuevoCliente);

		localStorage.setItem('datos-cliente', JSON.stringify(nuevoCliente));
		mostrarCliente();

		document.getElementById("codigo").value = "";
		document.getElementById("nombre").value = "";
		document.getElementById("ruta").value = "";
		document.getElementById("responsable").value = "";
		document.getElementById("direccion").value = "";
		document.getElementById("telefono").value = "";

	});
});

function mostrarCliente() {
	var lista = listaCliente,
		tbody = document.querySelector('#cliente-tabla tbody');

	tbody.innerHTML = "";

	for (var i = 0; i < lista.length; i++) {
		var row = tbody.insertRow(i);
		codCell = row.insertCell(0),
			nomCell = row.insertCell(1),
			rutaCell = row.insertCell(2),
			respCell = row.insertCell(3),
			dirCell = row.insertCell(4),
			telCell = row.insertCell(5),
			selectCell = row.insertCell(6);

		codCell.innerHTML = lista[i].codigo;
		nomCell.innerHTML = lista[i].nombre;
		rutaCell.innerHTML = lista[i].ruta;
		respCell.innerHTML = lista[i].responsable;
		dirCell.innerHTML = lista[i].direccion;
		telCell.innerHTML = lista[i].telefono;

		var inputSelect = document.createElement('input');
		inputSelect.type = 'radio';
		inputSelect.value = lista[i].codigo;
		inputSelect.name = "radioCliente";
		selectCell.appendChild(inputSelect);

		tbody.appendChild(row);
	}
}

function buscarCliente(pCod) {
	var codCl;
	for (var i = 0; i < listaCliente.length; i++) {
		if (listaCliente[i].codigo == pCod) {
			codCl = listaCliente[i];
		}
	}
}
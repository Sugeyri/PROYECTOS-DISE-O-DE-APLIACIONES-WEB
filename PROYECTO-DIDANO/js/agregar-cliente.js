function annadirEventos() {
    var agregar = document.getElementById("agregar");
    agregar.addEventListener("click", guardarCliente);

    cargarTabla();

    var filas = document.querySelectorAll("tr[id]");
    for (var i = 0; i < filas.length; i++) {
        filas[i].addEventListener("click", function (event) {
            filaSeleccionada(this);
        }, true);
    }
    var btnEditar = document.getElementById("editar");
    btnEditar.addEventListener("click", editar);
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

function agregarCliente() {
    var clientes = {
        codigo: document.getElementById("codigo").value,
        nombre: document.getElementById("nombre").value,
        ruta: document.querySelector('input[name="ruta"]:checked').value,
        responsable: document.getElementById("responsable").value,
        direccion: document.getElementById("direccion").value,
        telefono: document.getElementById("telefono").value,
    };
    return clientes;
}

function guardarCliente() {
    var clientes = [];
    if (localStorage.getItem('clientes')) {
        clientes = JSON.parse(localStorage.getItem('clientes'));
    }
    var nuevoCliente = agregarCliente();
    if ((nuevoCliente.codigo != "") && (nuevoCliente.nombre != "") && (nuevoCliente.direccion != "") && (nuevoCliente.responsable != "") && (nuevoCliente.telefono != "") && (nuevoCliente.ruta != null)) {
        clientes.push(nuevoCliente);
        localStorage.setItem('clientes', JSON.stringify(clientes));
    } else {
        alert("Debe llenar todos los campos!");
    }
}

function limpiarCampos() {
    document.getElementById("nombre").value = "";
    document.getElementById("codigo").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("responsable").value = "";
    document.getElementById("ruta").value = null;
}

function cargarTabla() {
    var cl;
    var cls = JSON.parse(localStorage.getItem("clientes"));
    var tabla = document.getElementById("clientes-tabla");
    tabla.innerHTML = null;

    if (localStorage.getItem("clientes")) {
        for (var i = 0; i < cls.length; i++) {
            cl = cls[i];
            var fila = "<tr><td>" + cl.codigo + "</td><td>" + cl.nombre + "</td><td>" + cl.ruta + "</td><td>" +
                cl.direccion + "</td><td>" + cl.telefono + "</td><td>" + cl.responsable + "</td></tr>";
            tabla.innerHTML = tabla.innerHTML + fila;
        }
    }
    annadirEventos();
}

function eliminar() {
    if (document.getElementsByClassName("trselected").length != 0) {
        var mensaje = confirm("¿Seguro de eliminar el registro seleccionado?");
        if (mensaje) {
            var filaSeleccionada = document.querySelectorAll("tr.trselected")[0].innerText;
            var clientes = JSON.parse(localStorage.getItem("clientes"));

            for (var i = 0; i < clientes.length; i++) {
                if (clientes[i].codigo == filaSeleccionada) {
                    if (clientes.length != 1) {
                        clientes.splice(i, 1);
                        localStorage.setItem('clientes', JSON.stringify(clientes));
                        break;
                    } else {
                        localStorage.removeItem("clientes");
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

function editar() {
    if (document.getElementsByClassName("trselected").length != 0) {
        var fsCod = document.querySelectorAll("tr.trselected")[0].innerText;
        document.getElementById("codigo").value = fsCod;
        var fsNom = document.querySelectorAll("tr.trselected")[1].innerText;
        document.getElementById("nombre").value = fsNom;
        var fsRuta = document.querySelectorAll("tr.trselected")[2].innerText;
        document.getElementsById('#'.concat(fsRuta)).checked = true;
        var fsDir = document.querySelectorAll("tr.trselected")[3].innerText;
        document.getElementById("direccion").value = fsDir;
        var fsTel = document.querySelectorAll("tr.trselected")[4].innerText;
        document.getElementById("telefono").value = fsTel;
        var fsResp = document.querySelectorAll("tr.trselected")[5].innerText;
        document.getElementById("responsable").value = fsResp;

        var gCambios = document.getElementById("agregar");
        gCambios.removeEventListener("click", guardarCliente);
        gCambios.value = "Guardar Cambios";
        gCambios.addEventListener("click", guardarEdicion);

        if (document.getElementById("cancelarCl") == null) {
            var cancelar = document.createElement("button");
            cancelar.id = "cancelarCl";
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


function guardarEdicion() {
    var nuevoCliente = agregarCliente();
    if ((nuevoCliente.codigo != "") && (nuevoCliente.nombre != "") && (nuevoCliente.direccion != "") && (nuevoCliente.responsable != "") && (nuevoCliente.telefono != "") && (nuevoCliente.ruta != null)) {
        var antCod = document.querySelectorAll("tr.trselected")[0].innerText;
        var antNom = document.querySelectorAll("tr.trselected")[1].innerText;
        var antRuta = document.querySelectorAll("tr.trselected")[2].innerText;
        var antDir = document.querySelectorAll("tr.trselected")[3].innerText;
        var antTel = document.querySelectorAll("tr.trselected")[4].innerText;
        var antResp = document.querySelectorAll("tr.trselected")[5].innerText;
        var clientes = JSON.parse(localStorage.getItem('clientes'));
        var aux;

        for (var i = 0; i < clientes.length; i++) {
            aux = clientes[i];
            if (aux.codigo == antCod) {
                clientes[i].codigo = nuevoCliente.codigo;
                break;
            }
            if (aux.nombre == antNom) {
                clientes[i].nombre = nuevoCliente.nombre;
                break;
            }
            if (aux.ruta.value == antRuta) {
                clientes[i].ruta = nuevoCliente.ruta;
                break;
            }
            if (aux.direccion == antDir) {
                clientes[i].direccion = nuevoCliente.direccion;
                break;
            }
            if (aux.telefono == antTel) {
                clientes[i].telefono = nuevoCliente.telefono;
                break;
            }
            if (aux.responsable == antResp) {
                clientes[i].responsable = nuevoCliente.responsable;
                break;
            }
        }
        localStorage.setItem('clientes', JSON.stringify(clientes));
        cancelar();
        alert("Registro actualizado");
        document.getElementById("codigo").focus();
        cargarTabla();
    } else {
        alert("Agregue el nuevo registro");
    }
}

function cancelar() {
    limpiarCampos();
    document.getElementById("agregar").value = "Agregar";
    annadirEventos();
    var padre = document.getElementById("buttons");
    var hijo = document.getElementById("cancelarCl");
    padre.removeChild(hijo);
}
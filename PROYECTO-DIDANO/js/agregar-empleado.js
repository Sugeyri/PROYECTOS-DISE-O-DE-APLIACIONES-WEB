function annadirEventos() {
    var agregar = document.getElementById("agregar");
    agregar.addEventListener("click", guardarEmpleado);

    cargarTabla();

    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        rows[i].addEventListener("click", function (event) {
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
        var element = document.getElementsByClassName("trselected");
        element[0].removeAttribute("class");
    }
    row.className = "trselected";
    cargarTabla();
}

function agregarEmpleado() {
    var empleados = {
        codigo: document.getElementById("codigo").value,
        nombre: document.getElementById("nombre").value,
        telefono: document.getElementById("telefono").value,
    };
    return empleados;
}

function guardarEmpleado() {
    var empleados = [];
    if (localStorage.getItem('empleados')) {
        empleados = JSON.parse(localStorage.getItem('empleados'));
    }
    var nuevoEmpleado = agregarEmpleado();
    if ((nuevoEmpleado.codigo != "") && (nuevoEmpleado.nombre != "") && (nuevoEmpleado.telefono != "")) {
        empleados.push(nuevoEmpleado);
        localStorage.setItem('empleados', JSON.stringify(empleados));
    } else {
        alert("Debe llenar todos los campos!");
    }
}

function limpiarCampos() {
    document.getElementById("codigo").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("telefono").value = "";
}

function cargarTabla() {
    var empleado;
    var empleados = JSON.parse(localStorage.getItem("empleados"));
    var tabla = document.getElementById("empleado-tabla");
    tabla.innerHTML = null;

    if (localStorage.getItem("empleados")) {
        for (var i = 0; i < empleados.length; i++) {
            empleado = empleados[i];
            var fila = "<tr><td>" + empleado.codigo + "</td><td>" + empleado.nombre + "</td><td>" + empleado.telefono + "</td></tr>";
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
            var empleados = JSON.parse(localStorage.getItem("empleados"));

            for (var i = 0; i < empleados.length; i++) {
                if (empleados[i].codigo == filaSeleccionada) {
                    if (empleados.length != 1) {
                        empleados.splice(i, 1);
                        localStorage.setItem('empleados', JSON.stringify(empleados));
                        break;
                    } else {
                        localStorage.removeItem("empleados");
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
        var fsTel = document.querySelectorAll("tr.trselected")[2].innerText;
        document.getElementById("telefono").value = fsTel;

        var gCambios = document.getElementById("agregar");
        gCambios.removeEventListener("click", guardarEmpleado);
        gCambios.value = "Guardar Cambios";
        gCambios.addEventListener("click", guardarEdicion);

        if (document.getElementById("cancelarEmp") == null) {
            var cancelar = document.createElement("button");
            cancelar.id = "cancelarEmp";
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
    var nuevoEmpleado = agregarCliente();
    if ((nuevoEmpleado.codigo != "") && (nuevoEmpleado.nombre != "") && (nuevoEmpleado.telefono != "")) {
        var antCod = document.querySelectorAll("tr.trselected")[0].innerText;
        var antNom = document.querySelectorAll("tr.trselected")[1].innerText;
        var antTel = document.querySelectorAll("tr.trselected")[2].innerText;
        var empleados = JSON.parse(localStorage.getItem('empleados'));
        var aux;

        for (var i = 0; i < empleados.length; i++) {
            aux = empleados[i];
            if (aux.codigo == antCod) {
                empleados[i].codigo = nuevoEmpleado.codigo;
                break;
            }
            if (aux.nombre == antNom) {
                empleados[i].nombre = nuevoEmpleado.nombre;
                break;
            }
            if (aux.telefono == antTel) {
                empleados[i].telefono = nuevoEmpleado.telefono;
                break;
            }
        }
        localStorage.setItem('empleados', JSON.stringify(empleados));
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
    var hijo = document.getElementById("cancelarEmp");
    padre.removeChild(hijo);
}
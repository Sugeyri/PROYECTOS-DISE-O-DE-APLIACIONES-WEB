function annadirEventos() {
    var agregar = document.getElementById("agregar");
    agregar.addEventListener("click", guardarProducto);
    cargarTabla();

    var filas = document.getElementsByTagName("tr");
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

function agregarProducto() {
    var productos = {
        codigo: document.getElementById("codigo").value,
        nombre: document.getElementById("nombre").value,
        familia: document.querySelector('input[name="fam"]:checked').value,
        unidad: document.querySelector('input[name="und"]:checked').value,
        precio: document.getElementById("precio").value,
    };
    return productos;
}

function guardarProducto() {
    var productos = [];
    if (localStorage.getItem('productos')) {
        productos = JSON.parse(localStorage.getItem('productos'));
    }
    var nuevoProd = agregarProducto();
    if ((nuevoProd.codigo != "") && (nuevoProd.nombre != "") && (nuevoProd.familia != null) &&
        (nuevoProd.unidad != null) && (nuevoProd.precio != "")) {
        productos.push(nuevoProd);
        localStorage.setItem('productos', JSON.stringify(productos));
    } else {
        alert("Debe llenar todos los campos!");
    }
}

function limpiarCampos() {
    document.getElementById("nombre").value = "";
    document.getElementById("codigo").value = "";
    document.getElementById("familia").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("unidad").value = null;
}

function cargarTabla() {
    var prod;
    var prods = JSON.parse(localStorage.getItem("productos"));
    var tabla = document.getElementById("productos-tabla");
    tabla.innerHTML = null;

    if (localStorage.getItem("productos")) {
        for (var i = 0; i < prods.length; i++) {
            prod = prods[i];
            var fila = "<tr><td>" + prod.codigo + "</td><td>" + prod.nombre + "</td><td>" + prod.familia + "</td><td>" +
                prod.unidad + "</td><td>" + prod.precio + "</td></tr>";
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
            var productos = JSON.parse(localStorage.getItem("productos"));

            for (var i = 0; i < productos.length; i++) {
                if (productos[i].codigo == filaSeleccionada) {
                    if (productos.length != 1) {
                        productos.splice(i, 1);
                        localStorage.setItem('productos', JSON.stringify(productos));
                        break;
                    } else {
                        localStorage.removeItem("productos");
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
        var fsFam = document.querySelectorAll("tr.trselected")[2].innerText;
        document.getElementsById('#'.concat(fsFam)).checked = true;
        var fsUnd = document.querySelectorAll("tr.trselected")[3].innerText;
        document.getElementsById('#'.concat(fsUnd)).checked = true;
        var fsPre = document.querySelectorAll("tr.trselected")[4].innerText;
        document.getElementById("Precio").value = fsPre;

        var gCambios = document.getElementById("agregar");
        gCambios.removeEventListener("click", guardarProducto);
        gCambios.value = "Guardar Cambios";
        gCambios.addEventListener("click", guardarEdicion);

        if (document.getElementById("cancelarP") == null) {
            var cancelar = document.createElement("button");
            cancelar.id = "cancelarP";
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
    var nuevoProducto = agregarProducto();
    if ((nuevoProducto.codigo != "") && (nuevoProducto.nombre != "") && (nuevoProducto.familia != null) &&
        (nuevoProducto.unidad != null) && (nuevoProducto.precio != "")) {
        var antCod = document.querySelectorAll("tr.trselected")[0].innerText;
        var antNom = document.querySelectorAll("tr.trselected")[1].innerText;
        var antFam = document.querySelectorAll("tr.trselected")[2].innerText;
        var antUnd = document.querySelectorAll("tr.trselected")[3].innerText;
        var antPre = document.querySelectorAll("tr.trselected")[4].innerText;
        var productos = JSON.parse(localStorage.getItem('productos'));
        var aux;

        for (var i = 0; i < productos.length; i++) {
            aux = productos[i];
            if (aux.codigo == antCod) {
                productos[i].codigo = nuevoProducto.codigo;
                break;
            }
            if (aux.nombre == antNom) {
                productos[i].nombre = nuevoProducto.nombre;
                break;
            }
            if (aux.familia.value == antFam) {
                productos[i].familia = nuevoProducto.familia;
                break;
            }
            if (aux.unidad.value == antUnd) {
                productos[i].unidad = nuevoProducto.unidad;
                break;
            }
            if (aux.precio == antPre) {
                productos[i].precio = nuevoProducto.precio;
                break;
            }
        }
        localStorage.setItem('productos', JSON.stringify(productos));
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
    var hijo = document.getElementById("cancelarP");
    padre.removeChild(hijo);
}
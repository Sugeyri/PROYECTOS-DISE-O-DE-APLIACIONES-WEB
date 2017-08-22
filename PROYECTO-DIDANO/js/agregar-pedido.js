function annadirEventos() {
    var agregar = document.getElementById("agregar");
    agregar.addEventListener("click", guardarLista);

    var filas = document.querySelectorAll("tr[id]");
    for (var i = 0; i < filas.length; i++) {
        filas[i].addEventListener("click", function (event) {
            filaSeleccionada(this);
        }, true);
    }
    var btnEliminar = document.getElementById("eliminar");
    btnEliminar.addEventListener("click", eliminar);

    var btnEnviar = document.getElementById("enviar");
    btnEnviar.addEventListener("click", enviar);
}

annadirEventos();
cargarTabla();

function filaSeleccionada(row) {
    if (document.getElementsByClassName("trselected").length > 0) {
        var aux = document.getElementsByClassName("trselected");
        aux[0].removeAttribute("class");
    }
    row.className = "trselected";
}

function agregarLista() {
    var productos = {
        codigo: document.getElementById("codigo").value,
        nombre: document.getElementById("nombre").value,
        cantidad: document.getElementById("cantidad").value,
    };
    return productos;
}

function guardarLista() {
    var productos = [];
    if (sessionStorage.getItem('lista')) {
        productos = JSON.parse(sessionStorage.getItem('lista'));
    }
    var nuevaLista = agregarLista();
    if ((nuevaLista.codigo != "") && (nuevaLista.nombre != "") && (nuevaLista.cantidad != "")) {
        productos.push(nuevaLista);
        sessionStorage.setItem('lista', JSON.stringify(productos));
    } else {
        alert("Debe llenar todos los campos!");
    }
}

function cargarTabla() {
    var cl;
    var cls = JSON.parse(sessionStorage.getItem("lista"));
    var tabla = document.getElementById("pedido-tabla");
    tabla.innerHTML = null;

    if (sessionStorage.getItem("lista")) {
        for (var i = 0; i < cls.length; i++) {
            cl = cls[i];
            var fila = "<tr><td>" + cl.codigo + "</td><td>" + cl.nombre + "</td><td>" + cl.cantidad + "</td></tr>";
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
            var productos = JSON.parse(sessionStorage.getItem("lista"));

            for (var i = 0; i < productos.length; i++) {
                if (productos[i].codigo == filaSeleccionada) {
                    if (productos.length != 1) {
                        productos.splice(i, 1);
                        sessionStorage.setItem('lista', JSON.stringify(productos));
                        cargarTabla();
                        break;
                    } else {
                        sessionStorage.removeItem("lista");
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

function agregarPedido() {
    var productos = [];
    productos = JSON.parse(sessionStorage.getItem("lista"));
    var pedido = {
        fecha: document.getElementById("fecha").value,
        codCl: document.getElementById("cod-cliente").value,
        responsable: document.getElementById("responsable").value,
        total: document.getElementById("total").value,
        notas: document.getElementById("notas").value,
        productos: productos,
    };
    return pedido;
}

function enviar() {
    var pedidos = [];
    if(localStorage.getItem('pedidos')){
        pedidos = JSON.parse(localStorage.getItem('pedidos'));
    }
    var nuevaLista = agregarPedido();
    if ((nuevaLista.codCl != "") && (nuevaLista.fecha != "") && (nuevaLista.total != "")
         && (nuevaLista.responsable != "") && (nuevaLista.productos != "")) {
        pedidos.push(nuevaLista);
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
        limpiarCampos();
    } else {
        alert("Debe llenar todos los campos!");
    }
}

function limpiarCampos() {
    document.getElementById("fecha").value = "";
    document.getElementById("cod-cliente").value = "";
    document.getElementById("total").value = "";
    document.getElementById("notas").value = "";
    document.getElementById("responsable").value = "";
}


function extraerDatos(){
    //se extraen los datos de las cajas de texto
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var usuario = document.getElementById("usuario").value;
    var email = document.getElementById("email").value;
    var clave = document.getElementById("clave").value;
    var nclave = document.getElementById("nclave").value;
    
    var datos = {nombre: nombre, apellido: apellido, usuario: usuario, fecha: fecha, email:email, clave:clave, nclave:nclave};
    //la variable "datos" almacena toda la información del usuario en formato Json
    return datos;
}



function validarDatos(){
    debugger;
    
    var user = extraerDatos();
    var estado = false;
    var users = JSON.parse(localStorage.getItem("users"));
    
    //condicional verifica que las contraseñas que el usuario ingreso en la pantalla de registro sean las mismas
    if(user.clave == user.nclave){
        //condicional verifica si localstorage esta vacio 
        if(!users){
            users = [];//crea arreglo
            users.push(user);//le inserta el nuevo usuario 
            localStorage.setItem("users", JSON.stringify(users));//lo almacena en localstorage
            alert("Registro exitoso!");
            
        }else{
            for(var i in users)
            {   //se compara con todos los usuarios de localstore y si existe 
                //esta variable boolean cambia de estado a "true" y envia un mensaje 
                    estado = true;
                if(users[i].usuario == user.usuario){
                    alert("El usuario ya existe!");
                }
            
            }
                //se compara la variable estado, si esta "falso" quiere decir que el nombre de usuario
                //se encuentra disponible y el registro se realizara exitosamente
                if(estado == false){ 
                    users.push(user);
                    localStorage.setItem("users", JSON.stringify(users));
                    alert("Registro exitoso!");
                }
        
        }
        
    }else{
        alert("¡Claves diferentes!")
        setTimeout (redireccionar(), 5000);
    }
    
        
    }


function Agregar(){
    var obj=document.getElementById("guardar");
    obj.addEventListener('click', function(){//evento del boton "click"
        validarDatos();  //llama a la funcion "ValidarDatos"  
    });
}

Agregar();


function redireccionar(){
  window.locationf="file:///C:/Users/Toshiba/Documents/UTN/V%20CUATRI/APLICACION%20WEB/PROYECTOS-DISE-O-DE-APLIACIONES-WEB/PROYECTO-DIDANO/iniciar-sesion.html";
} 


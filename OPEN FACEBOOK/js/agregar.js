var post =[];

$(document).ready(function() {
    $('#publicar').click(function () {
      var nuevoPost= {publicacion : document.getElementById("publicacion").value};

console.log(nuevoPost);
post.push(nuevoPost);

mostrarPost();

localStorage.setItem('POSTS', JSON.stringify(nuevoPost));


 document.getElementById("publicacion").value =""; 
    });
});
	

function mostrarPost(){
	var tbody = document.querySelector('#publicaciones-rec tbody');

	  tbody.innerHTML ="";

	  var pbl = JSON.parse(localStorage.getItem('publicacion'));


	  for(var i =0; i<post.length; i++){
		  var row = document.createElement('tr');

		  var celdas = document.createElement('td');

		  var nodo = document.createTextNode(publicacion[i]);

		  celdas.appendChild(nodo);
		row.appendChild(celdas);
            
        var inputSelect = document.createElement('input');
        inputSelect.type = 'radio';
        inputSelect.value = lista[i].publicacion;
        inputSelect.name = "radioPost";
        selectCell.appendChild(inputSelect);

			tbody.appendChild(row);
	  }
}


function borrarPost(pPost){
	var pst= JSON.parse(localStorage.getItem('publicacion'));
	
	for(var i =0; i< post.length; i++){
		if(post[i].publicacion == pPost){
			localStorage.removeItem(publicacion);
		}
	}
}

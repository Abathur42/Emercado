//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
   });

//guarda el usuario nomás 
function guardar(user){
    localStorage.setItem("Usuario", user);

}
// comprueba que los campos no esten vacios y guarda la data si hay algo mal tira alerta.
function comprobar(){
        let dato = document.getElementById("email");
    if ((dato != "") && (document.getElementById("contrasena") != "")){
        guardar(dato.value);
        document.FORM.submit();
}
    else{
        alert("Faltan datos");
    }
}
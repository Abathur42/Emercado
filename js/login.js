//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.



document.addEventListener("DOMContentLoaded", function(e){
    
   

});
function guardar(user){
    localStorage.setItem("Usuario", user);

}
    function comprobar(){
        let dato = document.getElementById("email");
    if ((dato != "") && (document.getElementById("contrasena") != "")){
        guardar(dato.value);
        document.FORM.submit();
}
    else{
        alert("Ingrese algo");
    }
}
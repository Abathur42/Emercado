

//funcion que guarda los dato que se ingresan en el modal.Crea un objeto con toda la data, lo hace JSON y lo guarda en el localStorage
function guardarDatos() {
    let usuarioName = document.getElementById("NombreModal").value;
    let usuarioEdad = document.getElementById("EdadModal").value;
    let usuarioMail = document.getElementById("MailModal").value;
    let usuarioImg = document.getElementById("ImagenModal").value;
    let usuarioTelefono = document.getElementById("TelefonoDeContactoModal").value;

    let objeto = {
        name: usuarioName,
        edad: usuarioEdad,
        email: usuarioMail,
        img: usuarioImg,
        tel: usuarioTelefono,
    }

    let objetoString = JSON.stringify(objeto);
    localStorage.setItem("Usuario", usuarioName);
    localStorage.setItem("UsuarioObj", objetoString);
    console.log(localStorage.getItem("UsuarioObj"));

}
//Funcion que solo muestra los datos en los campos y de la forma que quiero
function MostrarDatos() {
    //Si no tengo a nadie logeado mostralo de una forma predeterminada y no dejo modificar el perfil.
    if (localStorage.getItem("Usuario") === null) {
        document.getElementById("modificarPerfil").disabled = true;
        document.getElementById("NombreYApellido").innerHTML = "Debe estar logeado para ver esto";
        document.getElementById("Edad").innerHTML = "Debe estar logeado para ver esto";
        document.getElementById("mail").innerHTML = "Debe estar logeado para ver esto";
        document.getElementById("tel").innerHTML = "Debe estar logeado para ver esto";
        document.getElementById("imagen").innerHTML = `<img id="imagen" src="img/perfil.jpg" alt="asdasd" class="img-thumbnail" width="200"></img>`


    }
    //Si tengo datos guardados los pega
    else {
        var obj = JSON.parse(localStorage.getItem("UsuarioObj"));

        document.getElementById("NombreYApellido").innerHTML = obj.name;
        document.getElementById("Edad").innerHTML = obj.edad;
        document.getElementById("mail").innerHTML = obj.email;
        document.getElementById("tel").innerHTML = obj.tel;
        document.getElementById("dropdownMenuButton").innerHTML = obj.name;
        //Copia la url que le pasaste desde la pagina con las caracteristicas dadas en la letra.Puede reventar si no lo pasa de manera correcta
        document.getElementById("imagen").innerHTML = `` + obj.img + ``;
        //Como la imagen viene predefinida en el tamaño que la mandas con esto lo bajo a tener a un tamaño más agradable para la página
        document.getElementsByTagName("img")[0].setAttribute("width",300);
        
    }
}
//Hace las 2 funciones anteriores juntas
function GuardaryMostar() {
    guardarDatos();
    MostrarDatos();
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function (e) {
    MostrarDatos();
});
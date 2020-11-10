const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_INFO_URL_2 ="https://japdevdep.github.io/ecommerce-api/cart/654.json";//Esto es para el desafiante de la entrega 5
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

//Esto ya venía hecho.
var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
//funcion que elimina los datos almacenados.
function cerrarSesion(){
    localStorage.removeItem("Usuario");
    localStorage.removeItem("UsuarioObj");
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  
  
  let htmlContentToAppend = " ";
  //Si NO tengo usuario cargado solo muestra un boton para iniciar sesion.
  if (localStorage.getItem("Usuario") === null){
    
    htmlContentToAppend += `<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
    aria-haspopup="true" aria-expanded="false">Anónimo
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="index.html">Iniciar sesión</a>`

}
//Si tengo usuario guardado cargo las cosas como pedia la letra.
else{
  
  htmlContentToAppend += `<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
  aria-haspopup="true" aria-expanded="false">`+ localStorage.getItem("Usuario") + `
</button>
<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
  <a class="dropdown-item" href="cart.html">Ver carrito</a>
  <a class="dropdown-item" href="my-profile.html">Perfil</a>
  <a class="dropdown-item" href="index.html" onclick=cerrarSesion()>Cerrar sesión</a>`
}

document.getElementById("dropdown").innerHTML = htmlContentToAppend;

});

//document.getElementById("dropdownMenuButton").innerHTML = "Anonimo";
//document.getElementById("dropdownMenuButton").innerHTML = localStorage.getItem("Usuario");
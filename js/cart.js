//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//const CART_INFO_URL_2 ="https://japdevdep.github.io/ecommerce-api/cart/654.json";


let productos = {};
let j = 0;

/* Se tomo un template de boostrap para hacer el carrito.En el for solo aparecen los elementos del carrito el resto esta en el HTML */
function showCarrito(array) {
  let htmlContentToAppend = "";
  costoSubTotal(array);
  for (j = 0; j < array.articles.length; j++) {
    htmlContentToAppend += `<div class="row mb-4">
        <div class="col-md-5 col-lg-3 col-xl-3">
          <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
            <img class="img-fluid w-100"
              src="`+ array.articles[j].src + `" alt="Sample">
            <a href="#!">
              <div class="mask waves-effect waves-light">
                
                <div class="mask rgba-black-slight waves-effect waves-light"></div>
              </div>
            </a>
          </div>
        </div>
        <div class="col-md-7 col-lg-9 col-xl-9">
          <div>
            <div class="d-flex justify-content-between">
              <div>
                <h5>`+ array.articles[j].name + `</h5>
                
              </div>
              <div>
              <label for="quantity">Cantidad:</label>
              <input type="number" id="`+ j + `" placeholder="` + array.articles[j].count + `" value="` + array.articles[j].count + `" name="quantity" min="1">
                <small id="passwordHelpBlock" class="form-text text-muted text-center">
                  
                </small>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <a href="#!" type="button" class="card-link-secondary small text-uppercase mr-3"><i
                    class="fas fa-trash-alt mr-1"></i> Sacar item </a>
                <a href="#!" type="button" class="card-link-secondary small text-uppercase"><i
                    class="fas fa-heart mr-1"></i> Agregar a la wish list </a>
              </div>
              <p class="mb-0"><span><strong>`+ array.articles[j].currency + ` ` + array.articles[j].unitCost + `</strong></span></p>
              <p class="mb-0" id="cosito`+j+`"><span><strong> Subtotal: `+ array.articles[j].currency +` ` + array.articles[j].unitCost + `</strong></span></p>
            </div>
          </div>
        </div>
      </div>
      <hr class="mb-4">`


    document.getElementById("producto").innerHTML = htmlContentToAppend;



  }
  sub(array);
  /*Por algún motivo dentro del primer for no anda el updateSub del primer elemento.Si se saca para afuera y se usa en otro for anda en ambos.*/
  for (let i = 0; i < array.articles.length; i++) {
    document.getElementById(i).addEventListener("change", function () {

      document.getElementById("cosito"+i).innerHTML = "<span><strong> Subtotal: "+ array.articles[i].currency +" "+ array.articles[i].unitCost * document.getElementById(i).value + "</strong></span>";
      //La linea anterior actualiza el precio subtotal de cada producto individual
      updateSub(array);
      // Actualiza el subtotal de todo
      
    });

  }
}
/*Funcion que muestra el tiempo de envio dependiendo que casilla se tenga seleccionada en shipping */
function tiempoDeEnvio() {
  document.getElementById("gridRadios1").addEventListener("click", function () {
    document.getElementById("time").innerHTML = "2 a 3 días";
  });
  document.getElementById("gridRadios2").addEventListener("click", function () {
    document.getElementById("time").innerHTML = "5 a 8 días";
  });
  document.getElementById("gridRadios3").addEventListener("click", function () {
    document.getElementById("time").innerHTML = "12 a 15 días";
  });
}

/*Funcion que calcula el subtotal que se muestra al momento de cargar la página, se toman los valores que viene en el JSON para hacer los
calculos luego se van cambiando con la funcion updateSub.*/
function costoSubTotal(array) {

  let subTotal = 0;

  for (let i = 0; i < array.articles.length; i++) {


    if (array.articles[i].currency === "USD") {
      subTotal += array.articles[i].unitCost * 40 * array.articles[i].count;
    }
    else if (array.articles[i].currency === "UYU") {
      subTotal += array.articles[i].unitCost * array.articles[i].count;

    }

  }
  document.getElementById("subTotal").innerHTML = "UYU " + subTotal;
  document.getElementById("Total").innerHTML = "UYU " + subTotal;
}
//Al principio muestra los sub de cada producto por separado para luego actualizarlo por separado.
function sub(array){
  let sub = 0;
  
  for (let i = 0; i < array.articles.length; i++) {
    sub =  array.articles[i].unitCost * array.articles[i].count;
    console.log(sub);
    document.getElementById("cosito"+i).innerHTML = "<span><strong> Subtotal: "+ array.articles[i].currency +" "+ sub + "</strong></span>";
  }

}

/*Funcion que va actualizando los costos a medida que se aumenta las diferentes cantidades.*/
function updateSub(array) {

  let update = 0;
  for (let i = 0; i < array.articles.length; i++) {
    cantidad = document.getElementById(i).value;

    if (array.articles[i].currency === "USD") {
      update += array.articles[i].unitCost * 40 * cantidad;
    }
    else if (array.articles[i].currency === "UYU") {
      update += array.articles[i].unitCost * cantidad;

    }

  }
  document.getElementById("subTotal").innerHTML = "UYU " + update;
  document.getElementById("Total").innerHTML = "UYU " + update;
}




//FIN DE LAS FUNCIONES
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_URL_2).then(function (result) {
    if (result.status === "ok") {
      showCarrito(result.data);

    }
  })
  tiempoDeEnvio();
});


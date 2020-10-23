//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//const CART_INFO_URL_2 ="https://japdevdep.github.io/ecommerce-api/cart/654.json";


let productos = {};
let j = 0;
let array = {};

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
              <p class="mb-0" id="cosito`+ j + `"><span><strong> Subtotal: ` + array.articles[j].currency + ` ` + array.articles[j].unitCost + `</strong></span></p>
            </div>
          </div>
        </div>
      </div>
      <hr class="mb-4">`


    document.getElementById("producto").innerHTML = htmlContentToAppend;



  }
  sub(array);
  Total(array);

  /*Por algún motivo dentro del primer for no anda el updateSub del primer elemento.Si se saca para afuera y se usa en otro for anda en ambos.*/
  for (let i = 0; i < array.articles.length; i++) {
    document.getElementById(i).addEventListener("change", function () {

      document.getElementById("cosito" + i).innerHTML = "<span><strong> Subtotal: " + array.articles[i].currency + " " + array.articles[i].unitCost * document.getElementById(i).value + "</strong></span>";
      //La linea anterior actualiza el precio subtotal de cada producto individual
      updateSub(array);
      // Actualiza el subtotal de todo
      Total(array);

    });
  }
  for (let y = 1; y < 4; y++) {

    document.getElementById("gridRadios" + y).addEventListener("click", function () {

      Total(array);
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
function sub(array) {
  let sub = 0;

  for (let i = 0; i < array.articles.length; i++) {
    sub = array.articles[i].unitCost * array.articles[i].count;

    document.getElementById("cosito" + i).innerHTML = "<span><strong> Subtotal: " + array.articles[i].currency + " " + sub + "</strong></span>";
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
  return update;

}
//Calcula el envio, total y los muestra en pesos uruguayos
function Total(array) {

  let Total = updateSub(array);
  let envio = (updateSub(array) * 15) / 100;

  if (document.getElementById("gridRadios1").checked) {
    Total += (updateSub(array) * 15) / 100;
    envio = (updateSub(array) * 15) / 100;

  }
  else if (document.getElementById("gridRadios2").checked) {
    Total += (updateSub(array) * 7) / 100;
    envio = (updateSub(array) * 7) / 100;

  }
  else if (document.getElementById("gridRadios3").checked) {
    Total += (updateSub(array) * 5) / 100;
    envio = (updateSub(array) * 5) / 100;

  }

  document.getElementById("Envio").innerHTML = "UYU " + envio;
  document.getElementById("Total").innerHTML = "UYU " + Total;
}

//Esta funcion se usa cuando tocas el primer boton en el modal de método de pago,deshabilita y limpia el input de cuenta bancaria.
function deshabilitarCuentaBancaria() {

  document.getElementById("CB").disabled = true;
  document.getElementById("TC1").disabled = false;
  document.getElementById("TC2").disabled = false;
  document.getElementById("TC3").disabled = false;
  document.getElementById("TC4").disabled = false;
  document.getElementById("CB").value = "";

}
//Lo mismo que la anterior pero esta se activa con el botón de cuenta bancaria y deshabilita y limpia todos los input de tarjeta de credito.
function deshabilitarTarjetaDeCredito() {
  document.getElementById("TC1").disabled = true;
  document.getElementById("TC2").disabled = true;
  document.getElementById("TC3").disabled = true;
  document.getElementById("TC4").disabled = true;
  document.getElementById("CB").disabled = false;

  document.getElementById("TC1").value = "";
  document.getElementById("TC2").value = "";
  document.getElementById("TC3").value = "";
  document.getElementById("TC4").value = "";

}

//Funcion auxiliar que se usa si algún campo esta vacio.
function AlertaDeCamposVacios() {
  alert("Faltan rellenar campos");
}
//Funcion que SOLO verifica si los campos de métodos de pago estan vacios.
function verificarMP() {
  let ver = true;
  if (!document.getElementById("creditCardPaymentRadio").checked && !document.getElementById("creditCardPaymentRadio2").checked) {
    alert("Seleccione un método de pago");
  }
  else {
    let i = 1;
    let j = 0;
    if (document.getElementById("creditCardPaymentRadio").checked) {
      for (i; i < 5; i++) {
        ver = document.getElementById("TC" + i).value != "";
      }
    }
    else if (document.getElementById("creditCardPaymentRadio2").checked) {
      ver = document.getElementById("CB").value != "";
    }
  }
  return !ver;
}

//Funcion que SOLO verifica si los campos de direccion  estan vacios.
function verificarD() {

  let banderita = true;
  banderita = document.getElementById("direccion").value == "";
  banderita = document.getElementById("numeroDePuerta").value == "";
  banderita = document.getElementById("esquina").value == "";
  banderita = document.getElementById("numeroDeContacto").value == "";


  return !banderita;
}

//Funcion que verifica y alerte si los campos de métodos de pago  estan vacios.
function verificarMPyAlert() {
  if (verificarMP()) { AlertaDeCamposVacios(); }
}
//Funcion que verifica y alerte si los campos de direccion  estan vacios.
function verificarDyAlert() {
  if (!verificarD()) { AlertaDeCamposVacios(); }
}

//Funcion que se corre cuando apreto "Finalizar compra", mira que los campos requeridos y despliega un mensaje dependiendo de lo que tenga
function verificarCompra() {
  if (!verificarMP() && verificarD()) {
    alert("Compra realizada con éxito");
  }
  else {
    alert("Falta rellenar datos");
  }
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


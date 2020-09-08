//const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
//const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
var product = {};
var lista = {};
var wea = 0;

/*
Funcion simple que recorre un array de imagenes e imprime las misma siguiendo un formato
*/
function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}
/*
Funcion para los productos relacionados, el primer termino es el arreglo que contiene los números de los productos relacionados
el segundo es la lista con todos los productos disponible.Para recorrer saco siempre me paro en el producto con la posicion relativa
que corresponda y avanzo hasta terminar.
*/
function showRelatived(array, productos) {
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let posicionRelativa = array[i];
        let productoRelativo = productos[posicionRelativa];

        htmlContentToAppend += `
    <div class= "col-lg-3 col-md-4 col-6">
        <div id= "relatedProductImg" class= "row">
            <img class= "img-fluid p-2" src="` + productoRelativo.imgSrc + `">
        </div>
        <div "relatedProductInfo" class = "row p-2">
        <h3>` + productoRelativo.name + `</h3>
        <p>` + productoRelativo.description + `</p>
        </div>
        <div class "row p-2">
        <a href = "product-info.html">Mas</a>
        </div>
    </div>`

        document.getElementById("productoRelacionados").innerHTML = htmlContentToAppend;
    }

}
/*
Fusiones la funcion de mostrar un comentario con la funcion que muestra las estrellas.
Para las estrella simplemente conte la cantidad de "estrellas" mirando el score los imprimi
siguendo eso y el resto de las estrellas les relleno vacias

*/
function showComent(array) {

    let htmlContentToAppend = "";

    for (let j = 0; j < array.length; j++) {
        let usuario = array[j];
        contador = 0;

        htmlContentToAppend += `<h5>` + usuario.user + ` ` + usuario.dateTime + `</h5>`
        for (let i = 0; i < usuario.score; i++) {
            htmlContentToAppend += `<span class="fa fa-star checked"></span>`
            contador++;

        }
        for (contador; contador < 5; contador++) {
            htmlContentToAppend += `<span class="fa fa-star"></span>`

        }
        htmlContentToAppend += `<p>` + usuario.description + `</p>`
        document.getElementById("insertarComentario").innerHTML = htmlContentToAppend;
    }



}
//funcion que uso para guardar el valor de la estrella cuando voy a agregar un comentario
//quizas hay una forma más simple pero no se me ocurrio
function guardarvalor(numero) {
    wea = numero;
}
//funcion que agrega comentario.El usuario lo toma del logueado la fecha la genere en la linea larga y el comentario del cuadrado de comentario

function agregarComentario() {
    let contador = 0;
    let date = new Date();
    let htmlContentToAppend = "";
    let comentario = document.getElementById("agregarComentario");
    console.log(comentario.value);
    if (comentario.value != "") {

        htmlContentToAppend += `<h5>` + localStorage.getItem("Usuario") + ` ` + date.getFullYear() + `-` + date.getMonth() + `-` + date.getDate() + ` ` + date.getHours() + `:` + date.getMinutes() + `:` + date.getSeconds() + `</h5>`
        for (let i = 0; i < wea; i++) {
            htmlContentToAppend += `<span class="fa fa-star checked"></span>`
            contador++;

        }
        for (contador; contador < 5; contador++) {
            htmlContentToAppend += `<span class="fa fa-star"></span>`

        }
        htmlContentToAppend += `<p>` + comentario.value + `</p>`
        document.getElementById("insertarComentario").innerHTML += htmlContentToAppend;
    }
    else {
        alert("El comentario tiene que tener texto");
    }


}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function (e) {


    getJSONData(PRODUCTS_URL).then(function (result) {
        if (result.status === "ok") {
            lista = result.data;//Tuve problemas que aveces no me cargaba, lo solucione metiendo todo dentro del primer getJSONData
            getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
                if (resultObj.status === "ok") {
                    product = resultObj.data;
                    let productNameHTML = document.getElementById("productName");
                    let productCategoryHTML = document.getElementById("productCategory");
                    let productDescriptionHTML = document.getElementById("productDescription");
                    let productCurrencyAndCostHTML = document.getElementById("productCurrencyAndCost");
                    let productSoldCountHTML = document.getElementById("productSoldCount");

                    productNameHTML.innerHTML = product.name;
                    productCategoryHTML.innerHTML = product.category;
                    productDescriptionHTML.innerHTML = product.description;
                    productSoldCountHTML.innerHTML = product.soldCount;
                    productCurrencyAndCostHTML.innerHTML = product.currency + ' ' + product.cost;

                    showImagesGallery(product.images);//Llamo a la funcion que muestra la galeria
                    showRelatived(product.relatedProducts, lista);//Llamo a la funcion que muestra los productos relacionados
                    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (result) {
                        if (result.status === "ok") {
                            showComent(result.data);//LLamo a los comentarios

                        }
                    })
                }
            });











        }
    })

});
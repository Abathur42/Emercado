const ORDER_ASC_BY_COST = "0toMAX";
const ORDER_DESC_BY_COST = "MAXto0";
const ORDER_BY_PROD_COUNT = "Count.";
var currentProductArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

function sortProduct(criteria, array){
    let result = [];
    //Ordena por precio ascendente
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
        //ordena por precio descendente
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
        //ordena por cantidad de vendidos
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}
    //Funcion que muestra los productos
    function showProductsList() {
        let contenido = "";
        for (let i = 0; i < currentProductArray.length ; i++) {
            
            let product = currentProductArray[i];

            if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))){
            contenido += `
        <a href="category-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name + `</h4>
                        <small class="text-muted">` + product.cost + ` ` + product.currency + `</small>
                    </div>
                    <p class="mb-1">` + product.description + `</p>
                </div>
            </div>
        </a>

        `
            }
            document.getElementById("products").innerHTML = contenido;
        }
        
    }

//Funcion que ordena según un criterio y luego muestra
function sortAndShowProduct(sortCriteria, ProductArray){
    currentSortCriteria = sortCriteria;

    if(ProductArray != undefined){
        currentProductArray = ProductArray;
    }

    currentProductArray = sortProduct(currentSortCriteria, currentProductArray);

    
    showProductsList();
}
//Al principio sin criterios cargo por precios ascendentes 
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProduct(ORDER_ASC_BY_COST, resultObj.data);
        }
    });
//Si toco el boton de "De menor a mayor" me muestra de menor a mayor
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProduct(ORDER_ASC_BY_COST);
    });
//Si toco el boton de "De mayor a menor" me muestra de mayor a menor
    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProduct(ORDER_DESC_BY_COST);
    });
//Si toco el boton de "relevante" me tira por cantidad de vendidos(De mayor a menor)
    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProduct(ORDER_BY_PROD_COUNT);
    });
//Limpia el filtro de precios
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });
//Obtengo el mínimo y máximo de los intervalos para filtrar por precios
    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        
        
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showProductsList();
    });
});
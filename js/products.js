const ORDER_ASC_BY_PRICE = "PRECIO";
const ORDER_DESC_BY_PRICE = "PRECIO_DESC";
const ORDER_BY_PROD_COUNT = "Vend.";
var currentProductsArray = []; //creo el arreglo vacio donde cargar
var currentSortCriteria = undefined;
var minPrice = undefined;
var maxPrice = undefined;


//sortAsc, sortDesc, sortByRel
function sortProducts(criteria, array){
    let result = [];

    if (criteria === ORDER_ASC_BY_PRICE) 
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });

    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
        
    } else if (criteria === ORDER_BY_PROD_COUNT) {
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

//funcion  que muestra el json 
function showProductsList(){
    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))){

            htmlContentToAppend +=  `
            <div class="col-lg-4 col-md-6 col-sm-6 card-deck">
                <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                    
                        <img class="bd-placeholder-img card-img-top" src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    
                    <div class="card-body">
                        
                            <div class="card-text">
                            <h4>`+ product.name + "  -  " + product.cost + ` USD</h4>
                            <p>`+ product.description + `</p>
                            </div>
                            <div class"d-flex justify-content-between align-items-center">
                            
                            <small class="text-muted">` + product.soldCount + ` vendidos</small>
                            </div>
                       
    
                    </div>
                </a>
            </div>
            `
        }

        document.getElementById("lista-productos").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList();
}

//Funci??n que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_BY_PROD_COUNT, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });
    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });



    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el m??nimo y m??ximo de los intervalos para filtrar por cantidad
        //de productos por categor??a.
        minPrice = document.getElementById("rangeFilterCountMin").value;
        maxPrice = document.getElementById("rangeFilterCountMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
            minPrice = parseInt(minPrice);
        }
        else{
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
            maxPrice = parseInt(maxPrice);
        }
        else{
            maxPrice = undefined;
        }

        showProductsList();
    });
});
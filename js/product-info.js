//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var currentProductsInfoArray = []; 
var showProductsInfo =[];


function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail imagenesProd" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}
function genStars(stars){

    let estrellitas  = "";

    for(let i = 0; i < stars; i++){
        estrellitas += `<span style="font-size: 30px; color:orange;">★</span>`
    }
    for(let i = stars; i < 5; i++){
        estrellitas += `<span style="font-size: 30px; color: grey;">★</span>`
    }
    return estrellitas
}

function showProductsInfo(){
    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsInfoArray.length; i++){
        let info = currentProductsInfoArray[i];

       
            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
            <div class="row">
            <div class="col-3">
                <img src="${info.imgSrc}" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${info.name}</h4>
                    <small class="text-muted">
                     <b>${info.currency} $${info.cost} </b><br>
                     ${info.soldCount}
                    </small>
                </div>
                ${info.description}
                
            </div>
            
        </div>
            `
        }

        document.getElementById("lista-productos").innerHTML = htmlContentToAppend;
    }

    function showRelatedProducts(array){

    
        let htmlContentToAppend = "";
    
        for (let i = 0; i < array.length; i++) {
            var relIndex = array[i];
            var relProd = relatedProduct[relIndex];
        
            htmlContentToAppend += `
            <div class="col-lg-3 col-md-4 col-6">
                <div class="d-block mb-4 h-100">
                    <img class="img-fluid img-thumbnail" src="` + relProd.imgSrc + `" alt="">
                <h4 class="mb-1">`+ relProd.name +`</h4>
                <p class="mb-1">` + relProd.description + `</p>
                <a href="product-info.html">Ver producto</a>
                </div>
            </div>
            `
        }
            document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
    }
function showComments(array){
    
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        var comment = array[i];
    
        htmlContentToAppend += `
        <table style="width:100%">
  
            <tr>
                <th><b>`+ comment.user +`</b></th>
            </tr>
            <tr>
                <th>` + (genStars(comment.score)) +`</th>
            </tr>
            <tr>
                <td><i>`+ comment.description +`</i></td>
            </tr>
            <tr>
                <td><small>`+ comment.dateTime +`</small></td>
            </tr>
        </table>
        `
    }
        document.getElementById("comentarios").innerHTML = htmlContentToAppend;
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("nombreProducto");
            let productDescriptionHTML = document.getElementById("descripcion");
            let productCountHTML = document.getElementById("vendidos");
            let productCategoryHTML = document.getElementById("categoria");
            let productPriceHTML = document.getElementById("precioMoneda");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
            productPriceHTML.innerHTML = product.currency + " " + product.cost;

            showImagesGallery(product.images);
           
        }
    });
//Se carga el JSON de los productos para mostrar los relacionados dentro
getJSONData(PRODUCTS_URL).then(function(resultObj){
    if (resultObj.status === "ok") { relatedProduct = resultObj.data; }

    
    showRelatedProducts(product.relatedProducts);
});
//Cargamos el JSON de los comentarios para poder mostrarlos
getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
    if (resultObj.status === "ok") { comments = resultObj.data; }

    //Se muestran los comentarios
    showComments(comments);
});
});
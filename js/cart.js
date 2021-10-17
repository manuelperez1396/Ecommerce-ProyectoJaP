let carritoArray = [];


function calculoSubt(precio) {
    let cuenta = parseInt(document.getElementById("subtot").value);
    subtot = cuenta * precio;
    document.getElementById("preciosub").innerHTML = subtot;
    calculoTotal();
}

function muestraCarro(array) {

    let content = " ";

    for (let i = 0; i < array.length; i++) {

        let articulos = array[i];

        let calculoS = (articulos.unitCost * articulos.count);

        content += `
        <tr>
            <td><img src="${articulos.src}" width="105px"></td>
            <td>${articulos.name}</td>
            <td>${articulos.unitCost}</td>
            <td><input style="width:80px;" id=P onchange="calculoSubt(${articulos.unitCost})" type="number"  class="form-control" value="${articulos.count}" min="1"></td>
            <td><span id="preciosub" style="font-weight:bold;">${calculoS}</span></td>
        </tr>
        `

        document.getElementById("carrito").innerHTML = content;
    }
}

function calculoTotal() {
    let subTotal = parseInt(document.getElementById("preciosub").innerHTML);
    let envio;

    let contenido = document.getElementsByName("envio");
    for (let i = 0; i < contenido.length; i++) {
        if (contenido[i].checked) {
            envio = ((parseInt(contenido[i].value)) * subTotal / 100);
        }
    }

    let total = subTotal + envio;

    let enHTML = ` <tr>
    <td> `+ subTotal + ` </td>
    <td style="text-align: center;"> `+ envio + ` </td>
    <td style="text-align: right; font-weight:bold;"> `+ total + ` </td>
</tr>
`

    document.getElementById("Pagar").innerHTML = enHTML;
}





//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            carritoArray = resultObj.data.articles;
            muestraCarro(carritoArray);
            calculoTotal();
        }
    })

    let z = document.getElementsByName("envio");
    for (let i = 0; i < z.length; i++) {
        z[i].addEventListener("change", function () {
            calculoTotal();
        })
    }

});

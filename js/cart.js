let carritoArray = [];

function calculoSubt(precio) {
    let cuenta = parseInt(document.getElementById("subtot").value);
    subtot = cuenta * precio;
    document.getElementById("preciosub").innerHTML = subtot;
    calculoTotal();
}

function seleccionPago(){

    let formaPago = document.getElementsByName("formaPago");
    let tarj = `<div>
    <input type="text" placeholder="Nombre del Propietario" name="tarjetaNombre" id="tarjetaNombre" class="form-control" required><br>
<input type="number" placeholder="Numero de Tarjeta" name="tarjetaNumero" id="tarjetaNumero" class="form-control" required>
  
  </div>`
    let cb = `<div>                
    <label for="Banco">Banco:</label><br>
    <select name="Bancos" class="form-control">
    <option>Banco 1</option>
    <option>Banco 2</option>
    <option>Banco 3</option>
    <option>Banco 4</option>
  </select><br>
  <input type="number" placeholder="Numero de Cuenta" name="tarjetaBanc" id="tarjetaBanc" class="form-control" required>
</div> `;

    for (let i = 0; i < formaPago.length; i++) {
        if (formaPago[i].checked && (formaPago[i].value) == "1") {
            document.getElementById("infoTarjeta").innerHTML = tarj;
            document.getElementById("infoCuentaDeBanco").innerHTML = " ";
        } else if (formaPago[i].checked && (formaPago[i].value) == "2") {
            document.getElementById("infoCuentaDeBanco").innerHTML = cb;
            document.getElementById("infoTarjeta").innerHTML = " ";
        }
    }
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
            <td><input style="width:80px;" id="subtot" onchange="calculoSubt(${articulos.unitCost})" type="number"  class="form-control" value="${articulos.count}" min="1"></td>
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

    let formaPago = document.getElementsByName("formaPago");
    for (let i = 0; i < formaPago.length; i++) {
        formaPago[i].addEventListener("change", function (e) {
            seleccionPago()
        })

    }

});
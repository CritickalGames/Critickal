let resultadoJsonGlobal;

export function abrirJson(carpeta, JS) {
    let promesa=new Promise((resolve, reject) => {
        getJson(carpeta, JS, resolve, reject);
    });
    return promesa
}

function getJson(carpeta, JS, resolve, reject) {
    var archivo = carpeta+"/" + JS + ".json";
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
        if (this.status == 200) {
            resultadoJsonGlobal = JSON.parse(this.responseText);
            //console.log(`Se ha abierto: ${archivo}`);
            resolve(resultadoJsonGlobal);
        } else {
            reject(new Error("Error al cargar el archivo JSON: "+ JS));
        }
        }
    };
    xhttp.open("GET", archivo, true);
    xhttp.send();
}
/**
 * ! TODO: Aplicar la Tabla. No existe ya. No sé ni recuerdo porque. Buscaré en los comits anteriores.
 * Todo: subir página a Tokurim
 */
window.addEventListener("load", main);

import cst from "./modulos/constantes.js";
import MkP from './modulos/manipuladores/markdownProcessor.js';
import * as etikedo from "./modulos/manipuladores/manipular_html.js";

import insertar_botones from "./modulos/creadores/iniciar_botones.js";

let idioma_elegido = "";
let textoBoton = "";

async function main() {
    try {
        await insertar_idiomas()
        eventos();
    } catch (error) {
        console.error
    }
}

async function insertar_idiomas() {
    await insertar_botones.insertar("./Clases", 
        "btn_idioma", 
        cst.html_id.contenedor_botones.idiomas, 
        cst.html_id.dataset.idiomas, 
        "col-1 mx-3 my-1 btn btn-secondary");
}
async function insertar_cursos_disponibles(dir) {
    const DIR = `./Clases/${dir}`;
    console.log("IDIOMA Y DIR: "+idioma_elegido+"----"+DIR);
    await insertar_botones.insertar(DIR, 
        "btn_cursos", 
        cst.html_id.contenedor_botones.cursos, 
        cst.html_id.dataset.cursos, 
        "col-1 mx-3 my-1 btn btn-secondary");
    return DIR;
}
async function insertar_clases(dir, dir2) {
    const DIR = `${dir}/${dir2}`;
    //console.log("IDIOMA Y DIR: "+idioma_elegido+"----"+DIR);
    await insertar_botones.insertar(DIR, 
        "btn_clases", 
        cst.html_id.contenedor_botones.clases, 
        cst.html_id.dataset.clases, 
        "col-1 mx-3 my-1 btn btn-secondary");
    return DIR;
}

function eventos() {
    eventos_btn_idiomas();
}
function eventos_btn_idiomas() {
    const BTN_IDIOMAS = insertar_botones.cxioj_datumaroj(cst.html_id.dataset.idiomas);
    
    BTN_IDIOMAS.forEach(btn => {
        btn.addEventListener("click", on_Click_idioma)
    });
}
function eventos_btn_cursos() {
    const BTN_CURSOS = insertar_botones.cxioj_datumaroj(cst.html_id.dataset.cursos);
    BTN_CURSOS.forEach(btn => {
        btn.addEventListener("click", on_Click_curso)
    });
}
function eventos_btn_clases() {
    const BTN_CURSOS = insertar_botones.cxioj_datumaroj(cst.html_id.dataset.clases);
    BTN_CURSOS.forEach(btn => {
        btn.addEventListener("click", on_Click_clases)
    });
}

async function on_Click_idioma(event) {
    textoBoton = event.target.dataset.idioma;
    aparecer_btn_cursos();
    idioma_elegido = await insertar_cursos_disponibles(textoBoton);
    eventos_btn_cursos();
}
async function on_Click_curso(event) {
    textoBoton = event.target.dataset.curso;
    aparecer_btn_clases();
    await insertar_clases(idioma_elegido, textoBoton);
    eventos_btn_clases();
}
function on_Click_clases(event) {
    const textoBoton_auxiliar = event.target.dataset.clase;
    procesador_markdown(textoBoton_auxiliar);
}

function aparecer_btn_cursos() {
    let etiqueta = etikedo.troviIdn(cst.html_id.elegir_curso);
    etikedo.aldoniAtributon(etiqueta, "style", "");
    etiqueta = etikedo.troviIdn(cst.html_id.collapse.cursos);
    etikedo.aldoniKlasojn(etiqueta, "collapse show");
}
function aparecer_btn_clases() {
    let etiqueta = etikedo.troviIdn(cst.html_id.elegir_clase);
    etikedo.aldoniAtributon(etiqueta, "style", "");
    etiqueta = etikedo.troviIdn(cst.html_id.collapse.clases);
    etikedo.aldoniKlasojn(etiqueta, "collapse show");
}

function procesador_markdown(archivo) {
    // Ruta del archivo Markdown
    //archivo = "documento.md"; //Esto es sólo para test
    let idioma = idioma_elegido + "/" + textoBoton;
    const markdownFile = `${idioma}/${archivo}.md`;
    document.getElementById(cst.html_id._section).innerHTML = "";
    //alert(markdownFile);
    // Obtener el contenido del archivo Markdown
    fetch(markdownFile)
        .then(response => {
            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo Markdown.');
            }
            // Devolver el cuerpo de la respuesta como texto
            return response.text();
        })
        .then(data => {
            // Procesar el contenido del archivo Markdown utilizando el módulo MarkdownProcessor
            const processedContent = MkP.process(data);

            // Mostrar el contenido procesado del archivo Markdown en el div con id 'markdown-content'
            document.getElementById(cst.html_id._section).innerHTML = processedContent;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
import * as etikedo from "./manipular_html.js";
import { default as md_proceso } from "./mk_procesos.js";

// Módulo de procesamiento de Markdown
const MarkdownProcessor = {
    // Lista para almacenar las listas ordenadas creadas
    html_p: etikedo.krei("p"),
    sangria: false,
    tablo: [],
    cxuTablo: false,

    // Método para procesar el contenido Markdown y darle etiquetas y estilo
    process: function (markdownContent) {
        // Div para contener el contenido procesado
        let processedContent = '';

        // Separar las líneas del contenido Markdown
        const lines = markdownContent.split('\n');

        let cxu_lista_ord = false, cxu_lista_desord =false;
        let cxu_abierta_lista_ord = false, cxu_abierta_lista_desord =false;
        // Iterar sobre cada línea del contenido Markdown
        lines.forEach(line => {
            // Procesar la línea
            cxu_lista_ord = (line.match(/^\s*\d+\.\s.+/)) ? true:false;
            switch (true) {
                case line.startsWith('#'):
                    //Agrega todo el texto acumulado hasta ahora
                    if (this.html_p.textContent != "") {
                        processedContent += `<p>${this.html_p.textContent}</p>`;
                    }
                    //limpiar html_p
                    this.html_p = etikedo.krei("p");
                    // Título
                    processedContent += md_proceso.processHeader(line);
                    break;
                case line.startsWith('|'): // Tabla
                    this.tablo.push(line);
                    this.cxuTablo = true;
                    break;
                case cxu_lista_ord:
                    if (!cxu_abierta_lista_ord) {
                        cxu_abierta_lista_ord = !cxu_abierta_lista_ord;
                        processedContent += "<ol>"
                    }
                    processedContent += md_proceso.processOrderedListItem(line);
                    break;
                case line.match(/^\s*-\s/):
                    if (!cxu_lista_desord) {
                        cxu_lista_desord = !cxu_lista_desord;
                        processedContent += "<ul>"
                    }
                    break;
                case line.trim() === "":
                    //Agrega todo el texto acumulado hasta ahora
                    if (this.html_p.textContent != "") {
                        processedContent += `<p>${this.html_p.textContent}</p>`;
                    }
                    //limpiar html_p
                    this.html_p = etikedo.krei("p");
                    //limpiar lista_ord
                    if (cxu_abierta_lista_ord) {
                        const [contenido, cxu_cerrar_lista] = md_proceso.processCloseOrderedList();
                        processedContent += contenido;
                        cxu_abierta_lista_ord = (cxu_cerrar_lista) ? false: true;
                    }
                    break;          
                default:
                    // Extensión de párrafo
                    if (line.match(/^$/)) {
                        etikedo.aldoniTekston(`${line}`, this.html_p);
                    }
                    etikedo.aldoniTekston(`${line}<br>`, this.html_p);
                    break;
            }
        });

        this.html_p = etikedo.krei("p");

        // Devolver el contenido procesado
        return processedContent;
    }  
};

// Exportar el módulo MarkdownProcessor para su uso en otros archivos
export default MarkdownProcessor;
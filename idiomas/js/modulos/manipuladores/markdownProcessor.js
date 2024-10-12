import * as etikedo from "./manipular_html.js";
import { default as md_proceso } from "./mk_procesos.js";

// Módulo de procesamiento de Markdown
const MarkdownProcessor = {
    // Lista para almacenar las listas ordenadas creadas
    html_p: etikedo.krei("p"),
    tablo: [],

    // Método para procesar el contenido Markdown y darle etiquetas y estilo
    process: function (markdownContent) {
        // Div para contener el contenido procesado
        let processedContent = '';

        // Separar las líneas del contenido Markdown
        const lines = markdownContent.split('\n');

        let cxu_lista_ord = false, cxu_lista_desord =false;
        let cxu_abierta_lista_ord = false, cxu_abierta_lista_desord =false;
        let cxu_tablo = false;
        // Iterar sobre cada línea del contenido Markdown
        lines.forEach(line => {
            // Reemplazar ** por negritas
            line = line.replace(/(\*\*)(.*)(\*\*)/g, '<b>$2</b>');
            // Encontrar inicio de listas
            cxu_lista_ord = (line.match(/^\s*\d+\.\s.+/)) ? true:false;
            cxu_lista_desord = (line.match(/^\s*-\s/)) ? true:false;
            cxu_tablo = (line.startsWith('|')) ? true : false;
            // Procesar la línea
            switch (true) {
                case line.startsWith('#'):
                    //Para que agregue el texto sin procesar a "processedContent"
                    [processedContent,cxu_abierta_lista_ord,cxu_abierta_lista_desord] =
                    this.completarProcessedContent(processedContent,cxu_abierta_lista_ord,cxu_abierta_lista_desord);
                    // Título
                    processedContent += md_proceso.processHeader(line);
                    break;
                case cxu_tablo: // Tabla
                    this.tablo.push(line);
                    console.log(this.tablo);
                    
                    break;
                case cxu_lista_ord:
                    if (!cxu_abierta_lista_ord) {
                        cxu_abierta_lista_ord = !cxu_abierta_lista_ord;
                        processedContent += "<ol>"
                    }
                    processedContent += md_proceso.processOrderedListItem(line);
                    break;
                case cxu_lista_desord:
                    if (!cxu_abierta_lista_desord) {
                        cxu_abierta_lista_desord = !cxu_abierta_lista_desord;
                        processedContent += "<ul>"
                    }
                    processedContent += md_proceso.processUnorderedListItem(line);
                    break;
                case line.trim() === "":
                    [processedContent,cxu_abierta_lista_ord,cxu_abierta_lista_desord] = 
                        this.completarProcessedContent(processedContent,cxu_abierta_lista_ord,cxu_abierta_lista_desord);
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
        this.completarProcessedContent(processedContent,cxu_abierta_lista_ord,cxu_abierta_lista_desord);

        // Devolver el contenido procesado
        return processedContent;
    },
    completarProcessedContent: function (processedContent,cxu_abierta_lista_ord,cxu_abierta_lista_desord) {
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
        if (cxu_abierta_lista_desord) {
            const [contenido, cxu_cerrar_lista] = md_proceso.processCloseUnorderedList();
            processedContent += contenido;
            cxu_abierta_lista_desord = (cxu_cerrar_lista) ? false: true;
        }
        //Agregar tabla
        if(this.tablo.length > 0){
            processedContent += md_proceso.processTable(this.tablo);
            this.tablo = [];
        }
        return [processedContent,cxu_abierta_lista_ord,cxu_abierta_lista_desord];
    }
};

// Exportar el módulo MarkdownProcessor para su uso en otros archivos
export default MarkdownProcessor;
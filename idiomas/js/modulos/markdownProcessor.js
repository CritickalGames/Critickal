import * as etikedo from "./manipular_html.js";

// Módulo de procesamiento de Markdown
const MarkdownProcessor = {
    // Lista para almacenar las listas ordenadas creadas
    orderedLists: [],
    html_p: etikedo.krei("p"),
    sangria: false,

    // Método para procesar el contenido Markdown y darle etiquetas y estilo
    process: function (markdownContent) {
        // Div para contener el contenido procesado
        let processedContent = '';

        // Separar las líneas del contenido Markdown
        const lines = markdownContent.split('\n');

        let cxu_lista = false,
            lista_cerrada = false,
            cerrar_lista = false;

        // Iterar sobre cada línea del contenido Markdown
        lines.forEach(line => {
            // Procesar la línea
            if (line.match(/^\s*\d+\.\s.+/)) {
                cxu_lista = true;
                lista_cerrada = false; // Marca si la lista está abierta
                cerrar_lista = true; // Sin esto, cierra la lista por cada iteración mientras la lista esté cerrada
            } else {
                cxu_lista = false;
                lista_cerrada = true;
            }

            if (lista_cerrada && cerrar_lista) {
                processedContent += this.closeOrderedLists();
                cerrar_lista = false;
            }

            switch (true) {
                case cxu_lista:
                    // Elemento de lista ordenada
                    processedContent += this.processOrderedListItem(line);
                    break;
                case line.startsWith('#'):
                    // Título
                    processedContent += this.processHeader(line);
                    break;
                case line.startsWith('|'): // Tabla
                    this.tablo.push(line);
                    this.cxuTablo = true;
                    break;                    
                default:
                    // Extensión de párrafo
                    etikedo.aldoniTekston("<br>" + line, this.html_p);
                    break;
            }
        });

        if (this.html_p.textContent != "") {
            processedContent += `<p>${this.html_p.textContent}</p>`;
        }

        // Devolver el contenido procesado
        return processedContent;
    },

    // Método para procesar una línea que contiene un elemento de lista ordenada
    processOrderedListItem: function (line) {
        // Separar el número y el contenido del elemento de lista
        const [, indent, number, content] = line.match(/^(\s*)(\d+)\.\s(.+)/);

        // Usar expresión regular para encontrar coincidencias de '\t'
        const matches = line.match(/\t/g);

        // Calcular el nivel de la lista según la cantidad de espacios y tabulaciones
        // Contar el número de coincidencias
        const listLevel = matches ? matches.length : 0;

        // Si el nivel de la lista es 0, es una nueva lista ordenada
        if (parseInt(number) === 1) {
            const listId = this.orderedLists.length;
            this.orderedLists.push(listLevel);
            return `<ol id="${listId}"><li>${content}</li>`;
        } else {
            // Verificar si el nivel de la lista es menor que el nivel de la lista anterior
            const prevListLevel = this.orderedLists[this.orderedLists.length - 1];
            if (listLevel < prevListLevel) {
                return this.closeOrderedLists(prevListLevel - listLevel, `<li>${content}</li>`);
            } else {
                // Agregar el elemento a la lista ordenada actual
                return `<li>${content}</li>`;
            }
        }
    },

    // Método para cerrar todas las listas ordenadas abiertas hasta cierto nivel
    closeOrderedLists: function (levelsToClose = 1, content = "") {
        let closingTags = '';

        for (let i = 0; i < levelsToClose; i++) {
            closingTags += `</ol>`;
            this.orderedLists.pop();
        }
        return closingTags + content;
    },

    // Método para procesar una línea que contiene un título
    processHeader: function (line) {
        // Contar la cantidad de caracteres "#" al inicio de la línea para determinar el nivel del título
        const headerLevel = line.match(/^#+/)[0].length;
        // Eliminar los caracteres "#" del inicio de la línea
        const headerContent = line.replace(/^#+\s*/, '');
        // Devolver el título con el formato HTML correspondiente
        if (headerLevel != 2) {
            return `<h${headerLevel}>${headerContent}</h${headerLevel}>`
        } else {
            return `<center><h${headerLevel}>${headerContent}</h${headerLevel}></center>`
        }
    },

    // Método para procesar una línea que contiene una imagen
    processImage: function (line) {
        // Extraer la URL de la imagen de la línea
        const imageUrl = line.match(/\[\[(.*?)\]\]/)[1];
        // Devolver la etiqueta de imagen con la URL correspondiente
        return `<img src="${imageUrl}" alt="Imagen">`;
    },

    // Método para procesar las líneas que inician con sangría
    processParrafo: function (line) {
        this.sangria = false;
        etikedo.aldoniTekston(line, this.html_p);
    },
    processTable: function(lines) {
        // Separar las filas de la tabla
        const rows = lines.filter(line => line.includes('|')).map(line => {
            const cells = line.split('|').map(cell => cell.trim());
            // Eliminar la primera y última celda vacía si existen
            if (cells.length > 0 && cells[0] === '') cells.shift();
            if (cells.length > 0 && cells[cells.length - 1] === '') cells.pop();
            return cells;
        });
    
        // Extraer los encabezados de la tabla
        const headers = rows.shift();
    
        // Crear el HTML de la tabla
        let tableHTML = '<table><thead><tr>';
        headers.forEach(header => {
            tableHTML += `<th>${header}</th>`;
        });
        tableHTML += '</tr></thead><tbody>';
    
        // Omitir la primera fila después del encabezado
        if (rows.length > 0) {
            rows.shift();
        }
    
        // Agregar las filas de la tabla
        rows.forEach(row => {
            tableHTML += '<tr>';
            row.forEach(cell => {
                tableHTML += `<td>${cell}</td>`;
            });
            tableHTML += '</tr>';
        });
    
        tableHTML += '</tbody></table>';
        return tableHTML;
    }    
};

// Exportar el módulo MarkdownProcessor para su uso en otros archivos
export default MarkdownProcessor;

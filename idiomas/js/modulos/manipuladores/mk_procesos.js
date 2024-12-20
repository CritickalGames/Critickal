const Procesador = {
  processHeader: function (line) {
    // Contar la cantidad de caracteres "#" al inicio de la línea para determinar el nivel del título
    const headerLevel = line.match(/^#+/)[0].length;
    let centrado = line.match(/^#\s<center>\s/) ? true: false;
    
    // Eliminar los caracteres "#" del inicio de la línea
    const headerContent = line.replace(/^#+\s*/, '');
    // Devolver el título con el formato HTML correspondiente
    if (headerLevel == 2 || centrado) {
      return `<center><h${headerLevel}>${headerContent}</h${headerLevel}></center>`
    } 
    return `<h${headerLevel}>${headerContent}</h${headerLevel}>`
  },
  lista_ord:[],
  processOrderedListItem: function (line) {
    const textoDespuesDeExpresionRegular = line.match(/^\s*\d*\.\s*(.*)/)[1];
    // Reemplazar 4 espacios por una tabulación
    const formattedLine = line.replace(/\s{4}/g, '\t');
    // Cuenta los tabs
    const tabCount = (formattedLine.match(/\t/g) || []).length;
    if(tabCount==0){
      let mensaje="";
      if(this.lista_ord.length!=0){
        const [txt, trueOrFalse_No_Necesario] = this.processCloseOrderedList(1);
        mensaje =txt;
        console.log("nuevo borrón", tabCount);
      }else{
        this.lista_ord.push(tabCount);
      }
      console.log(`${mensaje}<li>${textoDespuesDeExpresionRegular}</li>`);
      return `${mensaje}<li>${textoDespuesDeExpresionRegular}</li>`;
    }else{
      if (this.lista_ord[this.lista_ord.length -1]<=tabCount) {
        this.lista_ord.push(tabCount);
        return `<ol><li>${textoDespuesDeExpresionRegular}</li>`;
      }else{
        this.lista_ord.push(tabCount);
        return `</ol><li>${textoDespuesDeExpresionRegular}</li>`;
      }
    }
  },
  processCloseOrderedList: function(conservar = 0){//Si [0,1,2] conservar 1 no elimina [0] conservar 2 no elimina [0,1]
    let cerrado;
    let mensaje = "";
    console.log(this.lista_ord[this.lista_ord.length-1]);
    console.log(this.lista_ord);
    while(this.lista_ord.length!=(0+conservar)){
        this.lista_ord.pop();
        cerrado = (this.lista_ord.length == 0) ? true: false;
        mensaje+=`</ol>`;
        console.log(mensaje);
    }
    return[mensaje, cerrado];
  },
  processImage: function (line) {
    // Extraer la URL de la imagen de la línea
    const imageUrl = line.match(/\[\[(.*?)\]\]/)[1];
    // Devolver la etiqueta de imagen con la URL correspondiente
    return `<img src="${imageUrl}" alt="Imagen">`;
  },

  processTable: function (lines) {
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
export default Procesador
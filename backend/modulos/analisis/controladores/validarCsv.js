const csv = require('csv-parser');
const { Readable } = require('stream');

function detectarSeparador(data) {
    const linea = data.split(/\r?\n/)[0];
    if (linea.includes('\t')) return '\t';
    if (linea.includes(';')) return ';';
    return ',';
}

exports.validarCsv = (req, res) => {
    const { csv: csvData } = req.body;
    if (!csvData) {
        return res.status(400).json({ error: 'No se proporcionó contenido CSV' });
    }

    const separador = detectarSeparador(csvData);
    const errors = [];
    let headers = [];
    let rowNumber = 1;
    const readable = Readable.from(csvData);

    readable
        .pipe(csv({ separator: separador }))
        .on('headers', (h) => {
            headers = h;
        })
        .on('data', (row) => {
            rowNumber++;
            if (Object.keys(row).length !== headers.length) {
                errors.push({ row: rowNumber, message: 'Número de columnas inválido' });
            }
            headers.forEach((header) => {
                const value = row[header];
                if (value === undefined || value === null || value.trim() === '') {
                    errors.push({ row: rowNumber, column: header, message: 'Celda vacía' });
                }
            });
        })
        .on('end', () => {
            res.json({ errors });
        })
        .on('error', () => {
            res.status(500).json({ error: 'Error al procesar el archivo CSV' });
        });
};

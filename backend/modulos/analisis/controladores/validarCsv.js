const XLSX = require('xlsx')

const COLUMNAS_REQUERIDAS = [
  'POZO',
  'CIA_ARRENDADORA',
  'UBICACION_POZO',
  'NUMERO_EQUIPO_PEMEX',
  'FECHA_HORA_INICIO',
  'CALIFICACI_N_OPERACI_N_PROCESO'
]

/**
 * Valida filas con base en columnas requeridas.
 * @param {Array<Object>} filas - Filas de la hoja (sin la fila de encabezados).
 * @param {number} indiceFilaHeader - Índice base-1 de la fila de encabezados.
 * @param {string[]} columnasARevisar - Lista de columnas requeridas.
 * @returns {{headers: string[], errors: Array<{row:number|string,column:string,message:string}>}}
 */
function validarFilas(filas, indiceFilaHeader = 1, columnasARevisar = COLUMNAS_REQUERIDAS) {
  const errores = []
  const headers = filas.length ? Object.keys(filas[0]) : []

  // Headers requeridos faltantes
  const headersFaltantes = columnasARevisar.filter((c) => !headers.includes(c))
  for (const hf of headersFaltantes) {
    errores.push({
      row: indiceFilaHeader,
      column: hf,
      message: 'Header requerido ausente'
    })
  }

  // Solo validar columnas requeridas que sí existan en el archivo
  const headersEfectivos = headers.filter((h) => columnasARevisar.includes(h))

  // Validar celdas vacías
  for (let i = 0; i < filas.length; i++) {
    const fila = filas[i]
    const numeroFila = indiceFilaHeader + i + 1
    for (const h of headersEfectivos) {
      const v = fila[h]
      if (v === undefined || v === null || String(v).trim() === '') {
        errores.push({ row: numeroFila, column: h, message: 'Celda vacía' })
      }
    }
  }

  return { headers, errors: errores }
}

/**
 * Intenta parsear el buffer a libro XLSX/ODS y regresa filas como JSON.
 * @param {Buffer} buffer
 * @returns {{ok:boolean, sheet?:string, rows:Array<Object>}}
 */
function intentarParsearLibro(buffer) {
  try {
    const libro = XLSX.read(buffer, { type: 'buffer' })
    const nombreHoja = libro.SheetNames[0]
    if (!nombreHoja) return { ok: false, rows: [] }
    const hoja = libro.Sheets[nombreHoja]
    // sheet_to_json devuelve únicamente filas de datos (la fila de headers NO está incluida)
    const filas = XLSX.utils.sheet_to_json(hoja, { defval: '' })
    return { ok: true, sheet: nombreHoja, rows: filas }
  } catch {
    return { ok: false, rows: [] }
  }
}

/**
 * Handler HTTP para validar un archivo de hoja de cálculo.
 * Responde con el total de filas leídas y la lista de errores de validación.
 * @type {import('express').RequestHandler}
 */
async function validarArchivoDesdeBuffer(req, res) {
  if (!req.file || !req.file.buffer) {
    return res.status(400).json({ error: 'No se proporcionó archivo (req.file)' })
  }

  try {
    const parseo = intentarParsearLibro(req.file.buffer)
    if (!parseo.ok || !parseo.rows.length) {
      // Si no hay filas, igual respondemos con totalRows = 0 para consistencia
      return res.status(400).json({
        error: 'El archivo no contiene hojas válidas',
        totalRows: 0
      })
    }

    const { headers, errors } = validarFilas(parseo.rows, 1, COLUMNAS_REQUERIDAS)

    return res.json({
      ok: errors.length === 0,
      tipo: 'xlsx/ods',
      sheet: parseo.sheet,
      requiredColumns: COLUMNAS_REQUERIDAS,
      headers,
      errors,
      // Total de filas leídas (solo datos, la fila de encabezados no cuenta)
      totalRows: parseo.rows.length
      // Si quisieras incluir también el total "incluyendo encabezado": totalRowsWithHeader: parseo.rows.length + 1
    })
  } catch (e) {
    console.error('Error al procesar archivo:', e?.message)
    return res.status(500).json({ error: 'Error al procesar el archivo', detail: e?.message })
  }
}

module.exports = {
  validarArchivoDesdeBuffer,
}

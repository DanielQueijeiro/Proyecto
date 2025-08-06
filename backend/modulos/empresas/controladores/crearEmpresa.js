const Empleado = require('../../../modelos/empleados/empleados.modelo');
const Empresa = require('../../../modelos/empresas/empresas.modelo');

exports.postEmpresa = async (req, res) => {
    const { nombre, empleados, areas, direccion, telefono } = req.body;

    if (!nombre || !direccion || !telefono) {
        return res.status(400).json({
            error: 'Todos los campos son obligatorios',
        });
    }

    try {
        const nuevaEmpresa = await Empresa.postEmpresa(nombre, empleados, areas, direccion, telefono);
        return res.status(201).json({
            message: 'Creación de empresas exitosa'
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                error: 'El nombre de la empresa ya está en uso',
            });
        }
        return res.status(500).json({
            error: 'Error al crear la empresa' + error.message,
        });
    }
}
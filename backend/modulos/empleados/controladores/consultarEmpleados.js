const Empleado = require('../../../modelos/empleados/empleados.modelo')

exports.getEmpleadoPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const empleado = await Empleado.getEmpleadoById(id);
        if (!empleado) {
            return res.status(404).json({
                message: 'Empleado no encontrado',
            });
        }
        return res.status(200).json(empleado);
    } catch (error) {
        console.error('Error al consultar empleado por ID:', error);
        return res.status(500).json({
            error: 'Error interno del servidor al consultar empleado por ID',
        });
    }
}

exports.getEmpleados = async (req, res) => {
    try {
        const empleados = await Empleado.getEmpleados();
        if (empleados.length === 0) {
            return res.status(404).json({
                message: 'No se encontraron empleados',
            });
        }
        return res.status(200).json(empleados);
    } catch (error) {
        console.error('Error al consultar empleados:', error);
        return res.status(500).json({
            error: 'Error interno del servidor al consultar empleados',
        });
    }
}
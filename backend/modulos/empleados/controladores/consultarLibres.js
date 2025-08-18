const Empleado = require('../../../modelos/empleados/empleados.modelo');

exports.getEmpleadosLibres = async (req, res) => {
    try {
        const empleados = await Empleado.getEmpleadosLibres();
        return res.status(200).json(empleados);
    } catch (error) {
        return res.status(500).json({
            error: 'Error al consultar empleados libres',
        });
    }
};

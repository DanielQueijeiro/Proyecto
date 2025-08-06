const Empleado = require('../../../modelos/empleados/empleados.modelo');

exports.deleteEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                error: 'El ID del empleado es obligatorio',
            });
        }
        const empleadoEliminado = await Empleado.deleteEmpleado(id);
        return res.status(200).json({
            message: `Empleado con ID ${id} eliminado exitosamente`,
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Error interno del servidor',
        });
    }
}
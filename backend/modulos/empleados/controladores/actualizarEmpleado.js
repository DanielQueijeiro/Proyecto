const Empleado = require('../../../modelos/empleados/empleados.modelo');

exports.patchEmpleado = async (req, res) => {
    try {
    const { id } = req.params;
    const { nombre, correo, contrasena } = req.body;

    const empleadoActualizado = await Empleado.patchEmpleado(
        id,
        nombre,
        correo,
        contrasena
    );
    return res.status(200).json({
        message: 'Empleado actualizado con éxito'
    });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                error: 'El correo ya está en uso',
            });
        }
        console.error('Error al actualizar el empleado:', error);
        return res.status(500).json({
            error: 'Error interno del servidor al actualizar el empleado',
        });
    }
}
const Areas = require('../../../modelos/areas/areas.modelo')

exports.patchArea = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    if (!nombre) {
        return res.status(400).json({
            error: 'El nombre del área es obligatorio',
        });
    }
    try {
        const areaActualizada = await Areas.patchArea(id, nombre, descripcion );
        if (!areaActualizada) {
            return res.status(404).json({
                error: 'Área no encontrada',
            });
        }
        return res.status(200).json({
            message: 'Área actualizada exitosamente'
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Error al actualizar el área',
        });
    }
}
const Area = require('../../../modelos/areas/areas.modelo')

exports.deleteArea = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                error: 'El ID del área es obligatorio',
            });
        }
        const areaEliminada = await Area.deleteArea(id);
        return res.status(200).json({
            message: `Área con ID ${id} eliminada exitosamente`,
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Error interno del servidor',
        });
    }
}
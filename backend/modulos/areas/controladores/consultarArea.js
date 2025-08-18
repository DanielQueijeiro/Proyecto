const Area = require('../../../modelos/areas/areas.modelo')

exports.getAreas = async (req, res) => {
    try {
        const areas = await Area.getAreas();
        return res.status(200).json(areas);
    } catch (error) {
        return res.status(500).json({
            error: 'Error al consultar las áreas',
        });
    }
};

exports.getAreaById = async (req, res) => {
    const { id } = req.params;
    try {
        const area = await Area.getAreaById(id);
        if (!area) {
            return res.status(404).json({
                error: 'Área no encontrada',
            });
        }
        return res.status(200).json({
            area: {
                id: area._id,
                nombre: area.nombre,
                descripcion: area.descripcion
            }
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Error al consultar el área',
        });
    }
}
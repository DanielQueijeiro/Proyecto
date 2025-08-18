const Area = require('../../../modelos/areas/areas.modelo')

exports.postArea = async (req, res) => {
    const { nombre, descripcion } = req.body;
    if (!nombre) {
        return res.status(400).json({
            error: 'El nombre del área es obligatorio',
        });
    }
    try {
        const nuevaArea = await Area.postArea(nombre, descripcion);
        return res.status(201).json({
            message: 'Área creada exitosamente'
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                error: 'El nombre del área ya está en uso',
            });
        }
        return res.status(500).json({
            error: 'Error al crear el área',
        });
    }
}
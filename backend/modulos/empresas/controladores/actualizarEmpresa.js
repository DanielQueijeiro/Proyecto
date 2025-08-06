const Empresa = require('../../../modelos/empresas/empresas.modelo');

exports.patchEmpresa = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, empleados, areas, direccion, telefono } = req.body;
        const empresaActualizada = await Empresa.patchEmpresa(id, nombre, empleados, areas, direccion, telefono);
        if (!empresaActualizada) {
            return res.status(404).json({ mensaje: 'Empresa no encontrada' });
        }
        return res.status(200).json({ mensaje: 'Empresa actualizada con éxito' });
    } catch (error) {
        console.error('Error al actualizar la empresa:', error);
        return res.status(500).json({ mensaje: 'Error al actualizar la empresa' });
    }
}
const Empresa = require('../../../modelos/empresas/empresas.modelo');

exports.deleteEmpresa = async (req, res) => {
    try {
        const { id } = req.params;
        await Empresa.deleteEmpresa(id);
        res.status(200).json({ message: 'Empresa eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar la empresa:', error);
        res.status(500).json({ message: 'Error al eliminar la empresa' });
    }
}
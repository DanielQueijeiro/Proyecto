const Empresa = require('../../../modelos/empresas/empresas.modelo');
const socket = require('../../../servicios/socket');

exports.deleteEmpresa = async (req, res) => {
    try {
        const { id } = req.params;
        const empresaEliminada = await Empresa.deleteEmpresa(id);
        socket.getIO().emit('empresa:notificacion', {
            accion: 'eliminada',
            empresa: { id, nombre: empresaEliminada?.nombre },
            usuario: req.user?.email
        });
        res.status(200).json({ message: 'Empresa eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar la empresa:', error);
        res.status(500).json({ message: 'Error al eliminar la empresa' });
    }
}
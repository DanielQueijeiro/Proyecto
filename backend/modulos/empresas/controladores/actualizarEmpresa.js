const fs = require('fs');
const path = require('path');
const Empresa = require('../../../modelos/empresas/empresas.modelo');
const socket = require('../../../servicios/socket');

exports.patchEmpresa = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, empleados, areas, direccion, telefono, logo } = req.body;

        let logoPath;
        if (logo) {
            const matches = logo.match(/^data:(.+);base64,(.+)$/);
            if (matches) {
                const ext = matches[1].split('/')[1];
                const fileName = `empresa-${Date.now()}.${ext}`;
                const fileDir = path.join('uploads', 'empresas');
                fs.mkdirSync(fileDir, { recursive: true });
                const filePath = path.join(fileDir, fileName);
                fs.writeFileSync(filePath, matches[2], 'base64');
                logoPath = filePath;
            }
        }

        const empresaActualizada = await Empresa.patchEmpresa(id, nombre, empleados, areas, direccion, telefono, logoPath);
        if (!empresaActualizada) {
            return res.status(404).json({ mensaje: 'Empresa no encontrada' });
        }
        socket.getIO().emit('empresa:notificacion', {
            accion: 'actualizada',
            empresa: { id, nombre: nombre || empresaActualizada.nombre },
            usuario: req.session?.user.email
        });
        return res.status(200).json({ mensaje: 'Empresa actualizada con éxito' });
    } catch (error) {
        console.error('Error al actualizar la empresa:', error);
        return res.status(500).json({ mensaje: 'Error al actualizar la empresa' });
    }
}

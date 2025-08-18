const fs = require('fs');
const path = require('path');
const Empleado = require('../../../modelos/empleados/empleados.modelo');
const Empresa = require('../../../modelos/empresas/empresas.modelo');
const socket = require('../../../servicios/socket');

exports.postEmpresa = async (req, res) => {
    const { nombre, empleados, areas, direccion, telefono, logo } = req.body;

    if (!nombre || !direccion || !telefono) {
        return res.status(400).json({
            error: 'Todos los campos son obligatorios',
        });
    }

    try {
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
        const nuevaEmpresa = await Empresa.postEmpresa(nombre, empleados, areas, direccion, telefono, logoPath);
        socket.getIO().emit('empresa:notificacion', {
            accion: 'creada',
            empresa: { id: nuevaEmpresa._id, nombre: nuevaEmpresa.nombre },
            usuario: req.user?.email
        });
        return res.status(201).json({
            message: 'Creación de empresas exitosa'
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                error: 'El nombre de la empresa ya está en uso',
            });
        }
        return res.status(500).json({
            error: 'Error al crear la empresa' + error.message,
        });
    }
}
const mongoose = require('mongoose');
const Permisos = require('../roles/permisos.modelo.js');

const RolSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    permisos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permisos',
        required: true,
    }]
})

const Rol = mongoose.model('Roles', RolSchema);

async function getRoles() {
    return await Rol.find().populate('permisos');
}

module.exports = {
    Rol,
    getRoles
};

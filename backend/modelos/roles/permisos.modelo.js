const mongoose = require('mongoose');

const PermisoSchema = new mongoose.Schema({
    permiso: {
        type: String,
        required: true,
        trim: true
    }
});

const Permiso = mongoose.model('Permisos', PermisoSchema);

async function getPermisos() {
    return await Permiso.find();
}

module.exports = {
    Permiso,
    getPermisos
};


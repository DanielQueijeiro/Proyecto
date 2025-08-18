const mongoose = require('mongoose');

const empresaSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    nombre: {
        type: String,
        required: true,
        unique: true,
    },
    empleados:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empleados'
    }],
    areas:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Areas'
    }],
    direccion: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    logo: {
        type: String
    }
});

const Empresa = mongoose.model('Empresas', empresaSchema);

async function postEmpresa(nombre, empleados, areas, direccion, telefono, logo) {
    const empresa = new Empresa({
        nombre,
        empleados,
        areas,
        direccion,
        telefono,
        logo
    });
    
    await empresa.save();
    
    if (empresa.empleados && empresa.empleados.length > 0) {
        await empresa.populate('empleados');
    }
    
    if (empresa.areas && empresa.areas.length > 0) {
        await empresa.populate('areas');
    }
    
    return empresa;
}

async function getEmpresas() {
    const empresas = await Empresa.find().populate('empleados').populate('areas');
    return empresas;
}

async function getEmpresaById(id) {
    const empresa = await Empresa.findById(id).populate('empleados').populate('areas');
    return empresa;
}

async function patchEmpresa(id, nombre, empleados, areas, direccion, telefono, logo) {
    const updateData = {
        nombre,
        empleados,
        areas,
        direccion,
        telefono
    };
    if (logo) {
        updateData.logo = logo;
    }
    const empresa = await Empresa.findByIdAndUpdate(id, updateData);
    return empresa;
}

async function deleteEmpresa(id) {
    const empresa = await Empresa.findByIdAndDelete(id);
    return empresa;
}

module.exports = {
    Empresa,
    postEmpresa,
    getEmpresas,
    getEmpresaById,
    patchEmpresa,
    deleteEmpresa
};
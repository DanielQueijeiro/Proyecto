const mongoose = require('mongoose')

const areaSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
    }
})

const Area = mongoose.model('Areas', areaSchema)

async function postArea(nombre, descripcion) {
    const area = await Area.create({
        nombre,
        descripcion
    })
    await area.save()
    return area
};

async function deleteArea(id) {
    const areaEliminada = await Area.findByIdAndDelete(id)
    return areaEliminada
}

async function patchArea(id, nombre, descripcion) {
    const areaActualizada = await Area.findByIdAndUpdate(
        id,
        { nombre, descripcion },
    );
    return areaActualizada;
}

async function getAreas() {
    const areas = await Area.find();
    return areas;
}

async function getAreaById(id) {
    const area = await Area.findById(id)
    return area
}

module.exports = {
    Area,
    postArea,
    deleteArea,
    patchArea,
    getAreas,
    getAreaById
}
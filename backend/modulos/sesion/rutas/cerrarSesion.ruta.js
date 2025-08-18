const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Error al cerrar sesión' })
    }
    res.clearCookie('connect.sid')
    res.json({ mensaje: 'Sesión cerrada' })
  })
})

module.exports = router

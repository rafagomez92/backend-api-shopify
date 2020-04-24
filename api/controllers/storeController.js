const mongoose = require('mongoose')
const Store = mongoose.model('Stores')

exports.create_a_store = (req, res) => {
  console.log('entre a la ruta5')
  const new_record = new Store(req.body)
  console.log(new_record)
  new_record.save((err, record)=> {
    console.log(err)
    if(err){
      return res.status(400).send(err)
    } 
    res.json(record)
  })
}

exports.read_a_store = (req, res) => {
  Store
    .findOne({ shopify_shop_id: req.params.id })
    .populate('variants')
    .exec((err, record) => {
      if(err) return res.status(400).send(err)
      if(record === null) return res.status(400).json({msg: 'Tienda no encontrada'})
      res.json(record)
    })
}

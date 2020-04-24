const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
  shopify_shop_id:{
    type: Number,
    required: "Por favor ingresa el idSotore de shopify"
  },
  name: {
    type: String,
    required: "por favor ingrese el nombre de la tienda"
  },
  created_data:{
    type: Date,
    default: Date.now
  },
  shop_owner:{
    type: String,
    required: "Por favor ingresa el nombre del propietario"
  },
  telephone:{
    type: String,
    required: "Por favor ingrese el numero"
  },
  email: {
    type: String,
    required: "Por favor ingrese un email"
  },
  myshopify_domain: {

    type: String,
    required: "Por favor ingrese el nombre del dominio"
  },
  status: {
    type: String,
    enum: ['en_espera', 'en_revision'],
    default: 'en_espera'
  },
  variants:[{
    type: Schema.Types.ObjectId,
    ref: 'Variants'
  }],

})

module.exports = mongoose.model('Stores',StoreSchema);
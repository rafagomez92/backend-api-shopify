const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VariantSchema = new Schema({
  store: {
    type: Schema.Types.ObjectId,
    ref: 'Stores'
  },
  product_id:{
    type: String,
  },
  product_title:{
    type: String,
  },
  product_image:{
    type: String,
  },
  vendor:{
    type: String,
  },
  variant_id:{
    type: String,
  },
  variant_title:{
    type: String,
  },
  variant_weight:{
    type: Number,
  },
  variant_unit:{
    type: String,
  },
  variant_price:{
    type: Number,
  },
  variant_recommended_price:{
    type: Number,
  },
  price_selected:{
    type: String,
    default: 'original'
  },
  tax:{
    type: Number,
  },
  status:{
    type: String,
    enum: ['Calculando', 'Sin conflicto','Conflicto', 'Completo' ],
    default: 'Calculando'
  },
  created_date:{
    type: Date,
    default: Date.now
  },

})

VariantSchema.virtual('final_price').get(function(){
  if(this.price_selected==='original') return this.variant_price
  if(this.price_selected==='recommended') return this.variant_recommended_price
  return 0
})

VariantSchema.virtual('tax_calculated').get(function(){
  return ((this.tax * this.final_price) / 100).toFixed(2)
})


VariantSchema.set('toObject', { virtuals: true })
VariantSchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Variants',VariantSchema);
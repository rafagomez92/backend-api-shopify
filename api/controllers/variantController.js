const mongoose = require('mongoose')
const Variant = mongoose.model('Variants')
const Store = mongoose.model('Stores')


//'/store/:id/review_variants'
exports.review_variants = async (req, res) => {
  //id tienda viene como req.params.id
  //variantes: req.body.variantes

  if(req.body.variants && req.body.variants.length >0){
    //hay varianrtes
    let variants_id = []
    const store = await Store.findOne({shopify_shop_id: req.params.id})
    for(let i=0; i < req.body.variants.length; i++){
      const variant = req.body.variants[i]
      const existVariant = await Variant.findOne({variant_id: variant.variant_id})
      if(existVariant){
        await existVariant.update(variant)
        variants_id.push(existVariant._id)
      }else{
        const newVariant = new Variant({ ...variant, store: store._id })
        await newVariant.save()
        variants_id.push(newVariant._id)
      }
    }

    store.status = 'en_revision'
    store.variants = variants_id
    await store.save()
    const new_store = await Store.findOne({shopify_shop_id: req.params.id}).populate('variants')

    res.json({
      msg: 'Productos recibidos exitosamente',
      store: new_store
    })


  }else{
    res.status(400).json({msg:'variantes no encontradas'})
  }

}

exports.finish_by_client = async (req, res) => {

  const v = req.body.variants_with_conflict

  if(v && v.length>0) {
    const store = await Store.findOne({ shopify_shop_id: req.params.id}).populate('variants')
    for(let i = 0; i < v.length; i++){
      const variant = v[i]
      const variantFromMongo = await Variant.findById(variant._id)
      if(variantFromMongo) {
        await variantFromMongo.update({ ...variant, status: 'Completo' })
      }
    }

    const variants_non_conflict = store.variants.filter(element=>element.status==='Sin conflicto')
    for(let i=0; i<variants_non_conflict.length; i++){
      const variant = variants_non_conflict[i]
      const variantFromMongo = await Variant.findById(variant._id)
      if(variantFromMongo) {
        await variantFromMongo.update({ status: 'Completo', price_selected: 'original' })
      }
    }
    store.status = 'en_espera'
    await store.save()

    const new_store = await await Store.findOne({ shopify_shop_id: req.params.id}).populate('variants')
    res.json({
      message: 'Productos recibidos exitosamente',
      store: new_store
    })

  } else {
    res.status(400).json({message: 'Variantes no encontradas'})
  }
}
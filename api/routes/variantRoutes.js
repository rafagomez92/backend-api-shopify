module.exports = (app) => {

    const variant = require('../controllers/variantController')
  
    app.route('/store/:id/review_variants')
      .post(variant.review_variants)

    app.route('/store/:id/finish')
      .post(variant.finish_by_client)
  
}
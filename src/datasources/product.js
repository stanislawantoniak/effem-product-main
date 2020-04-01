const { RESTDataSource } = require('apollo-datasource-rest');

class SalsifyTokenSource extends RESTDataSource {
  willSendRequest(request) {
    request.headers.set('Authorization', 'Bearer ' + process.env.SALSIFY_KEY);
	//console.log('salsify key: ',process.env.SALSIFY_KEY);
  }
}

class ProductAPI extends SalsifyTokenSource {

  constructor() {
    super();
    this.baseURL = 'https://app.salsify.com/api/v1/orgs/s-81e351da-195f-412c-8fd8-f011973f6ab1/';
  }

  async getProductById( id ) {
    console.log('getting product: '+id);
    const response = await this.get('products/'+id);
    return this.productReducer(response);
  }

  async getAllProducts() {
    const response = await this.get('products');
    return Array.isArray(response.data)
      ? response.data.map(product => this.productReducer(product))
      : [];
  }
  
  async updateProduct(product){
    console.log('updating product: '+product.id);

    const salsifyProduct = this.salsifyTransform(product);

    console.log('salsifyProduct:'+JSON.stringify(salsifyProduct));
    const response = await this.put('products/'+product.id,salsifyProduct);
    console.log('update response:'+JSON.stringify(response));
    return response;
  }

  productReducer(product) {

    return {
      id: product["salsify:id"] || 0,
      systemId: product["salsify:system_id"],
      name: product["Product name"],
      brand: product.Brand,
      description: product.Descriptions,
      SAPProductTitle: product['SAP Product Title'],
      cost: product.cost,
      retailPrice: product['Retail Price']
  };
}

  
  salsifyTransform(product){

    const productInput = {};
      if (product.hasOwnProperty('name')) productInput['Product name'] = product.name;
      if (product.hasOwnProperty('brand')) productInput.Brand = product.brand;
      if (product.hasOwnProperty('description')) productInput.Descriptions = product.description;
      if (product.hasOwnProperty('sapProductTitle')) productInput['SAP Product Title'] = product.sapProductTitle;
      if (product.hasOwnProperty('cost')) productInput.cost = product.cost;
      if (product.hasOwnProperty('retailPrice')) productInput['Retail Price'] = product.retailPrice;

    return productInput;
  }

}

module.exports = ProductAPI;

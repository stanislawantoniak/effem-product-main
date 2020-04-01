module.exports = {

	Query: {
		products: async (_, __, { dataSources }) =>
			dataSources.productAPI.getAllProducts(),
		product: async (_, { id }, { dataSources }) =>
			dataSources.productAPI.getProductById(id)
	},

	Product: {
		__resolveReference(product, { dataSources }) {
			return dataSources.productAPI.getProductById(product.id)
		}
	},

	Mutation: {
		updateProduct: async (_, { product }, { dataSources }) => {

			const updateResult = await dataSources.productAPI.updateProduct(product);
			const productResult = dataSources.productAPI.getProductById(product.id);

			console.log('updateResult::' + JSON.stringify(updateResult));

			return {
				success: true,
				message: 'product updated',
				product: productResult
			}
		}
	}
};

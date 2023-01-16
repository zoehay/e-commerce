const Client = {
  async getProducts() {
    const endpoint = "http://localhost:8000/products";
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const responseJSON = await response.json();
        const products = responseJSON.products;
        return products;
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export default Client;

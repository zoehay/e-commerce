const Client = {
  async getProducts() {
    const endpoint = "http://localhost:8000/products";
    try {
      const response = await fetch(endpoint);
      console.log(response);
      if (response.ok) {
        const responseJSON = await response.json();
        console.log(responseJSON.products);
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export default Client;

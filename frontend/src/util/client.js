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

  async registerUser(userEmail, userName, userPassword) {
    const endpoint = "http://localhost:8000/auth/register";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          userName: userName,
          password: userPassword,
        }),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
};

export default Client;

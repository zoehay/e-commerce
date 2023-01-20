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

  async loginUser(userEmail, userPassword) {
    const endpoint = "http://localhost:8000/auth/login";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
        }),
      });
      console.log(response);
      if (response.status === 200) {
        const responseJSON = await response.json();
        const user = responseJSON.user;
        console.log(responseJSON);
        console.log(user);
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  },

  async logoutUser() {
    const endpoint = "http://localhost:8000/auth/logout";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      // const responseJSON = await response.json();
      // console.log(responseJSON);
    } catch (error) {
      console.log(error);
    }
  },
};

export default Client;

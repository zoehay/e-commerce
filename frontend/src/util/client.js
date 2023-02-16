const Client = {
  baseEndpoint: "http://localhost:8000",

  //// USER
  async getUser() {
    const endpoint = this.baseEndpoint + "/user";
    let setCookie = document.cookie;
    console.log(setCookie);

    try {
      const response = await fetch(endpoint, {
        credentials: "include",
      });
      console.log(response);
      if (response.ok) {
        const responseJSON = await response.json();
        console.log(responseJSON);
        const user = responseJSON.user;
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  },

  async registerUser(userEmail, userName, userPassword) {
    const endpoint = this.baseEndpoint + "/auth/register";
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
    const endpoint = this.baseEndpoint + "/auth/login";
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
        credentials: "include",
      });
      console.log(response);
      if (response.status === 200) {
        const responseJSON = await response.json();
        const user = responseJSON.user;
        console.log(user);
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  },

  async logoutUser() {
    const endpoint = this.baseEndpoint + "/auth/logout";
    try {
      const response = await fetch(endpoint, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },

  async updateUserName(userName) {
    console.log("username");
    console.log("update", this.baseEndpoint);
    const endpoint = "http://localhost:8000" + "/user";
    try {
      const response = await fetch(endpoint, {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
        }),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },

  //// PRODUCT
  async getProducts() {
    const endpoint = this.baseEndpoint + "/products";
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

  async getProductById(id) {
    const endpoint = this.baseEndpoint + `/products/${id}`;
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const responseJSON = await response.json();
        const product = responseJSON.product;
        console.log("client get", product);
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  },

  //// CART
  async updateCartProductQuantity(userId, productId, quantity) {
    console.log(userId, productId, quantity);
    const endpoint = this.baseEndpoint + "/cart";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          productId: productId,
          quantity: quantity,
        }),
        credentials: "include",
      });
      const responseJSON = await response.json();
      console.log(responseJSON);
    } catch (error) {
      console.log(error);
    }
  },

  async addCartProduct(userId, productId) {
    const endpoint = this.baseEndpoint + "/cart";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          productId: productId,
        }),
        credentials: "include",
      });
      const responseJSON = await response.json();
      console.log(responseJSON);
    } catch (error) {
      console.log(error);
    }
  },

  async getCartProducts() {
    const endpoint = this.baseEndpoint + "/cart";
    try {
      const response = await fetch(endpoint, {
        credentials: "include",
      });
      if (response.ok) {
        const responseJSON = await response.json();
        const cart = responseJSON.cart;
        return cart;
      }
    } catch (error) {
      console.log(error);
    }
  },

  async getCartDetails() {
    const endpoint = this.baseEndpoint + "/cart/details";
    try {
      const response = await fetch(endpoint, {
        credentials: "include",
      });
      if (response.ok) {
        const responseJSON = await response.json();
        console.log("client", responseJSON);
        const cartDetails = responseJSON.cart;
        console.log("client", cartDetails);
        return cartDetails;
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export default Client;

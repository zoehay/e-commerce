class Client {
  static baseEndpoint = "http://localhost:8000";

  //// USER
  static async getUser() {
    const endpoint = Client.baseEndpoint + "/user";
    let setCookie = document.cookie;
    try {
      const response = await fetch(endpoint, {
        credentials: "include",
      });
      if (response.ok) {
        const responseJSON = await response.json();
        const user = responseJSON.user;
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async registerUser(userEmail, userName, userPassword) {
    const endpoint = Client.baseEndpoint + "/auth/register";
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
    } catch (error) {
      console.log(error);
    }
  }

  static async loginUser(userEmail, userPassword) {
    const endpoint = Client.baseEndpoint + "/auth/login";
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
      if (response.status === 200) {
        const responseJSON = await response.json();
        const user = responseJSON.user;
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async logoutUser() {
    const endpoint = Client.baseEndpoint + "/auth/logout";
    try {
      const response = await fetch(endpoint, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateUserEmail(userEmail) {
    const endpoint = Client.baseEndpoint + "/user";
    try {
      const response = await fetch(endpoint, {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      });
      const responseJSON = await response.json();
      return responseJSON;
    } catch (error) {
      console.log(error);
    }
  }

  static async updateUserName(userName) {
    const endpoint = Client.baseEndpoint + "/user";
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
      const responseJSON = await response.json();
      return responseJSON;
    } catch (error) {
      console.log(error);
    }
  }

  static async updateUserPassword(userPassword) {
    const endpoint = Client.baseEndpoint + "/user";
    try {
      const response = await fetch(endpoint, {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: userPassword,
        }),
      });
      const responseJSON = await response.json();
      return responseJSON;
    } catch (error) {
      console.log(error);
    }
  }
  static async updateUserProfile(email, userName, password) {
    const endpoint = Client.baseEndpoint + "/user";
    try {
      const response = await fetch(endpoint, {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          userName: userName,
          password: password,
        }),
      });
      const responseJSON = await response.json();
      return responseJSON;
    } catch (error) {
      console.log(error);
    }
  }

  //// PRODUCT
  static async getProducts() {
    const endpoint = Client.baseEndpoint + "/products";
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
  }

  static async getProductById(id) {
    const endpoint = Client.baseEndpoint + `/products/${id}`;
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const responseJSON = await response.json();
        const product = responseJSON.product;
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }

  //// CART
  static async updateCartProductQuantity(userId, productId, quantity) {
    const endpoint = Client.baseEndpoint + "/cart";
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
    } catch (error) {
      console.log(error);
    }
  }

  static async addCartProduct(userId, productId) {
    const endpoint = Client.baseEndpoint + "/cart";
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
    } catch (error) {
      console.log(error);
    }
  }

  static async getCartProducts() {
    const endpoint = Client.baseEndpoint + "/cart";
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
  }

  static async getCartDetails() {
    const endpoint = Client.baseEndpoint + "/cart/details";
    try {
      const response = await fetch(endpoint, {
        credentials: "include",
      });
      if (response.ok) {
        const responseJSON = await response.json();
        const cartDetails = responseJSON.cart;
        return cartDetails;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default Client;

class Client {
  static baseEndpoint = process.env.REACT_APP_API_URL;

  static async clientGet(endpoint) {
    try {
      const response = await fetch(endpoint, {
        credentials: "include",
      });
      if (response.ok) {
        const responseJSON = await response.json();
        return responseJSON;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async clientPostNoBody(endpoint) {
    try {
      const response = await fetch(endpoint, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const responseJSON = await response.json();
        return responseJSON;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async clientPostBody(endpoint, body) {
    try {
      const response = await fetch(endpoint, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      if (response.ok) {
        const responseJSON = await response.json();
        return responseJSON;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async clientPut(endpoint, body) {
    try {
      const response = await fetch(endpoint, {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      if (response.ok) {
        const responseJSON = await response.json();
        return responseJSON;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async clientDelete(endpoint) {
    try {
      const response = await fetch(endpoint, {
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const responseJSON = await response.json();
        return responseJSON;
      }
    } catch (error) {
      console.log(error);
    }
  }

  //// USER
  static async getUser() {
    const endpoint = Client.baseEndpoint + "/user";
    const response = await Client.clientGet(endpoint);
    if (response?.user) {
      return response.user;
    }
  }

  static async registerUser(userEmail, userName, userPassword) {
    const endpoint = Client.baseEndpoint + "/auth/register";
    const body = JSON.stringify({
      email: userEmail,
      userName: userName,
      password: userPassword,
    });
    const response = await Client.clientPostBody(endpoint, body);
    if (response?.user) {
      return response.user;
    }
  }

  static async loginUser(userEmail, userPassword) {
    const endpoint = Client.baseEndpoint + "/auth/login";
    const body = JSON.stringify({
      email: userEmail,
      password: userPassword,
    });
    const response = await Client.clientPostBody(endpoint, body);
    if (response?.user) {
      return response.user;
    }
  }

  static async logoutUser() {
    const endpoint = Client.baseEndpoint + "/auth/logout";
    const response = await Client.clientPostNoBody(endpoint);
    return response;
  }

  static async updateUserEmail(newEmail) {
    const endpoint = Client.baseEndpoint + "/user";
    const body = JSON.stringify({
      email: newEmail,
    });
    const response = await Client.clientPut(endpoint, body);
    return response;
  }

  static async updateUserName(userName) {
    const endpoint = Client.baseEndpoint + "/user";
    const body = JSON.stringify({
      userName: userName,
    });
    const response = await Client.clientPut(endpoint, body);
    return response;
  }

  static async updateUserPassword(userPassword) {
    const endpoint = Client.baseEndpoint + "/user";
    const body = JSON.stringify({
      password: userPassword,
    });
    const response = await Client.clientPut(endpoint, body);
    return response;
  }

  //// PRODUCT

  static async getProducts() {
    const endpoint = Client.baseEndpoint + "/products";
    const response = await Client.clientGet(endpoint);
    if (response.products) {
      return response.products;
    } else {
      return [];
    }
  }

  static async getProductById(id) {
    const endpoint = Client.baseEndpoint + `/products/${id}`;
    const response = await Client.clientGet(endpoint);
    if (response.product) {
      return response.product;
    } else {
      return null;
    }
  }

  //// CART
  static async updateCartProductQuantity(userId, productId, quantity) {
    const endpoint = Client.baseEndpoint + "/cart";
    const body = JSON.stringify({
      userId: userId,
      productId: productId,
      quantity: quantity,
    });
    const response = await Client.clientPostBody(endpoint, body);
    return response;
  }

  static async incrementCartProductQuantity(userId, productId) {
    const endpoint = Client.baseEndpoint + "/cart";
    const body = JSON.stringify({
      userId: userId,
      productId: productId,
    });
    const response = await Client.clientPostBody(endpoint, body);
    return response;
  }

  static async getCartProducts() {
    const endpoint = Client.baseEndpoint + "/cart";
    const response = await Client.clientGet(endpoint);
    if (response.cart) {
      return response.cart;
    }
  }

  static async getCartDetails() {
    const endpoint = Client.baseEndpoint + "/cart/details";
    const response = await Client.clientGet(endpoint);
    if (response.cart) {
      return response.cart;
    }
  }

  static async clearCart() {
    const endpoint = Client.baseEndpoint + "/cart";
    const response = await Client.clientDelete(endpoint);
    if (response.count) {
      return response.count;
    }
  }
}

export default Client;

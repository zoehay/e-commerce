const Client = {
  baseEndpoint: "http://localhost:8000",

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
      // const responseJSON = await response.json();
      // console.log(responseJSON);
    } catch (error) {
      console.log(error);
    }
  },
};

export default Client;

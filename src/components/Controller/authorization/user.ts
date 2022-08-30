import { urlLink } from '../../Templates/serve';

class User {
  userName = '';

  userEmail = '';

  userId = '';

  token = '';

  refreshToken = '';

  async createUser(name: string, email: string, password: string): Promise<number> {
    const rawResponse = await fetch(`${urlLink}users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    if (rawResponse.status === 200) {
      const content = await rawResponse.json();
      this.userName = content.name;
      this.userEmail = content.email;
    } else {
      console.log('createUser error: ', rawResponse.status, ', text: ', rawResponse.statusText);
    }
    return Promise.resolve(rawResponse.status);
  }

  async signIn(email: string, password: string): Promise<number> {
    const rawResponse = await fetch(`${urlLink}signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (rawResponse.status === 200) {
      const content = await rawResponse.json();
      this.userEmail = email;
      this.userId = content.userId;
      this.token = content.token;
      this.refreshToken = content.refreshToken;
      this.userName = content.name;
      localStorage.setItem(
        'userDataBasic',
        JSON.stringify({
          userId: this.userId,
          token: this.token,
          name: this.userName,
        }),
      );
    } else {
      console.log('signIn error: ', rawResponse.status, ', text: ', rawResponse.statusText);
    }
    return Promise.resolve(rawResponse.status);
  }

  // withCredentials: true,

  async getUser() {
    const rawResponse = await fetch(`${urlLink}users/${this.userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (rawResponse.status === 200) {
      const content = await rawResponse.json();
      console.log('content response getUser -----', content);
    } else {
      console.log('getUser error: ', rawResponse.status, ', text: ', rawResponse.statusText);
    }
  }

  async getNewTokens() {
    const rawResponse = await fetch(`${urlLink}users/${this.userId}/tokens`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.refreshToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (rawResponse.status === 200) {
      const content = await rawResponse.json();
      this.token = content.token;
      this.refreshToken = content.refreshToken;
      this.userId = content.userId;
      this.userName = content.name;
      localStorage.setItem(
        'userDataBasic',
        JSON.stringify({
          userId: this.userId,
          token: this.token,
          name: this.userName,
        }),
      );
      // console.log('content response getUser -----', content);
    } else {
      console.log('getNewTokens error: ', rawResponse.status, ', text: ', rawResponse.statusText);
    }
  }
}

export default User;
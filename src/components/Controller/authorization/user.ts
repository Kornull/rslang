import { urlLink } from '../../Templates/serve';

class User {
  userName: string;

  userEmail: string;

  userId: string;

  token: string;

  refreshToken: string;

  constructor() {
    this.userName = '';
    this.userEmail = '';
    this.userId = '';
    this.token = '';
    this.refreshToken = '';
  }

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
    }
    return Promise.resolve(rawResponse.status);
  }

  logOut(): void {
    this.userEmail = '';
    this.userId = '';
    this.token = '';
    this.refreshToken = '';
    this.userName = '';
    localStorage.setItem('userDataBasic', JSON.stringify({}));
  }

  // async getUser() {
  //   const rawResponse = await fetch(`${urlLink}users/${this.userId}`, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${this.token}`,
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   if (rawResponse.status === 200) {
  //     const content = await rawResponse.json();
  //   } else {
  //     console.log('getUser error: ', rawResponse.status, ', text: ', rawResponse.statusText);
  //   }
  // }

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

import { Client, Account, ID, Databases } from "appwrite";

// export const client = new Client();

// client
//   .setEndpoint("https://cloud.appwrite.io/v1")
//   .setProject("674f153f0003326d93a9"); // Replace with your project ID

// export const account = new Account(client);
// export { ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  databases;
  constructor() {
    this.client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("6774cc19002df455590b");
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // return this.login({ email, password });

        const roleDocument = await this.databases.createDocument(
          "6774cc89000edd33cc68",
          "6774d3d8002e6abada54",
          ID.unique(),
          {
            UserId: userAccount.$id,
            Role: "Customer",
          }
        );
        return userAccount;
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
    }
    return null;
  }
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}
const authService = new AuthService();
export default authService;

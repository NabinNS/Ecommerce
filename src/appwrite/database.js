import { Client, Databases, ID, Query, Storage } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("674f153f0003326d93a9");
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      if (!title || !slug || !content || !userId) {
        throw new Error("Required fields are missing.");
      }
      return await this.databases.createDocument(
        "674f162e00169db3ead7",
        "674f1664002c1bbd7bf2",
        ID.unique(),
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.error("Error creating post:", error.message);
      throw error;
    }
  }

  async listPosts() {
    try {
      return await this.databases.listDocuments(
        "674f162e00169db3ead7",
        "674f1664002c1bbd7bf2"
      );
    } catch (error) {
      console.error("Error listing post:", error.message);
      throw error;
    }
  }
  async getPost(postId) {
    try {
      return await this.databases.getDocument(
        "674f162e00169db3ead7",
        "674f1664002c1bbd7bf2",
        postId
      );
    } catch (error) {
      console.error("Error fetching post:", error.message);
      throw error;
    }
  }

  async getUserPost(userId) {
    try {
      return await this.databases.listDocuments(
        "674f162e00169db3ead7",
        "674f1664002c1bbd7bf2",
        [Query.equal("userId", userId)]
      );
    } catch (error) {
      throw error;
    }
  }
  //   async updatePost(slug, { title, content, featuredImage, status }) {
  //     try {
  //       return await this.databases.updateDocument(
  //         conf.appwriteDatabaseId,
  //         conf.appwriteCollectionId,
  //         slug,
  //         {
  //           title,
  //           content,
  //           featuredImage,
  //           status,
  //         }
  //       );
  //     } catch (error) {
  //       console.log("Appwrite service :: getCurrentUser :: error", error);
  //     }
  //   }
  //   async deletePost(slug) {
  //     try {
  //       await this.databases.deleteDocument(
  //         conf.appwriteDatabaseId,
  //         conf.appwriteCollectionId,
  //         slug
  //       );
  //       return true;
  //     } catch (error) {
  //       console.log("Appwrite service :: getCurrentUser :: error", error);
  //       return false;
  //     }
  //   }
  //   async getPost(slug) {
  //     try {
  //       return await this.databases.getDocument(
  //         conf.appwriteDatabaseId,
  //         conf.appwriteCollectionId,
  //         slug
  //       );
  //     } catch (error) {
  //       console.log("Appwrite service :: getCurrentUser :: error", error);
  //       return false;
  //     }
  //   }
  //   async getPosts(queries = [Query.equal("status", "active")]) {
  //     try {
  //       return await this.databases.listDocuments(
  //         conf.appwriteDatabaseId,
  //         conf.appwriteCollectionId,
  //         queries
  //       );
  //     } catch (error) {
  //       console.log("Appwrite service :: getCurrentUser :: error", error);
  //       return false;
  //     }
  //   }

  //   async uploadFile(file) {
  //     try {
  //       return await this.bucket.createFile(
  //         conf.appwriteBucketId,
  //         ID.unique(),
  //         file
  //       );
  //     } catch (error) {
  //       console.log("Appwrite service :: getCurrentUser :: error", error);
  //       return false;
  //     }
  //   }
  //   async deleteFile(fileId) {
  //     try {
  //       await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
  //       return true;
  //     } catch (error) {
  //       console.log("Appwrite service :: getCurrentUser :: error", error);
  //       return false;
  //     }
  //   }
  //   getFilePreview(fileId) {
  //     return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  //   }
}

const service = new Service();
export default service;

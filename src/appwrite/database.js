import { Client, Databases, ID, Query, Storage } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;
  constructor() {
    this.client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("6774cc19002df455590b");
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async addProduct({
    productName,
    price,
    offer,
    description,
    ImageId,
    userId,
  }) {
    try {
      if (!productName || !price || !description) {
        throw new Error("Required fields are missing.");
      }
      return await this.databases.createDocument(
        "6774cc89000edd33cc68",
        "6774ccc8001913583835",
        ID.unique(),

        {
          //tableName: variablename
          Name: productName,
          Price: price,
          Offer: offer,
          Description: description,
          ProductImageId: ImageId,
          userId: userId,
        }
      );
    } catch (error) {
      console.error("Error creating post:", error.message);
      throw error;
    }
  }

  async addProductImage({ productImage }) {
    try {
      return await this.storage.createFile(
        "6774ce040019ccddfeee",
        ID.unique(),
        productImage
      );
    } catch (error) {
      throw error;
    }
  }

  async getProductImage({ productImage, options = {} }) {
    try {
      const filePreview = await this.storage.getFilePreview(
        "6774ce040019ccddfeee",
        productImage
      );
      return filePreview.href;
    } catch (error) {
      console.error("Failed to fetch product image:", error);
      throw error;
    }
  }
  async listProducts() {
    try {
      return await this.databases.listDocuments(
        "6774cc89000edd33cc68",
        "6774ccc8001913583835"
      );
    } catch (error) {
      console.error("Error listing post:", error.message);
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      return await this.databases.deleteDocument(
        "6774cc89000edd33cc68",
        "6774ccc8001913583835",
        productId
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async updateProduct(productId, product) {
    try {
      return await this.databases.updateDocument(
        "6774cc89000edd33cc68",
        "6774ccc8001913583835",
        productId,
        product
      );
    } catch (error) {
      console.error("Error updating post:", error.message);
      throw error;
    }
  }

  async getProduct(productId) {
    try {
      return await this.databases.getDocument(
        "6774cc89000edd33cc68",
        "6774ccc8001913583835",
        productId
      );
    } catch (error) {
      console.error("Error fetching post:", error.message);
      throw error;
    }
  }

  async getUserPost(userId) {
    try {
      return await this.databases.listDocuments(
        "6774cc89000edd33cc68",
        "6774ccc8001913583835",
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

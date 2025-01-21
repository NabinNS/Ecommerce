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
    selectedBrand,
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
          Brand: selectedBrand,
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

  // async listProducts(currentPage, itemsPerPage, query, hotDeal) {
  //   try {
  //     if (hotDeal) {
  //       const response = await this.databases.listDocuments(
  //         "6774cc89000edd33cc68",
  //         "6774ccc8001913583835"
  //       );
  //       return {
  //         documents: response.documents.filter((product) => product.Offer != 0),
  //       };
  //     }
  //     if (query) {
  //       const response = await this.databases.listDocuments(
  //         "6774cc89000edd33cc68",
  //         "6774ccc8001913583835"
  //       );
  //       return {
  //         documents: response.documents.filter(
  //           (product) =>
  //             product.Name.toLowerCase().includes(query.toLowerCase()) ||
  //             product.Description.toLowerCase().includes(query.toLowerCase()) ||
  //             product.Brand.toLowerCase().includes(query.toLowerCase())
  //         ),
  //       };
  //     }
  //     if (currentPage !== undefined && currentPage !== null && itemsPerPage) {
  //       return await this.databases.listDocuments(
  //         "6774cc89000edd33cc68",
  //         "6774ccc8001913583835",
  //         [Query.limit(itemsPerPage), Query.offset(currentPage * itemsPerPage)]
  //       );
  //     }
  //     return await this.databases.listDocuments(
  //       "6774cc89000edd33cc68",
  //       "6774ccc8001913583835"
  //     );
  //   } catch (error) {
  //     console.error("Error listing post:", error.message);
  //     throw error;
  //   }
  // }

  async listProducts(
    currentPage,
    itemsPerPage,
    query,
    hotDeal,
    showNewest,
    minPrice,
    maxPrice
  ) {
    try {
      // Default fetch for products without any filters
      let response = await this.databases.listDocuments(
        "6774cc89000edd33cc68",
        "6774ccc8001913583835",
        currentPage !== undefined && currentPage !== null && itemsPerPage
          ? [
              Query.limit(itemsPerPage),
              Query.offset(currentPage * itemsPerPage),
            ]
          : []
      );
      let filteredDocuments = response.documents;

      // First, filter by query if provided
      if (query) {
        filteredDocuments = filteredDocuments.filter(
          (product) =>
            product.Name.toLowerCase().includes(query.toLowerCase()) ||
            product.Description.toLowerCase().includes(query.toLowerCase()) ||
            product.Brand.toLowerCase().includes(query.toLowerCase())
        );
      }

      if (minPrice && maxPrice) {
        filteredDocuments = filteredDocuments.filter((product) => {
          const productPrice = product.Price; // Assuming `Price` is the property name
          return (
            (!minPrice || productPrice >= parseFloat(minPrice)) &&
            (!maxPrice || productPrice <= parseFloat(maxPrice))
          );
        });
      }

      // Then, apply hot deal filter if it's checked
      if (hotDeal) {
        filteredDocuments = filteredDocuments.filter(
          (product) => product.Offer !== 0
        );
      }
      if (showNewest) {
        filteredDocuments = filteredDocuments.filter((product) => {
          const createdDate = new Date(product.$createdAt);
          const currentDate = new Date();
          // Show only products created within the last 7 days
          return (
            createdDate >=
            new Date(currentDate.setDate(currentDate.getDate() - 7))
          );
        });
      }

      return { documents: filteredDocuments };
    } catch (error) {
      console.error("Error listing products:", error.message);
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

  async listBrands() {
    try {
      return await this.databases.listDocuments(
        "6774cc89000edd33cc68",
        "677bb8450010469c6ad3"
      );
    } catch (error) {
      console.error("Error listing brands:", error.message);
      throw error;
    }
  }

  async addBrandImage({ brandImage }) {
    try {
      return await this.storage.createFile(
        "677bb8bd001d23e6318c",
        ID.unique(),
        brandImage
      );
    } catch (error) {
      throw error;
    }
  }
  async addBrand({ brandName, ImageId, userId }) {
    try {
      return await this.databases.createDocument(
        "6774cc89000edd33cc68",
        "677bb8450010469c6ad3",
        ID.unique(),

        {
          //tableName: variablename
          Name: brandName,
          BrandImageId: ImageId,
          userId: userId,
        }
      );
    } catch (error) {
      console.error("Error adding brand:", error.message);
      throw error;
    }
  }

  async getBrand(brandId) {
    try {
      return await this.databases.getDocument(
        "6774cc89000edd33cc68",
        "677bb8450010469c6ad3",
        brandId
      );
    } catch (error) {
      console.error("Error fetching brand:", error.message);
      throw error;
    }
  }
  async getBrandImage({ brandImage }) {
    try {
      const filePreview = await this.storage.getFilePreview(
        "677bb8bd001d23e6318c",
        brandImage
      );

      return filePreview.href;
    } catch (error) {
      console.error("Failed to fetch product image:", error);
      throw error;
    }
  }

  async updateBrand(brandId, brand) {
    try {
      return await this.databases.updateDocument(
        "6774cc89000edd33cc68",
        "677bb8450010469c6ad3",
        brandId,
        brand
      );
    } catch (error) {
      console.error("Error updating post:", error.message);
      throw error;
    }
  }
  async deleteBrand(brandId) {
    try {
      return await this.databases.deleteDocument(
        "6774cc89000edd33cc68",
        "677bb8450010469c6ad3",
        brandId
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  // async getUserPost(userId) {
  //   try {
  //     return await this.databases.listDocuments(
  //       "6774cc89000edd33cc68",
  //       "6774ccc8001913583835",
  //       [Query.equal("userId", userId)]
  //     );
  //   } catch (error) {
  //     throw error;
  //   }
  // }
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

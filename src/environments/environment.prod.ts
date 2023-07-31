export const environment = {
  production: true,
  api: {
    party: 'prod',
    urlApi: 'http://expotecnologia.utcv.edu.mx',
    endPoints: {
      auth: {
        login: "auth/login",
        register: "auth/register",
        verifyToken: "auth/verify-token"
      },
      products: {
        productsByUser: "products/my-products",
        productsById: "products/",
        porductPost: "products",
        porductPutDelete: "products/",
        porductAll: "products",
        porductAllAdmin: "products/admin"
      }
    }
  },
};

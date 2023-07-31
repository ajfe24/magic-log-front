// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: {
    party: 'develop',
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  rootPathUrl: 'https://zigykart-file.s3.ap-south-1.amazonaws.com/FileToSave/',
  //  apiUrl: "https://8fgvjff7x4.execute-api.ap-south-1.amazonaws.com/",
  apiUrl: 'http://zigykartapi-dev.ap-south-1.elasticbeanstalk.com/',
  // rootPathUrl: "https://zigykarttestfile.s3.ap-south-1.amazonaws.com/FileToSave/",

  firebase: {
    apiKey: 'AIzaSyAtgPbLrU_XnfTwplgsLKmoNKLjxHI6tFY',
    authDomain: 'zigykart-b0119.firebaseapp.com',
    projectId: 'zigykart-b0119',
    storageBucket: 'zigykart-b0119.appspot.com',
    messagingSenderId: '666871617978',
    appId: '1:666871617978:web:d54082e877d697b5f42583',
    measurementId: 'G-LD79BMXQWR',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

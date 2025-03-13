import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  // baseUrl: "http://127.0.0.1:5000"
  baseUrl: "https://icebreakerai-r3tl7.ondigitalocean.app/",
  googleClientId: "802638642148-l9humukverb1prjp5ecvcc17fenp18vs.apps.googleusercontent.com",
};

const devConfig = {
  webURL: 'http://localhost:3000',
  apiURL: 'https://wordway-api-dev.thecode.me'
};

const prodConfig = {
  webURL: 'https://wordway.app',
  apiURL: 'https://wordway-api.thecode.me'
};

const config = devConfig;
// const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;

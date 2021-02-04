const username = process.env.MONGO_USERNAME || 'root';
const password = process.env.MONGO_PASSWORD || 'rootPassXXX';
const host = process.env.MONGO_HOST || 'localhost';
const port = process.env.MONGO_PORT || '27018';
const database = process.env.MONGO_DATABASE || 'admin';
const params = process.env.MONGO_URI_PARAMS || '';
const secret = process.env.JWT_SECRET || 'MyLittleSecret';

let uri = 'mongodb://';
if (username && password) {
  uri += `${username}:${password}@`;
}

uri += `${host}:${port}/${database}${params}`;

module.exports = {
  mongodb: { uri },
  secret: secret
};
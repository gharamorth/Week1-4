const username = 'root';
const password = 'rootPassXXX';
const host = 'localhost';
const port = '27018';
const database = 'admin';
const params = '';
const secret = 'MyLittleSecret';

let uri = 'mongodb://';
if (username && password) {
  uri += `${username}:${password}@`;
}

uri += `${host}:${port}/${database}${params}`;

module.exports = {
  mongodb: { uri },
  secret,
};

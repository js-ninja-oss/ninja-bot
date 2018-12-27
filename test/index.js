
const path = require('path');
const dotEnvPath = path.resolve('./.env'); // TODO prepare dotenv for test

before(function(){
  require('dotenv').config({path: dotEnvPath});
})
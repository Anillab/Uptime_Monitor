// objects for all environments

var environments={};

// staging/default environment

environments.staging={
  'httpPort':3000,
  'httpsPort':3001,
  'envName':'staging',
  'hashingSecret': 'ThisisASecret'

};

// production environment
environments.production = {
  'httpPort':5000,
  'httpsPort':5001,
  'envName':'production',
  'hashingSecret': 'ThisIsAnotherSecret'
};

// Determine which env was passed as a CLI argument

var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

 // check that our currentEnvironment is set to one of the keys in the environments variables

var environmentToExport=typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment]: environments.staging;

// export the module
module.exports=environmentToExport;

// objects for all environments

var environments={};

// staging/default environment

environments.staging={
  'port':3000,
  'envName':'staging'
};

// production environment
environments.production = {
  'port':5000,
  'envName':'production'
};

// Determine which env was passed as a CLI argument

var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';


import configCircle from './config/circle.config';
import configTravis from './config/travis.config';
import configDefault from './config/default.config';

let config;
if (process.env.TRAVIS === 'true') {
  config = configTravis;
} else if (process.env.CIRCLECI === 'true') {
  config = configCircle;
} else {
  config = configDefault;
}

const useCommit = process.argv.includes('--commit');

for (const key in config) {
  const value = config[key];
  // shell envs are weird
  if (
    typeof value === 'undefined' ||
    value === 'undefined' ||
    value === null ||
    value === '' ||
    value === 'false'
  ) {
    throw new Error(`Missing configuration key ${key}`);
  }
}

export default { ...config, useCommit };

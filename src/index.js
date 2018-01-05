#!/usr/bin/env node

import spawn from './scripts/spawn';
import config from './scripts/config';
import log from './scripts/utils/log.utils';
import preDeploy from './scripts/pre-deploy';
import postDeploy from './scripts/post-deploy';
const localExp = './node_modules/exp/bin/exp.js';

log('Logging into Expo...');

let suffix;
process.argv.includes('--commit-id') ?
    suffix = config.githubCommitId :
    suffix = config.githubSourceBranch;

spawn(
    localExp,
    ['login', '-u', config.expUsername, '-p', config.expPassword, '--non-interactive'],
    loginError => {
      if (loginError) {
        throw new Error('Failed to log into Expo');
      } else {
        log('Logged into Expo.');
        log('Preparing project for publish...');
        preDeploy(suffix);
      }

      log('Publishing project into Expo.');
      spawn(localExp, ['publish'], publishError => {
        if (publishError) {
          throw new Error('Failed to publish package to Expo');
        } else {
          log('Published project.');
          log('Notifying GitHub...');
          postDeploy();
        }
      });
    });

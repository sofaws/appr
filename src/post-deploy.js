import request from 'request';
import { readPackageJSON } from './utils/files.utils';
import config from './config';
import log from './utils/log.utils';

export default function postDeploy() {
  const expUrl = `https://expo.io/@${config.expUsername}/${readPackageJSON().name}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${expUrl}`;
  const issueUrl = `https://${config.githubUsername}:${config.githubToken}@api.github.com/repos/${config.githubOrg}/${config.githubRepo}/issues/${config.githubPullRequestId}/comments`;
  const typeDeploy = config.useCommit;

  log('Exponent URL', expUrl);
  log('GitHub Issue URL', issueUrl);
  log('QR Code URL ', qrUrl);

  const body = `
  :shipit: This ${typeDeploy} has been deployed to:
  ${expUrl}

  Download the [Expo](https://expo.io/) app and scan this QR code to get started!

  ![QR Code](${qrUrl})
  `;

  request.post(
    {
      url: issueUrl,
      headers: { 'User-Agent': 'ci' },
      body: JSON.stringify({ body })
    },
    (error, response) => {
      if (error) {
        console.error('Failed to post comment to GitHub, an error occurred', error);
      } else if (response.statusCode >= 400) {
        console.error('Failed to post comment to GitHub, request failed with', response);
      } else {
        console.log(`Posted message to GitHub PR #${config.githubPullRequestId}`);
      }
    }
  );
}

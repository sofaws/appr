export default {
  // exponent username for publishing
  expUsername: process.env.EXP_USERNAME,

  // exponent password for publishing
  expPassword: process.env.EXP_PASSWORD,

  // github username for posting into PR
  githubUsername: process.env.GITHUB_USERNAME,

  // github personal access token with at least `public_repo`
  // scope (or appropriate scopes for private repositories)
  // https://github.com/blog/1509-personal-api-tokens
  githubToken: process.env.GITHUB_TOKEN,

  // name of the github org the repository under build belongs to
  githubOrg: process.env.GITHUB_ORG,

  // name of the github repository being built
  githubRepo: process.env.GITHUB_REPO,

  // name of the GitHub source branch - only used for generating the
  // exponent publish name, so if this value is not available in the
  // environment, use any other branch/pr-unique string here
  githubSourceBranch: process.env.GITHUB_SOURCE_BRANCH,

  // pull request number, e.g. 123
  githubPullRequestId: process.env.GITHUB_PR_NUMBER,

  // if argument --commit-id is present
    // then this value is  used for generating the exponent publish name
  githubCommitId: process.env.GITHUB_ID_COMMIT
};

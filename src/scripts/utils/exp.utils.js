
export function getExpPublishName(packageName, branchName) {
  return `${packageName}-${branchName}`.replace(/[^a-zA-Z0-9\\-]/, '-');
}

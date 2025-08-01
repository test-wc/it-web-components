import { getInfo } from '@changesets/get-github-info';

const getReleaseLine = async (changeset, type, options) => {
  if (!options || !options.repo) {
    throw new Error(
      'Please provide a repo to this changelog generator like this:\n"changelog": ["@changesets/changelog-github", { "repo": "org/repo" }]',
    );
  }

  let prFromSummary;
  let commitFromSummary;
  const usersFromSummary = [];

  const replacedChangelog = changeset.summary
    .replace(/^\s*(?:pr|pull|pull\s+request):\s*#?(\d+)/im, (_, pr) => {
      const num = Number(pr);
      if (!isNaN(num)) prFromSummary = num;
      return '';
    })
    .replace(/^\s*commit:\s*([^\s]+)/im, (_, commit) => {
      commitFromSummary = commit;
      return '';
    })
    .replace(/^\s*(?:author|user):\s*@?([^\s]+)/gim, (_, user) => {
      usersFromSummary.push(user);
      return '';
    })
    .trim();

  const [firstLine, ...futureLines] = replacedChangelog.split('\n').map((l) => l.trimRight());

  const links = await (async () => {
    if (prFromSummary !== undefined) {
      const { links } = await getInfo({
        repo: options.repo,
        pr: prFromSummary,
      });
      return links;
    }
    if (commitFromSummary) {
      const { links } = await getInfo({
        repo: options.repo,
        commit: commitFromSummary,
      });
      return links;
    }
    return {
      commit: null,
      pr: null,
      user: null,
    };
  })();

  const users = usersFromSummary.length
    ? usersFromSummary
        .map((userFromSummary) => `[@${userFromSummary}](https://github.com/${userFromSummary})`)
        .join(', ')
    : links.user;

  const prefix = [
    links.pr === null ? '' : ` (${links.pr})`,
    links.commit === null ? '' : ` (${links.commit})`,
    users === null ? '' : ` - ${users}`,
  ].join('');

  return `\n\n- ${firstLine}${prefix ? `${prefix}` : ''}${
    futureLines.length > 0 ? `\n${futureLines.map((l) => `  ${l}`).join('\n')}` : ''
  }`;
};

const getDependencyReleaseLine = async (changesets, dependenciesUpdated, options) => {
  if (dependenciesUpdated.length === 0) return '';

  const changesetLink = `- Updated dependencies [${changesets
    .map((cs) => cs.commit)
    .filter(Boolean)
    .map((commit) => commit.slice(0, 7))
    .join(', ')}]:`;

  const updatedDepenenciesList = dependenciesUpdated.map(
    (dependency) => `  - ${dependency.name}@${dependency.newVersion}`,
  );

  return [changesetLink, ...updatedDepenenciesList].join('\n');
};

export default {
  getReleaseLine,
  getDependencyReleaseLine,
};

import {
    readPackageJSON,
    writePackageJSON,
    readAppJSON,
    writeAppJSON
} from './utils/files.utils';
import { getExpPublishName } from './utils/exp.utils';

export default function preDeploy(suffix) {
  const pkg = readPackageJSON();
  const name = getExpPublishName(pkg.name, suffix);
  const modified = { ...pkg,
    name,
    privacy: 'unlisted'
  };

  writePackageJSON(modified);

  let app = readAppJSON();
  if (app.expo) {
    app.expo = { ...app.expo,
      name,
      slug: name,
      privacy: 'unlisted'
    };
  } else {
    app = { ...app,
      name,
      slug: name,
      privacy: 'unlisted'
    };
  }

  writeAppJSON(app);
}

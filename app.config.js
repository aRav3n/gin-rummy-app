const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  let uniqueIdentifier = "com.groundedwanderer.ginrummy";

  if (IS_DEV) {
    uniqueIdentifier += ".dev";
  } else if (IS_PREVIEW) {
    uniqueIdentifier += ".preview";
  }

  return uniqueIdentifier;
};

const getAppName = () => {
  let appName = "Gin Rummy";

  if (IS_DEV) {
    appName += " (Dev)";
  } else if (IS_PREVIEW) {
    appName += " (Preview)";
  } else {
    appName += " Score Tracker";
  }

  return appName;
};

export default ({ config }) => ({
  ...config,
  name: getAppName(),
  ios: {
    ...config.ios,
    bundleIdentifier: getUniqueIdentifier(),
  },
  android: {
    ...config.android,
    package: getUniqueIdentifier(),
  },
});

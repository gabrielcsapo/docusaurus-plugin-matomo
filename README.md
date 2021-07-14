# @gabrielcsapo/docusaurus-plugin-matomo

> Docusaurus Plugin to work with matomo analytics

## Installation

```console
npm install @gabrielcsapo/docusaurus-plugin-matomo --save-dev
```

## Usage

```js
module.exports = {
  plugins: [
    [
      require.resolve("@gabrielcsapo/docusaurus-plugin-matomo"),
      {
        siteId: "TEST_SITE_ID",
        matomoUrl: "TEST_MATOMO_URL",
        siteUrl: "TEST_SITE_URL",
        // ... more options can be provided please see the options below
      },
    ],
  ],
};
```

| Option                  | Explanation                                                                                                                                                                                                                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `siteId`                | Your Matomo site ID configured in your Matomo installation.                                                                                                                                                                                                                                                        |
| `matomoUrl`             | The url of your Matomo installation.                                                                                                                                                                                                                                                                               |
| `siteUrl`               | The url of your site, usually the same as `siteMetadata.siteUrl`. Only used for generating the url for `noscript` image tracking fallback.                                                                                                                                                                         |
| `matomoPhpScript`       | (optional) The name of your Matomo PHP script. Defaults to `piwik.php`                                                                                                                                                                                                                                             |
| `matomoJsScript`        | (optional) The name of your Matomo JS script. Defaults to `piwik.js`                                                                                                                                                                                                                                               |
| `exclude`               | (optional) Specify an array of pathnames where tracking code will be excluded. The pathname `/offline-plugin-app-shell-fallback/` is excluded by default.                                                                                                                                                          |
| `requireConsent`        | (optional) If true, tracking will be disabled until you call `window._paq.push(['setConsentGiven']);`.                                                                                                                                                                                                             |
| `requireCookieConsent`  | (optional) If true, no cookies will be stored or used until you call `window._paq.push(['setCookieConsentGiven']);`.                                                                                                                                                                                               |
| `disableCookies`        | (optional) If true, no cookie will be used by Matomo.                                                                                                                                                                                                                                                              |
| `cookieDomain`          | (optional) Specify cookie domain.                                                                                                                                                                                                                                                                                  |
| `localScript`           | (optional) If set, load local `piwik.js` script from the given path, instead of loading it from your `matomoUrl`.                                                                                                                                                                                                  |
| `respectDnt`            | (optional) If false, will load all scripts without respecting user preference to `Do Not Track` on browsers. Defaults to `true`.                                                                                                                                                                                   |
| `dev`                   | (optional) Activate dev mode by setting to `true`. Will load all scripts despite not running in `production` environment. Ignores your local browser's DNT header too. Outputs some information in console about what it is doing. Useful for local testing but careful: all hits will be send like in production. |
| `enableJSErrorTracking` | (optional) Enable basic JavaScript error tracking and reporting in Matomo by setting to `true`.                                                                                                                                                                                                                    |

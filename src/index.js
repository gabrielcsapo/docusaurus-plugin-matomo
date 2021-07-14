const path = require("path");

module.exports = function (context, options) {
  if (!options) {
    throw new Error(
      `You need to specify options arguments use docusaurus-plugin-matomo.`
    );
  }

  const {
    siteUrl,
    matomoUrl,
    matomoPhpScript = "piwik.php",
    matomoJsScript = "piwik.js",
    siteId,
    dev,
    localScript,
    requireConsent,
    requireCookieConsent,
    disableCookies,
    cookieDomain,
    enableJSErrorTracking,
    respectDnt = true,
  } = options;

  if (!matomoUrl || !siteId || !siteUrl) {
    throw new Error(
      'You specified the "matomo" object in "themeConfig" but the "matomoUrl" or "siteUrl" or "siteId" field was missing. ' +
        "Please ensure this is not a mistake."
    );
  }

  const isProd = process.env.NODE_ENV === "production";
  const script = localScript ? localScript : `${matomoUrl}/${matomoJsScript}`;
  const dntCondition = respectDnt
    ? `!(navigator.doNotTrack === '1' || window.doNotTrack === '1')`
    : `true`;

  return {
    name: "docusaurus-plugin-matomo",

    getClientModules() {
      return isProd ? [path.resolve(__dirname, "./piwik.js")] : [];
    },

    injectHtmlTags() {
      if (!isProd) {
        return {};
      }
      return {
        headTags: [
          {
            tagName: "link",
            attributes: {
              rel: "preconnect",
              href: script,
            },
          },
          {
            tagName: "noscript",
            innerHTML: `
            var img = document.createElement('img');
            img.src = "${matomoUrl}/${matomoPhpScript}?idsite=${siteId}&rec=1&url=${siteUrl}" + location.pathname;
            img.style = "border:0";
            img.alt = "tracker";

            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(img,s);
            `,
          },
          {
            tagName: "script",
            innerHTML: `
            window.dev = ${dev}
            if (window.dev === true || ${dntCondition}) {
              window._paq = window._paq || [];
              ${requireConsent ? "window._paq.push(['requireConsent']);" : ""}
              ${
                requireCookieConsent
                  ? "window._paq.push(['requireCookieConsent']);"
                  : ""
              }
              ${disableCookies ? "window._paq.push(['disableCookies']);" : ""}
              ${
                enableJSErrorTracking
                  ? "window._paq.push(['enableJSErrorTracking']);"
                  : ""
              }
              ${
                cookieDomain
                  ? `window._paq.push(['setCookieDomain', '${cookieDomain}']);`
                  : ""
              }
              window._paq.push(['setTrackerUrl', '${matomoUrl}/${matomoPhpScript}']);
              window._paq.push(['setSiteId', '${siteId}']);
              window._paq.push(['enableHeartBeatTimer']);
              window.start = new Date();
              (function() {
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.type='text/javascript'; g.async=true; g.defer=true; g.src='${script}'; s.parentNode.insertBefore(g,s);
              })();
              if (window.dev === true) {
                console.debug('[Matomo] Tracking initialized')
                console.debug('[Matomo] matomoUrl: ${matomoUrl}, siteId: ${siteId}')
              }
            }
            `,
          },
        ],
      };
    },
  };
};

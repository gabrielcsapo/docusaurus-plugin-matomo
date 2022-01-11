const plugin = require("./index");

describe("docusaurus-plugin-matomo", () => {
  test("should handle not passing in any options", () => {
    expect(() => {
      plugin({ siteConfig: { themeConfig: {} } });
    }).toThrowErrorMatchingInlineSnapshot(
      `"You need to specify options arguments use docusaurus-plugin-matomo."`
    );
  });

  test("should be able to render out the right header information given the base matomo options", () => {
    process.env.NODE_ENV = "production";

    expect(
      plugin(
        {
          siteConfig: {
            themeConfig: {},
          },
        },
        {
          siteId: "TEST_SITE_ID",
          matomoUrl: "TEST_MATOMO_URL",
          siteUrl: "TEST_SITE_URL",
        }
      ).injectHtmlTags()
    ).toMatchInlineSnapshot(`
Object {
  "headTags": Array [
    Object {
      "attributes": Object {
        "href": "TEST_MATOMO_URL/piwik.js",
        "rel": "preconnect",
      },
      "tagName": "link",
    },
    Object {
      "innerHTML": "
            var img = document.createElement('img');
            img.src = \\"TEST_MATOMO_URL/piwik.php?idsite=TEST_SITE_ID&rec=1&url=TEST_SITE_URL\\" + location.pathname;
            img.style = \\"border:0\\";
            img.alt = \\"tracker\\";

            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(img,s);
            ",
      "tagName": "noscript",
    },
    Object {
      "innerHTML": "
            window.dev = undefined
            if (window.dev === true || !(navigator.doNotTrack === '1' || window.doNotTrack === '1')) {
              window._paq = window._paq || [];
              
              
              
              
              
              window._paq.push(['setTrackerUrl', 'TEST_MATOMO_URL/piwik.php']);
              window._paq.push(['setSiteId', 'TEST_SITE_ID']);
              window._paq.push(['enableHeartBeatTimer']);
              window.start = new Date();
              (function() {
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.type='text/javascript'; g.async=true; g.defer=true; g.src='TEST_MATOMO_URL/piwik.js'; s.parentNode.insertBefore(g,s);
              })();
              if (window.dev === true) {
                console.debug('[Matomo] Tracking initialized')
                console.debug('[Matomo] matomoUrl: TEST_MATOMO_URL, siteId: TEST_SITE_ID')
              }
            }
            ",
      "tagName": "script",
    },
  ],
}
`);
  });
});

// https://developer.chrome.com/extensions/match_patterns
var ALL_SITES = { urls: ['<all_urls>'] }

// Mozilla doesn't use tlsInfo in extraInfoSpec 
var extraInfoSpec = ['blocking'];

var sslinfos = {};

// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/webRequest/onHeadersReceived
browser.webRequest.onHeadersReceived.addListener(
  async function (details) {
    var requestId = details.requestId;
    var securityInfo = await browser.webRequest.getSecurityInfo(requestId, {
      certificateChain: true
    });

    sslinfos[details.url] = securityInfo.certificates[0].fingerprint;
  },
  ALL_SITES,
  extraInfoSpec
);

browser.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.type == "getSSLInfo") {
      sendResponse({ result: sslinfos[request.value] });
    }
  }
);

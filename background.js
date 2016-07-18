var features = {
  "ghp_disable_whitespace_diffs": false
};

function modifyUrl() {
  chrome.webRequest.onBeforeRequest.addListener(
    function(info) {
      getFeaturesSettings();
      var newUrl = getUrl(info.url, features["ghp_disable_whitespace_diffs"]);
      console.log(features, newUrl);
      return {"redirectUrl": newUrl};
    },
    {
      urls: [
        "https://github.com/chartbeat/chartbeat/pull/*/files*"
      ]
    },
    ["blocking"]);
}

function getFeaturesSettings() {
  chrome.storage.sync.get(features, function(items) {
    for (var key in items) {
      features[key] = items[key];
    }
  });
}

function getUrl(url, disableWhitespace) {
  var newUrl = url;
  newUrl = setWhitespaceUrlParam(url, disableWhitespace);
  return newUrl;
}

function setWhitespaceUrlParam(url, disableWhitespace) {
  var newUrl = url;
  if (disableWhitespace && !url.includes("w=1")) {
    if (url.includes("?")) {
      if (url.slice(-1) === "?") {
        newUrl += "w=1";
      } else {
        newUrl += "&w=1";
      }
    } else {
      newUrl += "?w=1";
    }
  } else if (!disableWhitespace && url.includes("w=1")) {
    if (url.includes("?w=1")) {
      newUrl = url.replace("?w=1", "?");
    } else if (url.includes("&w=1")) {
      newUrl = url.replace("&w=1", "");
    }
  }
  return newUrl;
}

modifyUrl();

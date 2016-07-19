(function(window, document) {

  var featureEvents = {
    "ghp_filter_commits_list": enableCommitsListFilter
  };
  var targetEls = {
    "fileNav": {"class": "file-navigation"}
  };

  function init() {
    console.log("hi");
    var features = featureEvents.keys;
    chrome.storage.sync.get(features, function(items) {
      for (var item in items) {
        if (item in featureEvents && items[item] === true && featureEvents[item] !== null) {
          fn = featureEvents[item];
          fn();
        }
      }
    });
  }

  function enableCommitsListFilter(user) {
    var buttonEl = createFilterButtonEl();
    insertFilterButton(buttonEl);
    addFilterButtonListener(buttonEl);
  }

  function getNavEl() {
    var fileNavClass = targetEls["fileNav"]["class"];
    var fileNavEl = document.getElementsByClassName(fileNavClass);
    var result = null;
    if (fileNavEl.length > 0) {
      result = fileNavEl[0];
    }
    return result;
  }

  function createFilterButtonEl() {
    // <button class="btn btn-sm right" type="button">Filter to your commits</button>
    var containerEl = document.createElement("div");
    var buttonEl = document.createElement("button");
    var textNode = document.createTextNode("Filter to your commits");
    containerEl.setAttribute("class", "right");
    buttonEl.setAttribute("class", "btn btn-sm");
    buttonEl.setAttribute("type", "button");
    buttonEl.setAttribute("id", "ghp-commits-filter-button");
    buttonEl.appendChild(textNode);
    containerEl.appendChild(buttonEl);
    return containerEl;
  }

  function addFilterButtonListener(buttonEl) {
    buttonEl.addEventListener("click", function() {
      var metaEl = document.querySelector("meta[name='user-login']");
      var username = metaEl.getAttribute("content");
      var queryParam = "author=" + username;
      if (window.location.href.includes("?")) {
        var lastChar = url.slice(-1);
        if (lastChar !== "&" && lastChar !== "?") {
          queryParam = "&" + queryParam;
        }
      } else if (!window.location.href.includes("?")) {
        queryParam = "?" + queryParam;
      }
      window.location.href = queryParam;
    }, false);
  }

  function insertFilterButton(buttonEl) {
    var navEl = getNavEl();
    navEl.appendChild(buttonEl);
  }

  init();
})(window, document);

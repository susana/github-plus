(function(window, document) {

  var featureEvents = {
    "ghp_enable_collapsible_files": enableCollapsibleFiles,
    "ghp_enable_sticky_file_list": null,
    "ghp_enable_perma_expanded_file_list": null,
    "ghp_disable_whitespace_diffs": null,
  };

  function init() {
    createMenuListeners();
  }

  function createMenuListeners () {
    var features = featureEvents.keys;
    chrome.storage.sync.get(features, function(items) {
      for (var item in items) {
        if (item in featureEvents && items[item] === true && featureEvents[item] !== null) {
          fn = featureEvents[item];
          fn();
        } else {
          console.log(item, "not used.");
        }
      }
    });
  }

  function enableCollapsibleFiles() {
    var files = document.getElementById("files").getElementsByClassName("file");
    var numFiles = files.length;
    for (var i = 0; i < numFiles; i++) {
      var file = files[i];
      makeFileCollapsible(file)
    }
  }

  function makeFileCollapsible(fileEl) {
    var fileHeader = fileEl.getElementsByClassName("file-header")[0];
    fileHeader.addEventListener("click", function() {
      var container = this.parentElement
      var data = container.getElementsByClassName("data")[0]
      data.classList.toggle("hidden");
    }, false);
  }

  init();
})(window, document);

(function(window, document) {

  var featureEvents = {
    // "ghp_sticky_file_names": null,
    // "ghp_disable_whitespace_diffs": null, // This is handled in background.js.
    "ghp_enable_collapsible_files": function () {
      var fileEls = getFileEls();
      enableCollapsibleFiles(fileEls);
    }
  };
  var fileLocations = {};

  function init() {
    var fileEls = getFileEls();
    var features = featureEvents.keys;
    getFileLocations(fileEls);
    chrome.storage.sync.get(features, function(items) {
      for (var item in items) {
        if (item in featureEvents && items[item] === true && featureEvents[item] !== null) {
          fn = featureEvents[item];
          fn();
        }
      }
    });
  }

  function enableCollapsibleFiles(files) {
    var numFiles = files.length;
    for (var i = 0; i < numFiles; i++) {
      var file = files[i];
      makeFileCollapsible(file);
    }
  }

  function makeFileCollapsible(fileEl) {
    var fileHeader = fileEl.getElementsByClassName("file-header")[0];
    fileHeader.addEventListener("click", function() {
      var container = this.parentElement;
      var data = container.getElementsByClassName("data")[0]
      data.classList.toggle("hidden");
    }, false);
  }

  // Maybe we can use the functions below at some later point for making the
  // "sticky file names".
  function getFileEls() {
    return document.getElementById("files").getElementsByClassName("file");
  }

  function getFileLocations(fileEls) {
    var numFiles = fileEls.length;
    for (var i = 0; i < numFiles; i++) {
      var fileEl = fileEls[i];
      var fileId = fileEl.id;
      fileLocations[fileId] = fileEl.getBoundingClientRect();
    }
    console.log(fileLocations);
  }

  init();
})(window, document);

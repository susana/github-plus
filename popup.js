(function(document) {

  var featureIds = [
    // "ghp_sticky_file_names",
    "ghp_enable_collapsible_files",
    "ghp_disable_whitespace_diffs",
    "ghp_filter_commits_list"
  ];

  function init() {
    document.addEventListener('DOMContentLoaded', function() {
      setupMenu();
    })
  }

  function setupMenu() {
    var numFeatures = featureIds.length;
    for (var i = 0; i < numFeatures; i++) {
      var id = featureIds[i];
      makeCheckboxCacheable(id);
    }
    initMenuInputValues(featureIds);
  }

  function makeCheckboxCacheable(id) {
    var checkboxEl = document.getElementById(id);
    if (checkboxEl) {
      checkboxEl.addEventListener("click", function() {
        var option = this.value;
        var isChecked = this.checked;
        var kv = {};
        kv[option] = isChecked;
        chrome.storage.sync.set(kv, function() {
          console.log("We just saved", option, isChecked);
        });
      }, false);
    } else {
      console.log(id + " doesn't exist");
    }
  }

  function initMenuInputValues(keys) {
    chrome.storage.sync.get(keys, function(items) {
      for (var key in items) {
        var isChecked = items[key];
        document.getElementById(key).checked = isChecked;
      }
    });
  }

  init();
})(document);

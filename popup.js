(function(document) {

  var featureIds = [
    "ghp_enable_collapsible_files",
    "ghp_enable_sticky_file_list",
    "ghp_enable_perma_expanded_file_list",
    "ghp_disable_whitespace_diffs",
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
    var checkboxEl = document.getElementById(id)
    checkboxEl.addEventListener("click", function() {
      var option = this.value;
      var isChecked = this.checked;
      var kv = {};
      kv[option] = isChecked;
      chrome.storage.sync.set(kv, function() {
        // Notify that we saved.
        console.log("We just saved", option, isChecked);
      });
    }, false);
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

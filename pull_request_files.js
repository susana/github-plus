file_headers = document.getElementsByClassName("file-header")
for (var i = 0; i < file_headers.length; i++) {
  file_header = file_headers[i];
  file_header.addEventListener("click", function() {
    // data = this.nextElementSibling
    data = this.parentElement.getElementsByClassName("data")[0]
    data.classList.toggle("hidden");
  }, false);
}

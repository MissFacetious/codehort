// new editor icon click
function newEditor() {
  // remove all text in the editor
  firepad.setText('');
  hidePanels();
  updateMobbing();
}

// save editor icon click
function saveEditor() {
  var filename = document.getElementById("fileInput").value;
  var blob = new Blob([firepad.getText()], {
    type: "text/plain;charset=utf-8;",
  });
  window.saveAs(blob, filename);
  closePanel();
}

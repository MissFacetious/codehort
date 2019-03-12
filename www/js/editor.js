var temp_code = null;
var temp_tests = [5];
// new editor icon click
function newEditor() {
  // remove all text in the editor
  if (firepad != null) {
    // load up the sample code inside the editor to get them started
    firepad.setText(temp_code);

    // load up the tests that need to execute when ran
    //tests = temp_tests;
    for (var i=0; i > temp_tests.length; i++) {
      tests[i] = temp_temps[i];
    }
  }
  hidePanels();
  updateMobbing();

  temp_code = null;
  temp_tests = null;
}

function startChallenge(challenge) {
  // sample challenge
  temp_code = "// Create a function that adds two numbers together and return the result.\nfunction plus() {\n\t\n}"
  temp_tests[0] = {"test": "plus(1, 3);", "value": "4"};
  temp_tests[1] = {"test": "plus(4, 5);", "value": "9"};
  temp_tests[2] = {"test": "plus(-4, 5);", "value": "1"};
  temp_tests[3] = {"test": "plus(10, -10);", "value": "0"};
  temp_tests[4] = {"test": "plus(-10, -10);", "value": "-20"};
}

// save editor icon click
function saveEditor() {
  //writeFile();
  var blob;
  var filename = document.getElementById("fileInput").value;
  if (firepad != null) {
    blob = new Blob([firepad.getText()], {
      type: "text/plain;charset=utf-8;",
    });
  }
  else {
    blob = new Blob([codeMirror.getValue()], {
      type: "text/plain;charset=utf-8;",
    });
  }
  // for web
  window.saveAs(blob, filename);

  // for macos
  /*
  window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fs) {

    console.log('file system open: ' + fs.name);
    createFile(fs.root, filename, false);

    dirEntry.getFile(filename, {create: true, exclusive: false}, function(fileEntry) {

      fileEntry.createWriter(function (fileWriter) {

          fileWriter.onwriteend = function() {
              console.log("Successful file write...");
              readFile(fileEntry);
          };

          fileWriter.onerror = function (e) {
              console.log("Failed file write: " + e.toString());
          };

          fileWriter.write(blob);
      });
    });

   });
   */
  closePanel();
}

var tempCode = null;
var tempTests = [5];
var challengeNumber;
// new editor icon click
function newEditor() {
  loadChallenge(true);
  hidePanels();
  updateMobbing();
  tempCode = null;
  tempTests = null;
}

// we need to load these test cases if we reload..
function loadChallenge(code) {
  if (code) {
    // remove all text in the editor
    if (firepad != null) {
      // load up the sample code inside the editor to get them started
      firepad.setText(tempCode);
    }
  }
  // load up the tests that need to execute when ran
  tests = Array.from(tempTests);
}

function startChallenge(challenge) {
  // sample challenge
  tempCode = "// CHALLENGE #1: addition\n// Keep this line in order to execute your code in codehort correctly.\n\n// Create a function that adds two numbers together and return the result.\nfunction plus() {\n\t\n}"
  tempTests[0] = {"test": "plus(1, 3);", "value": "4"};
  tempTests[1] = {"test": "plus(4, 5);", "value": "9"};
  tempTests[2] = {"test": "plus(-4, 5);", "value": "1"};
  tempTests[3] = {"test": "plus(10, -10);", "value": "0"};
  tempTests[4] = {"test": "plus(-10, -10);", "value": "-20"};
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

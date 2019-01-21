  var codeMirror;
  var firepad;

  var baseURL = window.location+"";
  //strip out anything after #
  if (baseURL != null) {
    var n = baseURL.indexOf('#');
    baseURL = baseURL.substring(0, n != -1 ? n : baseURL.length);
  }
  else baseURL = "";

  function init() {
    //// Initialize Firebase.
    //// TODO: replace with your Firebase project configuration.
    var config = {
      apiKey: "AIzaSyCa3PLDxHQ8Fz0Gyz8-aL-Ep6WhjSgKdRc",
     authDomain: "codehort.firebaseapp.com",
     databaseURL: "https://codehort.firebaseio.com",
     projectId: "codehort",
     storageBucket: "codehort.appspot.com",
     messagingSenderId: "323980550600"
    };
    firebase.initializeApp(config);
    //// Get Firebase Database reference.
    var firepadRef = getExampleRef();
    //// Create CodeMirror (with line numbers and the JavaScript mode).
    codeMirror = CodeMirror(document.getElementById('firepad-container'), {
      lineNumbers: true,
      mode: 'javascript'
    });
    //// Create Firepad.
    firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
      defaultText: '// JavaScript Editing with Firepad!\nfunction go() {\n  var message = "Hello, world.";\n  console.log(message);\n}'
    });

    // copy paste listeners
    var copyBtn = document.getElementById("copyBtn");
    copyBtn.addEventListener('click', function(event) {
      try {
        // Now that we've selected the anchor text, execute the copy command
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copy email command was ' + msg + " and what was copied to clipboard was " + successful);
      } catch(err) {
        console.log('Oops, unable to copy');
      }

      // Remove the selections - NOTE: Should use
      // removeRange(range) when it is supported
      //window.getSelection().removeAllRanges();
    });
    var pasteBtn = document.getElementById("pasteBtn");
    pasteBtn.addEventListener('click', function(event) {

      console.log(codeMirror.getValue(""));
      codeMirror.get
      try {
        // Now that we've selected the anchor text, execute the copy command
        var successful = document.execCommand('paste');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copy email command was ' + msg + " and what was pasted to clipboard was " + successful);
      } catch(err) {
        console.log('Oops, unable to paste');
      }

      // Remove the selections - NOTE: Should use
      // removeRange(range) when it is supported
      //window.getSelection().removeAllRanges();
    });
  }

  function joinCode() {
    console.log(document.getElementById("JoinValue").value);
    window.location.href = baseURL + '#' + document.getElementById("JoinValue").value;
  }

  function executeCode() {
    console.log(codeMirror.getValue(""));
    //var newWindow = window.open();
    //newWindow.document.write('<script>function init() { alert("hello"); eval(codeMirror.getValue("")) }');
    //newWindow.document.write('<body onload="init()">');


    eval(codeMirror.getValue(""));

  }

function link(linkValue) {
// copy to clipboard
console.log(linkValue);
}
  // Helper to get hash from end of URL or generate a random one.
  function getExampleRef() {
    var ref = firebase.database().ref();
    var hash = window.location.hash.replace(/#/g, '');
    if (hash) {
      ref = ref.child(hash);
      var linkValue = ref.key;
      document.getElementById("codehort-link").innerHTML = "<a href=\"javascript:link('"+linkValue+"')\">"+linkValue+"</a>";

    } else {
      ref = ref.push(); // generate unique location.
      window.location = baseURL + '#' + ref.key; // add it as a hash to the URL.
      //document.getElementById("codehort-link2").innerHTML = "";
    }
    if (typeof console !== 'undefined') {
      console.log('Firebase data: ', ref.toString());
    }
    return ref;
  }

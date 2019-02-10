  var codeMirror;
  var firepad;
  var firepadRef;
  var zoom = 1.5;
  var baseURL = window.location+"";
  //strip out anything after #
  if (baseURL != null) {
    var n = baseURL.indexOf('#');
    baseURL = baseURL.substring(0, n != -1 ? n : baseURL.length);
  }
  else baseURL = "";

  function init() {

    // hide panels
    hidePanels();

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
    firepadRef = getExampleRef();
    //// Create CodeMirror (with line numbers and the JavaScript mode).
    codeMirror = CodeMirror(document.getElementById('firepad-container'), {
      lineNumbers: true,
      mode: 'javascript'
    });

    // Create a random ID to use as our user ID (we must give this to firepad and FirepadUserList).
    var userId = Math.floor(Math.random() * 9999999999).toString();

    //// Create Firepad.
    firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
      defaultText: '// Welcome to Codehort, start coding!\n\nconsole.log(\'hello world!\');\n\n',
      userId: userId
    });

    //// Create FirepadUserList (with our desired userId).
    var firepadUserList = FirepadUserList.fromDiv(firepadRef.child('users'),
    document.getElementById('userlist'), userId);

    var firepadUser = FirepadUserList.fromDiv(firepadRef.child('users'),
    document.getElementById('user'), userId);

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

    changeSize(0);
  }

  function saveEditor() {
    var filename = document.getElementById("fileInput").value;
    var blob = new Blob([codeMirror.getValue("")], {
      type: "text/plain;charset=utf-8;",
    });
    window.saveAs(blob, filename);
    closePanel();
  }

  function hidePanels() {
    document.getElementById("codehort-neweditor").style.display = 'none';
    document.getElementById("codehort-saveedit").style.display = 'none';
    document.getElementById("codehort-newsession").style.display = 'none';
    document.getElementById("codehort-joinsession").style.display = 'none';
    document.getElementById("codehort-sessioninfo").style.display = 'none';
    document.getElementById("codehort-preferences").style.display = 'none';
    document.getElementById("codehort-run").style.display = 'none';
    document.getElementById("overlay").style.display = 'none';
  }

  function showPanel(panel) {
    document.getElementById(panel).style.display = 'block';
    document.getElementById("overlay").style.display = 'block';
  }

  function closePanel() {
    hidePanels();
  }

  function newEditor() {
    // remove all text in the editor
    firepad.setText('');
    hidePanels();
  }

  function newSession() {
    // create new session
    window.location.href = baseURL;
    firepadRef = getExampleRef();
  }

  function joinCode() {
    console.log(document.getElementById("sessionIdInput").value);
    var sessionId = document.getElementById("sessionIdInput").value;
    window.location.href = baseURL + '#-' + sessionId;
    // make sure we reload the url to join correcty
    window.location.reload(true);
  }

  function changeSize(i) {
    // do not allow it to zoom out less than 0.1 and more than 10
    if (zoom > 0.5 && i < 0) {
      if (zoom < 1.2) {
        zoom += 0.1*i;
      }
      else {
        zoom += 0.5*i;
      }
    }
    if (zoom < 7.2 && i > 0) {
      if (zoom < 1.2) {
        zoom += 0.1*i;
      }
      else {
        zoom += 0.5*i;
      }
    }
    document.getElementById('firepad-container').style.fontSize = zoom+"em";
  }

  function applyPref() {
    // apply the prefs in the panel such as

    // dark / light theme

    // show intro at startup

    // display chat



    hidePanels();
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

function showSessionInfo(link) {
  document.getElementById("codehort-link").innerHTML = "<a href=\"javascript:link('"+link+"')\">"+link+"</a>";
  document.getElementById("codehort-display").innerHTML = link;
}
  // Helper to get hash from end of URL or generate a random one.
  function getExampleRef() {
    var ref = firebase.database().ref();
    var hash = window.location.hash.replace(/#/g, '');
    hash = hash.replace(/-/g, '');
    if (hash) {
      ref = ref.child(hash);
      var link = ref.key;
      console.log(link);
      showSessionInfo(link);
    } else {
      ref = ref.push(); // generate unique location.
      window.location = baseURL + '#' + ref.key; // add it as a hash to the URL.
      var link = ref.key.replace(/-/g, '');
      console.log(link);
      showSessionInfo(link);
    }
    if (typeof console !== 'undefined') {
      console.log('Firebase data: ', ref.toString());
    }
    return ref;
  }

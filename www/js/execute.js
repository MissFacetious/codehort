// Custom logging using codehort.log()
const codehort = new Object();

codehort.log = function(value) {
  let logger = document.getElementById('log');
  logger.innerHTML += value+'\n';
}

const Execute = (function() {
  // run code icon click
  let contents = "";
  let tests = [5]; // every challenge should have the same amount of tests

  function Execute() {
    if (!(this instanceof Execute)) {
      return new Execute();
    }
  }

  Execute.setTests = function(t) {
    this.tests = t;
  }

  Execute.getTests = function() {
    return this.tests;
  }

  Execute.executeCode = function() {
    // reset the contents and log
    let logger = document.getElementById('log');
    logger.innerHTML = '';
    contents = '';

    let code = Editor.getChallengeFromEditor();
    let error = true;
    let prepend = "<table>";
    let append = "</table>";
    let outnode = document.getElementById("outputCode");

    contents += prepend;
    if (Execute.tests != null) {
      for (var i=0; i < Execute.tests.length; i++) {
        error = runScript(i+1, Execute.tests[i], code);
        if (error) {
          // print out error and show logs
          let log = document.getElementById("consolelog");
          log.style.display = 'block';
          // do not execute any other tests
          break;
        }
      }
    }
    else {
      // show there is nothing to execute because you aren't in a challenge
      contents += "Nothing to execute, you need to start a code challenge first.";
      let log = document.getElementById("consolelog");
      log.style.display = 'none';
    }
    contents += append;
    outnode.innerHTML = contents;

    if (!error) {
      // show succeeded animation!
      AudioPlayer.playApplause();
      document.getElementById("trophy").style.backgroundImage = "url('./img/trophy.gif')";
      document.getElementById("outputCode").style.opacity = 0.5;

      //console.log(Editor.showChallengeNumber());
      let storage = window.localStorage;
      if (Editor.showChallengeNumber() == 1) {
        storage.setItem('check1', true);
        document.getElementById('challenge1check').style.display='block';
      }
      if (Editor.showChallengeNumber() == 2) {
        storage.setItem('check2', true);
        document.getElementById('challenge2check').style.display='block';
      }
      if (Editor.showChallengeNumber() == 3) {
        storage.setItem('check3', true);
        document.getElementById('challenge3check').style.display='block';
      }
      if (Editor.showChallengeNumber() == 4) {
        storage.setItem('check4', true);
        document.getElementById('challenge4check').style.display='block';
      }
      if (Editor.showChallengeNumber() == 5) {
        storage.setItem('check5', true);
        document.getElementById('challenge5check').style.display='block';
      }
      if (Editor.showChallengeNumber() == 6) {
        storage.setItem('check6', true);
        document.getElementById('challenge6check').style.display='block';
      }
      if (Editor.showChallengeNumber() == 7) {
        storage.setItem('check7', true);
        document.getElementById('challenge7check').style.display='block';
      }
    }
    else {
      AudioPlayer.playError();
      document.getElementById("trophy").style.backgroundImage = "url('')";
      document.getElementById("outputCode").style.opacity = 1;
      let log = document.getElementById("consolelog");
      log.style.display = 'block';
    }
    Codehort.showPanel('codehort-run');
  }

  function outputScript(a) {
    if (a == null) {
      return null;
    }
    var str = "["
    if (typeof(a)=="object" && a.length) {
      for (var i=0; i < a.length; i++) {
        if (typeof(a[i])=="object" && a[i].length) {
          str += (i==0?"":" ")+"[";
          for (var j=0; j<a[i].length; j++) {
            str += a[i][j]+(j==a[i].length-1?"]"+(i==a.length-1?"]":",")+"\n":", ");
          }
        }
        else {
          str += a[i]+(i==a.length-1?"]":", ");
        }
      }
    }
    else {
      str = a;
    }
    return str;
  }

  function writeRow(number, testcase, str, error) {
      if (!str) str="";
      let message = "";
      let outnode = document.getElementById("outputCode");
      if (!error) {
        message = '<span class="success">SUCCESS!</span>';
      }
      else {
        message = '<span class="failure">FAILED</span>';
      }

      // print out the row of information
      let string = "<tr><td width='10%' valign='top'>";
      string += "Test " + number + ":";
      string += "</td><td width='20%' valign='top'>";
      string += testcase.test;
      string += "</td><td width='10%' valign='top'>";
      string += "Output: ";
      string += "</td><td width='30%' valign='top'>";
      string += outputScript(str);
      string += "</td><td width='10%' valign='top'>";
      if (!error) {
          string += "</td><td width='10%' valign='top'>";
          string += "</td><td width='10%' valign='top'>";
      }
      else {
        string += "Expected: ";
        string += "</td><td width='10%' valign='top'>";
        string += testcase.value;
        string += "</td><td width='10%' valign='top'>";
      }
      string += message;
      string += "</td></tr>";
      return string;
  }

  function runScript(number, testcase, script) {
      let str;
      let error = true;
      d = new Date().getTime();
      // try this with strings, try this with math
      try {
        str = outputScript(eval(testcase.test + "\n" + script));

        if (str == null) {
          str = "Nothing returned.";
          error = true;
        }
        else {
          error = false;
        }
      }
      catch (e) {
          // line number needs to be extracted from the stack trace
          let stack = e.stack;
          //console.log(stack);
          //console.log(e.message);
          let index = stack.indexOf("<anonymous>:");
          stack = stack.substr(index+12, stack.length);
          index = stack.indexOf(":");
          stack = stack.substr(0, index);
          let lineNumber = (stack-1);
          // how about we just grab the first two lines?
          str = e.name;
          if (lineNumber != -1)
            str += " at line "+(lineNumber);
          str += ": "+e.message;
          error = true;
      }

      let tnode = document.getElementById("outputTime");
      time = (new Date().getTime()-d)/1000;
      if (time == 0) time = "0.000";
      tnode.innerHTML = "Execution time: "+time;
      if (str != undefined) {

        //process boolean logic properly
        var useBoolean = false;
        var booleanFromTestcaseValue = null; //testcase.value can come back as "true" or "false" in string format
        if(testcase.value == "true" || testcase.value == "false") {
          useBoolean = true;
          booleanFromTestcaseValue = (testcase.value == "true")
        }

        if (testcase.value == str && !useBoolean) {
          error = false;
        } else if (useBoolean && str == booleanFromTestcaseValue) {
          error = false;
          useBoolean = false;
        }
        else {
          error = true;
        }
        let string = writeRow(number, testcase, str, error) + "\n";
        contents += string;
      }
      return error;
  }
  return Execute;
})();

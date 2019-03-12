// run code icon click

var contents = "";
var tests = [5]; // every challenge should have the same amount of tests

function executeCode() {

  // first, we need to make sure we are running the right test.
  // parse through the code editor and make sure there is the // CHALLENGE # in it to set the tests right

  var code = codeMirror.getValue();
  var value = "";
  var string = "// CHALLENGE #";
  if (code.search(string) != -1) {
    value = code.substr(string.length, 2);
    if (!Number.isInteger(value)) {
      value = code.substr(string.length, 1);
    }
  }
  console.log("my value is : " + value);

  startChallenge(value);
  loadChallenge(false);

  // here is an example of doing a plus function, put the function into the code editor
  /*
  function plus(a, b) {
    return a+b;
  }

  things that are having problems are:
    something that doesn't return anything

    if you have a console.log at the end that gets in the way, it grabs the attention of the output
  */
  contents = "";

  var prepend = "<table>";
  var append = "</table>";
  var outnode = document.getElementById("outputCode");
  contents += prepend;

console.log(codeMirror.getValue());
  for (var i=0; i < tests.length; i++) {
    console.log(tests[i].test);
    //if (firepad != null) {
    //  error = JSrun(i+1, tests[i], firepad);
    //}
    //else {
      error = runScript(i+1, tests[i], code);
    //}
    if (error) {
      // do not execute any other tests
      break;
    }
  }
  contents += append;
  outnode.innerHTML = contents;

  if (!error) {
    // show succeeded animation!

  }
  showPanel('codehort-run');
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
    var message = "";
    var outnode = document.getElementById("outputCode");
    if (!error) {
      message = '<span class="success">SUCCESS!</span>';
    }
    else {
      message = '<span class="failure">FAILED</span>';
    }

    // print out the row of information
    var string = "<tr><td width='10%' valign='top'>";
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
    var str;
    var error = true;
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
      // line number is a problem here
        str = e.name+" at line "+(e.lineno)+": "+e.message;
        error = true;
    }
    var tnode = document.getElementById("outputTime");
    time = (new Date().getTime()-d)/1000;
    if (time == 0) time = "0.000";
    tnode.innerHTML = "Execution time: "+time;

    if (str != undefined) {
      if (testcase.value == str) {
        error = false;
      }
      else {
        error = true;
      }
      var string = writeRow(number, testcase, str, error) + "\n";
      contents += string;
    }
    return error;
}

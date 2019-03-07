// run code icon click

var contents = "";

function executeCode() {
  // here is an example of doing a plus function, put the function into the code editor
  /*
  function plus(a, b) {
    return a+b;
  }
  */
  contents = "";
  var tests = [5];
  tests[0] = {"test": "plus(1, 3);", "value": "4"};
  tests[1] = {"test": "plus(4, 5);", "value": "9"};
  tests[2] = {"test": "plus(-4, 5);", "value": "1"};
  tests[3] = {"test": "plus(10, -10);", "value": "0"};
  tests[4] = {"test": "plus(-10, -10);", "value": "-20"};

  var prepend = "<table>";
  var append = "</table>";
  var outnode = document.getElementById("outputCode");
  contents += prepend;

  for (var i=0; i < tests.length; i++) {
    if (firepad != null) {
      error = JSrun(i+1, tests[i], firepad);
    }
    else {
      error = JSrun(i+1, tests[i], codeMirror.getValue());
    }
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

function JSoutput(a) {
    var str = "["
    if (typeof(a)=="object" && a.length) {
        for (var i=0; i < a.length; i++)
            if (typeof(a[i])=="object" && a[i].length) {
                str += (i==0?"":" ")+"["
                for (var j=0; j<a[i].length; j++)
                    str += a[i][j]+(j==a[i].length-1?
                            "]"+(i==a.length-1?"]":",")+"\n":", ");
            } else str += a[i]+(i==a.length-1?"]":", ");
    } else str = a;
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
    string += JSoutput(str);
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

function JSrun(number, testcase, script) {
    var str;
    var error = true;
    d = new Date().getTime();

    // try this with strings, try this with math
    try {
      str = JSoutput(eval(testcase.test + "\n" + script));
      error = false;
    }
    catch(e) {
        str = e.name+" at line "+(e.lineNumber-56)+": "+e.message;
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

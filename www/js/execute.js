// run code icon click
function executeCode() {
  // here is an example of doing a plus function, put the function into the code editor
  /*
  function plus(a, b) {
    return a+b;
  }
  */
  var tests = [5];
  tests[0] = {"test": "plus(1, 3);", "value": "4"};
  tests[1] = {"test": "plus(4, 5);", "value": "9"};
  tests[2] = {"test": "plus(-4, 5);", "value": "1"};
  tests[3] = {"test": "plus(10, -10);", "value": "0"};
  tests[4] = {"test": "plus(-10, -10);", "value": "-20"};

  for (var i=0; i < tests.length; i++) {
    if (firepad != null) {
      error = JSrun(tests[i], firepad);
    }
    else {
      error = JSrun(tests[i], codeMirror.getValue());
    }
    if (error) {
      // do not execute any other tests
      break;
    }
  }

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

function writeln(testcase, str, error) {
    if (!str) str="";
    var message = "";
    var outnode = document.getElementById("outputCode");
    if (!error) {
      message = '<span class="success">SUCCESS!</span>';
    }
    else {
      message = '<span class="failure">FAILED</span>';
    }

    // change this to a five column table for a better format
    var string = "";
    string = "Test Case: ";
    string += testcase.test;
    string += "\t\t";
    string += "Output: ";
    string += JSoutput(str);
    string += "\t";
    if (!error) {
      string += "\t\t\t";
    }
    else {
      string += "Expected: ";
      string += testcase.value;
      string += "\t\t";
    }
    string += message;
    outnode.innerHTML += string + "\n";
}

function JSrun(testcase, script) {
    var str;
    var error = true;
    var outnode = document.getElementById("outputCode");
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
      writeln(testcase, str, error);
      //outnode.innerHTML += str;
    }
    return error;
}

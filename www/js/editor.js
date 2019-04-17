var Editor = (function() {
  var tempCode = null;
  var tempTests = [5];
  var tempHtml = null;
  var tempTitle = null;
  var challengeNumber;
  // new editor icon click

  function Editor() {
    if (!(this instanceof Editor)) {
      return new Editor();
    }
  }

  Editor.showChallengeNumber = function() {
    return this.challengeNumber;
  }

  Editor.showChecks = function(one, two, three, four, five, six, seven) {
    if (one) {
      document.getElementById('challenge1check').style.display='block';
    }
    if (two) {
      document.getElementById('challenge2check').style.display='block';
    }
    if (three) {
      document.getElementById('challenge3check').style.display='block';
    }
    if (four) {
      document.getElementById('challenge4check').style.display='block';
    }
    if (five) {
      document.getElementById('challenge5check').style.display='block';
    }
    if (six) {
      document.getElementById('challenge6check').style.display='block';
    }
    if (seven) {
      document.getElementById('challenge7check').style.display='block';
    }
  }

  Editor.newEditor = function() {
    Editor.loadChallenge(true);
    Codehort.hidePanels();
    Mobbing.updateMobbing();
    tempCode = null;
    tempTests = [5];
    tempHtml = null;
    tempTitle = null;
    Codehort.showPanel('codehort-challenge');
  }

  // we need to load these test cases if we reload..
  Editor.loadChallenge = function(code) {
    if (code) {
      // remove all text in the editor
      if (Codehort.getFirepad() != null) {
        // load up the sample code inside the editor to get them started
        Codehort.setFirepad(tempCode);
      }
      else if (Codehort.getCodeMirror() != null) {
        // you aren't in a session, so use codemirror editor instead, maybe give them a warning because if they start
        // a new session it will be wiped out
        Codehort.setCodeMirror(tempCode);
      }
    }
    // load up the tests that need to execute when ran
    if (tempCode != null) {
      Execute.setTests(Array.from(tempTests));

      // load up the challenge to the window
      document.getElementById("challengeTitle").innerHTML = tempTitle;
      document.getElementById("challenge").innerHTML = tempHtml;
    }
    else {
      // show you need to pick a challenge
    document.getElementById("challenge").innerHTML = "Pick a challenge to start.";
    }
  }

  Editor.getChallengeFromEditor = function() {
    // first, we need to make sure we are running the right test.
    // parse through the code editor and make sure there is the // CHALLENGE # in it to set the tests right
    var code = Codehort.getCodeMirrorValue();
    var value = "";
    var string = "// CHALLENGE #";
    var n = code.indexOf(string);
    if (n != -1) {
      code = code.substr(n, code.length);
      value = code.substr(string.length, 2);
      if (!Number.isInteger(value)) {
        value = code.substr(string.length, 1);
      }
    }

    Editor.startChallenge(value);
    Editor.loadChallenge(false);
    return code;
  }

  Editor.startChallenge = function(challenge) {
    this.challengeNumber = challenge;
    document.getElementById("challenge1").classList.remove("challengeIconSelected");
    document.getElementById("challenge2").classList.remove("challengeIconSelected");
    document.getElementById("challenge3").classList.remove("challengeIconSelected");
    document.getElementById("challenge4").classList.remove("challengeIconSelected");
    document.getElementById("challenge5").classList.remove("challengeIconSelected");
    document.getElementById("challenge6").classList.remove("challengeIconSelected");
    document.getElementById("challenge7").classList.remove("challengeIconSelected");

    if (challenge == '1') {
      document.getElementById("challenge1").classList.add("challengeIconSelected");
      // sample challenge
      tempCode = "// CHALLENGE #1: addition\n// Keep this line in order to execute your code in codehort correctly.\n\n//Click the Codehort icon above to view challenge instructions and example input and output values.\nfunction plus() {\n\t\n}"
      tempTests[0] = {"test": "plus(1, 3);", "value": "4"};
      tempTests[1] = {"test": "plus(4, 5);", "value": "9"};
      tempTests[2] = {"test": "plus(-4, 5);", "value": "1"};
      tempTests[3] = {"test": "plus(10, -10);", "value": "0"};
      tempTests[4] = {"test": "plus(-10, -10);", "value": "-20"};

      tempTitle = '<h2>Addition</h2>';
      tempHtml = '<h3>Description:</h3><p>Example challenge. Create a function that adds two parameters <i>a</i> and <i>b</i> and returns the result. </p><h3>Error Conditions:</h3><p>None</p><h3>Examples:</h3><p>plus(1, 2) will return 3</p><p>plus(5,10) will return 15</p><p>plus(-5,10) will return 5</p>';
    }
    else if (challenge == '2') {
      document.getElementById("challenge2").classList.add("challengeIconSelected");
      tempCode = "// CHALLENGE #2: arithmetic\n// Keep this line in order to execute your code in codehort correctly.\n\n//Click the Codehort icon above to view challenge instructions and example input and output values.\n" +
      "\n //Adds two numbers together and return the result. \n function add(a, b) {\n\t\n} \n" +
      "\n //Subtracts a from b and returns the result.\nfunction subtract(a, b) {\n\t\n}" +
      "\n //Multiplies a and b and returns the result.\nfunction multiply(a, b) {\n\t\n}" +
      "\n //Divides two numbers and returns the result. If divide by zero, return Infinity. \nfunction divide(a, b) {\n\t\n}" +
      "\n //Takes the modulus of two numbers and returns the result. If incalculable, return NaN. \nfunction modulus(a, b) {\n\t\n}" +
      "\n //Takes in a decimal number 'value' and returns that number as rounded to the number specified by 'decimal_places'\n//(for example, if value was 2.256 and decimal_places was 2, round() would return 2.26) \nfunction round(value, decimal_places) {\n\t\n}" +
      "\n //Leave this function alone. \nfunction compute(a, b, c) {\n\tvar val = (2 * (add(a, b) + multiply(a,b)) / (divide(a,b))) + modulus(a, b);\n\treturn round(val, c);\n }"

      tempTests[0] = {"test": "compute(1, 2, 2);", "value": "21"};
      tempTests[1] = {"test": "compute(3, 4, 2);", "value": "53.67"};
      tempTests[2] = {"test": "compute(-1, 10, 2);", "value": "19"};
      tempTests[3] = {"test": "compute(10, 20, 2);", "value": "930"};
      tempTests[4] = {"test": "compute(423.332323423, 363.83232334, 2);", "value": "266160.47"};

      tempTitle = '<h2>Arithmetic</h2>';
      tempHtml = '<h3>Description:</h3><p>Create several functions to complete basic arithmetic operations. Those functions will then be used in another function, <i>compute</i>, which will return a rounded numerical result.<ul><li>Create a function <i>add(a, b)</i> that adds two parameters <i>a</i> and <i>b</i> and returns the result.</li><li>Create a function <i>subtract(a, b)</i> that subtracts parameter <i>b</i> from parameter <i>a</i> and returns the result.</li><li>Create a function <i>multiply(a, b)</i> that multiplies two parameters <i>a</i> and <i>b</i> and returns the result.</li><li>Create a function <i>divide(a, b)</i> that divides parameter <i>a</i> by parameter <i>b</i> and returns the result. If divide by zero, return Infinity.</li><li>Create a function <i>modulus(a, b)</i> that takes the modulo of two parameters <i>a</i> and <i>b</i> and returns the result. If incalculable, return NaN.</li><li>Create a function <i>round(value, decimal_places)</i> that returns the parameter <i> value </i> rounded to the value specified by <i> decimal_places </i>. Examples of target behavior shown below.</li></ul></p><h3>Error Conditions:</h3><p>None</p><h3>Examples:</h3><p>round(2.256, 2) will return 2.26</p><p>round(56.2345,3) will return 56.235</p><p>round(42,10) will return 42.</p>';
    }
    else if (challenge == '3') {
      document.getElementById("challenge3").classList.add("challengeIconSelected");
      tempCode = "// CHALLENGE #3: roman numeral converter\n// Keep this line in order to execute your code in codehort correctly.\n\n//Click the Codehort icon above to view challenge instructions and example input and output values.\n" +
      "\n //Takes a roman numeral string as input and returns its corresponding numeric value." +
      "\nfunction romanNumeralToInteger(romanValue) {\n\t\n}";

      tempTests[0] = {"test": "romanNumeralToInteger(\'XXVI\');", "value": "26"};
      tempTests[1] = {"test": "romanNumeralToInteger(\"CI\");", "value": "101"};
      tempTests[2] = {"test": "romanNumeralToInteger(\"vii\");", "value": "7"};
      tempTests[3] = {"test": "romanNumeralToInteger(\"XXVIMFOO\");", "value": "-1"};
      tempTests[4] = {"test": "romanNumeralToInteger(\"MC\");", "value": "1100"};

      tempTitle = '<h2>Roman Numeral Converter</h2>';
      tempHtml = '<h3>Description:</h3><p>Implement a roman numeral converter function, <i>romanNumeralToInteger(romanValue)</i> that takes a string in a roman numeral format, <i>romanValue</i> as input and returns its corresponding numeric value. An explanation of roman numerals and their values can be found <a href=\'http://mathworld.wolfram.com/RomanNumerals.html\' target=\'_new\'>here</a>.</p><h3>Error Conditions:</h3><p>Roman numerals provided to the <i>romanNumeralToInteger</i> function can be either uppercase or lowercase. If an invalid roman numeral string (with non-roman-numeral characters, empty, or null) is provided, the function should return -1.</p><h3>Examples:</h3><p>romanNumeralToInteger("viii") will return 8</p><p>romanNumeralToInteger("IX") will return 9</p><p>romanNumeralToInteger("xli") will return 41</p><p>romanNumeralToInteger("LII") will return 52</p><p>romanNumeralToInteger("foo") will return -1</p>';
    }
    else if (challenge == '4') {
      document.getElementById("challenge4").classList.add("challengeIconSelected");
      tempCode = "// CHALLENGE #4: JSON Parsing\n// Keep this line in order to execute your code in codehort correctly.\n\n//Click the Codehort icon above to view challenge instructions and example input and output values.\n" +
      "\n//Given the student list shown in the function below, implement the listed functions to compute and retrieve student information.\n"+
      "\n//Access the student records in your implementations using the function shown here:\n"+
      "\n function getStudentList() { var studentRecords = [\n\t{\n\t\"studentName\": \"Miggs\",\n\t\"studentId\": \"12345\",\n\t\"grades\": [{\n\t\t\"assignmentName\": \"project\",\n\t\t\"score\": 88,\n\t\t\"weight\": 0.2\n\t},\n\t{\n\t\t\"assignmentName\": \"test1\",\n\t\t\"score\": 82,\n\t\t\"weight\": 0.4\n\t},\n\t{\n\t\t\"assignmentName\": \"test2\",\n\t\t\"score\": 94,\n\t\t\"weight\": 0.4\n\t}\n\t]\n\t},"+
      "\n\t{\n\t\"studentName\": \"Lisa\",\n\t\"studentId\": \"67890\",\n\t\"grades\": [{\n\t\t\"assignmentName\": \"project\",\n\t\t\"score\": 94,\n\t\t\"weight\": 0.2\n\t},\n\t{\n\t\t\"assignmentName\": \"test1\",\n\t\t\"score\": 90,\n\t\t\"weight\": 0.4\n\t},\n\t{\n\t\t\"assignmentName\": \"test2\",\n\t\t\"score\": 92,\n\t\t\"weight\": 0.4\n\t}\n\t]\n\t}," +
      "\n\t{\n\t\"studentName\": \"Slacky\",\n\t\"studentId\": \"64732\",\n\t\"grades\": [{\n\t\t\"assignmentName\": \"project\",\n\t\t\"score\": 34,\n\t\t\"weight\": 0.2\n\t},\n\t{\n\t\t\"assignmentName\": \"test1\",\n\t\t\"score\": 68,\n\t\t\"weight\": 0.4},\n\t{\n\t\t\"assignmentName\": \"test2\",\n\t\t\"score\": 86,\n\t\t\"weight\": 0.4\n\t}\n\t]\n\t}\n]\n" +
      "\n return studentRecords; } \n"+

      "\n\n //Returns the weighted numerical grade for a student given their name (shown in JSON as studentName)." +
      "\nfunction getWeightedNumericalGrade(studentName) {\n\t\n}" +

      "\n\n //Returns the letter grade for a student given their name (shown in JSON as studentName)." +
      "\nfunction getLetterGrade(studentName) {\n\t\n}" +

      "\n\n //Returns the score for an assignment given the student name and assignment name." +
      "\nfunction getScoreForAssignment(studentName, assignmentName) {\n\t\n}"

      tempTests[0] = {"test": "getWeightedNumericalGrade(\'Miggs\');", "value": "88"};
      tempTests[1] = {"test": "getWeightedNumericalGrade(\'Ash\');", "value": "-1"};
      tempTests[2] = {"test": "getLetterGrade(\'Slacky\');", "value": "D"};
      tempTests[3] = {"test": "getLetterGrade(\'Bob\');", "value": "-1"};
      tempTests[4] = {"test": "getScoreForAssignment(\'Miggs\',\'project'\);", "value": "88"};
      //tempTests[5] = {"test": "getScoreForAssignment(\'Miggs\',\'fakeExam'\);", "value": "-1"};
      //tempTests[6] = {"test": "getScoreForAssignment(\'Ash\',\'project'\);", "value": "-1"};
      tempTitle = '<h2>JSON Parsing</h2>';
      tempHtml = '<h3>Description:</h3>Given the student record information given in the <i>getStudentList</i> function provided in the challenge, implement functions to perform the operations listed below. <ul><li>Implement a function <i>getWeightedNumericalGrade(studentName)</i> that returns the weighted numerical grade for a student given the value provided in <i>studentName</i>. You can access all student information, including student name and assignment grades, using the <i>getStudentList</i> function provided for you. Hint: A weighted numerical grade is determined by multiplying each grade entry by its weighted value and then summing the results, see explanation <a href=\'https://www.rapidtables.com/calc/grade/grade-calculator.html\' target=\'_new\'>here</a>.</li><li>Implement a function <i>getLetterGrade(studentName)</i> that returns the letter grade as a string for a student given the value provided in <i>studentName</i>. For the sake of this exercise, A = 90+, B=80-89, C=70-79, D=65-69, F=64 and below. Hint: You may want to utilize the function written above to retrieve the weighted numerical grade in your implementation.</li><li>Implement a function <i>getScoreForAssigment(studentName, assignmentName)</i> that returns the score for an assignment given the values provided in <i>studentName</i> and <i>assignmentName</i>.</li></ul></p><h3>Error Conditions:</h3><p>If <i>studentName</i> or <i>assignmentName</i> information is not found in the student list, any function accessing that information should return -1 (since the results cannot be accurately computed.)</p><h3>Examples:</h3><p>getWeightedNumericalGrade(\'Miggs\') will return 88</p><p>getLetterGrade(\'Slacky\') will return D</p><p>getScoreForAssignment(\'Lisa\', \'project\') will return 94</p><p>getWeightedNumericalGrade(\'Ash\') will return -1</p>';
    }
    else if (challenge == '5') {
      document.getElementById("challenge5").classList.add("challengeIconSelected");

      tempCode = "// CHALLENGE #5: Date and Time\n// Keep this line in order to execute your code in codehort correctly.\n\n//Click the Codehort icon above to view challenge instructions and example input and output values.\n" +
      "\n //Takes a string as input and returns true if the string is in a correct date format, false otherwise." +
      "\nfunction isValidDate(potentialDate) {\n\t\n} \n" +

      "\n\n //Takes in the name of a month (case insensitive) and year, and then returns the number of days in that month." +
      "\nfunction getNumberOfDaysInMonth(monthName, year) {\n\t\n}" +

      "\n\n //Takes in a valid date string and returns the number of milliseconds since January 1, 1970, 00:00:00 UTC." +
      "\nfunction getMilliseconds(potentialDate) {\n\t\n}";

      tempTests[0] = {"test": "isValidDate(\"Aug 9, 1995\")", "value": "true"};
      tempTests[1] = {"test": "isValidDate(\"Foo 23, 2019\")", "value": "false"};
      tempTests[2] = {"test": "getNumberOfDaysInMonth(\"September\", \"2012\")", "value": "30"};
      tempTests[3] = {"test": "getMilliseconds(\"Thu, 01 Jan 1970 00:00:00 GMT-0400\")", "value": "14400000"};
      tempTests[4] = {"test": "getMilliseconds(\"I am not a valid date!\")", "value": "-1"};

      tempTitle = '<h2>Date and Time</h2>';
      tempHtml = '<h3>Description:</h3>To familiarize yourself with the treatment of date and time values, implement functions to perform the operations listed below. <ul><li>Implement a function <i>isValidDate(potentialDate)</i> that returns true if the value provided in <i>potentialDate</i> can be parsed by JavaScript as a valid Date object, and false otherwise.</li><li>Implement a function <i>getNumberOfDaysInMonth(monthName, year)</i> that returns the number of days in the month passed as the string value <i>monthName</i> for the year provided by the string value <i>year</i>. Examples of usage provided below.</li><li>Implement a function <i>getMilliseconds(potentialDate)</i> that returns returns the number of milliseconds since January 1, 1970, 00:00:00 UTC for the value provided in the string <i>potentialDate</i>. Hint: you can use the function you already implemented to determine whether or not an input string represents a valid date value in order to determine whether the function can correctly compute the expected milliseconds value.</li></ul></p><h3>Error Conditions:</h3><p>If <i>monthName</i> or <i>year</i> in <i>getNumberOfDaysInMonth</i> cannot be parsed or are invalid (unexpected) values, the function should return -1.</p> <p>Similarly, if <i>potentialDate</i> cannot be successfully parsed in <i>getMilliseconds</i>, the function should return -1.</p><h3>Examples:</h3><p>isValidDate(\"2019-01-01\") will return true</p><p>isValidDate(\"2014-25-23\") will return false</p><p>getDaysInMonth(\"January\", \"2012\") will return 31</p><p>getMilliseconds(\"Thu, 01 Jan 1970 00:00:00 GMT\") will return 0</p><p>getMilliseconds(\"Wed, 09 Aug 1995 00:00:00 GMT\") will return 807926400000</p>';
    }
    else if (challenge == '6') {
      document.getElementById("challenge6").classList.add("challengeIconSelected");

      tempCode = "// CHALLENGE #6: encoding\n// Keep this line in order to execute your code in codehort correctly.\n\n//Click the Codehort icon above to view challenge instructions and example input and output values.\n" +
      "\n //Takes a roman numeral string as input and returns its corresponding numeric value." +
      "\nfunction encode(valueToEncode) {\n\t\n}";

      tempCode = "";
      tempTests[0] = {"test": "", "value": ""};
      tempTests[1] = {"test": "", "value": ""};
      tempTests[2] = {"test": "", "value": ""};
      tempTests[3] = {"test": "", "value": ""};
      tempTests[4] = {"test": "", "value": ""};
      tempTitle = '<h2>Basic Encoding</h2>';
      tempHtml = '';
    }
    else if (challenge == '7') {
      document.getElementById("challenge7").classList.add("challengeIconSelected");
      tempCode = "";
      tempTests[0] = {"test": "", "value": ""};
      tempTests[1] = {"test": "", "value": ""};
      tempTests[2] = {"test": "", "value": ""};
      tempTests[3] = {"test": "", "value": ""};
      tempTests[4] = {"test": "", "value": ""};
      tempTitle = '<h2>Solve the Maze</h2>';
      tempHtml = '';
    }
  }
  var blob;
  var filename;
  // save editor icon click
  Editor.saveEditor = function() {
    //writeFile();
    filename = document.getElementById("fileInput").value;
    if (Codehort.getFirepad() != null) {
      blob = new Blob([Codehort.getFirepad().getText()], {
        type: "text/plain;charset=utf-8;",
      });
    }
    else {
      blob = new Blob([Codehort.getCodeMirrorValue()], {
        type: "text/plain;charset=utf-8;",
      });
    }
    // for web
    window.saveAs(blob, filename);
    Codehort.closePanel();

    // for macos
    // so this works, I just have no idea where it puts it at all...
    //window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    //window.requestFileSystem(window.PERSISTENT, 5*1024*1024, onInitFs, errorHandler);
  }

  function onInitFs(fs) {
    alert('file system open: ' + fs.name);
    createFile(fs.root, filename, false);
    Codehort.closePanel();
  }

  function errorHandler(e) {
    alert("woops " + e);
  }


  function createFile(dirEntry, fileName, isAppend) {
      // Creates a new file or returns the file if it already exists.
      dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {

          writeFile(fileEntry, null, isAppend);

      });
  }

  function writeFile(fileEntry, dataObj) {
      // Create a FileWriter object for our FileEntry (log.txt).
      fileEntry.createWriter(function (fileWriter) {

          fileWriter.onwriteend = function() {
              console.log("Successful file write...");
              //readFile(fileEntry);
          };

          fileWriter.onerror = function (e) {
              console.log("Failed file write: " + e.toString());
          };

          fileWriter.write(blob);
      });
  }
  return Editor;
})();

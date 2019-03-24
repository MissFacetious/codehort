var tempCode = null;
var tempTests = [5];
var challengeNumber;
// new editor icon click
function newEditor() {
  loadChallenge(true);
  hidePanels();
  updateMobbing();
  tempCode = null;
  tempTests = [5];
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

  if(challenge == '1') {
    // sample challenge
      tempCode = "// CHALLENGE #1: addition\n// Keep this line in order to execute your code in codehort correctly.\n\n// Create a function that adds two numbers together and return the result.\nfunction plus() {\n\t\n}"
      tempTests[0] = {"test": "plus(1, 3);", "value": "4"};
      tempTests[1] = {"test": "plus(4, 5);", "value": "9"};
      tempTests[2] = {"test": "plus(-4, 5);", "value": "1"};
      tempTests[3] = {"test": "plus(10, -10);", "value": "0"};
      tempTests[4] = {"test": "plus(-10, -10);", "value": "-20"};

  } else if (challenge == '2') {

    tempCode = "// CHALLENGE #2: arithmetic\n// Keep this line in order to execute your code in codehort correctly.\n\n//Implement the following functions. \n" +
    "\n //Create a function that adds two numbers together and return the result. \n function add(a, b) {\n\t\n} \n" +
    "\n //Create a function that subtracts a from b and returns the result.\nfunction subtract(a, b) {\n\t\n}" +
    "\n //Create a function that multiplies a and b and returns the result.\nfunction multiply(a, b) {\n\t\n}" +
    "\n //Create a function that divides two numbers and returns the result. If divide by zero, return Infinity. \nfunction divide(a, b) {\n\t\n}" +
    "\n //Create a function that takes the modulus of two numbers and returns the result. If incalculable, return NaN. \nfunction modulus(a, b) {\n\t\n}" +
    "\n //Create a function that takes in a decimal number 'value' and returns that number as rounded to the number specified by 'decimal_places'\n//(for example, if value was 2.256 and decimal_places was 2, round() would return 2.26) \nfunction round(value, decimal_places) {\n\t\n}" +
    "\n //Leave this function alone \nfunction compute(a, b) {\n\tvar val = (2 * (add(a, b) + multiply(a,b)) / (divide(a,b))) + modulus(a, b);\n\treturn round(val, 2);\n }"

    tempTests[0] = {"test": "compute(1, 2);", "value": "21"};
    tempTests[1] = {"test": "compute(3, 4);", "value": "53.67"};
    tempTests[2] = {"test": "compute(-1, 10);", "value": "19"};
    tempTests[3] = {"test": "compute(10, 20);", "value": "930"};
    tempTests[4] = {"test": "compute(423.332323423, 363.83232334);", "value": "266160.47"};

} else if (challenge == '3') {

  tempCode = "// CHALLENGE #3: roman numeral converter\n// Keep this line in order to execute your code in codehort correctly.\n\n" +
  "\n //Implement a roman numeral converter that takes a roman numeral string as input and returns its corresponding numeric value." +
  "\n //Examples: romanNumeralToInteger(\"XXVI\") returns the integer 26; romanNumeralToInteger(\"CI\") returns the integer 101." +
  "\n //If an invalid roman numeral or character is provided, the value -1 is returned." +
  "\n //romanNumeralToInteger is case insensitive. You can create any helper functions you need.\nfunction romanNumeralToInteger(romanValue) {\n\t\n}";

  tempTests[0] = {"test": "romanNumeralToInteger(\'XXVI\');", "value": "26"};
  tempTests[1] = {"test": "romanNumeralToInteger(\"CI\");", "value": "101"};
  tempTests[2] = {"test": "romanNumeralToInteger(\"vii\");", "value": "7"};
  tempTests[3] = {"test": "romanNumeralToInteger(\"XXVIMFOO\");", "value": "-1"};
  tempTests[4] = {"test": "romanNumeralToInteger(\"MC\");", "value": "1100"};

} else if (challenge == '4') {

  tempCode = "// CHALLENGE #4: JSON Parsing\n// Keep this line in order to execute your code in codehort correctly.\n\n" +
  "\n//Given the student list shown in the function below, implement the listed functions to compute and retrieve student information.\n"+
  "\n//Access the database in your implementations using the function shown here:\n"+
  "\n function getStudentList() { var studentRecords = [\n\t{\n\t\"studentName\": \"Miggs\",\n\t\"studentId\": \"12345\",\n\t\"grades\": [{\n\t\t\"assignmentName\": \"project\",\n\t\t\"score\": 88,\n\t\t\"weight\": 0.2\n\t},\n\t{\n\t\t\"assignmentName\": \"test1\",\n\t\t\"score\": 82,\n\t\t\"weight\": 0.4\n\t},\n\t{\n\t\t\"assignmentName\": \"test2\",\n\t\t\"score\": 94,\n\t\t\"weight\": 0.4\n\t}\n\t]\n\t},"+
  "\n\t{\n\t\"studentName\": \"Lisa\",\n\t\"studentId\": \"67890\",\n\t\"grades\": [{\n\t\t\"assignmentName\": \"project\",\n\t\t\"score\": 94,\n\t\t\"weight\": 0.2\n\t},\n\t{\n\t\t\"assignmentName\": \"test1\",\n\t\t\"score\": 90,\n\t\t\"weight\": 0.4\n\t},\n\t{\n\t\t\"assignmentName\": \"test2\",\n\t\t\"score\": 92,\n\t\t\"weight\": 0.4\n\t}\n\t]\n\t}," +
  "\n\t{\n\t\"studentName\": \"Slacky\",\n\t\"studentId\": \"64732\",\n\t\"grades\": [{\n\t\t\"assignmentName\": \"project\",\n\t\t\"score\": 34,\n\t\t\"weight\": 0.2\n\t},\n\t{\n\t\t\"assignmentName\": \"test1\",\n\t\t\"score\": 68,\n\t\t\"weight\": 0.4},\n\t{\n\t\t\"assignmentName\": \"test2\",\n\t\t\"score\": 86,\n\t\t\"weight\": 0.4\n\t}\n\t]\n\t}\n]\n" +
  "\n return studentRecords; } \n"+

  "\n\n //Implement a function that returns the weighted numerical grade for a student given their name (shown in JSON as studentName)." +
  "\n //Weighted numerical grade is determined by multiplying each grade entry by its weighted value and then summing the results (see: https://www.rapidtables.com/calc/grade/grade-calculator.html)." +
  "\n //Hint: access the student list using the provided function." +
  "\n //If the student is not found in the database, return -1.\nfunction getWeightedNumericalGrade(studentName) {\n\t\n}" +

  "\n\n //Implement a function that returns the letter grade for a student given their name (shown in JSON as studentName)." +
  "\n //For the sake of this exercise, A = 90+, B=80-89, C=70-79, D=65-69, F=64 and below." +
  "\n //Hint: you may want to utilize the function written above to retrieve the weighted numerical grade in your implementation." +
  "\n //If the student is not found in the database, return -1.\nfunction getLetterGrade(studentName) {\n\t\n}" +

  "\n\n //Implement a function that returns the score for an assignment given the student name and assignment name." +
  "\n //If the student or assignment name is not found in the database, return -1.\nfunction getScoreForAssignment(studentName, assignmentName) {\n\t\n}"

  tempTests[0] = {"test": "getWeightedNumericalGrade(\'Miggs\');", "value": "88"};
  tempTests[1] = {"test": "getWeightedNumericalGrade(\'Ash\');", "value": "-1"};
  tempTests[2] = {"test": "getLetterGrade(\'Slacky\');", "value": "D"};
  tempTests[3] = {"test": "getLetterGrade(\'Ash\');", "value": "-1"};
  tempTests[4] = {"test": "getScoreForAssignment(\'Miggs\',\'project'\);", "value": "88"};
  //tempTests[5] = {"test": "getScoreForAssignment(\'Miggs\',\'fakeExam'\);", "value": "-1"};
  //tempTests[6] = {"test": "getScoreForAssignment(\'Ash\',\'project'\);", "value": "-1"};

}



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

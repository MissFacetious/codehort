// run code icon click
function executeCode() {
  //console.log(codeMirror.getValue(""));
  //var newWindow = window.open();
  //newWindow.document.write('<script>function init() { alert("hello"); eval(codeMirror.getValue("")) }');
  //newWindow.document.write('<body onload="init()">');
  console.log(firepad.getText());

  // we need a try catch here incase our coders have invalid syntax
  eval(firepad.getText());
}

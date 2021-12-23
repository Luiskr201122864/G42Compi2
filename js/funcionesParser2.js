/* codemirror para textarea Help */
var code2 = document.getElementById("Resultados1");
var editor2 = CodeMirror.fromTextArea(code2, {
    height: "350px;",
        mode: "text/x-sql",
        lineNumbers: true
});

function showCodeXQuery(){
    var text = editor2.getValue();
    return text;
}
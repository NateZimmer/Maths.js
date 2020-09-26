var M = Matrix;

console.log('Mathscript demo');

plotyLayout.showlegend= false;

var code_text_div = document.querySelector('#codeBlock')
var myCodeMirror = CodeMirror.fromTextArea(code_text_div,{
    lineNumbers: true,
    mode: 'javascript'
});

var code_text = '';
document.querySelector('#calculating').addEventListener('click',()=>{
    code_text = myCodeMirror.getValue();
    eval('var text_fnc = function(M){' + code_text + '}');
    M.execute(text_fnc);
});

document.querySelector('#calculating').click();
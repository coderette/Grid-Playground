var col = 0;
var row = 0;
var uniqueDivs = 0;
var renderDiv = document.getElementById("container");
var letter = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "za", "zb", "zc", "zd", "ze", "zf", "zg", "zh", "zi", "zj", "zk", "zl", "zm", "zn", "zo", "zp", "zq", "zr", "zs", "zt", "zu", "zv", "zw", "zx", "zy", "zz"];
var color = ["green", "yellow", "red", "teal", "orange", "crimson", "blue", "indigo", "violet", "purple", "silver", "gray", "lightgreen", "navy", "blueviolet", "darksalmon", "brown", "chocolate", "coral", "magenta", "aqua", "darkcyan", "darkgoldenrod", "darkorchid", "forestgreen", "dodgerblue", "darkred", "gold", "darkgreen", "darkblue", "darkmagenta", "darkolivegreen", "deeppink", "deepskyblue", "lightyellow", "lightgreen", "lightblue", "palegreen", "palevioletred", "peru", "saddlebrown", "salmon", "seagreen", "skyblue", "beige", "burlywood", "chartreuse", "darkkhaki", "firebrick", "darkslateblue", "hotpink", "khaki", "lime", "royalblue", "midnightblue"];
var styleType = ["grid-area", "background-color"]
var styles = {};
var style = "";
var rows = "";
var customLetters = [];
var rowText = [];
var alphabet = [];
var htmlDivs = "";


function start() {
    var colStart = document.getElementById("col");
    var rowStart = document.getElementById("row");
    if (colStart.value=="" && rowStart.value=="") 
    {
        increase("colUp");
        increase("rowUp");
        increase("rowUp");        
        increase("rowUp");
        render();
    }
    else render();
    
    if (window.innerWidth <= 700) {
        inputOnly();
    }
    else {
        showAll();
    }
}

function inputOnly() {
    if (window.innerWidth <= 700) {
        var input = document.getElementById("input");
        var output = document.getElementById("output");
        var code = document.getElementById("code");
        var inputTitle = document.getElementById("inputTitle");
        var outputTitle = document.getElementById("outputTitle");
        var codeTitle = document.getElementById("codeTitle");
        var renderBox = document.getElementById("renderBox");

        input.style.display = "grid";
        output.style.display = "none";
        code.style.display = "none";
        inputTitle.className = "inputTitleActive";
        outputTitle.className = "outputTitle";
        codeTitle.className = "codeTitleInactive";
        renderBox.style.gridTemplateColumns = "auto";
        renderBox.style.gridTemplateAreas = '"input"';
    }
    else if (window.innerWidth > 700) {
        showAll();
    } 
}

function ouputOnly() {
    if (window.innerWidth <= 700) {
        var input = document.getElementById("input");
        var output = document.getElementById("output");
        var code = document.getElementById("code");
        var inputTitle = document.getElementById("inputTitle");
        var outputTitle = document.getElementById("outputTitle");
        var codeTitle = document.getElementById("codeTitle");
        var renderBox = document.getElementById("renderBox");


        input.style.display = "none";
        output.style.display = "grid";
        code.style.display = "none";
        inputTitle.className = "inputTitleInactive";
        outputTitle.className = "outputTitleActive";
        codeTitle.className = "codeTitleInactive";
        renderBox.style.gridTemplateColumns = "auto";
        renderBox.style.gridTemplateAreas = '"output"';
    }
    else if (window.innerWidth > 700) {
        showAll();
    } 
}

function codeOnly() {
    if (window.innerWidth <= 700) {
        var input = document.getElementById("input");
        var output = document.getElementById("output");
        var code = document.getElementById("code");
        var inputTitle = document.getElementById("inputTitle");
        var outputTitle = document.getElementById("outputTitle");
        var codeTitle = document.getElementById("codeTitle");
        var renderBox = document.getElementById("renderBox");


        input.style.display = "none";
        output.style.display = "none";
        code.style.display = "grid";
        inputTitle.className = "inputTitleInactive";
        outputTitle.className = "outputTitle";
        codeTitle.className = "codeTitle";
        renderBox.style.gridTemplateColumns = "auto";
        renderBox.style.gridTemplateAreas = '"code"';
    }
    else if (window.innerWidth > 700) {
        showAll();
    } 
}

function showAll() {
    var input = document.getElementById("input");
    var output = document.getElementById("output");
    var code = document.getElementById("code");
    var inputTitle = document.getElementById("inputTitle");
    var outputTitle = document.getElementById("outputTitle");
    var codeTitle = document.getElementById("codeTitle");
    var renderBox = document.getElementById("renderBox");

    input.style.display = "grid";
    output.style.display = "grid";
    code.style.display = "grid";
    inputTitle.className = "inputTitle";
    outputTitle.className = "outputTitle";
    codeTitle.className = "codeTitle";
    renderBox.style.gridTemplateColumns = "auto 1fr auto";
    renderBox.style.gridTemplateAreas = ' "input output code" ';
}

function customize(e) {
    if (e.key == "Enter") {
        changeColor();
    }
}

function increase(id) {
    var oldCol, oldRow;
    var colEl = document.getElementById("col");
    var rowEl = document.getElementById("row");
    if (id=="colUp" && colEl.value=="" && rowEl.value=="") {
        oldCol = 1;
        colEl.value = oldCol;
    }
    else if (id=="colUp" && colEl.value=="" && rowEl.value!="") {
        oldCol = 1;
        colEl.value = oldCol;
        oldRow = parseInt(rowEl.value);
        document.getElementById("col").value = oldCol;
        document.getElementById("row").value = oldRow;
        clearText();
        render();
    }
    else if (id=="colUp" && colEl.value!="") 
    {        
        oldCol = parseInt(colEl.value);
        oldRow = parseInt(rowEl.value);
        if (isNaN(oldRow) || ((oldCol+1)*(oldRow+1)<=52)) {
            oldCol++;
            document.getElementById("col").value = oldCol;
            clearText();
            render();
        }
    }
    if (id=="rowUp" && rowEl.value=="" && colEl.value=="") {
        oldRow = 1;
        rowEl.value = oldRow;
    }
    else if (id=="rowUp" && rowEl.value=="" && colEl.value!="") {
        oldRow = 1;
        oldCol = parseInt(colEl.value);
        document.getElementById("col").value = oldCol;
        document.getElementById("row").value = oldRow;
        clearText();
        render();
    }
    else if (id=="rowUp" && rowEl.value!="") 
    {        
        oldCol = parseInt(colEl.value);
        oldRow = parseInt(rowEl.value);
        if (isNaN(oldCol) || ((oldCol+1)*(oldRow+1)<=52)) {
            oldRow++;
            document.getElementById("row").value = oldRow;
            clearText();
            render();
        }
    }
}

function decrease(id) {
    var oldCol, oldRow;
    var colEl = document.getElementById("col");
    var rowEl = document.getElementById("row");
    if (id=="colDown" && colEl.value!="") 
    {        
        oldCol = parseInt(colEl.value);
        if (id=="colDown" && oldCol>1 && oldCol!=NaN) 
        {
            oldCol--;
            document.getElementById("col").value = oldCol;
            clearText();
            render();
        }
    }
    if (id=="rowDown" && rowEl.value!="") 
    {        
        oldRow = parseInt(rowEl.value);
        if (id=="rowDown" && oldRow>1 && oldRow!=NaN) 
        {
            oldRow--;
            document.getElementById("row").value = oldRow;
            clearText();
            render();
        }
    }
}


function render() {
    styles = {};
    col = parseInt(document.getElementById("col").value);
    row = parseInt(document.getElementById("row").value);
    uniqueDivs = uniqueDivsFun().length;
    alphabet = uniqueDivsFun();
    var renderDiv = get("container");
    renderDiv.innerHTML = "";
    htmlDivs = "";
    for(var i=0; i<uniqueDivs; i++) {
        var content = createDiv(alphabet[i]);
        htmlDivs += content;
    }   
    renderDiv.innerHTML = htmlDivs;
    for(var i=0; i<uniqueDivs; i++) {
        var attributes = {};
        for(var j=0; j<styleType.length; j++) {
            if (j==0) {
                attributes[styleType[j]] = alphabet[i];
            }
            else if (j==1) {
                attributes[styleType[j]] = color[i];
            };
        }
        styles[alphabet[i]] = attributes;
    } 
    setStyle();
    fillOptions();
    renderHTML();
    renderStyle();

    if (window.innerWidth > 700) {
        showAll();
    }
}


function setStyle() {
    var gridArea = setGridArea(rows);
    var renderStyleTag = get("renderStyleTag");
    var content = "div.container\n{\n    display: grid;\n    grid-template-columns: auto;\n    grid-template-rows: auto;    \n    " + gridArea + "}\n";
    var fullContent = content + divStyle();
    style = fullContent;
    renderStyleTag.innerHTML = fullContent;
}


function divStyle() {
    var start = "\ndiv.";
    var middle = "\n{\n    ";
    var end = "\n}\n";
    var divStyles = "";
    for (let key in styles) {
        var attribute = styles[key];
        var attributes = "";
        for (let key2 in attribute) { 
            var styleDiv = setAttribute(key2, attribute[key2]);
            if (key2=="background-color") {
                attributes += styleDiv;
            }
            else {
                attributes += styleDiv + "\n    ";
            }
        }        
        var content = start + key + middle + attributes + end;
        divStyles += content;
    }
    
    return divStyles;
}


function setGridRows() {
    var renderGridArea = get("renderGridArea");
    var count = 0;
    rows = "";

    for(var i=0; i<row; i++) {
        var newLine = "\n";
        var rowLine = "";
        for(var j=0; j<col; j++) {
            if (j+1!= col) {
            rowLine += letter[count] + " ";
            }
            else {rowLine += letter[count]; }
            count++
        } 
        rowLine += "";
        rowText[i] = rowLine;
    } 

    for (var i=0; i<row; i++) {
        if (i==0) {
            rows = "" + rowText[i]; 
        }
        else {rows += newLine + rowText[i]}
         
    }

    renderGridArea.value = rows;
}

function setGridArea(rows) {
    var startGridArea = "grid-template-areas:\n";
    var endGridArea = "; ";
    var grid = "";
    var newRow = rows.split("\n");
    for (let line in newRow) {
        if(line!=row.length-1) {
            grid += "    " + "'" + newRow[line] + "'\n";
        }
        else {
            grid += "    " + "'" + newRow[line] + "'";
        }
    }
    var wholeGridArea = startGridArea + grid + endGridArea;
    return wholeGridArea;
}

function uniqueDivsFun() {
    var renderGridArea = get("renderGridArea");
    var uniqueDivLetters = [];
    if (renderGridArea.value=="") {
        uniqueDivLetters = [];
        var newUniqueDivs = col * row;
        setGridRows();

        for (let i = 0; i<newUniqueDivs; i++) {
            uniqueDivLetters.push(letter[i]);
        }
        
    }
    else {
        rows = renderGridArea.value;
        var bRow = rows.split("\n");
        var letters = [];
        var rowLine = "";
        for (let line in bRow) {
            rowLine = bRow[line].split(" ");
            for (let lette in rowLine) {
                letters.push(rowLine[lette]); 
            }
        }

        for (let letter in letters) {
            var uniqueLetter = letters[letter];
            var double = 0;
            var exists = false;
            for (let character in letters) {
                if (uniqueLetter == letters[character]) {                    
                    double++;
                }
            }
            if (double<2) {
                uniqueDivLetters.push(uniqueLetter);
            }
            if (double>=2) {
                for (let isin in uniqueDivLetters) {
                    if (uniqueLetter == uniqueDivLetters[isin]) {
                        exists = true;
                    }
                }
                if (exists==false) {
                    uniqueDivLetters.push(uniqueLetter);
                }
            }
            double = 0;
        }
        uniqueDivLetters.sort();
    }
    return uniqueDivLetters;
}

function clearText() {
    var renderGridArea = get("renderGridArea");
    renderGridArea.value = "";
}

function fillOptions() {
    var div = get("div");
    div.innerHTML = "";
    for (let key in alphabet) {
        var content = createTagContent("option", alphabet[key]);
        div.innerHTML += content;
    }
}

function changeColor() {
    var div = get("div").value;
    var m = styles[div];
    var oldColor = m["background-color"];
    var newColor = get("backgroundColor").value;
    if (newColor=="" || newColor=="background-color") {
        m["background-color"] = oldColor;
    }
    else {
        m["background-color"] = newColor;
    }
    setStyle();
    renderStyle();
}


function renderStyle() {
    var cssOutput = get("cssOutputArea");
    var startCss = "*\n{\n    box-sizing: border-box;\n}\n\nhtml\n{\n    height: 100%;\n}\n\nbody, .container\n{\n    min-height: 100%;\n    height: 100%;\n    margin: 0px;\n    padding: 0px;\n    border: none;\n}\n\n";
    cssOutput.innerHTML = startCss + style;
}

function renderHTML() {
    var htmlOutput = get("htmlOutputArea");
    var starthtml = "<!DOCTYPE html>\n<html lang='en'>\n<head>\n    <meta charset='utf-8'>\n    <meta name='viewport' content='width=device-width, initial-scale=1.0'>\n    <title>Grid Playground</title>\n    <link type='text/css' rel='stylesheet' href='style.css' media='all'>\n</head>\n<body class='mainContainer'>\n    <div class='container'>";
    var endhtml = "\n    </div>\n</body>\n</html>";
    var fullhtml = starthtml + "    " + htmlDivs + endhtml;
    htmlOutput.innerHTML = fullhtml;
}


function get(name) {
    var inside = document.getElementById(name);
    return inside;
}


function createTagContent(type, content) {
    var tagStart = "<";
    var tagMiddle = ">"
    var tagInner = "</";
    var tagEnd = ">";
    var tagWhole = tagStart + type + tagMiddle + content + tagInner + type + tagEnd;
    return tagWhole;
}


function createDiv(name) {
    var tagStart = "\n        <div class='";
    var tagId = "' id='";
    var tagEnd = "'></div>";
    var tagWhole = tagStart + name + tagId + name + tagEnd;
    return tagWhole;
}


function setAttribute(attribute,value) {
    var styleMiddle = ": ";
    var styleEnd = "; ";
    var styleWhole = attribute + styleMiddle + value + styleEnd;
    return styleWhole;
}


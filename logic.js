var col = 0;
var row = 0;
var uniqueDivs = 0;
var renderDiv = document.getElementById("renderBox");
var letter = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "za", "zb", "zc", "zd", "ze", "zf", "zg", "zh", "zi", "zj", "zk", "zl", "zm", "zn", "zo", "zp", "zq", "zr", "zs", "zt", "zu", "zv", "zw", "zx", "zy", "zz"];
var color = ["red", "orange", "yellow", "green", "teal", "blue", "indigo", "violet", "purple", "silver", "gray", "black", "navy", "blueviolet", "darksalmon", "brown", "chocolate", "coral", "magenta", "crimson", "darkcyan", "darkgoldenrod", "darkorchid", "forestgreen", "dodgerblue", "darkred", "gold", "darkgreen", "darkblue", "darkmagenta", "darkolivegreen", "deeppink", "deepskyblue", "lightyellow", "lightgreen", "lightblue", "palegreen", "palevioletred", "peru", "saddlebrown", "salmon", "seagreen", "skyblue", "beige", "burlywood", "chartreuse", "darkkhaki", "firebrick", "darkslateblue", "hotpink", "khaki", "lime", "royalblue", "midnightblue"];
var styleType = ["grid-area", "background-color"]
var styles = {};
var rows = "";
var customLetters = [];
var rowText = [];
var alphabet = [];

function render() {
    col = parseInt(document.getElementById("col").value);
    row = parseInt(document.getElementById("row").value);
    uniqueDivs = uniqueDivsFun().length;
    alphabet = uniqueDivsFun();
    var renderDiv = get("renderBox");
    renderDiv.innerHTML = "";
    for(var i=0; i<uniqueDivs; i++) {
        var content = createDiv(alphabet[i]);
        renderDiv.innerHTML += content;
    }   
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
    alert(JSON.stringify(styles))
    setStyle();
    //setAttribute();
    fillOptions();
}


function setStyle() {
    var gridArea = setGridArea(rows);
    var renderStyle = get("renderStyle");
    var content = "div.renderBox{    \ndisplay: grid; grid-template-columns: auto; grid-template-rows: auto; " + gridArea + "}";
    var fullContent = content + divStyle();
    renderStyle.innerHTML = fullContent;
}


function divStyle() {
    var start = "    \ndiv.";
    var middle = "{    \n";
    var end = "\n}";
    var divStyles = "";
    for (let key in styles) {
        var attribute = styles[key];
        var attributes = "";
        for (let key2 in attribute) { 
            var style = setAttribute(key2, attribute[key2]);
            attributes += style;
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
}



function setCustomAttribute() {
    var color = document.getElementById("backgroundColor").value;
    var divClass = document.getElementById("options").value;
    var divAttribute = document.getElementById("attribute").value;
    var attributes = styles[divClass];
    attributes[divAttribute] =  color;
    setStyle();
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
    var tagStart = "<div class='";
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


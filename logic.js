var col = 0;
var row = 0;
var uniqueDivs = 0;
var renderDiv = document.getElementById("renderBox");
var letter = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var color = ["red", "orange", "yellow", "green", "teal", "blue", "indigo", "violet", "purple", "silver", "gray", "black", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var styleType = ["grid-area", "background-color"]
// var values = [["a","yellow"], ["b","blue"], ["c", "green"], ["d", "red"]];
var styles = {};
var rows = "";

var rowText = [];

function itworks() {
    alert("it works!");
}

//how to fill nested objects using loops
//<style id="renderStyle">div.id{attribute1: value1; attribute2: value2;}</style>
function render() {
    col = parseInt(document.getElementById("col").value);
    row = parseInt(document.getElementById("row").value);
    uniqueDivs = uniqueDivsFun();
    //alert(uniqueDivs)
    var renderDiv = get("renderBox");
    renderDiv.innerHTML = "";
    for(var i=1; i<uniqueDivs+1; i++) {
        var content = createDiv(i);
        renderDiv.innerHTML += content;
    }   
    for(var i=1; i<uniqueDivs+1; i++) {
        var attributes = {};
        for(var j=0; j<styleType.length; j++) {
            if (j==0) {
                attributes[styleType[j]] = letter[i-1];
            }
            else if (j==1) {
                attributes[styleType[j]] = color[i-1];
            };
        }
        styles["a"+i] = attributes;
    } 
    //alert(JSON.stringify(styles));
    //setGridArea();
    setStyle();
    //setAttribute();
    fillOptions();
}


function setStyle() {
    var gridArea = gridAreas(rows);
    //alert(gridArea);
    var renderStyle = get("renderStyle");
    var content = "div.renderBox{    \ndisplay: grid; grid-template-columns: auto; grid-template-rows: auto; " + gridArea + "}";
    var fullContent = content + divStyle();
    renderStyle.innerHTML = fullContent;
    
    alert(renderStyle.innerHTML);
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



function setCustomAttribute() {
    //alert("hi");
    var color = document.getElementById("backgroundColor").value;
    var divClass = document.getElementById("options").value;
    var divAttribute = document.getElementById("attribute").value;
    var attributes = styles[divClass];
    attributes[divAttribute] =  color;
    alert(JSON.stringify(styles));
    setStyle();
}

function setGridArea() {
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
    renderGridArea.innerHTML = rows;
}

function gridAreas(rows) {
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
    //alert(renderGridArea.value);
    if (renderGridArea.value=="") {
        var newUniqueDivs = col * row;
        //alert(newUniqueDivs);
        setGridArea();
        renderGridArea.value = rows;

    }
    else {
        rows = renderGridArea.value;
        gridAreas(rows);
        var bRow = rows.split("\n");
        var uniqueDivLetters = [];
        var letters = [];
        var rowLine = "";
        for (let line in bRow) {
            rowLine = bRow[line].split(" ");
            for (let lette in rowLine) {
                letters.push(rowLine[lette]); 
            }
        }
        alert(letters);
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
        letter = uniqueDivLetters.sort();
        newUniqueDivs = uniqueDivLetters.length;
    }
    alert(newUniqueDivs)
    return newUniqueDivs;
}

function clearText() {
    var renderGridArea = get("renderGridArea");
    renderGridArea.value = "";
}

function fillOptions() {
    var div = get("div");
    var divAttribute = get("attribute");
    div.innerHTML = "";
    divAttribute.innerHTML = "";
    for (let key in styles) {
        var content = createTagContent("option", key);
        div.innerHTML += content;
    }
    for (let key in styleType) {
        content = createTagContent("option", styleType[key]);
        divAttribute.innerHTML += content;
    }
}

//create divs
//get style inner
//add to style inner

//<option disabled selected value></option>


function setHTML(name, content) {
    var value = document.getElementById(name);
    value.innerHTML = content;
}


function get(name) {
    var inside = document.getElementById(name);
    return inside;
}

function generateTags(name, color) {
    var style = createStyle(name, color);
    var div = createDiv(name);
    var whole = style + "\n" + div;
    return whole;
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
    var tagStart = "<div class='a";
    var tagId = "' id='";
    var tagEnd = "'></div>";
    var tagWhole = tagStart + name + tagId + name + tagEnd;
    return tagWhole;
}

function createStyle(name, attribute, value) {
    var tagStart = "<style type='text/css'  id='";
    var tagId = "Style'>"
    var tagStyle = setStyleTag(name, attribute, value);
    var tagEnd = "</style>";
    var tagWhole = tagStart + name + tagId + tagStyle + tagEnd;
    return tagWhole;
}


function setStyleTag(name, attribute, value) {
    var start = "div.";
    var middle = " {";
    var tagStyle = style(attribute, value);
    var end = "}"
    var styleWhole = start + name + middle + tagStyle + end;
    alert(styleWhole);
    return styleWhole;
}



//CSS Madness

function style(attribute, value) {
    var width = "100%";
    var height = "100%";
    var attributes = setAttribute(attribute, value);
    var size = setWidthHeight(width, height);
    var style = attributes + size;
    return style;
}


function setWidthHeight(width, height) {
    var widthStart = "width: ";
    var heightStart = "height: "
    var styleEnd = "; ";
    var styleWhole = widthStart + width + styleEnd + heightStart + height + styleEnd;
    return styleWhole;
}

function setAttribute(attribute,value) {
    var styleMiddle = ": ";
    var styleEnd = "; ";
    var styleWhole = attribute + styleMiddle + value + styleEnd;
    return styleWhole;
}


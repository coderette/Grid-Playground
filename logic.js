var col = 0;
var row = 0;
var uniqueDivs = 0;
var renderDiv = document.getElementById("renderBox");
var letter = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var color = ["red", "orange", "yellow", "green", "teal", "blue", "indigo", "violet", "purple", "silver", "gray", "black", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var styleType = ["background-color", "color"]
var values = [["a","yellow"], ["b","blue"], ["c", "green"], ["d", "red"]];
var styles = {};
var rows = "";





function render() {
    col = parseInt(document.getElementById("col").value);
    row = parseInt(document.getElementById("row").value);
    uniqueDivs = col * row;
    var renderDiv = get("renderBox");
    renderDiv.innerHTML = "";
    for(var i=0; i<uniqueDivs; i++) {
        var content = createDiv(letter[i]);
        renderDiv.innerHTML += content;
    }   
    for(var i=0; i<uniqueDivs; i++) {
        var attributes = {};
        attributes["background-color"] = color[i];
        styles[letter[i]] = attributes;
    } 
    
    setGridArea();
    setStyle();
    fillOptions();
}


function setStyle() {
    var renderGridArea = get("renderGridArea").value;
    alert(renderGridArea);
    var renderStyle = get("renderStyle");
    renderStyle.innerHTML = "div.renderBox{display: grid; grid-template-columns: auto; grid-template-rows: auto" + renderGridArea + "}";
    for (let key in styles) {
        var attribute = styles[key];
        for (let key2 in attribute) {
            var style = setStyleTag(key, key2, attribute[key2]);
            renderStyle.innerHTML += style;
        }
    }
}


function setAttribute() {
    
    alert("hi");
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
        var rowLine = "'";
        for(var j=0; j<col; j++) {
            rowLine += letter[count] + " ";
            count++
        } 
        rowLine += "'";
        rows += rowLine + "\n";
    } 
    renderGridArea.innerHTML = gridAreas(rows);
}

function gridAreas(rows) {
    var startGridArea = "grid-template-areas:\n    ";
    var endGridArea = "; ";
    var wholeGridArea = startGridArea + rows + endGridArea;
    return wholeGridArea;
}

function fillOptions() {
    var div = get("div");
    var divAttribute = get("attribute");
    div.innerHTML = "";
    for (let key in styles) {
    }
    for (let key in styles) {
        var attribute = styles[key];
        for (let key2 in attribute) {
            var content = createTagContent("option", key);
            div.innerHTML += content;
            
            content = createTagContent("option", key2);
            divAttribute.innerHTML = content;
        }
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
    var tagStart = "<div class='";
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


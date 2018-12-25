function Render() {
    var columns = document.getElementById("columns").value;
    var rows = document.getElementById("rows").value;
    var bcolor = document.getElementById("bcolor").value;
    var output = document.getElementById("output");
    var cssStart = "* {\n    box-sizing: border-box;\n}\n\nhtml {\n    height: 100%;\n}\n\nbody {\n    min-height: 100%;\n    height: 100%;\n    margin: 0px;\n    padding: 0px;\n    border: none;\n}\n"
    var start = "\n.container {\n    display: grid;\n"; 
    var columnStart = "    grid-template-rows: repeat ("; 
    var columnEnd = ", 1fr);\n";
    var rowStart = "    grid-template-rows: repeat ("; 
    var rowEnd = ", 1fr);\n";
    var gridareaStart = "    grid-template-areas:\n";
    var gridareaEnd = "    ;\n";
    var bcolorStart = "    background-color: "; 
    var bcolorEnd = ";\n";
    var end = "}\n";
    var divId1 = "a";
    var bcolor1 = document.getElementById("bcolor1").value;
    var divClass = "\n." + divId1 + " {\n    background-color: " + bcolor1 + ";\n}\n";
    var abc = "a b c d e f g h i j k l m n o p q r s t u v w x y z";
    var gridAreas = document.getElementById("areas");
    var uniqueDivs = parseInt(columns) * parseInt(rows);
    var spaces = uniqueDivs - 1;
    var length = uniqueDivs + spaces;
    var grid = "";



    grid = abc.substring(0, length)

    gridAreas.value = grid;


        
    content = cssStart + start + columnStart + columns + columnEnd + 
    rowStart + rows + rowEnd + gridareaStart + "    '" + divId1 + "'" + gridareaEnd +
    bcolorStart + bcolor + bcolorEnd + end + divClass

    output.value = content;


    var divStart = "<div style='background-color: ";
    var divMiddle = ";' class='";
    var divEnd = "><div>";
    var divs = divStart + divMiddle + divId1 + divEnd;
    var style = "<div style='width:100%; height:100%; background-color: " + bcolor + ";'>" + divs + "</div>";
    document.getElementById("previewBox").innerHTML = style;
}
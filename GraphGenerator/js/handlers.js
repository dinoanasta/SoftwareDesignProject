"use strict";

/**
 * This function is called in init() to set up mouse event handling
 * on the canvas.  You can modify the nested functions doMouseDown,
 * doMouseDrag, and possibly doMouseUp to change the reponse to
 * mouse events.  As an example, this program does some simple drawing.
 */
function installMouseHandler() {

    var dragging = false;  // set to true when a drag action is in progress.

    function doMouseDown(evt) {
        // This function is called when the user presses a button on the mouse.
        // Only the main mouse button will start a drag.
        if (dragging) {
            return;  // if a drag is in progress, don't start another.
        }

        if (evt.button != 0) {
            return;  // don't respond unless the button is the main (left) mouse button.
        }

        var r = canvas.getBoundingClientRect();
        var x = Math.round(evt.clientX - r.left);  // translate mouse position from screen coords to canvas coords.
        var y = Math.round(evt.clientY - r.top);   // round to integer values; some browsers would give non-integers.
        dragging = true;  // (this won't be the case for all mousedowns in all programs)

        if (dragging) {
            document.addEventListener("mousemove", doMouseMove, false);
            document.addEventListener("mouseup", doMouseUp, false);
        }

        //TO DO WHEN MOUSE IS PRESSED
        function euclideanDistance(point1, point2) {
            let xdiff = Math.pow((point1[0] - point2[0]), 2);
            let ydiff = Math.pow((point1[1] - point2[1]), 2);

            return Math.sqrt(xdiff + ydiff);
        }

        function getVertexIndex(graph) {
            for (let i = 0; i < graph.getNumberVertices(); ++i) {
                let dist = euclideanDistance([x, y], [graph.getVertex(i).getXVal(), graph.getVertex(i).getYVal()]);
                if (dist <= vertexRadius) {
                    return i;
                }
            }
            return -1;
        }

        if(userType == "student"){
            clickedVertexIndex = getVertexIndex(answerGraph);
            selectedVertex =  answerGraph.getVertex(clickedVertexIndex);
        }else if (userType == "lecturer"){
            clickedVertexIndex = getVertexIndex(graph);
            selectedVertex =  graph.getVertex(clickedVertexIndex);
        }

        graphics.strokeStyle = "red";
        graphics.lineWidth = 2;

        redraw();

        if(clickedVertexIndex != -1){
            graphics.strokePoly(selectedVertex.getXVal()-vertexRadius-space, selectedVertex.getYVal()-vertexRadius-space,
                selectedVertex.getXVal()+vertexRadius+space, selectedVertex.getYVal()-vertexRadius-space,
                selectedVertex.getXVal()+vertexRadius+space, selectedVertex.getYVal()+vertexRadius+space,
                selectedVertex.getXVal()-vertexRadius-space, selectedVertex.getYVal()+vertexRadius+space
            );

            // document.getElementById("editVertexDD").textContent = selectedVertex.getVertexVal();

            if(userType=="student"){
                if(document.getElementById("studentDiv").contains(document.getElementById("editvertexValueLabel"))){
                    document.getElementById("editvertexValueLabel").innerHTML = "Value: " + answerGraph.getVertex(clickedVertexIndex).getVertexVal();
                }
                if(document.getElementById("studentDiv").contains(document.getElementById("editvertexColor"))) {
                    document.getElementById("editvertexColor").value = selectedVertex.getColor();
                }
                if(document.getElementById("studentDiv").contains(document.getElementById("editRootDiv"))) {
                    document.getElementById("setRootDD").selectedIndex = clickedVertexIndex+1;
                }
            }else if (userType=="lecturer"){
                document.getElementById("editvertexValue").value = selectedVertex.getVertexVal();
                document.getElementById("editvertexColor").value = selectedVertex.getColor();
                document.getElementById("setRootDD").selectedIndex = clickedVertexIndex+1;
            }

        }else{
            if(userType=="student"){

                if(document.getElementById("studentDiv").contains(document.getElementById("editvertexValueLabel"))){
                    document.getElementById("editvertexValueLabel").innerHTML = "Value: ";
                }
                if(document.getElementById("studentDiv").contains(document.getElementById("editvertexColor"))) {
                    document.getElementById("editvertexColor").value = "";
                }
                if(document.getElementById("studentDiv").contains(document.getElementById("editRootDiv"))) {
                    document.getElementById("setRootDD").selectedIndex = 0;
                }
            }else if (userType=="lecturer"){
                document.getElementById("editvertexValue").value = "";
                document.getElementById("editvertexColor").value = "";
                document.getElementById("setRootDD").selectedIndex = 0;
            }

            redraw();

        }

    }

    function doMouseMove(evt) {
        // This function is called when the user moves the mouse during a drag.
        if (!dragging) {
            return;  // (shouldn't be possible)
        }

        var r = canvas.getBoundingClientRect();
        var x = Math.round(evt.clientX - r.left);
        var y = Math.round(evt.clientY - r.top);

        if(x>10 && x<X_RIGHT-10 && y>10 && y<Y_BOTTOM-10){
            if(clickedVertexIndex != -1){
                if(userType=="student"){
                    answerGraph.updateXandYVal(selectedVertex, x, y);
                }else if (userType=="lecturer"){
                    graph.updateXandYVal(selectedVertex, x, y);
                }
                redraw();
                graphics.strokePoly(selectedVertex.getXVal()-vertexRadius-space, selectedVertex.getYVal()-vertexRadius-space,
                    selectedVertex.getXVal()+vertexRadius+space, selectedVertex.getYVal()-vertexRadius-space,
                    selectedVertex.getXVal()+vertexRadius+space, selectedVertex.getYVal()+vertexRadius+space,
                    selectedVertex.getXVal()-vertexRadius-space, selectedVertex.getYVal()+vertexRadius+space
                );
            }
        }

    }

    function doMouseUp(evt) {
        // This function is called when the user releases a mouse button during a drag.
        if (!dragging) {
            return;  // (shouldn't be possible)
        }
        dragging = false;
        document.removeEventListener("mousemove", doMouseMove, false);
        document.removeEventListener("mouseup", doMouseMove, false);
    }
    canvas.addEventListener("mousedown", doMouseDown, false);
}

function handleKeyDown(event) {
    if(userType=="lecturer"){
        let keyCode = event.keyCode;
        switch (keyCode) {
            case 46: //Delete
                graph.removeVertex(selectedVertex.getVertexID());
                populateDropDowns();
                redraw();
        }
    }
}

function addGraphicsContextExtras(graphics) {
    graphics.strokeLine = function (x1, y1, x2, y2) {
        this.beginPath();
        this.moveTo(x1, y1);
        this.lineTo(x2, y2);
        this.stroke();
    }
    graphics.fillCircle = function (x, y, r) {
        this.beginPath();
        this.arc(x, y, r, 0, 2 * Math.PI, false);
        this.fill();
    }
    graphics.strokeCircle = function (x, y, radius) {
        this.beginPath();
        this.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.stroke();
    }
    graphics.fillPoly = function() {
        if (arguments.length < 6)
            return;
        this.beginPath();
        this.moveTo(arguments[0],arguments[1]);
        for (var i = 2; i+1 < arguments.length; i = i + 2) {
            this.lineTo(arguments[i],arguments[i+1]);
        }
        this.closePath();
        this.fill();
    }
    graphics.strokePoly = function() {
        if (arguments.length < 4)
            return;
        this.beginPath();
        this.moveTo(arguments[0],arguments[1]);
        for (var i = 2; i+1 < arguments.length; i = i + 2) {
            this.lineTo(arguments[i],arguments[i+1]);
        }
        this.closePath();
        this.stroke();
    }
}

function applyLimits(g, xleft, xright, ytop, ybottom, preserveAspect) {
    const width = canvas.width;   // The width of this drawing area, in pixels.
    const height = canvas.height; // The height of this drawing area, in pixels.
    if (preserveAspect) {
        // Adjust the limits to match the aspect ratio of the drawing area.
        const displayAspect = Math.abs(height / width);
        const requestedAspect = Math.abs((ybottom - ytop) / (xright - xleft));
        let excess;
        if (displayAspect > requestedAspect) {
            excess = (ybottom - ytop) * (displayAspect / requestedAspect - 1);
            ybottom += excess / 2;
            ytop -= excess / 2;
        } else if (displayAspect < requestedAspect) {
            excess = (xright - xleft) * (requestedAspect / displayAspect - 1);
            xright += excess / 2;
            xleft -= excess / 2;
        }
    }
    const pixelWidth = Math.abs((xright - xleft) / width);
    const pixelHeight = Math.abs((ybottom - ytop) / height);
    pixelSize = Math.min(pixelWidth, pixelHeight);
    g.scale(width / (xright - xleft), height / (ybottom - ytop));
    g.translate(-xleft, -ytop);
}





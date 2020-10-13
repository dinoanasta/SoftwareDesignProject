"use strict";

/**
 * This function is called in init() to set up mouse event handling
 * on the canvas.  You can modify the nested functions doMouseDown,
 * doMouseDrag, and possibly doMouseUp to change the reponse to
 * mouse events.  As an example, this program does some simple drawing.
 */

//////ADDED THIS LINE OF CODE TO DINOBRANCH


function installMouseHandler() {

    var dragging = false;  // set to true when a drag action is in progress.
    var creatingEdge = false;
    var startingVertex = null;
    var endingVertex = null;

    //TO DO WHEN MOUSE IS PRESSED
    function euclideanDistance(point1, point2) {
        let xdiff = Math.pow((point1[0] - point2[0]), 2);
        let ydiff = Math.pow((point1[1] - point2[1]), 2);

        return Math.sqrt(xdiff + ydiff);
    }

    function getVertexIndex(graph, x, y) {
        for (let i = 0; i < graph.getNumberVertices(); ++i) {
            let dist = euclideanDistance([x, y], [graph.getVertex(i).getXVal(), graph.getVertex(i).getYVal()]);
            if (dist <= vertexRadius) {
                return i;
            }
        }
        return -1;
    }


    function doMouseDown(evt) {
        // This function is called when the user presses a button on the mouse.
        // Only the main mouse button will start a drag.
        if (dragging) {
            return;  // if a drag is in progress, don't start another.
        }

        var r = canvas.getBoundingClientRect();
        var x = Math.round(evt.clientX - r.left);  // translate mouse position from screen coords to canvas coords.
        var y = Math.round(evt.clientY - r.top);   // round to integer values; some browsers would give non-integers.

        if (evt.button == 0) { //LEFT BUTTON
            dragging = true;  // (this won't be the case for all mousedowns in all programs)
            creatingEdge = false;

            if (dragging) {
                document.addEventListener("mousemove", doMouseMove, false);
                document.addEventListener("mouseup", doMouseUp, false);
            }

            if (userType == "student") {
                clickedVertexIndex = getVertexIndex(answerGraph,x,y)
                selectedVertex = answerGraph.getVertex(clickedVertexIndex);
            } else if (userType == "lecturer" || userType == "freeform") {
                clickedVertexIndex = getVertexIndex(graph,x,y);
                selectedVertex = graph.getVertex(clickedVertexIndex);
            }

            graphics.strokeStyle = "red";
            graphics.lineWidth = 2;

            selectedEdge = null;

            redraw();

            if (clickedVertexIndex != -1) {
                graphics.strokePoly(selectedVertex.getXVal() - vertexRadius - space, selectedVertex.getYVal() - vertexRadius - space,
                    selectedVertex.getXVal() + vertexRadius + space, selectedVertex.getYVal() - vertexRadius - space,
                    selectedVertex.getXVal() + vertexRadius + space, selectedVertex.getYVal() + vertexRadius + space,
                    selectedVertex.getXVal() - vertexRadius - space, selectedVertex.getYVal() + vertexRadius + space
                );

                // document.getElementById("editVertexDD").textContent = selectedVertex.getVertexVal();

                if (userType == "student") {
                    if (document.getElementById("studentDiv").contains(document.getElementById("editvertexValueLabel"))) {
                        document.getElementById("editvertexValueLabel").innerHTML = "Value: " + answerGraph.getVertex(clickedVertexIndex).getVertexVal();
                    }
                    if (document.getElementById("studentDiv").contains(document.getElementById("editvertexColor"))) {
                        document.getElementById("editvertexColor").value = selectedVertex.getColor();
                    }
                    if (document.getElementById("studentDiv").contains(document.getElementById("editRootDiv"))) {
                        document.getElementById("setRootDD").selectedIndex = clickedVertexIndex + 1;
                    }
                } else if (userType == "lecturer") {
                    document.getElementById("editVertexValue").value = selectedVertex.getVertexVal();
                    if(lecturerDiv.contains(document.getElementById("editVertexColor"))){
                        document.getElementById("editVertexColor").value = selectedVertex.getColor();
                    }
                    if(lecturerDiv.contains(document.getElementById("setRootDD"))){
                        document.getElementById("setRootDD").selectedIndex = clickedVertexIndex + 1;
                    }
                    document.getElementById("editVertexDD").selectedIndex = clickedVertexIndex + 1;
                    document.getElementById("deleteVertexDD").selectedIndex = clickedVertexIndex + 1;
                } else if (userType == "freeform") {
                    document.getElementById("editVertexValue").value = selectedVertex.getVertexVal();
                    if(freeformDiv.contains(document.getElementById("editVertexColor"))){
                        document.getElementById("editVertexColor").value = selectedVertex.getColor();
                    }
                    if(freeformDiv.contains(document.getElementById("setRootDD"))){
                        document.getElementById("setRootDD").selectedIndex = clickedVertexIndex + 1;
                    }
                    document.getElementById("editVertexDD").selectedIndex = clickedVertexIndex + 1;
                    document.getElementById("deleteVertexDD").selectedIndex = clickedVertexIndex + 1;
                }
            } else {
                if (userType == "student" && questionType != "graphcolouring") {

                    if (document.getElementById("studentDiv").contains(document.getElementById("editvertexValueLabel"))) {
                        document.getElementById("editvertexValueLabel").innerHTML = "Value: ";
                    }
                    if (document.getElementById("studentDiv").contains(document.getElementById("editvertexColor"))) {
                        document.getElementById("editvertexColor").value = "";
                    }
                    if (document.getElementById("studentDiv").contains(document.getElementById("editRootDiv"))) {
                        document.getElementById("setRootDD").selectedIndex = 0;
                    }

                    for (let i = 0; i < answerGraph.getEdges().length; ++i) {
                        let thisEdge = answerGraph.getEdges()[i];

                        let xdist = Math.abs(thisEdge.getVertexOne().getXVal() - thisEdge.getVertexTwo().getXVal());
                        let ydist = Math.abs(thisEdge.getVertexOne().getYVal() - thisEdge.getVertexTwo().getYVal());

                        if (xdist < ydist) {
                            if (isPointInPoly([[thisEdge.getVertexOne().getXVal() + vertexRadius - 2, thisEdge.getVertexOne().getYVal()], [thisEdge.getVertexOne().getXVal() - vertexRadius + 2, thisEdge.getVertexOne().getYVal()], [thisEdge.getVertexTwo().getXVal() - vertexRadius + 2, thisEdge.getVertexTwo().getYVal()], [thisEdge.getVertexTwo().getXVal() + vertexRadius - 2, thisEdge.getVertexTwo().getYVal()]], { x: x, y: y })) {
                                selectedEdge = thisEdge;
                                let index = findEdgeIndex(answerGraph.getEdges(), selectedEdge.getVertexOne().getVertexID(), selectedEdge.getVertexTwo().getVertexID());
                                if (document.getElementById("studentDiv").contains(document.getElementById("deleteEdgeDD"))) {
                                    document.getElementById("deleteEdgeDD").selectedIndex = index+1;
                                }
                            };
                        } else if (ydist < xdist) {
                            if (isPointInPoly([[thisEdge.getVertexOne().getXVal(), thisEdge.getVertexOne().getYVal() + vertexRadius - 2], [thisEdge.getVertexOne().getXVal(), thisEdge.getVertexOne().getYVal() - vertexRadius + 2], [thisEdge.getVertexTwo().getXVal(), thisEdge.getVertexTwo().getYVal() - vertexRadius + 2], [thisEdge.getVertexTwo().getXVal(), thisEdge.getVertexTwo().getYVal() + vertexRadius - 2]], { x: x, y: y })) {
                                selectedEdge = thisEdge;
                                let index = findEdgeIndex(answerGraph.getEdges(), selectedEdge.getVertexOne().getVertexID(), selectedEdge.getVertexTwo().getVertexID());
                                if (document.getElementById("studentDiv").contains(document.getElementById("deleteEdgeDD"))) {
                                    document.getElementById("deleteEdgeDD").selectedIndex = index+1;
                                }
                            };
                        }


                    }

                    for (let i = 0; i < answerGraph.getDirectedEdges().length; ++i) {
                        let thisEdge = answerGraph.getDirectedEdges()[i];

                        let xdist = Math.abs(thisEdge.getVertexOne().getXVal() - thisEdge.getVertexTwo().getXVal());
                        let ydist = Math.abs(thisEdge.getVertexOne().getYVal() - thisEdge.getVertexTwo().getYVal());

                        if (xdist < ydist) {
                            if (isPointInPoly([[thisEdge.getVertexOne().getXVal() + vertexRadius - 2, thisEdge.getVertexOne().getYVal()], [thisEdge.getVertexOne().getXVal() - vertexRadius + 2, thisEdge.getVertexOne().getYVal()], [thisEdge.getVertexTwo().getXVal() - vertexRadius + 2, thisEdge.getVertexTwo().getYVal()], [thisEdge.getVertexTwo().getXVal() + vertexRadius - 2, thisEdge.getVertexTwo().getYVal()]], { x: x, y: y })) {
                                selectedEdge = thisEdge;
                                let index = findEdgeIndex(answerGraph.getDirectedEdges(), selectedEdge.getVertexOne().getVertexID(), selectedEdge.getVertexTwo().getVertexID());
                                if (document.getElementById("studentDiv").contains(document.getElementById("deleteEdgeDD"))) {
                                    document.getElementById("deleteEdgeDD").selectedIndex = index+1;
                                }
                            };
                        } else if (ydist < xdist) {
                            if (isPointInPoly([[thisEdge.getVertexOne().getXVal(), thisEdge.getVertexOne().getYVal() + vertexRadius - 2], [thisEdge.getVertexOne().getXVal(), thisEdge.getVertexOne().getYVal() - vertexRadius + 2], [thisEdge.getVertexTwo().getXVal(), thisEdge.getVertexTwo().getYVal() - vertexRadius + 2], [thisEdge.getVertexTwo().getXVal(), thisEdge.getVertexTwo().getYVal() + vertexRadius - 2]], { x: x, y: y })) {
                                selectedEdge = thisEdge;
                                let index = findEdgeIndex(answerGraph.getDirectedEdges(), selectedEdge.getVertexOne().getVertexID(), selectedEdge.getVertexTwo().getVertexID());
                                if (document.getElementById("studentDiv").contains(document.getElementById("deleteEdgeDD"))) {
                                    document.getElementById("deleteEdgeDD").selectedIndex = index+1;
                                }
                            };
                        }
                    }


                } else if (userType == "lecturer") {
                    if (document.getElementById("lecturerDiv").contains(document.getElementById("editvertexValue"))) {
                        document.getElementById("editvertexValue").value = "";
                    }
                    if (document.getElementById("lecturerDiv").contains(document.getElementById("editvertexColor"))) {
                        document.getElementById("editvertexColor").value = "";
                    }
                    if (document.getElementById("lecturerDiv").contains(document.getElementById("setRootDD"))) {
                        document.getElementById("setRootDD").selectedIndex = 0;
                    }

                    for (let i = 0; i < graph.getEdges().length; ++i) {
                        let thisEdge = graph.getEdges()[i];

                        let xdist = Math.abs(thisEdge.getVertexOne().getXVal() - thisEdge.getVertexTwo().getXVal());
                        let ydist = Math.abs(thisEdge.getVertexOne().getYVal() - thisEdge.getVertexTwo().getYVal());

                        if (xdist < ydist) {
                            if (isPointInPoly([[thisEdge.getVertexOne().getXVal() + vertexRadius - 2, thisEdge.getVertexOne().getYVal()], [thisEdge.getVertexOne().getXVal() - vertexRadius + 2, thisEdge.getVertexOne().getYVal()], [thisEdge.getVertexTwo().getXVal() - vertexRadius + 2, thisEdge.getVertexTwo().getYVal()], [thisEdge.getVertexTwo().getXVal() + vertexRadius - 2, thisEdge.getVertexTwo().getYVal()]], { x: x, y: y })) {
                                selectedEdge = thisEdge;
                                let index = findEdgeIndex(graph.getEdges(), selectedEdge.getVertexOne().getVertexID(), selectedEdge.getVertexTwo().getVertexID());
                                if (document.getElementById("lecturerDiv").contains(document.getElementById("deleteEdgeDD"))) {
                                    document.getElementById("deleteEdgeDD").selectedIndex = index+1;
                                }
                                if (document.getElementById("lecturerDiv").contains(document.getElementById("updateEdgeDD"))) {
                                    document.getElementById("updateEdgeDD").selectedIndex = index+1;
                                }
                                if (document.getElementById("lecturerDiv").contains(document.getElementById("editWeight"))) {
                                    document.getElementById("editWeight").value = selectedEdge.getWeightEdge();
                                }

                            };
                        } else if (ydist < xdist) {
                            if (isPointInPoly([[thisEdge.getVertexOne().getXVal(), thisEdge.getVertexOne().getYVal() + vertexRadius - 2], [thisEdge.getVertexOne().getXVal(), thisEdge.getVertexOne().getYVal() - vertexRadius + 2], [thisEdge.getVertexTwo().getXVal(), thisEdge.getVertexTwo().getYVal() - vertexRadius + 2], [thisEdge.getVertexTwo().getXVal(), thisEdge.getVertexTwo().getYVal() + vertexRadius - 2]], { x: x, y: y })) {
                                selectedEdge = thisEdge;
                                let index = findEdgeIndex(graph.getEdges(), selectedEdge.getVertexOne().getVertexID(), selectedEdge.getVertexTwo().getVertexID());
                                if (document.getElementById("lecturerDiv").contains(document.getElementById("deleteEdgeDD"))) {
                                    document.getElementById("deleteEdgeDD").selectedIndex = index+1;
                                }
                                if (document.getElementById("lecturerDiv").contains(document.getElementById("updateEdgeDD"))) {
                                    document.getElementById("updateEdgeDD").selectedIndex = index+1;
                                }
                                if (document.getElementById("lecturerDiv").contains(document.getElementById("editWeight"))) {
                                    document.getElementById("editWeight").value = selectedEdge.getWeightEdge();
                                }
                            };
                        }
                    }

                    for (let i = 0; i < graph.getDirectedEdges().length; ++i) {
                        let thisEdge = graph.getDirectedEdges()[i];

                        let xdist = Math.abs(thisEdge.getVertexOne().getXVal() - thisEdge.getVertexTwo().getXVal());
                        let ydist = Math.abs(thisEdge.getVertexOne().getYVal() - thisEdge.getVertexTwo().getYVal());

                        if (xdist < ydist) {
                            if (isPointInPoly([[thisEdge.getVertexOne().getXVal() + vertexRadius - 2, thisEdge.getVertexOne().getYVal()], [thisEdge.getVertexOne().getXVal() - vertexRadius + 2, thisEdge.getVertexOne().getYVal()], [thisEdge.getVertexTwo().getXVal() - vertexRadius + 2, thisEdge.getVertexTwo().getYVal()], [thisEdge.getVertexTwo().getXVal() + vertexRadius - 2, thisEdge.getVertexTwo().getYVal()]], { x: x, y: y })) {
                                selectedEdge = thisEdge;
                                let index = findEdgeIndex(graph.getDirectedEdges(), selectedEdge.getVertexOne().getVertexID(), selectedEdge.getVertexTwo().getVertexID());
                                if (document.getElementById("lecturerDiv").contains(document.getElementById("deleteEdgeDD"))) {
                                    document.getElementById("deleteEdgeDD").selectedIndex = index+1;
                                }
                                if (document.getElementById("lecturerDiv").contains(document.getElementById("updateEdgeDD"))) {
                                    document.getElementById("updateEdgeDD").selectedIndex = index+1;
                                }
                                if (document.getElementById("lecturerDiv").contains(document.getElementById("editWeight"))) {
                                    document.getElementById("editWeight").value = selectedEdge.getWeightEdge();
                                }
                            };
                        } else if (ydist < xdist) {
                            if (isPointInPoly([[thisEdge.getVertexOne().getXVal(), thisEdge.getVertexOne().getYVal() + vertexRadius - 2], [thisEdge.getVertexOne().getXVal(), thisEdge.getVertexOne().getYVal() - vertexRadius + 2], [thisEdge.getVertexTwo().getXVal(), thisEdge.getVertexTwo().getYVal() - vertexRadius + 2], [thisEdge.getVertexTwo().getXVal(), thisEdge.getVertexTwo().getYVal() + vertexRadius - 2]], { x: x, y: y })) {
                                selectedEdge = thisEdge;
                                let index = findEdgeIndex(graph.getDirectedEdges(), selectedEdge.getVertexOne().getVertexID(), selectedEdge.getVertexTwo().getVertexID());
                                if (document.getElementById("lecturerDiv").contains(document.getElementById("deleteEdgeDD"))) {
                                    document.getElementById("deleteEdgeDD").selectedIndex = index+1;
                                }
                                if (document.getElementById("lecturerDiv").contains(document.getElementById("updateEdgeDD"))) {
                                    document.getElementById("updateEdgeDD").selectedIndex = index+1;
                                }
                                if (document.getElementById("lecturerDiv").contains(document.getElementById("editWeight"))) {
                                    document.getElementById("editWeight").value = selectedEdge.getWeightEdge();
                                }
                            };
                        }
                    }
                } else if (userType == "freeform") {
                    if (document.getElementById("freeformDiv").contains(document.getElementById("editvertexValue"))) {
                        document.getElementById("editvertexValue").value = "";
                    }
                    if (document.getElementById("freeformDiv").contains(document.getElementById("editvertexColor"))) {
                        document.getElementById("editvertexColor").value = "";
                    }
                    if (document.getElementById("freeformDiv").contains(document.getElementById("setRootDD"))) {
                        document.getElementById("setRootDD").selectedIndex = 0;
                    }

                    for (let i = 0; i < graph.getEdges().length; ++i) {
                        let thisEdge = graph.getEdges()[i];

                        let xdist = Math.abs(thisEdge.getVertexOne().getXVal() - thisEdge.getVertexTwo().getXVal());
                        let ydist = Math.abs(thisEdge.getVertexOne().getYVal() - thisEdge.getVertexTwo().getYVal());

                        if (xdist < ydist) {
                            if (isPointInPoly([[thisEdge.getVertexOne().getXVal() + vertexRadius - 2, thisEdge.getVertexOne().getYVal()], [thisEdge.getVertexOne().getXVal() - vertexRadius + 2, thisEdge.getVertexOne().getYVal()], [thisEdge.getVertexTwo().getXVal() - vertexRadius + 2, thisEdge.getVertexTwo().getYVal()], [thisEdge.getVertexTwo().getXVal() + vertexRadius - 2, thisEdge.getVertexTwo().getYVal()]], { x: x, y: y })) {
                                selectedEdge = thisEdge;
                                let index = findEdgeIndex(graph.getEdges(), selectedEdge.getVertexOne().getVertexID(), selectedEdge.getVertexTwo().getVertexID());
                                if (document.getElementById("freeformDiv").contains(document.getElementById("deleteEdgeDD"))) {
                                    document.getElementById("deleteEdgeDD").selectedIndex = index+1;
                                }
                                if (document.getElementById("freeformDiv").contains(document.getElementById("updateEdgeDD"))) {
                                    document.getElementById("updateEdgeDD").selectedIndex = index+1;
                                }
                                if (document.getElementById("freeformDiv").contains(document.getElementById("editWeight"))) {
                                    document.getElementById("editWeight").value = selectedEdge.getWeightEdge();
                                }

                            };
                        } else if (ydist < xdist) {
                            if (isPointInPoly([[thisEdge.getVertexOne().getXVal(), thisEdge.getVertexOne().getYVal() + vertexRadius - 2], [thisEdge.getVertexOne().getXVal(), thisEdge.getVertexOne().getYVal() - vertexRadius + 2], [thisEdge.getVertexTwo().getXVal(), thisEdge.getVertexTwo().getYVal() - vertexRadius + 2], [thisEdge.getVertexTwo().getXVal(), thisEdge.getVertexTwo().getYVal() + vertexRadius - 2]], { x: x, y: y })) {
                                selectedEdge = thisEdge;
                                let index = findEdgeIndex(graph.getEdges(), selectedEdge.getVertexOne().getVertexID(), selectedEdge.getVertexTwo().getVertexID());
                                if (document.getElementById("freeformDiv").contains(document.getElementById("deleteEdgeDD"))) {
                                    document.getElementById("deleteEdgeDD").selectedIndex = index+1;
                                }
                                if (document.getElementById("freeformDiv").contains(document.getElementById("updateEdgeDD"))) {
                                    document.getElementById("updateEdgeDD").selectedIndex = index+1;
                                }
                                if (document.getElementById("freeformDiv").contains(document.getElementById("editWeight"))) {
                                    document.getElementById("editWeight").value = selectedEdge.getWeightEdge();
                                }
                            };
                        }
                    }

                    for (let i = 0; i < graph.getDirectedEdges().length; ++i) {
                        let thisEdge = graph.getDirectedEdges()[i];

                        let xdist = Math.abs(thisEdge.getVertexOne().getXVal() - thisEdge.getVertexTwo().getXVal());
                        let ydist = Math.abs(thisEdge.getVertexOne().getYVal() - thisEdge.getVertexTwo().getYVal());

                        if (xdist < ydist) {
                            if (isPointInPoly([[thisEdge.getVertexOne().getXVal() + vertexRadius - 2, thisEdge.getVertexOne().getYVal()], [thisEdge.getVertexOne().getXVal() - vertexRadius + 2, thisEdge.getVertexOne().getYVal()], [thisEdge.getVertexTwo().getXVal() - vertexRadius + 2, thisEdge.getVertexTwo().getYVal()], [thisEdge.getVertexTwo().getXVal() + vertexRadius - 2, thisEdge.getVertexTwo().getYVal()]], { x: x, y: y })) {
                                selectedEdge = thisEdge;
                                let index = findEdgeIndex(graph.getDirectedEdges(), selectedEdge.getVertexOne().getVertexID(), selectedEdge.getVertexTwo().getVertexID());
                                if (document.getElementById("freeformDiv").contains(document.getElementById("deleteEdgeDD"))) {
                                    document.getElementById("deleteEdgeDD").selectedIndex = index+1;
                                }
                                if (document.getElementById("freeformDiv").contains(document.getElementById("updateEdgeDD"))) {
                                    document.getElementById("updateEdgeDD").selectedIndex = index+1;
                                }
                                if (document.getElementById("freeformDiv").contains(document.getElementById("editWeight"))) {
                                    document.getElementById("editWeight").value = selectedEdge.getWeightEdge();
                                }
                            };
                        } else if (ydist < xdist) {
                            if (isPointInPoly([[thisEdge.getVertexOne().getXVal(), thisEdge.getVertexOne().getYVal() + vertexRadius - 2], [thisEdge.getVertexOne().getXVal(), thisEdge.getVertexOne().getYVal() - vertexRadius + 2], [thisEdge.getVertexTwo().getXVal(), thisEdge.getVertexTwo().getYVal() - vertexRadius + 2], [thisEdge.getVertexTwo().getXVal(), thisEdge.getVertexTwo().getYVal() + vertexRadius - 2]], { x: x, y: y })) {
                                selectedEdge = thisEdge;
                                let index = findEdgeIndex(graph.getDirectedEdges(), selectedEdge.getVertexOne().getVertexID(), selectedEdge.getVertexTwo().getVertexID());
                                if (document.getElementById("freeformDiv").contains(document.getElementById("deleteEdgeDD"))) {
                                    document.getElementById("deleteEdgeDD").selectedIndex = index+1;
                                }
                                if (document.getElementById("freeformDiv").contains(document.getElementById("updateEdgeDD"))) {
                                    document.getElementById("updateEdgeDD").selectedIndex = index+1;
                                }
                                if (document.getElementById("freeformDiv").contains(document.getElementById("editWeight"))) {
                                    document.getElementById("editWeight").value = selectedEdge.getWeightEdge();
                                }
                            };
                        }
                    }
                }

                redraw();
            }
        } else if (evt.button == 1) {
            return;
        } else if (evt.button == 2) { //RIGHT BUTTON
            if (userType == "lecturer" || userType == "freeform") {
                dragging = true;  // (this won't be the case for all mousedowns in all programs)

                creatingEdge = true;

                clickedVertexIndex = getVertexIndex(graph,x,y);
                startingVertex = graph.getVertex(clickedVertexIndex);

                if (dragging|| !dragging) {
                    document.addEventListener("mousemove", doMouseMove, false);
                    document.addEventListener("mouseup", doMouseUp, false);
                }

                if (clickedVertexIndex != -1) {
                    document.getElementById("vertex1DD").selectedIndex = clickedVertexIndex + 1;
                } else {
                    document.getElementById("vertex1DD").selectedIndex = 0;
                }

                redraw();
            }
        }


    }

    function doMouseMove(evt) {
        // This function is called when the user moves the mouse during a drag.
        var r = canvas.getBoundingClientRect();
        var x = Math.round(evt.clientX - r.left);
        var y = Math.round(evt.clientY - r.top);

        if(!dragging){
            return;
        }


        if(creatingEdge){
            graphics.strokeStyle = "red";
            graphics.lineWidth = 3;
            redraw();
            graphics.strokeLine(startingVertex.getXVal(),startingVertex.getYVal(), x, y);
            drawVertices();
        }else{
            if(x>10 && x<X_RIGHT-10 && y>10 && y<Y_BOTTOM-10 && evt.button == 0){
                if(clickedVertexIndex != -1){
                    if(userType=="student"){
                        answerGraph.updateXandYVal(selectedVertex, x, y);
                        redraw();
                        graphics.strokePoly(selectedVertex.getXVal()-vertexRadius-space, selectedVertex.getYVal()-vertexRadius-space,
                        selectedVertex.getXVal()+vertexRadius+space, selectedVertex.getYVal()-vertexRadius-space,
                        selectedVertex.getXVal()+vertexRadius+space, selectedVertex.getYVal()+vertexRadius+space,
                        selectedVertex.getXVal()-vertexRadius-space, selectedVertex.getYVal()+vertexRadius+space);
                    }else if (userType=="lecturer" || userType == "freeform"){
                        graph.updateXandYVal(selectedVertex, x, y);
                        redraw();
                        graphics.strokePoly(selectedVertex.getXVal()-vertexRadius-space, selectedVertex.getYVal()-vertexRadius-space,
                        selectedVertex.getXVal()+vertexRadius+space, selectedVertex.getYVal()-vertexRadius-space,
                        selectedVertex.getXVal()+vertexRadius+space, selectedVertex.getYVal()+vertexRadius+space,
                        selectedVertex.getXVal()-vertexRadius-space, selectedVertex.getYVal()+vertexRadius+space);
                    }

                }
            }
        }
    }

    function doMouseUp(evt) {
        var r = canvas.getBoundingClientRect();
        var x = Math.round(evt.clientX - r.left);
        var y = Math.round(evt.clientY - r.top);

        // This function is called when the user releases a mouse button during a drag.
        if (!dragging) {
            return;  // (shouldn't be possible)
        }
        dragging = false;
        document.removeEventListener("mousemove", doMouseMove, false);
        document.removeEventListener("mouseup", doMouseMove, false);

        if(userType == "lecturer" || userType == "freeform"){
            if(creatingEdge){

                clickedVertexIndex = getVertexIndex(graph,x,y);
                endingVertex = graph.getVertex(clickedVertexIndex);

                if (dragging || !dragging) {
                    document.addEventListener("mousemove", doMouseMove, false);
                    document.addEventListener("mouseup", doMouseUp, false);
                }

                if (clickedVertexIndex != -1) {
                    if(!graph.checkEdgeExists(startingVertex.getVertexID(), endingVertex.getVertexID())){
                      if (directed) {
                          graph.addDirectedEdge(startingVertex.getVertexID(), endingVertex.getVertexID(), 1);
                      } else {
                          graph.addEdge(startingVertex.getVertexID(), endingVertex.getVertexID(), 1);
                      }
                    }else{
                        alert("This edge already exists");
                    }
                }
                redraw();
                populateDropDowns();
            }
            creatingEdge = false;
        }

    }

    canvas.addEventListener("mousedown", doMouseDown, false);
}

function handleKeyDown(event) {
    let keyCode = event.keyCode;

    if (userType == "lecturer" || userType == "freeform") {
        switch (keyCode) {
            case 46: //Delete
                if(clickedVertexIndex != -1){
                    graph.removeVertex(selectedVertex.getVertexID());
                }else if(selectedEdge != null){
                    if(directed){
                        graph.removeDirectedEdge(selectedEdge.getVertexOne().getVertexID(), selectedEdge.getVertexTwo().getVertexID());
                    }else{
                        graph.removeEdge(selectedEdge.getVertexOne().getVertexID(), selectedEdge.getVertexTwo().getVertexID());
                    }
                }
                populateDropDowns();
                redraw();
                break
            case 37: //Left arrow
                if(colored){
                    if(clickedVertexIndex != -1){
                        selectedVertex.setColor( selectedVertex.getColor() - parseInt(1));
                        document.getElementById("editVertexColor").value = selectedVertex.getColor();
                        populateDropDowns();
                        redraw();
                    }
                }else if(weighted){
                    if(selectedEdge != null){
                        selectedEdge.setWeightEdge(selectedEdge.getWeightEdge() - parseInt(1));
                        document.getElementById("editWeight").value = selectedEdge.getWeightEdge();
                        populateDropDowns();
                        redraw();
                    }
                }
                break;
            case 39: //Right arrow
                if(colored){
                    if(clickedVertexIndex != -1){
                        selectedVertex.setColor( selectedVertex.getColor() - -parseInt(1));
                        document.getElementById("editVertexColor").value = selectedVertex.getColor();
                        populateDropDowns();
                        redraw();
                    }
                }else if(weighted){
                    if(selectedEdge != null){
                        selectedEdge.setWeightEdge(selectedEdge.getWeightEdge() - -parseInt(1));
                        document.getElementById("editWeight").value = selectedEdge.getWeightEdge();
                        populateDropDowns();
                        redraw();
                    }
                }
                break;
        }
    }else if (userType == "student") {
        switch (keyCode) {
            case 46: //Delete
                if(selectedEdge != null && questionType != "graphcolouring"){
                    if(directed){
                        answerGraph.removeDirectedEdge(selectedEdge.getVertexOne().getVertexID(), selectedEdge.getVertexTwo().getVertexID());
                    }else{
                        answerGraph.removeEdge(selectedEdge.getVertexOne().getVertexID(), selectedEdge.getVertexTwo().getVertexID());
                    }
                }
                populateDropDowns();
                redraw();
                break
            case 37: //Left arrow
                if(colored){
                    if(clickedVertexIndex != -1){
                        selectedVertex.setColor( selectedVertex.getColor() - parseInt(1));
                        document.getElementById("editvertexColor").value = selectedVertex.getColor();
                        populateDropDowns();
                        redraw();
                    }
                }
                break;
            case 39: //Right arrow
                if(colored){
                    if(clickedVertexIndex != -1){
                        selectedVertex.setColor( selectedVertex.getColor() - -parseInt(1));
                        document.getElementById("editvertexColor").value = selectedVertex.getColor();
                        populateDropDowns();
                        redraw();
                    }
                }
                break;
        }
    }

    if (clickedVertexIndex != -1) {
        graphics.strokePoly(selectedVertex.getXVal() - vertexRadius - space, selectedVertex.getYVal() - vertexRadius - space,
            selectedVertex.getXVal() + vertexRadius + space, selectedVertex.getYVal() - vertexRadius - space,
            selectedVertex.getXVal() + vertexRadius + space, selectedVertex.getYVal() + vertexRadius + space,
            selectedVertex.getXVal() - vertexRadius - space, selectedVertex.getYVal() + vertexRadius + space);
    }
}

function isPointInPoly(poly, pt) {
    for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
        ((poly[i][1] <= pt.y && pt.y < poly[j][1]) || (poly[j][1] <= pt.y && pt.y < poly[i][1])) && (pt.x < (poly[j][0] - poly[i][0]) * (pt.y - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0]) && (c = !c);
    return c;
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
    graphics.fillPoly = function () {
        if (arguments.length < 6)
            return;
        this.beginPath();
        this.moveTo(arguments[0], arguments[1]);
        for (var i = 2; i + 1 < arguments.length; i = i + 2) {
            this.lineTo(arguments[i], arguments[i + 1]);
        }
        this.closePath();
        this.fill();
    }
    graphics.strokePoly = function () {
        if (arguments.length < 4)
            return;
        this.beginPath();
        this.moveTo(arguments[0], arguments[1]);
        for (var i = 2; i + 1 < arguments.length; i = i + 2) {
            this.lineTo(arguments[i], arguments[i + 1]);
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

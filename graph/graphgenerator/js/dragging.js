"use strict";

/**
 * This function is called in init() to set up mouse event handling
 * on the canvas.  You can modify the nested functions doMouseDown,
 * doMouseDrag, and possibly doMouseUp to change the reponse to
 * mouse events.  As an example, this program does some simple drawing.
 */
function installMouseHandler() {

    var dragging = false;  // set to true when a drag action is in progress.
    var selectedVertex;

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

        function getVertexIndex() {
            for (let i = 0; i < graph.getNumberVertices(); ++i) {
                let vertex = graph.getVertex(i);

                let dist = euclideanDistance([x, y], [vertex.getXVal(), vertex.getYVal()]);
                console.log(dist);
                if (dist < vertexRadius) {
                    console.log(i);
                    return i;
                }
            }
        }

        let index = getVertexIndex();
        selectedVertex = graph.getVertex(index);
        console.log(selectedVertex);
    }

    function doMouseMove(evt) {
        // This function is called when the user moves the mouse during a drag.
        if (!dragging) {
            return;  // (shouldn't be possible)
        }

        var r = canvas.getBoundingClientRect();
        var x = Math.round(evt.clientX - r.left);
        var y = Math.round(evt.clientY - r.top);

        // selectedVertex.updateCoOrds(x,y);
        graph.updateXandYVal(selectedVertex.vertexID, x, y);
        //
        // for(let i=0; i<selectedVertex.getAdjacenyList.size; i++){
        //     let adjacent = selectedVertex.getAdjacenyList(i);
        //     // let edge = graph.getEdge(selectedVertex.getVertexID(), adjacent.getVertexID());
        //     // edge.updateCoOrds(selectedVertex.getXVal(), selectedVertex.getYVal(), adjacent.getXVal(), adjacent.getYVal());
        // }
        redraw();
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


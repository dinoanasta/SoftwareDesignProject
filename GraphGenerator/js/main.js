let graph = new Graph(); //array of vertex objects, each having an array of adjacent vertices

let ID = 0;

let count = 0;

function doAddVertex() {
    let valueText = document.getElementById("vertexValue");

    if(valueText.value.length != 0){

        let value = valueText.value;
        let vertex = new Vertex(value);
        graph.vertices.push(vertex);
        drawVertices();

        const vertex1DD = document.getElementById("vertex1DD");
        const vertex2DD = document.getElementById("vertex2DD");

        function addOption(selectbox, value, ID) {
            let opt = document.createElement("option");
            opt.textContent = ID.toString() + ": " + value;
            opt.value = ID;
            selectbox.options.add(opt);
        }

        for (let i=count; i < graph.vertices.length;++i){
            addOption(vertex1DD, graph.vertices[i].vertexVal, graph.vertices[i].ID );
            addOption(vertex2DD, graph.vertices[i].vertexVal, graph.vertices[i].ID);
        }

        count++;
    }else{
        alert("Please enter a value for the vertex");
    }

}

let edgeCount = 0;

function doAddEdge() {
    let firstDropDown = document.getElementById("vertex1DD");
    let secondDropDown = document.getElementById("vertex2DD");

    let firstID = firstDropDown.options[firstDropDown.selectedIndex].value;
    let secondID = secondDropDown.options[secondDropDown.selectedIndex].value;

    function checkExists(first, second){
        for (let i = 0; i<graph.edges.length;++i){
            if ((graph.edges[i].vertex1ID == first && graph.edges[i].vertex2ID == second) || (graph.edges[i].vertex1ID == second && graph.edges[i].vertex2ID == first)){
                return true;
            }
        }
    }


    if(!checkExists(firstID, secondID)){
        if(firstDropDown.selectedIndex != secondDropDown.selectedIndex ){
            if(firstDropDown.selectedIndex !=0 ){
                if(secondDropDown.selectedIndex != 0){

                    function findVertex(ID){
                        for (let i = 0; i < graph.vertices.length;++i){
                            if (graph.vertices[i].ID == ID){
                                return graph.vertices[i];
                            }
                        }
                    }

                    let vertex1 = findVertex(firstID);
                    let vertex2 = findVertex(secondID);

                    vertex1.AdjacencyList.push(vertex2.ID);
                    vertex2.AdjacencyList.push(vertex1.ID);

                    let newEdge = new Edge(vertex1, vertex2);

                    graph.edges.push(newEdge);
                    redraw();

                    function addOption(selectbox, firstID, firstValue, secondID,  secondValue) {
                        let opt = document.createElement("option");
                        opt.textContent = "Vertex " + firstID + ": " + firstValue + " <-----> " + "Vertex " + secondID + ": " + secondValue;
                        selectbox.options.add(opt);
                    }

                    for(let i  = edgeCount; i< graph.edges.length; ++i){
                        addOption(deleteEdgeDD, graph.edges[i].vertex1ID, graph.edges[i].vertex1Val, graph.edges[i].vertex2ID, graph.edges[i].vertex2Val );
                    }
                    edgeCount++;

                }else{
                    alert("Please select the second vertex");
                }

            }else{
                alert("Please select the first vertex");
            }
        }else{
            alert("Please select different vertices");
        }
    }else{
        alert("This edge already exists");
    }


}

function doDeleteEdge() {
    let dropDown = document.getElementById("deleteEdgeDD");

    if(dropDown.selectedIndex != 0){
        graphics.save();

        let selected = dropDown.options[dropDown.selectedIndex].textContent;
        let edgeVertices = selected.split(" <-----> ");

        dropDown.remove(dropDown.selectedIndex);

        let edgeVertex1 = edgeVertices[0].split(": ");
        let edgeVertex1ID = edgeVertex1[0].split(" ")[1];
        let edgeVertex1Val = edgeVertex1[1];

        let edgeVertex2 = edgeVertices[1].split(": ");
        let edgeVertex2ID = edgeVertex2[0].split(" ")[1];
        let edgeVertex2Val = edgeVertex2[1];

        function findEdge(vertex1ID, vertex2ID){
            for (let i = 0; i<graph.edges.length;++i){
                if (graph.edges[i].vertex1ID == vertex1ID && graph.edges[i].vertex2ID == vertex2ID){
                    return i;
                }
            }
        }

        console.log(graph.edges.length);
        console.log(graph.edges);

        let edgeIndex = findEdge(edgeVertex1ID, edgeVertex2ID);

        graph.edges.splice(edgeIndex, 1);

        redraw();

        console.log(graph.edges.length);
        console.log(graph.edges);

        graphics.restore();
    }else{
        alert("Please select an edge to delete");
    }
}

function redraw(){
    graphics.fillStyle = "white";
    graphics.fillRect(0, 0, canvas.width, canvas.height);
    drawEdges();
    drawVertices();

}

function doClear() {
    graphics.fillStyle = "white";
    graphics.fillRect(0, 0, canvas.width, canvas.height);
    graph.vertices = [];
    graph.edges = [];

    let firstDropDown = document.getElementById("vertex1DD");
    let secondDropDown = document.getElementById("vertex2DD");
    let deleteEdgeDropDown = document.getElementById("deleteEdgeDD");

    function clearDropDown (DDB) {
        while (DDB.options.length > 1) {
            DDB.remove(1);
        }
    }

    clearDropDown(firstDropDown);
    clearDropDown(secondDropDown);
    clearDropDown(deleteEdgeDropDown);

    ID = 0;
    count = 0;
    edgeCount = 0;
}


function drawVertices(){
    for(let i  = 0; i< graph.vertices.length; ++i){
        graphics.save();
        graph.vertices[i].drawVertex();
        graphics.restore();
    }
}

function drawEdges(){
    for(let i  = 0; i< graph.edges.length; ++i){
        graphics.save();
        graph.edges[i].drawEdge();
        graphics.restore();
    }
}



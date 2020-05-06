let graph = new Graph(); //array of vertex objects, each having an array of adjacent vertices

let ID = 0;

let count = 0;

function doAddVertex() {
    let valueText = document.getElementById("vertexValue");

    if(valueText.value.length != 0){

        let value = valueText.value;

        let x = Math.random()*200 + 250;
        let y = Math.random()*200 + 200;

        graph.addVertex(value,x, y, null);

        populateDropDowns();
        redraw();
    }else{
        alert("Please enter a value for the vertex");
    }

}

function doDeleteVertex(){
    let dropDown = document.getElementById("deleteVertexDD");

    if(dropDown.selectedIndex != 0){
        graphics.save();

        let selected = dropDown.options[dropDown.selectedIndex].textContent;
        let vertexID = selected.split(":")[0];

        graph.removeVertex(vertexID);

        populateDropDowns();
        redraw();

        graphics.restore();
    }else{
        alert("Please select an edge to delete");
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
            if ((graph.edges[i].getVertexOne().getVertexID() == first && graph.edges[i].getVertexTwo().getVertexID() == second) || (graph.edges[i].getVertexOne().getVertexID() == second && graph.edges[i].getVertexTwo().getVertexID() == first)){
                return true;
            }
        }
    }

    if(!checkExists(firstID, secondID)){
        if(firstDropDown.selectedIndex != secondDropDown.selectedIndex ){
            if(firstDropDown.selectedIndex !=0 ){
                if(secondDropDown.selectedIndex != 0){

                    // console.log("Add edge pressed")
                    //
                    // function findVertex(ID){
                    //     for (let i = 0; i < graph.getNumberVertices();++i){
                    //         if (graph.getVertex(i).getVertexID() == ID){
                    //             return graph.getVertex(i);
                    //         }
                    //     }
                    // }
                    //
                    // let vertex1 = findVertex(firstID);
                    // let vertex2 = findVertex(secondID);
                    //
                    // vertex1.addAdjacency(vertex2);
                    // vertex2.addAdjacency(vertex1);

                    graph.addEdge(firstID, secondID);

                    populateDropDowns();
                    redraw();

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

        let edgeVertex1 = edgeVertices[0].split(": ");
        let edgeVertex1ID = edgeVertex1[0].split(" ")[1];

        let edgeVertex2 = edgeVertices[1].split(": ");
        let edgeVertex2ID = edgeVertex2[0].split(" ")[1];

        graph.removeEdge(edgeVertex1ID, edgeVertex2ID);

        populateDropDowns();
        redraw();

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

function clearDropDown (DDB) {
    while (DDB.options.length > 1) {
        DDB.remove(1);
    }
}

function populateDropDowns(){
    const deleteVertexDD = document.getElementById("deleteVertexDD");
    const deleteEdgeDD = document.getElementById("deleteEdgeDD");
    const vertex1DD = document.getElementById("vertex1DD");
    const vertex2DD = document.getElementById("vertex2DD");

    clearDropDown(vertex1DD);
    clearDropDown(vertex2DD);
    clearDropDown(deleteVertexDD);
    clearDropDown(deleteEdgeDD);

    //Add vertices to delete vertex and add edge drop downs
    function addVertexOption(DDB, value, ID) {
        let opt = document.createElement("option");
        opt.textContent = ID.toString() + ": " + value;
        opt.value = ID;
        DDB.options.add(opt);
    }

    for (let i=0; i < graph.getNumberVertices();++i){
        addVertexOption(vertex1DD, graph.getVertex(i).getVertexVal(), graph.getVertex(i).getVertexID());
        addVertexOption(vertex2DD, graph.getVertex(i).getVertexVal(), graph.getVertex(i).getVertexID());
        addVertexOption(deleteVertexDD, graph.getVertex(i).getVertexVal(), graph.getVertex(i).getVertexID());
    }

    //Add edges to delete edge drop downs
    function addEdgeOption(DDB, v1, v2) {
        let opt = document.createElement("option");
        opt.textContent = "Vertex " + v1.getVertexID() + ": " + v1.getVertexVal() + " <-----> " + "Vertex " + v2.getVertexID() + ": " + v2.getVertexVal();
        DDB.options.add(opt);
    }

    for(let i  = 0; i< graph.edges.length; ++i){
        addEdgeOption(deleteEdgeDD, graph.edges[i].getVertexOne(), graph.edges[i].getVertexTwo());
    }
}

function doClear() {
    graphics.fillStyle = "white";
    graphics.fillRect(0, 0, canvas.width, canvas.height);
    graph.vertices = [];
    graph.edges = [];

    const deleteVertexDD = document.getElementById("deleteVertexDD");
    const deleteEdgeDD = document.getElementById("deleteEdgeDD");
    const vertex1DD = document.getElementById("vertex1DD");
    const vertex2DD = document.getElementById("vertex2DD");

    clearDropDown(vertex1DD);
    clearDropDown(vertex2DD);
    clearDropDown(deleteVertexDD);
    clearDropDown(deleteEdgeDD);
}


function drawVertices(){
    for(let i  = 0; i< graph.vertices.length; ++i){
        graphics.save();
        graph.getVertex(i).drawVertex();
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

function doSubmit(){
    console.log(graph.getAdjacenyMatrix());
}



let graph = new Graph(); //array of vertex objects, each having an array of adjacent vertices

let color = -1;

let colored = false;

function doColored() {
    let colorCB = document.getElementById('coloredCB');
    let colorText = document.getElementById('vertexColor');

    if (colorCB.checked) {
        colorText.disabled = false;
        colored = true;
    } else if (!colorCB.checked) {
        colorText.disabled = true;
        colored = false;
    }
}

function doAddVertex() {
    let valueText = document.getElementById("vertexValue");
    let colorText = document.getElementById("vertexColor");

    if(valueText.value.length != 0){

        let value = valueText.value;

        if(colored){
            color = colorText.value;
        }

        let x = Math.random()*200 + 250;
        let y = Math.random()*200 + 200;

        graph.addVertex(value,x, y, color);

        populateDropDowns();
        redraw();

        console.log(graph.getAdjacenyMatrix());
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

let weight = 0;
let weighted = false;
function doWeighted(){
    let weightedCB = document.getElementById('weightedCB');
    let weightText = document.getElementById('edgeWeight');

    if (weightedCB.checked) {
        weightText.disabled = false;
        weighted = true;
    } else if (!weightedCB.checked) {
        weightText.disabled = true;
        weighted = false;
    }
}

let directed = false;
function doDirected(){
    let directedCB = document.getElementById('directedCB');
    let vertex1 = document.getElementById('vertex1DD');
    let vertex2 = document.getElementById('vertex2DD');

    if (directedCB.checked) {
        directed = true;
    } else if (!directedCB.checked) {
        directed = false;
    }
}

function doAddEdge() {
    let firstDropDown = document.getElementById("vertex1DD");
    let secondDropDown = document.getElementById("vertex2DD");

    let firstID = firstDropDown.options[firstDropDown.selectedIndex].value;
    let secondID = secondDropDown.options[secondDropDown.selectedIndex].value;

    let weighted = document.getElementById("edgeWeight");

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

                    if(weighted){
                        weight = weighted.value;
                    }
                    graph.addEdge(firstID, secondID, weight);
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
    function addVertexOption(DDB, value, ID, color) {
        let opt = document.createElement("option");
        opt.textContent = "Vertex " + ID.toString() + ": " + value;
        if(colored){
            opt.textContent = "Vertex " + ID.toString() + ": " + value + " (Color: " + color.toString() + ")";
        }
        opt.value = ID;
        DDB.options.add(opt);
    }

    for (let i=0; i < graph.getNumberVertices();++i){
        addVertexOption(vertex1DD, graph.getVertex(i).getVertexVal(), graph.getVertex(i).getVertexID(), graph.getVertex(i).getColor());
        addVertexOption(vertex2DD, graph.getVertex(i).getVertexVal(), graph.getVertex(i).getVertexID(), graph.getVertex(i).getColor());
        addVertexOption(deleteVertexDD, graph.getVertex(i).getVertexVal(), graph.getVertex(i).getVertexID(), graph.getVertex(i).getColor());
    }

    //Add edges to delete edge drop downs
    function addEdgeOption(DDB, v1, v2, weight) {
        let opt = document.createElement("option");
        opt.textContent = "Vertex " + v1.getVertexID() + ": " + v1.getVertexVal() + " <-------> " + "Vertex " + v2.getVertexID() + ": " + v2.getVertexVal();
        if(weighted){
            opt.textContent = "Vertex " + v1.getVertexID() + ": " + v1.getVertexVal() + " <---" + weight + "---> " + "Vertex " + v2.getVertexID() + ": " + v2.getVertexVal();
        }
        DDB.options.add(opt);
    }

    for(let i  = 0; i< graph.edges.length; ++i){
        addEdgeOption(deleteEdgeDD, graph.edges[i].getVertexOne(), graph.edges[i].getVertexTwo(), graph.edges[i].getWeightEdge());
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



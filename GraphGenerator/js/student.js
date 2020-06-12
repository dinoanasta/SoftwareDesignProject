//Global variables
const userType = "student";

var selectedVertex = null;
const space = 4;

const vertexRadius = 15;

let graph = new Graph(); //array of vertex objects, each having an array of adjacent vertices
let questionGraph = new Graph();
let unusedGraph = new Graph();

let addedVertices = [];
let unusedVertices = [];

let addedEdges = [];
let unusedEdges = [];

let clickedVertexIndex = -1;

//Question Setup
let questionType;
let questionCode;
let questionLoaded = false;

//Weighted
let weight = 1;
let weighted;

//Directed
let directed;

//Colored
let color = "0";
let colored;

//Bindings and event handlers
function addBindings(){
    //Question setup
    document.getElementById("loadGraphButton").onclick = doLoadGraph;

    //Vertices
    document.getElementById("addVertexButton").onclick = doAddVertex;
    document.getElementById("editVertexDD").onchange = editVertexSelected;
    document.getElementById("updateVertexButton").onclick = doUpdateVertex;
    document.getElementById("deleteVertexButton").onclick = doDeleteVertex;
    document.getElementById("setRootDD").onchange = setRoot;
    document.getElementById("clearRootButton").onclick = removeRootVertex;

    //Edges
    document.getElementById("addEdgeButton").onclick = doAddEdge;
    document.getElementById("updateEdgeDD").onchange = editEdgeSelected;
    document.getElementById("updateEdgeButton").onclick = doUpdateEdge;
    document.getElementById("deleteEdgeButton").onclick = doDeleteEdge;

    //Interface
    document.getElementById("clearButton").onclick = doClear;
    document.getElementById("submitButton").onclick = doSubmit;
    window.addEventListener('keydown', handleKeyDown, false);

    window.addEventListener('keydown', handleKeyDown, false);
}

//Question setup
function doLoadGraph(){ //When student enters code and presses the load button
    let questionTypeDisplay = document.getElementById("questionTypeLabel");

    let qCode = document.getElementById("questionCodeStudent");
    if(qCode.value.length != 0){
        questionCode = qCode.value;

        fetchQuestionGraph();

        setTimeout(function(){
            // graph = questionGraph;

            for(let i =0; i<questionGraph.getNumberVertices();i++){
                unusedVertices.push(i);
            }

            weighted = questionGraph.isWeighted();
            directed = questionGraph.isDirected();

            console.log("Question type: " + questionType);
            console.log("Weighted: " + weighted);
            console.log("Directed: " + directed);
            console.log(questionGraph);

            setupInterface(questionType);

            if(directed){
                if(weighted){
                    questionTypeDisplay.innerHTML = "Question Type: " + questionType + " (Directed & Weighted)";
                }else{
                    questionTypeDisplay.innerHTML = "Question Type: " + questionType + " (Directed)";
                }
            }else{
                if(weighted){
                    questionTypeDisplay.innerHTML = "Question Type: " + questionType + " (Weighted)";
                }else{
                    questionTypeDisplay.innerHTML = "Question Type: " + questionType;
                }
            }

            populateDropDowns();
            redraw();
        }, 2000);
    }else{
        alert("Please enter the question code");
    }
}

function fetchQuestionGraph(){ //Fetch question graph for student
    ref.on("value", gotData, errorData);
}

function gotData(data) { //Find question graph for student from fetched data
    var data = data.val();
    var keys = Object.keys(data);
    var foundQuestionGraph = false;
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        if(data[k].id === questionCode){
            questionGraph.fillGraphWithString(data[k].graph);
            var fetchedObj = JSON.parse(data[k].graph);
            console.log(fetchedObj);
            questionType = fetchedObj.questionType;
            foundQuestionGraph = true;
            break;
        }
    }
    if(foundQuestionGraph){
        questionLoaded = true;
        alert("Question graph has successfully loaded");
    }else{
        let alertStr = "Could not find question graph with question code "+questionCode;
        alert(alertStr);
    }
}

function errorData(err) { //Jesse_new

    alert("An error has occured while trying to fetch the question graph from the server");
}

//Vertices
function doAddVertex() {
    let dropDown = document.getElementById("addVertexDD");
    let vertexID = dropDown.options[dropDown.selectedIndex].value;

    let vertex = questionGraph.getVertex(vertexID);

    let value = vertex.getVertexVal();
    let x = vertex.getXVal();
    let y = vertex.getYVal();
    let color = vertex.getColor();

    graph.addVertex(value, x, y, color);
    let indexToChangeID = graph.getNumberVertices() -1;
    graph.getVertex(indexToChangeID).setVertexID(vertex.getVertexID());

    addedVertices.push(vertexID);
    for(let i=0;i<unusedVertices.length;i++){
        if(unusedVertices[i] == vertexID){
            unusedVertices.splice(i,1);
        }
    }

    populateDropDowns();
    redraw();
}

function editVertexSelected(){
    let dropDown = document.getElementById("editVertexDD");
    let vertexID = dropDown.options[dropDown.selectedIndex].value;

    document.getElementById("editvertexValueLabel").innerHTML = "Value: " + graph.getVertex(vertexID).getVertexVal();
    document.getElementById("editvertexColor").value = graph.getVertex(vertexID).getColor();
}

function doUpdateVertex(){
    let dropDown = document.getElementById("editVertexDD");

    let newColor = document.getElementById("editvertexColor").value;
    console.log(newColor);
    // let newDist = document.getElementById("editdistFromRoot").textContent;

    if(dropDown.selectedIndex != 0){
        let vertexID = dropDown.options[dropDown.selectedIndex].value;

        if(colored){
            graph.updateVertexColor(vertexID, newColor);

        }
        // graph.getVertex(vertexID).setDistance(newDist);

        populateDropDowns();
        redraw();
    }else{
        if(clickedVertexIndex != -1){
            if(colored){
                graph.getVertex(clickedVertexIndex).setColor(newColor);
            }
            // graph.getVertex(vertexID).setDistance(newDist);

            populateDropDowns();
            redraw();

        }else{
            alert("Please select a vertex to edit");
        }
    }
}

function doDeleteVertex(){
    let dropDown = document.getElementById("deleteVertexDD");

    if(dropDown.selectedIndex != 0){
        let vertexID = dropDown.options[dropDown.selectedIndex].value;

        graph.removeVertex(vertexID);
        unusedVertices.push(vertexID);

        for(let i=0;i<addedVertices.length;i++){
            if(addedVertices[i] == vertexID){
                addedVertices.splice(i, 1);
            }
        }

        populateDropDowns();
        redraw();
    }else{
        alert("Please select a vertex to delete");
    }
}

function setRoot(){
    let dropDown = document.getElementById("setRootDD");

    if(dropDown.selectedIndex != 0){
        let vertexID = dropDown.options[dropDown.selectedIndex].value;
        graph.setSourceNode(graph.getVertex(vertexID));

        populateDropDowns();
        redraw();
    }else{
        alert("Please select a vertex to set as the root");
    }
}

function removeRootVertex(){
    graph.setSourceNode(0);
    redraw();
}

//Edges
function doAddEdge() {
    let firstDropDown = document.getElementById("vertex1DD");
    let secondDropDown = document.getElementById("vertex2DD");

    let firstID = firstDropDown.options[firstDropDown.selectedIndex].value;
    let secondID = secondDropDown.options[secondDropDown.selectedIndex].value;

    let edgeWeight = document.getElementById("edgeWeight");

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
                    weight = 1;
                    if(weighted){
                        if(edgeWeight.value.length !=0){

                            weight = parseInt(edgeWeight.value);
                            if(directed){
                                graph.addDirectedEdge(firstID, secondID, weight);
                            }else{
                                graph.addEdge(firstID, secondID, weight);
                            }

                            populateDropDowns();
                            redraw();
                        }else{
                            alert("Please enter a weight for the edge")
                        }
                    }else{
                        if(directed){
                            graph.addDirectedEdge(firstID, secondID, weight);
                        }else{
                            graph.addEdge(firstID, secondID, weight);
                        }
                        populateDropDowns();
                        redraw();
                    }
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

function editEdgeSelected(){
    let dropDown = document.getElementById("updateEdgeDD");

    let weight;

    console.log(graph.directedEdges[dropDown.selectedIndex -1]);
    console.log(graph.edges[dropDown.selectedIndex -1]);

    if(directed){
        weight = graph.directedEdges[dropDown.selectedIndex -1].getWeightEdge();
    }else if(!directed){
        weight = graph.edges[dropDown.selectedIndex -1].getWeightEdge();
    }

    document.getElementById("editWeight").value = weight;
}

function doUpdateEdge(){
    let dropDown = document.getElementById("updateEdgeDD");

    let newWeight = document.getElementById("editWeight").value;

    if(dropDown.selectedIndex != 0){
        if(directed){
            graph.directedEdges[dropDown.selectedIndex - 1 ].setWeightEdge(newWeight);
        }else if(!directed){
            graph.edges[dropDown.selectedIndex - 1 ].setWeightEdge(newWeight);
        }
        populateDropDowns();
        redraw();
    }else{
        alert("Please select an edge to edit");
    }
}

function doDeleteEdge() {
    let dropDown = document.getElementById("deleteEdgeDD");

    if(dropDown.selectedIndex != 0){

        let selected = dropDown.options[dropDown.selectedIndex].textContent;

        let splitted = selected.split(" ");

        let edgeVertex1ID = splitted[1];
        let edgeVertex2ID = splitted[6];

        if(directed){
            graph.removeDirectedEdge(edgeVertex1ID, edgeVertex2ID);
        }else{
            graph.removeEdge(edgeVertex1ID, edgeVertex2ID);
        }

        populateDropDowns();
        redraw();

    }else{
        alert("Please select an edge to delete");
    }
}

//Interface
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
    //Vertices
    const deleteVertexDD = document.getElementById("deleteVertexDD");
    const updateVertexDD = document.getElementById("editVertexDD");
    const addVertexDD = document.getElementById("addVertexDD");

    const deleteEdgeDD = document.getElementById("deleteEdgeDD");
    const vertex1DD = document.getElementById("vertex1DD");
    const vertex2DD = document.getElementById("vertex2DD");
    const editEdgeDD = document.getElementById("updateEdgeDD");
    const setRootDD = document.getElementById("setRootDD");

    //Vertices
    clearDropDown(deleteVertexDD);
    clearDropDown(updateVertexDD);
    clearDropDown(addVertexDD);

    clearDropDown(vertex1DD);
    clearDropDown(vertex2DD);
    clearDropDown(deleteEdgeDD);
    clearDropDown(editEdgeDD);
    clearDropDown(setRootDD);

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

    for (let i=0; i < unusedVertices.length;++i){
        let index = unusedVertices[i];
        addVertexOption(addVertexDD, questionGraph.getVertex(index).getVertexVal(), questionGraph.getVertex(index).getVertexID(), questionGraph.getVertex(index).getColor());
    }

    for (let i=0; i < addedVertices.length;++i){
        let index = addedVertices[i];
        addVertexOption(vertex1DD, questionGraph.getVertex(index).getVertexVal(), questionGraph.getVertex(index).getVertexID(), questionGraph.getVertex(index).getColor());
        addVertexOption(vertex2DD, questionGraph.getVertex(index).getVertexVal(), questionGraph.getVertex(index).getVertexID(), questionGraph.getVertex(index).getColor());
        addVertexOption(deleteVertexDD, questionGraph.getVertex(index).getVertexVal(), questionGraph.getVertex(index).getVertexID(), questionGraph.getVertex(index).getColor());
        addVertexOption(updateVertexDD, questionGraph.getVertex(index).getVertexVal(), questionGraph.getVertex(index).getVertexID(), questionGraph.getVertex(index).getColor());
        addVertexOption(setRootDD, questionGraph.getVertex(index).getVertexVal(), questionGraph.getVertex(index).getVertexID(), questionGraph.getVertex(index).getColor());
    }

    //Add edges to delete edge drop downs
    function addEdgeOption(DDB, v1, v2, weight) {
        let opt = document.createElement("option");
        if(weighted){
            opt.textContent = "Vertex " + v1.getVertexID() + " : " + v1.getVertexVal() + " <---" + weight + "---> " + "Vertex " + v2.getVertexID() + " : " + v2.getVertexVal();
        }else{
            opt.textContent = "Vertex " + v1.getVertexID() + " : " + v1.getVertexVal() + " <-------> " + "Vertex " + v2.getVertexID() + " : " + v2.getVertexVal();
        }
        DDB.options.add(opt);
    }

    function addDirectedEdgeOption(DDB, v1, v2, weight) {
        let opt = document.createElement("option");
        if(weighted){
            opt.textContent = "Vertex " + v1.getVertexID() + " : " + v1.getVertexVal() + " ||---" + weight + "---> " + "Vertex " + v2.getVertexID() + " : " + v2.getVertexVal();
        }else{
            opt.textContent = "Vertex " + v1.getVertexID() + " : " + v1.getVertexVal() + " ||-------> " + "Vertex " + v2.getVertexID() + " : " + v2.getVertexVal();
        }
        DDB.options.add(opt);
    }

    for(let i  = 0; i< graph.edges.length; ++i){
        addEdgeOption(deleteEdgeDD, graph.edges[i].getVertexOne(), graph.edges[i].getVertexTwo(), graph.edges[i].getWeightEdge());
        addEdgeOption(editEdgeDD, graph.edges[i].getVertexOne(), graph.edges[i].getVertexTwo(), graph.edges[i].getWeightEdge());
    }

    for(let i  = 0; i< graph.directedEdges.length; ++i){
        addDirectedEdgeOption(deleteEdgeDD, graph.directedEdges[i].getVertexOne(), graph.directedEdges[i].getVertexTwo(), graph.directedEdges[i].getWeightEdge());
        addDirectedEdgeOption(editEdgeDD, graph.directedEdges[i].getVertexOne(), graph.directedEdges[i].getVertexTwo(), graph.directedEdges[i].getWeightEdge());

    }


}

function doClear() {
    graphics.fillStyle = "white";
    graphics.fillRect(0, 0, canvas.width, canvas.height);

    //Enable question setup stuff
    document.getElementById("questionSetupDiv").style.display = "initial";
    document.getElementById("edgeDiv").style.display = "none";
    document.getElementById("addVertexDiv").style.display = "none";
    document.getElementById("editVertexDiv").style.display = "none";
    document.getElementById("deleteVertexDiv").style.display = "none";

    //Reset variables
    selectedVertex = null;

    graph = new Graph(); //array of vertex objects, each having an array of adjacent vertices
    questionGraph = new Graph();

    clickedVertexIndex = -1;

    questionType;
    questionCode;
    questionLoaded = false;

    weight = 0;

    color = "0";

    //Clear dropdowns
    populateDropDowns();
}

function drawVertices(){
    // for(let i  = 0; i< graph.vertices.length; ++i){
    //     graph.getVertex(i).drawVertex();
    // }

    for(let i  = 0; i<graph.vertices.length; ++i){
        graphics.save();
        graph.getVertex(i).drawVertex();
        graphics.restore();
    }}

function drawEdges(){
    for(let i  = 0; i< graph.edges.length; ++i){
        graphics.save();
        graph.edges[i].drawEdge();
        graphics.restore();
    }

    for(let i  = 0; i< graph.directedEdges.length; ++i){
        graphics.save();
        graph.directedEdges[i].drawEdge();
        graphics.restore();
    }
}

function setupInterface(){
    //Enable question setup stuff
    document.getElementById("questionSetupDiv").style.display = "initial";
    document.getElementById("edgeDiv").style.display = "initial";
    document.getElementById("addVertexDiv").style.display = "initial";
    document.getElementById("editVertexDiv").style.display = "initial";
    document.getElementById("deleteVertexDiv").style.display = "initial";


    switch (questionType) {
        case "bfs":
            //Colored
            colored = false;

            document.getElementById("editdistFromRoot").style.display = "none";
            document.getElementById("editdistFromRootLabel").style.display = "none";

            break;
        case "dfs":
            //Colored
            colored = false;

            document.getElementById("editdistFromRoot").style.display = "none";
            document.getElementById("editdistFromRootLabel").style.display = "none";

            break;
        case "mwst":
            //Colored
            colored = false;

            document.getElementById("editdistFromRoot").style.display = "initial";
            document.getElementById("editdistFromRootLabel").style.display = "initial";

            break;
        case "graphcolouring":
            //Colored
            colored = true;

            document.getElementById("editdistFromRoot").style.display = "none";
            document.getElementById("editdistFromRootLabel").style.display = "none";

            break;
        case "shortestpath":
            //Colored
            colored = false;

            document.getElementById("editdistFromRoot").style.display = "initial";
            document.getElementById("editdistFromRootLabel").style.display = "initial";

            break;
    }

    if(colored){
        document.getElementById("editVertexDiv").style.display = "initial";
        document.getElementById("editvertexColor").style.display = "initial";
        document.getElementById("editvertexColorLabel").style.display = "initial";
    }else if(!colored){
        document.getElementById("editVertexDiv").style.display = "none";
        document.getElementById("editvertexColor").style.display = "none";
        document.getElementById("editvertexColorLabel").style.display = "none";
    }

    if(weighted){
        document.getElementById("edgeWeight").style.display = "initial";
        document.getElementById("edgeWeightLabel").style.display = "initial";
        document.getElementById("updateEdgeDiv").style.display = "initial";
    }else if(!weighted){
        document.getElementById("edgeWeight").style.display = "none";
        document.getElementById("edgeWeightLabel").style.display = "none";
        document.getElementById("updateEdgeDiv").style.display = "none";
    }
}

function doSubmit(){ //When student submits graph
    console.log(graph);
    if(questionLoaded){
        //Initiliaze marker
        let m = new Marker();
        var isCorrect; //this variable stores whether or not the answer is correct
        //Mark Graph
        switch (questionType) {
            case "bfs":
                isCorrect = m.markShortestPath(questionGraph,graph,true);
                break;
            case "dfs":
                isCorrect = m.markDFS(questionGraph,graph,true);
                break;
            case "mwst":
                isCorrect = m.markMWST(questionGraph,graph);
                break;
            case "graphcolouring":
                isCorrect = m.markColour(graph);
                break;
            case "shortestpath":
                isCorrect = m.markShortestPath(questionGraph,graph,true);
                break;
        }
        if (isCorrect){
            alert("Your answer is correct");
        }else{
            alert("Your answer is incorrect");
        }
    }else{
        alert("Question graph has not been loaded.");
    }
}


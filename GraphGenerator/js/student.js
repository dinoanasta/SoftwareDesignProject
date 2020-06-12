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
let addedDirectedEdges = [];
let unusedDirectedEdges = [];

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
    document.getElementById("drawGraphButton").onclick = doDrawGraph;


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
    doClear();

    let questionTypeDisplay = document.getElementById("questionTypeLabel");

    let qCode = document.getElementById("questionCodeStudent");
    if(qCode.value.length != 0){
        questionCode = qCode.value;

        fetchQuestionGraph();

        setTimeout(function(){
            for(let i =0; i<questionGraph.getNumberVertices();i++){
                unusedVertices.push(questionGraph.getVertex(i).getVertexID());
            }

            for(let i=0;i<questionGraph.edges.length;++i){
                unusedEdges.push([questionGraph.edges[i].getVertexOne().getVertexID(),questionGraph.edges[i].getVertexTwo().getVertexID() ])
            }

            for(let i=0;i<questionGraph.directedEdges.length;++i){
                unusedDirectedEdges.push([questionGraph.directedEdges[i].getVertexOne().getVertexID(),questionGraph.directedEdges[i].getVertexTwo().getVertexID() ])
            }

            // console.log(unusedEdges);
            // console.log(unusedDirectedEdges);

            weighted = questionGraph.isWeighted();
            directed = questionGraph.isDirected();

            console.log("Question type: " + questionType);
            console.log("Weighted: " + weighted);
            console.log("Directed: " + directed);

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

function doDrawGraph(){
    if(questionLoaded){
        graph = questionGraph;

        unusedVertices = [];
        unusedEdges = [];
        unusedDirectedEdges = [];

        for(let i=0;i<graph.getNumberVertices();i++){
            addedVertices.push(graph.getVertex(i).getVertexID());
        }

        if(directed){
            for(let i=0; i<graph.directedEdges.length;++i){
                let v1ID = graph.directedEdges[i].getVertexOne().getVertexID();
                let v2ID = graph.directedEdges[i].getVertexTwo().getVertexID();
                addedDirectedEdges.push([v1ID, v2ID]);
            }
        }else{
            for(let i=0; i<graph.edges.length;++i){
                let v1ID = graph.edges[i].getVertexOne().getVertexID();
                let v2ID = graph.edges[i].getVertexTwo().getVertexID();
                addedEdges.push([v1ID, v2ID]);
            }
        }

        populateDropDowns();
        redraw();
    }else{
        alert("First load the question graph");
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

    if(dropDown.selectedIndex != 0){
        let vertexID = dropDown.options[dropDown.selectedIndex].value;

        let vertex = questionGraph.getVertex(vertexID);

        let value = vertex.getVertexVal();
        let x = vertex.getXVal();
        let y = vertex.getYVal();
        let color = vertex.getColor();

        graph.addVertex(value, x, y, color);
        let indexToChangeID = graph.getNumberVertices() -1;
        graph.getVertex(indexToChangeID).setVertexID(vertex.getVertexID());

        addedVertices.push(questionGraph.getVertex(vertexID).getVertexID());

        for(let i=0;i<unusedVertices.length;i++){
            if(unusedVertices[i] == questionGraph.getVertex(vertexID).getVertexID()){
                unusedVertices.splice(i,1);
            }
        }

        console.log(questionGraph);
        console.log(unusedVertices);
        console.log(graph);
        console.log(addedVertices);

        populateDropDowns();
        redraw();
    }else{
        alert("Select a vertex to add");
    }
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

    function findVertex(graph, ID){
        for(let i=0; i<graph.getNumberVertices();++i){
            if(graph.getVertex(i).getVertexID() == ID){
                return i
            }
        }
    }

    if(dropDown.selectedIndex != 0){
        let vertexID = dropDown.options[dropDown.selectedIndex].value;
        let vertexIndex = findVertex(graph, vertexID);

        addedVertices.push(graph.getVertex(vertexIndex).getVertexID());
        unusedVertices.push(graph.getVertex(vertexIndex).getVertexID());

        graph.removeVertex(vertexIndex);

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
function findEdgeIndex(edgesArray, first, second){
    for (let i = 0; i<edgesArray.length;++i){
        if ((edgesArray[i].getVertexOne().getVertexID() == first && edgesArray[i].getVertexTwo().getVertexID() == second) || (edgesArray[i].getVertexOne().getVertexID() == second && edgesArray[i].getVertexTwo().getVertexID() == first)){
            return i;
        }
    }
}

function doAddEdge() {
    let dropDown = document.getElementById("addEdgeDD");

    if(dropDown.selectedIndex !=0){

        let selected = dropDown.options[dropDown.selectedIndex].textContent;

        let splitted = selected.split(" ");

        let vertex1ID = splitted[1];
        let vertex2ID = splitted[6];

        function checkVerticesAdded(verticesArray, v1ID, v2ID){
            let totalTrue = 0;
            for (let i = 0; i<verticesArray.length;++i){
                if (verticesArray[i] == v1ID || verticesArray[i] == v2ID){
                    totalTrue++;
                }
            }

            if(totalTrue==2){
                return true;
            }else{
                return false;
            }
        }

        if(directed){
            if(checkVerticesAdded(addedVertices, vertex1ID, vertex2ID)){
                let questionEdge = questionGraph.getDirectedEdge(vertex1ID, vertex2ID);

                let v1ID = questionEdge.getVertexOne().getVertexID();
                let v2ID = questionEdge.getVertexTwo().getVertexID();
                if(weighted){
                    weight = questionEdge.getWeightEdge();
                }
                graph.addDirectedEdge(v1ID, v2ID, weight);
                let edgeIndex = findEdgeIndex(graph.getDirectedEdges(), v1ID, v2ID);

                addedDirectedEdges.push([v1ID, v2ID]);
                unusedDirectedEdges.splice(edgeIndex,1);
            }else{
                alert("Both vertices need to be added first");
            }
        }else{
            if(checkVerticesAdded(addedVertices,  vertex1ID, vertex2ID)){
                let questionEdge = questionGraph.getEdge(vertex1ID, vertex2ID);

                let v1ID = questionEdge.getVertexOne().getVertexID();
                let v2ID = questionEdge.getVertexTwo().getVertexID();
                if(weighted){
                    weight = questionEdge.getWeightEdge();
                }
                graph.addEdge(v1ID, v2ID, weight);
                let edgeIndex = findEdgeIndex(graph.getEdges(), v1ID, v2ID);

                addedEdges.push([v1ID, v2ID]);
                unusedEdges.splice(edgeIndex,1);
            }else{
                alert("Both vertices need to be added first");
            }
        }

        populateDropDowns();
        redraw();
    }else {
        alert("Please select an edge to add");
    }

}

function editEdgeSelected(){
    let dropDown = document.getElementById("updateEdgeDD");

    let weight;

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

        let vertex1ID = parseInt(splitted[1]);
        let vertex2ID = parseInt(splitted[6]);

        if(directed){
            let edgeIndex = findEdgeIndex(graph.directedEdges, vertex1ID, vertex2ID);

            unusedDirectedEdges.push([vertex1ID, vertex2ID]);
            addedDirectedEdges.splice(edgeIndex,1);

            graph.removeDirectedEdge(vertex1ID, vertex2ID);

        }else{
            let edgeIndex = findEdgeIndex(graph.edges, vertex1ID, vertex2ID);

            unusedEdges.push([vertex1ID, vertex2ID]);
            addedEdges.splice(edgeIndex,1);

            graph.removeEdge(vertex1ID, vertex2ID);
        }

        populateDropDowns();
        redraw();

    }else{
        alert("Please select an edge to delete");
    }
}

//Interface

function drawVertices(){
    for(let i  = 0; i<graph.getNumberVertices(); ++i){
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
    // console.log("Added vertices: " + addedVertices);
    // console.log("Added edges: " + addedEdges);
    // console.log("Added directed edges: " + addedDirectedEdges);
    //
    // console.log("Unused vertices: " + unusedVertices);
    // console.log("Unused edges: " + unusedEdges);
    // console.log("Unused directed edges: " + unusedDirectedEdges);

   //  console.log(questionGraph.getDirectedEdges());
   //  console.log(questionGraph.getEdges());


    //Vertices
    const deleteVertexDD = document.getElementById("deleteVertexDD");
    const updateVertexDD = document.getElementById("editVertexDD");
    const addVertexDD = document.getElementById("addVertexDD");

    //Edges
    const addEdgeDD = document.getElementById("addEdgeDD");
    const deleteEdgeDD = document.getElementById("deleteEdgeDD");
    // const vertex1DD = document.getElementById("vertex1DD");
    // const vertex2DD = document.getElementById("vertex2DD");
    const editEdgeDD = document.getElementById("updateEdgeDD");
    const setRootDD = document.getElementById("setRootDD");

    //Vertices
    clearDropDown(deleteVertexDD);
    clearDropDown(updateVertexDD);
    clearDropDown(addVertexDD);
    clearDropDown(setRootDD);

    //Edges
    clearDropDown(addEdgeDD);
    // clearDropDown(vertex1DD);
    // clearDropDown(vertex2DD);
    clearDropDown(deleteEdgeDD);
    clearDropDown(editEdgeDD);

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

    function findVertex(graph, ID){
        for(let i=0; i<graph.getNumberVertices();++i){
            if(graph.getVertex(i).getVertexID() == ID){
                return i;
            }
        }
    }

    console.log(questionGraph);
    console.log(unusedVertices);

    for (let i=0; i < unusedVertices.length;++i){
        let vertexID = parseInt(unusedVertices[i]);
        let vertexIndex = findVertex(questionGraph, vertexID);
        addVertexOption(addVertexDD, questionGraph.getVertex(vertexIndex).getVertexVal(), questionGraph.getVertex(vertexIndex).getVertexID(), questionGraph.getVertex(vertexIndex).getColor());
    }

    console.log(graph);
    console.log(addedVertices);

    for (let i=0; i < addedVertices.length;++i){
        let vertexID = parseInt(addedVertices[i]);
        let vertexIndex = findVertex(questionGraph, vertexID);
        addVertexOption(deleteVertexDD, questionGraph.getVertex(vertexIndex).getVertexVal(), questionGraph.getVertex(vertexIndex).getVertexID(), questionGraph.getVertex(vertexIndex).getColor());
        addVertexOption(updateVertexDD, questionGraph.getVertex(vertexIndex).getVertexVal(), questionGraph.getVertex(vertexIndex).getVertexID(), questionGraph.getVertex(vertexIndex).getColor());
        addVertexOption(setRootDD, questionGraph.getVertex(vertexIndex).getVertexVal(), questionGraph.getVertex(vertexIndex).getVertexID(), questionGraph.getVertex(vertexIndex).getColor());
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

    for(let i=0; i<unusedEdges.length;i++){
        let v1ID = parseInt(unusedEdges[i][0]);
        let v2ID = parseInt(unusedEdges[i][1]);
        let v1 = questionGraph.getVertex(v1ID);
        let v2 = questionGraph.getVertex(v2ID);
        if(weighted){
            weight = questionGraph.getEdge(v1ID, v2ID).getWeightEdge();
        }
        addEdgeOption(addEdgeDD, v1, v2, weight);
    }

    // console.log(questionGraph.getDirectedEdges());
    for(let i=0; i<unusedDirectedEdges.length;i++){
        let v1ID = parseInt(unusedDirectedEdges[i][0]);
        let v2ID = parseInt(unusedDirectedEdges[i][1]);
        let v1 = questionGraph.getVertex(v1ID);
        let v2 = questionGraph.getVertex(v2ID);
        // console.log(v1ID);
        // console.log(v2ID);
        // console.log(questionGraph.getDirectedEdges());
        // console.log(questionGraph.getDirectedEdge(1, 2));
        if(weighted){
            if(questionGraph.getDirectedEdge(v1ID, v2ID) != null){
                weight = questionGraph.getDirectedEdge(v1ID, v2ID).getWeightEdge();
            }else{
                weight = questionGraph.getDirectedEdge(v2ID, v1ID).getWeightEdge();
            }
        }
        addDirectedEdgeOption(addEdgeDD, v1, v2, weight);
    }

    for(let i=0; i<addedEdges.length;i++){
        let v1ID = parseInt(addedEdges[i][0]);
        let v2ID = parseInt(addedEdges[i][1]);
        let v1 = graph.getVertex(v1ID);
        let v2 = graph.getVertex(v2ID);
        if(weighted){
            weight = graph.getEdge(v1ID, v2ID).getWeightEdge();
        }
        addEdgeOption(deleteEdgeDD, v1, v2, weight);
        addEdgeOption(editEdgeDD, v1, v2, weight);
    }

    for(let i=0; i<addedDirectedEdges.length;i++){
        let v1ID = parseInt(addedDirectedEdges[i][0]);
        let v2ID = parseInt(addedDirectedEdges[i][1]);
        let v1 = graph.getVertex(v1ID);
        let v2 = graph.getVertex(v2ID);
        // console.log(graph.getDirectedEdges());
        // console.log(graph.getDirectedEdge(v1ID, v2ID));
        if(weighted){
            if(graph.getDirectedEdge(v1ID, v2ID) != null){
                weight = graph.getDirectedEdge(v1ID, v2ID).getWeightEdge();
            }else{
                weight = graph.getDirectedEdge(v2ID, v1ID).getWeightEdge();
            }
        }
        addDirectedEdgeOption(deleteEdgeDD, v1, v2, weight);
        addDirectedEdgeOption(editEdgeDD, v1, v2, weight);
    }
}

function doClear() {
    graphics.fillStyle = "white";
    graphics.fillRect(0, 0, canvas.width, canvas.height);

    //Enable question setup stuff
    // document.getElementById("questionSetupDiv").style.display = "initial";
    // document.getElementById("edgeDiv").style.display = "none";
    // document.getElementById("addVertexDiv").style.display = "none";
    // document.getElementById("editVertexDiv").style.display = "none";
    // document.getElementById("deleteVertexDiv").style.display = "none";

    //Reset variables
    selectedVertex = null;

    //Clear answer graph
    graph = new Graph(); //array of vertex objects, each having an array of adjacent vertices

    //Clear all tracking arrays
    addedVertices = [];
    unusedVertices = [];

    addedEdges = [];
    unusedEdges = [];
    addedDirectedEdges = [];
    unusedDirectedEdges = [];

    clickedVertexIndex = -1;

    questionType;
    questionCode;
    questionLoaded = false;

    //Clear dropdowns
    populateDropDowns();
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
        // document.getElementById("edgeWeight").style.display = "initial";
        // document.getElementById("edgeWeightLabel").style.display = "initial";
        document.getElementById("updateEdgeDiv").style.display = "initial";
    }else if(!weighted){
        // document.getElementById("edgeWeight").style.display = "none";
        // document.getElementById("edgeWeightLabel").style.display = "none";
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


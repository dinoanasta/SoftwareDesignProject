//Global variables
const userType = "student";

var selectedVertex = null;
const space = 4;

const vertexRadius = 15;

let graph = new Graph(); //array of vertex objects, each having an array of adjacent vertices
let questionGraph = new Graph();

let answerGraph;

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
    // document.getElementById("addVertexButton").onclick = doAddVertex;
    document.getElementById("editVertexDD").onchange = editVertexSelected;
    document.getElementById("updateVertexButton").onclick = doUpdateVertex;
    // document.getElementById("deleteVertexButton").onclick = doDeleteVertex;
    document.getElementById("setRootDD").onchange = setRoot;
    // document.getElementById("setRootButton").onclick = setRoot;
    document.getElementById("clearRootButton").onclick = removeRootVertex;
    document.getElementById("clearButton").onclick = doClear;

    //Edges
    document.getElementById("addEdgeButton").onclick = doAddEdge;
    // document.getElementById("updateEdgeDD").onchange = editEdgeSelected;
    // document.getElementById("updateEdgeButton").onclick = doUpdateEdge;
    document.getElementById("deleteEdgeButton").onclick = doDeleteEdge;

    //Interface
    document.getElementById("submitButton").onclick = doSubmit;
    window.addEventListener('keydown', handleKeyDown, false);
}

//Question setup
function doLoadGraph(){ //When student enters code and presses the load button
    let questionTypeDisplay = document.getElementById("questionTypeLabel");

    let qCode = document.getElementById("questionCodeStudent");
    if(qCode.value.length != 0){
        graphics.fillStyle = "white";
        graphics.fillRect(0, 0, canvas.width, canvas.height);

        questionCode = qCode.value;

        fetchQuestionGraph();

        setTimeout(function(){
            // unusedGraph = questionGraph;
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

            let temp = questionGraph.convertGraphToString(questionCode, questionType);
            answerGraph = new Graph();
            answerGraph.fillGraphWithString(temp);

            if(!colored){
                answerGraph.edges = [];
                answerGraph.directedEdges = [];
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
        let temp = questionGraph.convertGraphToString(questionCode, questionType);
        answerGraph = new Graph();
        answerGraph.fillGraphWithString(temp);

        console.log(questionGraph);
        console.log(answerGraph);

        populateDropDowns();
        redraw();
    }else{
        alert("First load the question graph");
    }
}

function doClear() {
    let questionTypeDisplay = document.getElementById("questionTypeLabel");

    graphics.fillStyle = "white";
    graphics.fillRect(0, 0, canvas.width, canvas.height);

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

    let temp = questionGraph.convertGraphToString(questionCode, questionType);
    answerGraph = new Graph();
    answerGraph.fillGraphWithString(temp);

    if(!colored){
        answerGraph.edges = [];
        answerGraph.directedEdges = [];
    }

    populateDropDowns();
    redraw();
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
function findVertex(graph, ID){
    for(let i=0; i<graph.getNumberVertices();++i){
        if(graph.getVertex(i).getVertexID() == ID){
            return i
        }
    }
}

function doAddVertex() {
    let dropDown = document.getElementById("addVertexDD");

    if(dropDown.selectedIndex != 0){
        let vertexID = parseInt(dropDown.options[dropDown.selectedIndex].value);

        let vertexIndex = findVertex(unusedGraph, vertexID);

        let vertex = unusedGraph.getVertex(vertexIndex);

        let value = vertex.getVertexVal();
        let x = vertex.getXVal();
        let y = vertex.getYVal();
        let color = vertex.getColor();

        unusedGraph.removeVertex(vertexIndex);

        graph.addVertex(value, x, y, color);

        let indexToChangeID = graph.getNumberVertices() -1;
        graph.getVertex(indexToChangeID).setVertexID(vertexID);

        populateDropDowns();
        redraw();
    }else{
        alert("Select a vertex to add");
    }
}

function editVertexSelected(){
    let dropDown = document.getElementById("editVertexDD");
    let vertexID = dropDown.options[dropDown.selectedIndex].value;

    document.getElementById("editvertexValueLabel").innerHTML = "Value: " + answerGraph.getVertex(vertexID).getVertexVal();
    document.getElementById("editvertexColor").value = answerGraph.getVertex(vertexID).getColor();
}

function doUpdateVertex(){
    let dropDown = document.getElementById("editVertexDD");

    let newColor = document.getElementById("editvertexColor").value;
    // let newDist = document.getElementById("editdistFromRoot").textContent;

    if(dropDown.selectedIndex != 0){
        let vertexID = dropDown.options[dropDown.selectedIndex].value;

        if(colored){
            answerGraph.updateVertexColor(vertexID, newColor);
        }
        // graph.getVertex(vertexID).setDistance(newDist);

        populateDropDowns();
        redraw();
    }else{
        if(clickedVertexIndex != -1){
            if(colored){
                answerGraph.getVertex(clickedVertexIndex).setColor(newColor);
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
        let vertexID = parseInt(dropDown.options[dropDown.selectedIndex].value);

        let vertexIndex = findVertex(graph, vertexID);

        let vertex = graph.getVertex(vertexIndex);

        let value = vertex.getVertexVal();
        let x = vertex.getXVal();
        let y = vertex.getYVal();
        let color = vertex.getColor();

        graph.removeVertex(vertexIndex);

        unusedGraph.addVertex(value, x, y, color);

        let indexToChangeID = unusedGraph.getNumberVertices() -1;
        unusedGraph.getVertex(indexToChangeID).setVertexID(vertexID);

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
        answerGraph.setSourceNode(vertexID);
        questionGraph.setSourceNode(vertexID);

        populateDropDowns();
        redraw();
    }else{
        alert("Please select a vertex to set as the root");
    }
}

function removeRootVertex(){
    answerGraph.setSourceNode(0);
    questionGraph.setSourceNode(0);

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
        //
        // function checkVerticesAdded(verticesArray, v1ID, v2ID){
        //     let totalTrue = 0;
        //     for (let i = 0; i<verticesArray.length;++i){
        //         if (verticesArray[i].getVertexID() == v1ID || verticesArray[i].getVertexID == v2ID){
        //             totalTrue++;
        //         }
        //     }
        //
        //     if(totalTrue==2){
        //         return true;
        //     }else{
        //         return false;
        //     }
        // }

        if(directed){
            let questionEdge = questionGraph.getDirectedEdge(vertex1ID, vertex2ID);

            let v1ID = questionEdge.getVertexOne().getVertexID();
            let v2ID = questionEdge.getVertexTwo().getVertexID();
            if(weighted){
                weight = questionEdge.getWeightEdge();
            }

            answerGraph.addDirectedEdge(v1ID, v2ID, weight);
        }else{
            let questionEdge = questionGraph.getEdge(vertex1ID, vertex2ID);

            let v1ID = questionEdge.getVertexOne().getVertexID();
            let v2ID = questionEdge.getVertexTwo().getVertexID();
            if(weighted){
                weight = questionEdge.getWeightEdge();
            }

            answerGraph.addEdge(v1ID, v2ID, weight);
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
            let questionEdge = questionGraph.getDirectedEdge(vertex1ID, vertex2ID);

            let v1ID = questionEdge.getVertexOne().getVertexID();
            let v2ID = questionEdge.getVertexTwo().getVertexID();
            if(weighted){
                weight = questionEdge.getWeightEdge();
            }
            answerGraph.removeDirectedEdge(v1ID, v2ID);
        }else{
            let questionEdge = questionGraph.getEdge(vertex1ID, vertex2ID);

            let v1ID = questionEdge.getVertexOne().getVertexID();
            let v2ID = questionEdge.getVertexTwo().getVertexID();
            if(weighted){
                weight = questionEdge.getWeightEdge();
            }
            answerGraph.removeEdge(v1ID, v2ID);
        }

        populateDropDowns();
        redraw();

    }else{
        alert("Please select an edge to delete");
    }
}

//Interface

function drawVertices(){
    for(let i  = 0; i<answerGraph.getNumberVertices(); ++i){
        graphics.save();
        answerGraph.getVertex(i).drawVertex();
        graphics.restore();
    }}

function drawEdges(){
    for(let i  = 0; i< answerGraph.getEdges().length; ++i){
        graphics.save();
        answerGraph.edges[i].drawEdge();
        graphics.restore();
    }

    for(let i  = 0; i< answerGraph.getDirectedEdges().length; ++i){
        graphics.save();
        answerGraph.directedEdges[i].drawEdge();
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
    //Vertices dropdowns
    // const deleteVertexDD = document.getElementById("deleteVertexDD");
    const setRootDD = document.getElementById("setRootDD");
    const updateVertexDD = document.getElementById("editVertexDD");
    // const addVertexDD = document.getElementById("addVertexDD");

    //Edges dropdowns
    const addEdgeDD = document.getElementById("addEdgeDD");
    const deleteEdgeDD = document.getElementById("deleteEdgeDD");
    // const editEdgeDD = document.getElementById("updateEdgeDD");

    //Clear vertices
    // clearDropDown(deleteVertexDD);
    clearDropDown(updateVertexDD);
    // clearDropDown(addVertexDD);
    clearDropDown(setRootDD);

    //Clear edges
    clearDropDown(addEdgeDD);
    clearDropDown(deleteEdgeDD);
    // clearDropDown(editEdgeDD);

    // Code to actually populate dropdowns
    function addVertexOption(DDB, vertex) {
        let opt = document.createElement("option");
        opt.textContent = "Vertex " + vertex.getVertexID().toString() + ": " + vertex.getVertexVal();
        if(colored){
            opt.textContent = "Vertex " + vertex.getVertexID().toString() + ": " + vertex.getVertexVal() + " (Color: " + vertex.getColor().toString() + ")";
        }
        opt.value = vertex.getVertexID().toString()
        DDB.options.add(opt);
    }

    //Populate add vertices dropdown with unusedGraph
    // for (let i=0; i < unusedGraph.getNumberVertices();++i){
    //     // addVertexOption(addVertexDD, unusedGraph.getVertex(i));
    // }

    //Populate delete, update, root vertices dropdowns with answerGraph
    for (let i=0; i < answerGraph.getNumberVertices(); ++i){
        // addVertexOption(deleteVertexDD, graph.getVertex(i));
        addVertexOption(updateVertexDD, answerGraph.getVertex(i));
        addVertexOption(setRootDD, answerGraph.getVertex(i));
    }

    //Code to actually populate dropdowns
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

    let unuaddedEdges = questionGraph.getVertexEdgeDifferences(answerGraph)[0];
    let unuaddedDirectedEdges = questionGraph.getVertexEdgeDifferences(answerGraph)[1];

    //Populate add edges dropdown with unusedGraph edges
    for(let i=0; i< unuaddedEdges.length;i++){
        let edge = unuaddedEdges[i];
        let v1 = edge.getVertexOne();
        let v2 = edge.getVertexTwo();
        addEdgeOption(addEdgeDD, v1, v2, weight);
    }

    //Populate add edges dropdown with unusedGraph directed edges
    for(let i=0; i<unuaddedDirectedEdges.length;i++){
        let edge = unuaddedDirectedEdges[i];
        let v1 = edge.getVertexOne();
        let v2 = edge.getVertexTwo();
        let weight = edge.getWeightEdge();
        addDirectedEdgeOption(addEdgeDD, v1, v2, weight);
    }

    //Populate delete edges dropdown with answerGraph edges
    for(let i=0; i<answerGraph.getEdges().length; i++){
        let edge = answerGraph.edges[i];
        let v1 = edge.getVertexOne();
        let v2 = edge.getVertexTwo();
        let weight = edge.getWeightEdge();
        addEdgeOption(deleteEdgeDD, v1, v2, weight);
    }

    //Populate delete edges dropdown with answerGraph directed edges
    for(let i=0; i<answerGraph.getDirectedEdges().length; i++){
        let edge = answerGraph.directedEdges[i];
        let v1 = edge.getVertexOne();
        let v2 = edge.getVertexTwo();
        if(weighted){
            weight = answerGraph.getDirectedEdge(v1.getVertexID(), v2.getVertexID()).getWeightEdge();
        }
        addDirectedEdgeOption(deleteEdgeDD, v1, v2, weight);
    }
}

function setupInterface(){
    //Enable question setup stuff
    document.getElementById("questionSetupDiv").style.display = "initial";
    document.getElementById("edgeDiv").style.display = "initial";
    // document.getElementById("addVertexDiv").style.display = "initial";
    document.getElementById("editVertexDiv").style.display = "initial";
    // document.getElementById("deleteVertexDiv").style.display = "initial";


    switch (questionType) {
        case "bfs":
            //Colored
            colored = false;
            break;
        case "dfs":
            //Colored
            colored = false;
            break;
        case "mwst":
            //Colored
            colored = false;
            break;
        case "graphcolouring":
            //Colored
            colored = true;
            break;
        case "shortestpath":
            //Colored
            colored = false;
            break;
    }

    if(colored){
        // document.getElementById("editVertexDiv").style.display = "initial";
        // document.getElementById("editvertexColor").style.display = "initial";
        // document.getElementById("editvertexColorLabel").style.display = "initial";

        document.getElementById("addEdgeDiv").style.display = "none";
        document.getElementById("deleteEdgeDiv").style.display = "none";
        document.getElementById("drawGraphButton").style.display = "none";
        document.getElementById("clearButton").style.display = "none";

        document.getElementById("editRootDiv").style.display = "none";

        let submitButton = document.getElementById("submitButton");
        document.getElementById("edgeDiv").removeChild(submitButton);
        document.getElementById("edgeDiv").style.display = "none";

        document.getElementById("editVertexDiv").appendChild(document.createElement("br"));
        document.getElementById("editVertexDiv").appendChild(document.createElement("br"));
        document.getElementById("editVertexDiv").appendChild(submitButton);

    }else if(!colored){
        document.getElementById("editVertexDiv").style.display = "none";
        document.getElementById("editvertexColor").style.display = "none";
        document.getElementById("editvertexColorLabel").style.display = "none";

        // document.getElementById("addEdgeDiv").style.display = "initial";
        // document.getElementById("deleteEdgeDiv").style.display = "initial";
        // document.getElementById("drawGraphButton").style.display = "initial";
        // document.getElementById("clearButton").style.display = "initial";
    }

}

function doSubmit(){ //When student submits graph
    console.log(answerGraph);
    if(questionLoaded){
        //Initiliaze marker
        let m = new Marker();
        var isCorrect; //this variable stores whether or not the answer is correct
        //Mark Graph
        switch (questionType) {
            case "bfs":
                isCorrect = m.markShortestPath(questionGraph,answerGraph,true);
                break;
            case "dfs":
                isCorrect = m.markDFS(questionGraph,answerGraph,true);
                break;
            case "mwst":
                isCorrect = m.markMWST(questionGraph,answerGraph);
                break;
            case "graphcolouring":
                isCorrect = m.markColour(answerGraph);
                break;
            case "shortestpath":
                isCorrect = m.markShortestPath(questionGraph,answerGraph,true);
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

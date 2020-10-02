//Global variables
const userType = "student";

var selectedVertex = null;
const space = 4;
let selectedEdge = null;

const vertexRadius = 15;

let questionGraph = new Graph();
let answerGraph;

let clickedVertexIndex = -1;

//Question Setup
let questionType;
let questionCode;
let questionUse;
let questionLoaded = false;
let link;

//Weighted
let weight = 1;
let weighted;

//Directed
let directed;

//Colored
let color = "0";
let colored;

//HTML DOM elements

let numTimesLoaded = 0;

const body = document.getElementById("body");

const studentDiv = document.getElementById("studentDiv");

const canvasDiv =  document.getElementById("canvasDiv");

const editingDiv =  document.getElementById("editingDiv");
const questionSetupDiv =  document.getElementById("questionSetupDiv");
const loadGraphButton = document.getElementById("loadGraphButton");

const addAllEdgesButton = document.getElementById("addAllEdgesButton");
const deleteAllEdgesButton = document.getElementById("deleteAllEdgesButton");

const questionTypeLabel = document.getElementById("questionTypeLabel");
const questionDetailsLabel = document.getElementById("questionDetailsLabel");

const editVertexDiv =  document.getElementById("editVertexDiv");

const addEdgeDiv =  document.getElementById("addEdgeDiv");
const deleteEdgeDiv =  document.getElementById("deleteEdgeDiv");
const checkButton =  document.getElementById("checkButton");
const downloadButton =  document.getElementById("downloadButton");
const iconButton = document.getElementById("iconButton");


//Bindings and event handlers
function addBindings() {

    console.log("Adding bindings");
    //Question setup
    document.getElementById("loadGraphButton").onclick = doLoadGraph;

    //Vertices
    document.getElementById("editVertexDD").onchange = editVertexSelected;
    document.getElementById("updateVertexButton").onclick = doUpdateVertex;

    //Edges
    document.getElementById("addEdgeButton").onclick = doAddEdge;
    document.getElementById("addAllEdgesButton").onclick = doAddAllEdges;

    document.getElementById("deleteEdgeButton").onclick = doDeleteEdge;
    document.getElementById("deleteAllEdgesButton").onclick = doDeleteAllEdges;


    //Interface
    document.getElementById("checkButton").onclick = doCheck;
    document.getElementById("downloadButton").onclick = doDownload;

    //Icon
    document.getElementById("iconButton").onclick = doOpenLink;

    window.addEventListener('keydown', handleKeyDown, false);
}

//Question setup
function doLoadGraph() { //When student enters code and presses the load button
    var file = document.getElementById("fileSelection").files[0];

    if (file != null) {
        let reader = new FileReader();

        reader.readAsText(file);

        reader.onload = function () {
            var graphText = reader.result;
            console.log(graphText);

            graphics.fillStyle = "white";
            graphics.fillRect(0, 0, canvas.width, canvas.height);

            // unusedGraph = questionGraph;
            questionGraph = new Graph();
            questionGraph.fillGraphWithString(graphText);


            var fetched_obj = JSON.parse(graphText);
            questionType = fetched_obj.questionType;
            questionUse = fetched_obj.questionUse;

            weighted = questionGraph.isWeighted();
            directed = questionGraph.isDirected();

            console.log("Question type: " + questionType);
            console.log("Weighted: " + weighted);
            console.log("Directed: " + directed);

            let temp = questionGraph.convertGraphToString(questionCode, questionType,"");
            console.log(temp);
            answerGraph = new Graph();
            answerGraph.fillGraphWithString(temp);

            if (!colored) {
                answerGraph.edges = [];
                answerGraph.directedEdges = [];
            }

            answerGraph.setSourceNode(questionGraph.getSourceNode());
            // questionGraph.setSourceNode(-1);

            questionLoaded = true;
            populateDropDowns();
            redraw();
            setupInterface();

            switch (questionType){
                case "bfs":
                    questionTypeLabel.innerHTML = "Question Type: Breadth First Search";
                    link = "https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/";
                    break;
                case "dfs" :
                    questionTypeLabel.innerHTML = "Question Type: Depth First Search";
                    link = "https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/";
                    break;
                case "mwst" :
                    questionTypeLabel.innerHTML = "Question Type: MWST";
                    link = "https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/";
                    break;
                case "graphcolouring" :
                    questionTypeLabel.innerHTML = "Question Type: Graph Colouring";
                    link = "https://www.geeksforgeeks.org/graph-coloring-set-2-greedy-algorithm/";
                    break;
                case "shortestpath" :
                    questionTypeLabel.innerHTML = "Question Type: Shortest Path";
                    link = "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/";
                    break;
            }

            if(directed){
                if(weighted){
                    questionDetailsLabel.innerHTML = "Details: Directed graph and weighted edges";
                }else{
                    questionDetailsLabel.innerHTML = "Details: Directed graph";
                }
            }else{
                if(weighted){
                    questionDetailsLabel.innerHTML = "Details: Undirected graph and weighted edges";
                }else{
                    questionDetailsLabel.innerHTML = "Details: Undirected graph";
                }
            }

            setupInterface();
            doAddAllEdges();
        };

        reader.onerror = function () {
            console.log(reader.error);
        };

    } else {
        alert("Please upload the question graph");
    }
}

// function setupInterfaceAfterGraphFetchedFromFB(){
//   let questionTypeDisplay = document.getElementById("questionTypeLabel");
//   setTimeout(function () {
//       // unusedGraph = questionGraph;
//       weighted = questionGraph.isWeighted();
//       directed = questionGraph.isDirected();
//
//       console.log("Question type: " + questionType);
//       console.log("Weighted: " + weighted);
//       console.log("Directed: " + directed);
//       console.log("Question Use: " + questionUse);
//
//       setupInterface();
//
//       if (directed) {
//           if (weighted) {
//               questionTypeDisplay.innerHTML = "Question Type: " + questionType + " (Directed & Weighted)";
//           } else {
//               questionTypeDisplay.innerHTML = "Question Type: " + questionType + " (Directed)";
//           }
//       } else {
//           if (weighted) {
//               questionTypeDisplay.innerHTML = "Question Type: " + questionType + " (Weighted)";
//           } else {
//               questionTypeDisplay.innerHTML = "Question Type: " + questionType;
//           }
//       }
//
//       let temp = questionGraph.convertGraphToString(questionCode, questionType, questionUse);
//       console.log(temp);
//       answerGraph = new Graph();
//       answerGraph.fillGraphWithString(temp);
//       console.log(answerGraph);
//
//       if (!colored) {
//           answerGraph.edges = [];
//           answerGraph.directedEdges = [];
//       }
//
//       answerGraph.setSourceNode(0);
//       questionGraph.setSourceNode(0);
//
//       populateDropDowns();
//       redraw();
//   }, 2000);
// }


function fetchQuestionGraph() { //Fetch question graph for student
    ref.on("value", gotData, errorData);
}

function gotData(data) { //Find question graph for student from fetched data
    var data = data.val();
    var keys = Object.keys(data);
    var foundQuestionGraph = false;
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        if (data[k].id === questionCode) {
            questionGraph.fillGraphWithString(data[k].graph);
            var fetchedObj = JSON.parse(data[k].graph);
            questionType = fetchedObj.questionType;
            questionUse = fetchedObj.questionUse;
            foundQuestionGraph = true;
            break;
        }
    }
    if (foundQuestionGraph) {
        questionLoaded = true;
        // setupInterfaceAfterGraphFetchedFromFB();
        alert("Question graph has successfully loaded");
    } else {
        let alertStr = "Could not find question graph with question code " + questionCode;
        alert(alertStr);
    }
}

function errorData(err) { //Jesse_new
    alert("An error has occured while trying to fetch the question graph from the server");
}

//Vertices
function editVertexSelected() {
    let dropDown = document.getElementById("editVertexDD");
    let vertexID = dropDown.options[dropDown.selectedIndex].value;

    document.getElementById("editvertexValueLabel").innerHTML = "Value: " + answerGraph.getVertex(vertexID).getVertexVal();
    document.getElementById("editvertexColor").value = answerGraph.getVertex(vertexID).getColor();
}

function doUpdateVertex() {
    let dropDown = document.getElementById("editVertexDD");

    let newColor = document.getElementById("editvertexColor").value;

    if (dropDown.selectedIndex != 0) {
        let vertexID = dropDown.options[dropDown.selectedIndex].value;

        if (colored) {
            answerGraph.updateVertexColor(vertexID, newColor);
        }
        // graph.getVertex(vertexID).setDistance(newDist);

        populateDropDowns();
        redraw();
    } else {
        if (clickedVertexIndex != -1) {
            if (colored) {
                answerGraph.getVertex(clickedVertexIndex).setColor(newColor);
            }
            // graph.getVertex(vertexID).setDistance(newDist);

            populateDropDowns();
            redraw();

        } else {
            alert("Please select a vertex to edit");
        }
    }
}

//Edges
function findEdgeIndex(edgesArray, first, second) {
    for (let i = 0; i < edgesArray.length; ++i) {
        if ((edgesArray[i].getVertexOne().getVertexID() == first && edgesArray[i].getVertexTwo().getVertexID() == second) || (edgesArray[i].getVertexOne().getVertexID() == second && edgesArray[i].getVertexTwo().getVertexID() == first)) {
            return i;
        }
    }
}

function doAddEdge() {
    let dropDown = document.getElementById("addEdgeDD");

    if (dropDown.selectedIndex != 0) {

        let selected = dropDown.options[dropDown.selectedIndex].textContent;

        let splitted = selected.split(" ");

        let vertex1ID = splitted[1];
        let vertex2ID = splitted[6];

        if (directed) {
            let questionEdge = questionGraph.getDirectedEdge(vertex1ID, vertex2ID);

            let v1ID = questionEdge.getVertexOne().getVertexID();
            let v2ID = questionEdge.getVertexTwo().getVertexID();
            if (weighted) {
                weight = questionEdge.getWeightEdge();
            }

            answerGraph.addDirectedEdge(v1ID, v2ID, weight);
        } else {
            let questionEdge = questionGraph.getEdge(vertex1ID, vertex2ID);

            let v1ID = questionEdge.getVertexOne().getVertexID();
            let v2ID = questionEdge.getVertexTwo().getVertexID();
            if (weighted) {
                weight = questionEdge.getWeightEdge();
            }

            answerGraph.addEdge(v1ID, v2ID, weight);
        }

        populateDropDowns();
        redraw();
    } else {
        alert("Please select an edge to add");
    }

}

function editEdgeSelected() {
    let dropDown = document.getElementById("updateEdgeDD");

    let weight;

    if (directed) {
        weight = answerGraph.getDirectedEdges()[dropDown.selectedIndex - 1].getWeightEdge();
    } else if (!directed) {
        weight = answerGraph.getEdges()[dropDown.selectedIndex - 1].getWeightEdge();
    }

    document.getElementById("editWeight").value = weight;
}

function doDeleteEdge() {
    let dropDown = document.getElementById("deleteEdgeDD");

    if (dropDown.selectedIndex != 0) {

        let selected = dropDown.options[dropDown.selectedIndex].textContent;

        let splitted = selected.split(" ");

        let vertex1ID = parseInt(splitted[1]);
        let vertex2ID = parseInt(splitted[6]);

        if (directed) {
            let questionEdge = questionGraph.getDirectedEdge(vertex1ID, vertex2ID);

            let v1ID = questionEdge.getVertexOne().getVertexID();
            let v2ID = questionEdge.getVertexTwo().getVertexID();
            if (weighted) {
                weight = questionEdge.getWeightEdge();
            }
            answerGraph.removeDirectedEdge(v1ID, v2ID);
        } else {
            let questionEdge = questionGraph.getEdge(vertex1ID, vertex2ID);

            let v1ID = questionEdge.getVertexOne().getVertexID();
            let v2ID = questionEdge.getVertexTwo().getVertexID();
            if (weighted) {
                weight = questionEdge.getWeightEdge();
            }
            answerGraph.removeEdge(v1ID, v2ID);
        }

        populateDropDowns();
        redraw();

    } else {
        alert("Please select an edge to delete");
    }
}


function doAddAllEdges() {
    let temp = questionGraph.convertGraphToString(questionCode, questionType);
    answerGraph = new Graph();
    answerGraph.fillGraphWithString(temp);

    populateDropDowns();
    redraw();
}

function doDeleteAllEdges() {
    if (!colored) {
        answerGraph.edges = [];
        answerGraph.directedEdges = [];
    }

    answerGraph.setSourceNode(questionGraph.getSourceNode());

    populateDropDowns();
    redraw();
    drawVertices();

}

//Interface

function drawVertices() {
    for (let i = 0; i < answerGraph.getNumberVertices(); ++i) {
        graphics.save();
        answerGraph.getVertex(i).drawVertex();
        graphics.restore();
    }
}

function drawEdges() {
    for (let i = 0; i < answerGraph.getEdges().length; ++i) {
        graphics.save();
        answerGraph.edges[i].drawEdge();
        graphics.restore();
    }

    for (let i = 0; i < answerGraph.getDirectedEdges().length; ++i) {
        graphics.save();
        answerGraph.directedEdges[i].drawEdge();
        graphics.restore();
    }
}

function redraw() {
    graphics.fillStyle = "white";
    graphics.fillRect(0, 0, canvas.width, canvas.height);
    drawEdges();
    drawVertices();
}

function clearDropDown(DDB) {
    if(document.getElementById("studentDiv").contains(DDB)){
            while (DDB.options.length > 1) {
                DDB.remove(1);
            }
    }
}

function populateDropDowns() {
    //Vertices dropdowns
    // const deleteVertexDD = document.getElementById("deleteVertexDD");
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

    //Clear edges
    clearDropDown(addEdgeDD);
    clearDropDown(deleteEdgeDD);
    // clearDropDown(editEdgeDD);

    // Code to actually populate dropdowns
    function addVertexOption(DDB, vertex) {
        if(document.getElementById("studentDiv").contains(DDB)) {
            let opt = document.createElement("option");
            opt.textContent = "Vertex " + vertex.getVertexID().toString() + ": " + vertex.getVertexVal();
            if (colored) {
                opt.textContent = "Vertex " + vertex.getVertexID().toString() + ": " + vertex.getVertexVal() + " (Color: " + vertex.getColor().toString() + ")";
            }
            opt.value = vertex.getVertexID().toString();
            DDB.options.add(opt);
        }
    }

    //Populate add vertices dropdown with unusedGraph
    // for (let i=0; i < unusedGraph.getNumberVertices();++i){
    //     // addVertexOption(addVertexDD, unusedGraph.getVertex(i));
    // }

    //Populate delete and update vertices dropdowns with answerGraph
    for (let i = 0; i < answerGraph.getNumberVertices(); ++i) {
        // addVertexOption(deleteVertexDD, graph.getVertex(i));
        addVertexOption(updateVertexDD, answerGraph.getVertex(i));
    }

    //Code to actually populate dropdowns
    function addEdgeOption(DDB, v1, v2, weight) {
        if(document.getElementById("studentDiv").contains(DDB)) {
            let opt = document.createElement("option");
            if (weighted) {
                opt.textContent = "Vertex " + v1.getVertexID() + " : " + v1.getVertexVal() + " <---" + weight + "---> " + "Vertex " + v2.getVertexID() + " : " + v2.getVertexVal();
            } else {
                opt.textContent = "Vertex " + v1.getVertexID() + " : " + v1.getVertexVal() + " <-------> " + "Vertex " + v2.getVertexID() + " : " + v2.getVertexVal();
            }
            DDB.options.add(opt);
        }
    }

    function addDirectedEdgeOption(DDB, v1, v2, weight) {
        if(document.getElementById("studentDiv").contains(DDB)) {
            let opt = document.createElement("option");
            if (weighted) {
                opt.textContent = "Vertex " + v1.getVertexID() + " : " + v1.getVertexVal() + " ||---" + weight + "---> " + "Vertex " + v2.getVertexID() + " : " + v2.getVertexVal();
            } else {
                opt.textContent = "Vertex " + v1.getVertexID() + " : " + v1.getVertexVal() + " ||-------> " + "Vertex " + v2.getVertexID() + " : " + v2.getVertexVal();
            }
            DDB.options.add(opt);
        }
    }

    let unuaddedEdges = questionGraph.getVertexEdgeDifferences(answerGraph)[0];
    let unuaddedDirectedEdges = questionGraph.getVertexEdgeDifferences(answerGraph)[1];

    //Populate add edges dropdown with unusedGraph edges
    for (let i = 0; i < unuaddedEdges.length; i++) {
        let edge = unuaddedEdges[i];
        let v1 = edge.getVertexOne();
        let v2 = edge.getVertexTwo();
        addEdgeOption(addEdgeDD, v1, v2, weight);
    }

    //Populate add edges dropdown with unusedGraph directed edges
    for (let i = 0; i < unuaddedDirectedEdges.length; i++) {
        let edge = unuaddedDirectedEdges[i];
        let v1 = edge.getVertexOne();
        let v2 = edge.getVertexTwo();
        let weight = edge.getWeightEdge();
        addDirectedEdgeOption(addEdgeDD, v1, v2, weight);
    }

    //Populate delete edges dropdown with answerGraph edges
    for (let i = 0; i < answerGraph.getEdges().length; i++) {
        let edge = answerGraph.edges[i];
        let v1 = edge.getVertexOne();
        let v2 = edge.getVertexTwo();
        let weight = edge.getWeightEdge();
        addEdgeOption(deleteEdgeDD, v1, v2, weight);
    }

    //Populate delete edges dropdown with answerGraph directed edges
    for (let i = 0; i < answerGraph.getDirectedEdges().length; i++) {
        let edge = answerGraph.directedEdges[i];
        let v1 = edge.getVertexOne();
        let v2 = edge.getVertexTwo();
        if (weighted) {
            weight = answerGraph.getDirectedEdge(v1.getVertexID(), v2.getVertexID()).getWeightEdge();
        }
        addDirectedEdgeOption(deleteEdgeDD, v1, v2, weight);
    }
}

function setupInterface() {
    //Clear page to add only what is needed
    if(body != null){
        while (body.firstChild ) {
            body.firstChild.remove();
        }
        body.appendChild(studentDiv);
    }

    if(studentDiv != null){
        while (studentDiv.firstChild ) {
            studentDiv.firstChild.remove();
        }
        studentDiv.appendChild(canvasDiv);
        studentDiv.appendChild(editingDiv);
    }

    //Clear editing div to add only what is needed
    if(editingDiv != null){
        while (editingDiv.firstChild) {
            editingDiv.firstChild.remove();
        }
        editingDiv.appendChild(questionSetupDiv);
    }

    questionSetupDiv.appendChild(questionTypeLabel);
    questionSetupDiv.appendChild(questionDetailsLabel);

    questionSetupDiv.removeChild(questionTypeLabel);
    questionSetupDiv.removeChild(questionDetailsLabel);

    switch (questionType) {
        case "bfs":
            colored = false;
            break;
        case "dfs":
            colored = false;
            break;
        case "mwst":
            colored = false;
            break;
        case "graphcolouring":
            colored = true;
            break;
        case "shortestpath":
            colored = false;
            break;
    }

    if(questionLoaded){

        questionSetupDiv.removeChild(loadGraphButton);
        questionSetupDiv.appendChild(questionTypeLabel);
        questionSetupDiv.appendChild(iconButton);
        iconButton.hidden = false;

        questionSetupDiv.appendChild(document.createElement("br"));

        questionSetupDiv.appendChild(questionDetailsLabel);
        questionSetupDiv.appendChild(document.createElement("br"));

        questionSetupDiv.appendChild(loadGraphButton);


        if (colored) { //Only need to change colors - no root/edges

            editingDiv.appendChild(document.createElement("br"));
            editingDiv.appendChild(editVertexDiv);

            //Add either check button or download button
            editingDiv.appendChild(document.createElement("br"));
            editingDiv.appendChild(document.createElement("br"));
            if(questionUse=="sub"){
                editingDiv.appendChild(downloadButton);
            }else if(questionUse=="prac"){
                editingDiv.appendChild(checkButton);
            }
            doAddAllEdges();

        } else if (!colored) { //Only need to add/delete edges and change root, no colors

            //Add edge div so users can add/delete edges
            studentDiv.appendChild(editingDiv);

            editingDiv.appendChild(document.createElement("br"));


            editingDiv.appendChild(addEdgeDiv);
            // addEdgeDiv.appendChild(addAllEdgesButton);
            editingDiv.appendChild(document.createElement("br"));
            editingDiv.appendChild(deleteEdgeDiv);
            // addEdgeDiv.appendChild(addAllEdgesButton);


            //Add either check button or download button
            editingDiv.appendChild(document.createElement("br"));
            editingDiv.appendChild(document.createElement("br"));
            if(questionUse=="sub"){
                editingDiv.appendChild(downloadButton);
            }else if(questionUse=="prac"){
                editingDiv.appendChild(checkButton);
            }
        }
    }
}

function doCheck() { //When student submits graph
    console.log(answerGraph);
    if (questionLoaded) {
        //Initiliaze marker
        let m = new Marker();
        var isCorrect; //this variable stores whether or not the answer is correct
        //Mark Graph
        switch (questionType) {
            case "bfs":
                isCorrect = m.markShortestPath(questionGraph, answerGraph, true);
                break;
            case "dfs":
                isCorrect = m.markDFS(questionGraph, answerGraph, true);
                breakgit ;
            case "mwst":
                isCorrect = m.markMWST(questionGraph, answerGraph);
                break;
            case "graphcolouring":
                isCorrect = m.markColour(answerGraph);
                break;
            case "shortestpath":
                isCorrect = m.markShortestPath(questionGraph, answerGraph, true);
                break;
        }
        if (isCorrect) {
            alert("Your answer is correct");
        } else {
            alert("Your answer is incorrect");
        }
    } else {
        alert("Question graph has not been loaded.");
    }
}

function doDownload() {
    var stringed = answerGraph.convertGraphToString(questionCode, questionType, questionUse);

    var blob = new Blob([stringed], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "Graph_" + questionType + ".txt");
}

function doOpenLink(){
        window.open(link, '_blank');         
}
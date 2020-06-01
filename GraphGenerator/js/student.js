//When student submits graph
function doSubmit(){
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
//Fetch question graph for student
function fetchQuestionGraph(){
  ref.on("value", gotData, errorData);
}

//Find question graph for student from fetched data
function gotData(data) {
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

//Jesse_new
function errorData(err) {
  alert("An error has occured while trying to fetch the question graph from the server");
}

function doLoadGraph(){
    let qCode = document.getElementById("questionCodeStudent");
    if(qCode.value.length != 0){
        questionCode = qCode.value;
        fetchQuestionGraph();
        console.log(questionGraph);
        graph = questionGraph;
        console.log(graph);
        populateDropDowns();
        redraw();
    }else{
        alert("Please enter the question code");
    }
}

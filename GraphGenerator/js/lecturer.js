function doSetQuestion() {
  let dropDown = document.getElementById("questionTypeDD");
  let qCode = document.getElementById("questionCodeLecturer");
  if (dropDown.selectedIndex != 0 && qCode.value.length != 0) {
    switch (dropDown.selectedIndex) {
      case 1:
        questionType = "bfs";
        break;
      case 2:
        questionType = "dfs";
        break;
      case 3:
        questionType = "mwst";
        break;
      case 4:
        questionType = "graphcolouring";
        break;
      case 5:
        questionType = "shortestpath";
        break;
    }

    //Disable question setup stuff
    // document.getElementById("questionSetupDiv").style.display = "none";
    // document.getElementById("edgeDiv").style.display = "initial";
    // document.getElementById("addVertexDiv").style.display = "initial";
    // document.getElementById("editVertexDiv").style.display = "initial";
    // document.getElementById("deleteVertexDiv").style.display = "initial";

    setupInterface(questionType);

    questionCode = qCode.value;

    alert("Question Type: " + questionType + "\nQuestion Code: " + questionCode);

  } else {
    alert("Please select a question type and enter a code");
  }
}

//When lecturer submits graph
function doCreate() {
  try {
    var data = {
      id: questionCode,
      graph: graph.convertGraphToString(questionType, questionType)
    }; //create object to pass into database , youll just put like id instead of name and the graph string instead of GFB
    ref.push(data);
    alert("Lecturer question successfully submitted");
  } catch (err) {
    alert("Error occured while trying to submit lecturer question graph");
  }
}


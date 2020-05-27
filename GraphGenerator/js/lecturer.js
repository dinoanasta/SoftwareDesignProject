//When lecturer submits graph
function doCreate(){
    alert("Lecturer question submitted");
}

function doSetQuestion(){
    let dropDown = document.getElementById("questionTypeDD");
    let qCode = document.getElementById("questionCodeLecturer");
    if(dropDown.selectedIndex != 0 && qCode.value.length != 0){
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
        setupInterface(questionType);

        questionCode = qCode.value;

        alert("Question Type: " + questionType + "\nQuestion Code: " + questionCode);
    }else{
        alert("Please select a question type and enter a code");
    }
}

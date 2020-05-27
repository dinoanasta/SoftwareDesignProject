//When student submits graph
function doSubmit(){
    alert("Student answer submitted");
}

function doLoadGraph(){
    let qCode = document.getElementById("questionCodeStudent");
    if(qCode.value.length != 0){
        questionCode = qCode.value;

        alert("Question Code: " + questionCode);
    }else{
        alert("Please enter the question code");
    }
}
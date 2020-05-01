const {Graph} = require('./Graphs');
const {Prim} = require('./Prim');

/**
 * This marker takes in the question graph, and applies Prim's Algorithm to that graph to find the cost of its MWST.
*  The marker also takes in the graph that is the student's submission to the question.
*  It then checks that if the 2 weights of the graph are equal. If the are equal then it returns true, otherwise it will return false.
*
* */

function MWSTMarker(questionGraph, studentGraph){
    var answerWeight = Prim(questionGraph);
    if (answerWeight == studentGraph.getTotalWeight()){
        return true;
    }else{
        return false;
    }
}
exports.MWSTMarker = MWSTMarker;





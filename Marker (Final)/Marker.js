//Marker class containing functions that call all marking algorithms
class Marker{

    constructor() {
    }

    //colouring
    markColour(answerGraph){
    	let m = new ColMarker();
    	var flag = m.isColoured(answerGraph);
    	return flag;
    }

    //MWST
    markMWST(questionGraph,answerGraph){
    	let m = new MWSTMarker();
    	var flag = m.isMWST(questionGraph,answerGraph);
    	return flag;
    }

    //DFS
    markDFS(memoGraph,answerGraph,isMemoQuestionGraph){
        let m = new dfsMarker(memoGraph,answerGraph,isMemoQuestionGraph);
        var flag = m.checkAnswerDFS();
        return flag;
    }

    //Dijkstra
    markDijkstra(memoGraph,answerGraph,isMemoQuestionGraph){
        let m = new ShortestPathMarker(memoGraph,answerGraph,isMemoQuestionGraph);
        var flag = m.checkAnswerShortestPath();
        return flag;
    }

}
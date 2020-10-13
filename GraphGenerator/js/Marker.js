//Marker class containing functions that call all marking algorithms
class Marker{

    constructor() {
    }

    markColour(answerGraph){
    	let m = new ColMarker();
    	var flag = m.isColoured(answerGraph);
    	return flag;
    }

    markMWST(questionGraph,answerGraph){
    	let m = new MWSTMarker();
    	var flag = m.isMWST(questionGraph,answerGraph);
    	return flag;
    }

    markDFS(memoGraph,answerGraph,isMemoQuestionGraph){
        let m = new dfsMarker(memoGraph,answerGraph,isMemoQuestionGraph);
        var flag = m.checkAnswerDFS();
        return flag;
    }

    markShortestPath(memoGraph,answerGraph,isMemoQuestionGraph,isBFS){
        if(isBFS){
            // convert all edge weights to 1
            var memoGraphAdjMat = memoGraph.getAdjacenyMatrix();
            var answerGraphAdjMat = answerGraph.getAdjacenyMatrix();
            var curr_src_node = memoGraph.getSourceNode();

            memoGraphAdjMat = this.convertAdjMatWeights(memoGraphAdjMat);
            answerGraphAdjMat = this.convertAdjMatWeights(answerGraphAdjMat);

            memoGraph = new Graph(memoGraphAdjMat);
            answerGraph = new Graph(answerGraphAdjMat);

            memoGraph.setSourceNode(curr_src_node);
            answerGraph.setSourceNode(curr_src_node);
        }

        let m = new ShortestPathMarker(memoGraph,answerGraph,isMemoQuestionGraph);
        var flag = m.checkAnswerShortestPath();
        return flag;
    }

    convertAdjMatWeights(adj_mat){
        for(var i=0;i<adj_mat.length;i++){
              for(var j=0;j<adj_mat.length;j++){
                  if(adj_mat[i][j]!=0){
                      adj_mat[i][j] = 1;
                  }
              }
        }
        return adj_mat;
    }

}

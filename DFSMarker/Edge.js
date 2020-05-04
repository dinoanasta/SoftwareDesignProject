//Edge class stores two vertices(as vertex class) the edge exists between and the weight of the edge
class Edge{
    constructor(vertexOne,vertexTwo,weight){
	    this.vertexOne=vertexOne;
        this.vertexTwo=vertexTwo;
	    this.weightEdge=weight;
    }

    setVertexOne(v1){
        this.vertexOne = v1;
    }

    setVertexTwo(v2){
        this.vertexTwo = v2;
    }

    setWeightEdge(we){
        this.weightEdge = we;
    }

    getVertexOne(){
        return this.vertexOne;
    }

    getVertexTwo(){
        return this.vertexTwo;
    }

    getWeightEdge(){
        return this.weightEdge;
    }

    drawEdge(){

    }

    updateCoOrds(){

    }

}

exports.Edge=Edge;

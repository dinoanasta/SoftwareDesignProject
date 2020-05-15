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
        graphics.font = "20px Comic Sans MS bold";
        graphics.textAlign = "center";

        graphics.strokeStyle = "black";
        graphics.strokeLine(this.getVertexOne().getXVal(), this.getVertexOne().getYVal(), this.getVertexTwo().getXVal(), this.getVertexTwo().getYVal());

        if(weighted){
            graphics.fillStyle = "red";
            graphics.fillText(this.getWeightEdge(), Math.abs(this.getVertexOne().getXVal() + this.getVertexTwo().getXVal())/2 +20, Math.abs(this.getVertexOne().getYVal() + this.getVertexTwo().getYVal())/2 +20, 20 );
        }
    }

    updateCoOrds (v1newX, v1newY, v2newX, v2newY){
        this.getVertexOne().setXVal(v1newX);
        this.getVertexOne().setYVal(v1newY);

        this.getVertexTwo().setXVal(v2newX);
        this.getVertexTwo().setYVal(v2newY);
    }

}
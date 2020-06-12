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
        graphics.lineWidth = 3;  // Use 1 pixel as the default line width
        graphics.strokeStyle = "lightgrey";
        graphics.strokeLine(this.getVertexOne().getXVal(), this.getVertexOne().getYVal(), this.getVertexTwo().getXVal(), this.getVertexTwo().getYVal());

        if(directed){
            if(weighted){
                graphics.fillStyle = "black";
                graphics.fillText(this.getWeightEdge(), (1/3)*this.getVertexOne().getXVal() + (2/3)*this.getVertexTwo().getXVal() +15 ,  (1/3)*this.getVertexOne().getYVal() + (2/3)*this.getVertexTwo().getYVal()+15, 20 );
            }
            let xx = ( (1/3)*this.getVertexOne().getXVal() + (2/3)*this.getVertexTwo().getXVal() );
            let yy = ( (1/3)*this.getVertexOne().getYVal() + (2/3)*this.getVertexTwo().getYVal() );
            graphics.fillStyle = "lightgray";
            graphics.fillCircle(xx, yy, 6);
        }else{
            if(weighted){
                graphics.fillStyle = "black";
                graphics.fillText(this.getWeightEdge(), Math.abs(this.getVertexOne().getXVal() + this.getVertexTwo().getXVal())/2 +15, Math.abs(this.getVertexOne().getYVal() + this.getVertexTwo().getYVal())/2 +15, 20 );
            }
        }

    }
}
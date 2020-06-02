//Class vertex stores vertex ID(starting from 0, increasing by 1 each time), vertex value, x and y co-ords 
//of vertex on gui, color of vertex and adjacencylist of neighbouring vertices
class Vertex{
    constructor(vertexID,vertexVal,xVal,yVal,color){
        this.AdjacencyList=new Array();
        this.vertexID=vertexID;
        this.vertexVal=vertexVal;
        this.xVal=xVal;
        this.yVal=yVal;
        this.color=color;
    }

    addAdjacency(v1){
      this.AdjacencyList.push(v1);
    }

    popAdjaceny(){
      this.AdjacencyList.pop();
    }

    getDegree(){
      return this.AdjacencyList.length;
    }

    setColor(color){
      this.color=color;
    }

    setVertexID(vID){
      this.vertexID = vID;
    }

    setVertexVal(vVal){
      this.vertexVal = vVal;
    }

    setXVal(x){
      this.xVal = x;
    }

    setYVal(y){
      this.yVal = y;
    }

    setAdjacenyList(adjL){
      this.AdjacencyList = adjL;
    }

    getColor(){
      return this.color;
    }

    getVertexID(){
      return this.vertexID;
    }

    getVertexVal(){
      return this.vertexVal;
    }

    getXVal(){
      return this.xVal;
    }

    getYVal(){
      return this.yVal;
    }

    getAdjacenyList(){
      return this.AdjacencyList;
    }

    drawVertex (){
        graphics.font = "20px Comic Sans MS bold";
        graphics.textAlign = "center";

        graphics.strokeStyle = "black";
        graphics.lineWidth = 5;
        graphics.strokeCircle(this.getXVal(), this.getYVal(), vertexRadius);

        graphics.fillStyle = "white";
        graphics.fillCircle(this.getXVal(), this.getYVal(), vertexRadius);

        // graphics.fillStyle = "white";
        // graphics.fillPoly(this.getXVal() + 22.5,this.getYVal() - 25,
        //             this.getXVal() + 85,this.getYVal() - 25,
        //             this.getXVal() + 85,this.getYVal() + 25,
        //             this.getXVal() + 22.5,this.getYVal() + 25);

        //Draw vertex with value in center
        graphics.textAlign = "center";
        graphics.fillStyle = "red";
        graphics.fillText(this.getVertexVal(), this.getXVal(), this.getYVal()+5, 20 );

        //Draw properties: ID, color, distance from root
        graphics.textAlign = "left";
        graphics.textBaseline = "top";
        graphics.fillStyle = "black";
        graphics.fillText("ID: " + this.getVertexID().toString(), this.getXVal() + 25 , this.getYVal() - 25);

        if(colored){
            graphics.fillText("Col: " + this.getColor().toString(), this.getXVal() + 25, this.getYVal());
        }
        // if(questionType == "mwst"){
        //     graphics.fillText("Dist: " + this.getColor().toString(), this.getXVal() + 45, this.getYVal() + 30, 40 );
        //}
    }
}
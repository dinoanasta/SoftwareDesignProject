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
    

    drawVertex(){

    }

    updateCoOrds(){

    }

}
//exports.Vertex=Vertex;
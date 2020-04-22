class Vertex{

this.AdjacencyList=new Array();

    constructor(vn,vertexVal,xVal,yVal,color,weight){
        this.vertexID=vn;
	this.vertexVal=vertexVal;
	this.xVal=xVal;
	this.yVal=yVal;
        this.color=color;
	this.weight=weight;
    }

    addAdjacency(v1){
        AdjacencyList.push(v1);
    }

    getDegree(){
      return AdjacencyList.length;
    }

    setColor(color){
      this.color=color;
    }

    setWeight(weight){
      this.weight=weight;
    }

    getColor(){
      return this.color;
    }

    getColor(){
      return this.weight;
    }

    drawVertex(){

    }

    updateCoOrds(){

    }

}


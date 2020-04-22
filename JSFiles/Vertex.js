class Vertex{



    constructor(vn,vertexVal,xVal,yVal,color){
	this.AdjacencyList=new Array();
        this.vertexID=vn;
	this.vertexVal=vertexVal;
	this.xVal=xVal;
	this.yVal=yVal;
        this.color=color;
    }

    addAdjacency(v1){
        this.AdjacencyList.push(v1);
    }

    getDegree(){
      return this.AdjacencyList.length;
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

    getWeight(){
      return this.weight;
    }

    drawVertex(){

    }

    updateCoOrds(){

    }

}


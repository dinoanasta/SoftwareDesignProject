class Vertex{



    constructor(vn,vertexVal,xVal,yVal,color,weight){
	this.AdjacencyList=new Array();
        this.vertexID=vn;
	this.vertexVal=vertexVal;
	this.xVal=xVal;
	this.yVal=yVal;
        this.color=color;
	this.weight=weight;
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

    getColor(){
      return this.weight;
    }

    drawVertex(){

    }

    updateCoOrds(){

    }

}


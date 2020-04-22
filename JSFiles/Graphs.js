

class Graph{



  constructor(){
    this.vertices=new Array();
    this.edges=new Array();
    this.directededges=new Array();
  }


  addVertex(vn,vertexVal,xVal,yVal,color){
    var v = new Vertex(vn,vertexVal,xVal,yVal,color);
    this.vertices.push(v);
  }

  getVertex(index){
    var v = this.vertices[index];
    return v;
  }

  addEdge(n1,n2,weight){
    var v1 = this.vertices[n1];
    var v2 = this.vertices[n2];
    var e=new Edge(v1,v2,weight);
    v1.addAdjacency(v2);
    v2.addAdjacency(v1);
    this.edges.push(e);
    
  }
	
  addDirectedEdge(n1,n2,weightEdge){
    var v1 = this.vertices[n1];
    var v2 = this.vertices[n2];
    var e=new Edge(v1,v2,weightEdge);
    v1.addAdjacency(v2);
    this.directededges.push(e);
  }

  totalWeight(){
    var total=0;
    for(var i=0;i<this.vertices.length;i++){
	var v=this.vertices[i];
	var vertexValue=v.getWeight();
	total+=vertexValue;
	}
     return total;
  }

}

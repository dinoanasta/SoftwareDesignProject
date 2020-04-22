

class Graph{



  constructor(adjMatrix,numberVertices,sourceNode){
    this.vertices=new Array();
    this.edges=new Array();
    this.matrix=adjMatrix;
    this.verticesNo=numberVertices;
    this.sourceNode=sourceNode;
  }


  addVertex(vn,vertexVal,xVal,yVal,color,weight){
    var v = new Vertex(vn,vertexVal,xVal,yVal,color,weight);
    this.vertices.push(v);
  }

  getVertex(index){
    var v = this.vertices[index];
    return v;
  }

  addEdge(n1,n2){
    var v1 = this.vertices[n1];
    var v2 = this.vertices[n2];
    var e=new Edge(v1,v2);
    this.edges.push(e);
    this.matrix[n1][n2]=1;
    this.matrix[n1][n2]=1;
  }

  totalWeight(){
    var total=0;
    for(var i=0;i<vertices.length;i++){
	var v=this.vertices[i];
	var vertexValue=v.getWeight();
	total+=vertexValue;
	}
     return total;
  }

}

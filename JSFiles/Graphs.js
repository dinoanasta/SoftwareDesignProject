

class Graph{

var vertices=[]
var edges=[]

  constructor(adjMatrix,numberVertices,sourceNode){
    this.matrix=adjMatrix;
    this.verticesNo=numberVertices;
    this.sourceNode=sourceNode;
  }


  addVertex(vn,vertexVal,xVal,yVal,color,weight){
    Vertex v = new Vertex(vn,vertexVal,xVal,yVal,color,weight);
    vertices.push(v);
  }

  getVertex(int index){
    Vertex v = vertices[index];
    return v;
  }

  addEdge(int n1, int n2){
    Vertex v1 = vertices[n1];
    Vertex v2 = vertices[n2];
    this.matrix[n1][n2]=1;
    this.matrix[n1][n2]=1;
  }

  totalWeight(){
    var total=0;
    for(var i=0;i<vertices.length;i++){
	Vertex v=vertices[i];
	var vertexValue=v.getWeight();
	total+=vertexValue;
	}
  }

}

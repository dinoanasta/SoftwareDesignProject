//Graph class stores array of vertices, undirected/directed edges and source node
//const {Vertex}=require('./Vertex');
//const {Edge}=require('./Edge');
class Graph{
  constructor(){
    this.vertices=new Array();
    this.edges=new Array();
    this.directedEdges=new Array();
    this.sourceNode = null;
  }

  setSourceNode(srcNode){
    this.sourceNode = srcNode;
  }

  getSourceNode(){
    return this.sourceNode;
  }

  //Return vertex at index if it exists else return null
  getVertex(index){
    var numberVertices = this.getNumberVertices();
    if(index<numberVertices){
      var v = this.vertices[index];
      return v;
    }else{
      return null;
    }
  }

  //Return edge between two vertex_ids if it exists else return null
  getEdge(v1_id,v2_id){
    for(var i=0;i<this.edges.length;i++){
      var curr_edge = this.edges[i];
      var curr_v1_id = curr_edge.getVertexOne().getVertexID();
      var curr_v2_id = curr_edge.getVertexTwo().getVertexID();
      if((curr_v1_id==v1_id&&curr_v2_id==v2_id)||(curr_v1_id==v2_id&&curr_v2_id==v1_id)){
        return curr_edge;
      }
    }
    return null;
  }

  //Return edge between two vertex_ids if it exists else return null
  getDirectedEdge(v1_id,v2_id){
    for(var i=0;i<this.directedEdges.length;i++){
      var curr_edge = this.directedEdges[i];
      var curr_v1_id = curr_edge.getVertexOne().getVertexID();
      var curr_v2_id = curr_edge.getVertexTwo().getVertexID();
      if(curr_v1_id==v1_id&&curr_v2_id==v2_id){
        return curr_edge;
      }
    }
    return null;
  }

  getNumberVertices(){
    return this.vertices.length;
  }

  getVertices(){
    return this.vertices;
  }

  getEdges(){
    return this.edges;
  }

  getDirectedEdges(){
    return this.directedEdges;
  }

  //Returns total weight of all edges stored
  getTotalWeight(){
    var total=0;
    for(var i=0;i<this.edges.length;i++){
	    var e=this.edges[i];
	    var edgeWeight=e.getWeightEdge();
	    total+=edgeWeight;
    }
    for(var i=0;i<this.directedEdges.length;i++){
	    var de=this.directedEdges[i];
	    var dirEdgeWeight=de.getWeightEdge();
	    total+=dirEdgeWeight;
  	}
    return total;
  }

  //Generates and returns an adjacency matrix based on current vertices and edges stored
  getAdjacenyMatrix(){
    var numberVertices = this.getNumberVertices();
    //Initialise matrix and fill with all 0's
    var adjMatrix = new Array(numberVertices).fill().map(()=>new Array(numberVertices).fill(0));
    //For each undirected edge update matrix 
    for(var i=0;i<this.edges.length;i++){
      var curr_edge = this.edges[i];
      var v1_id = curr_edge.getVertexOne().getVertexID();
      var v2_id = curr_edge.getVertexTwo().getVertexID();
      adjMatrix[v1_id][v2_id] = curr_edge.getWeightEdge();
      adjMatrix[v2_id][v1_id] = curr_edge.getWeightEdge();
    }
    //For each directed edge update matrix
    for(var i=0;i<this.directedEdges.length;i++){
      var curr_dir_edge = this.directedEdges[i];
      var v1_id = curr_dir_edge.getVertexOne().getVertexID();
      var v2_id = curr_dir_edge.getVertexTwo().getVertexID();
      adjMatrix[v1_id][v2_id] = curr_dir_edge.getWeightEdge();
    }
    return adjMatrix;
  }

  //Add new vertex to vertices array with id = current_number_of_vertices_stored
  addVertex(vertexVal,xVal,yVal,color){
    var curr_vertex_id = this.getNumberVertices();
    var v = new Vertex(curr_vertex_id,vertexVal,xVal,yVal,color);
    this.vertices.push(v);
  }

  //Add undirected edge between two vertices based on their id's given, with given weight or default weight of 1
  addEdge(v1_id,v2_id,weight=1){
    //First check that it doesn't already exist in either undirected/directed edges
    //If it does exist in either of these then remove the old edge and add this new edge
    var edgeExists = false;
    var edgeExistsInUndirected = false;
    var edgeExistsInDirected = false;
    //Check each undirected edge and see if we already store the edge we are trying to add
    for(var i=0;i<this.edges.length;i++){
      var curr_edge = this.edges[i];
      var curr_v1_id = curr_edge.getVertexOne().getVertexID();
      var curr_v2_id = curr_edge.getVertexTwo().getVertexID();
      //Check if the current edge is the same as the edge we are trying to add
      if((curr_v1_id==v1_id&&curr_v2_id==v2_id)||(curr_v1_id==v2_id&&curr_v2_id==v1_id)){
        edgeExists = true;
        edgeExistsInUndirected = true;
        break;
      }
    }
    //Check each directed edge and see if we already store the edge we are trying to add
    if(!edgeExists){
      for(var i=0;i<this.directedEdges.length;i++){
        var curr_edge = this.directedEdges[i];
        var curr_v1_id = curr_edge.getVertexOne().getVertexID();
        var curr_v2_id = curr_edge.getVertexTwo().getVertexID();
        //Check if the current edge is the same as the edge we are trying to add
        if((curr_v1_id==v1_id&&curr_v2_id==v2_id)||(curr_v1_id==v2_id&&curr_v2_id==v1_id)){
          edgeExists = true;
          edgeExistsInDirected = true;
          break;
        }
      }
    }
    //If the edge doesn't already exist then we can safely add it
    if(!edgeExists){
      this.addCurrEdge(v1_id,v2_id,weight);
    }else{
      //If the edge exists in undirected edges, simply update that edge with the new weight
      if(edgeExistsInUndirected){
        this.updateEdge(v1_id,v2_id,weight);
      }
      //Else if the edge exists in directed edges, remove both potential directed edges
      //and add the new edge
      else if(edgeExistsInDirected){
        this.removeDirectedEdge(v1_id,v2_id);
        this.removeDirectedEdge(v2_id,v1_id);
        this.addCurrEdge(v1_id,v2_id,weight);
      }
    }
  }

  //Create new edge, add edge to array of edges, and update relevant vertex AdjacencyLists
  addCurrEdge(v1_id,v2_id,weight){
    var v1 = this.getVertex(v1_id);
    var v2 = this.getVertex(v2_id);
    //Check if vertices actually exist
    if(v1!==null&&v2!==null){
      var e=new Edge(v1,v2,weight);
      v1.addAdjacency(v2);
      v2.addAdjacency(v1);
      this.edges.push(e);
    }
  }

  //Add directed edge between two vertices based on their id's given, with given weight or default weight of 1
  addDirectedEdge(v1_id,v2_id,weight=1){
    //First check that it doesn't already exist in either undirected/directed edges
    //If it does exist in either of these then remove the old edge and add this new edge
    var edgeExists = false;
    var edgeExistsInUndirected = false;
    var edgeExistsInDirected = false;
    //Check each undirected edge and see if we already store the edge we are trying to add
    for(var i=0;i<this.edges.length;i++){
      var curr_edge = this.edges[i];
      var curr_v1_id = curr_edge.getVertexOne().getVertexID();
      var curr_v2_id = curr_edge.getVertexTwo().getVertexID();
      //Check if the current edge is the same as the edge we are trying to add
      if((curr_v1_id==v1_id&&curr_v2_id==v2_id)||(curr_v1_id==v2_id&&curr_v2_id==v1_id)){
        edgeExists = true;
        edgeExistsInUndirected = true;
        break;
      }
    }
    //Check each directed edge and see if we already store the edge we are trying to add
    if(!edgeExists){
      for(var i=0;i<this.directedEdges.length;i++){
        var curr_edge = this.directedEdges[i];
        var curr_v1_id = curr_edge.getVertexOne().getVertexID();
        var curr_v2_id = curr_edge.getVertexTwo().getVertexID();
        //Check if the current edge is the same as the edge we are trying to add
        if(curr_v1_id==v1_id&&curr_v2_id==v2_id){
          edgeExists = true;
          edgeExistsInDirected = true;
          break;
        }
      }
    }
    //If the edge doesn't already exist then we can safely add it
    if(!edgeExists){
      this.addCurrDirectedEdge(v1_id,v2_id,weight);
    }else{
      //If the edge exists in undirected edges, then remove that edge and add the new edge
      if(edgeExistsInUndirected){
        this.removeEdge(v1_id,v2_id);
        this.removeEdge(v2_id,v1_id);
        this.addCurrDirectedEdge(v1_id,v2_id,weight);
      }
      //Else if the edge exists in directed edges, then update the directed edge
      else if(edgeExistsInDirected){
        this.updateDirectedEdge(v1_id,v2_id,weight);
      }
    }
  }

  //Create new edge, add edge to array of edges, and update relevant vertex AdjacencyLists
  addCurrDirectedEdge(v1_id,v2_id,weightEdge){
    var v1 = this.getVertex(v1_id);
    var v2 = this.getVertex(v2_id);
    //Check if vertices actually exist
    if(v1!==null&&v2!==null){
      var e=new Edge(v1,v2,weightEdge);
      v1.addAdjacency(v2);
      this.directedEdges.push(e);
    }
  }

  //Update vertex value if it exists
  updateVertexVal(vertex_id, new_vertex_val){
    var curr_vertex = this.getVertex(vertex_id);
    if(curr_vertex!==null){
      curr_vertex.setVertexVal(new_vertex_val);
    }
  }

  //Update vertex x and y values if it exists
  updateXandYVal(vertex_id, new_x_val, new_y_val){
    var curr_vertex = this.getVertex(vertex_id);
    if(curr_vertex!==null){
      curr_vertex.setXVal(new_x_val);
      curr_vertex.setYVal(new_y_val);
    }
  }

  //Update vertex color if it exists
  updateVertexColor(vertex_id, new_vertex_colour){
    var curr_vertex = this.getVertex(vertex_id);
    if(curr_vertex!==null){
      curr_vertex.setColor(new_vertex_colour);
    }
  }

  //If edge exists update it's weight
  updateEdge(v1_id, v2_id, new_weight){
    var edge_to_update = this.getEdge(v1_id,v2_id);
    if(edge_to_update !== null){
      edge_to_update.setWeightEdge(new_weight);
    }
  }

  //If edge exists update it's weight
  updateDirectedEdge(v1_id,v2_id,new_weight){
    var edge_to_update = this.getDirectedEdge(v1_id,v2_id);
    if(edge_to_update !== null){
      edge_to_update.setWeightEdge(new_weight);
    }
  }

  //Remove vertex and any edges connected to it
  removeVertex(vertex_id){
    var vertex_to_remove = this.getVertex(vertex_id);
    //Check if vertex exists 
    if(vertex_to_remove!==null){
      //Remove edges that use it
      var edge_indexes_to_remove = [];
      var directed_edge_indexes_to_remove = [];

      //Get indices of undirected edges that are connected to vertex
      for(var i=0;i<this.edges.length;i++){
        var curr_edge = this.edges[i];
        var curr_v1_id = curr_edge.getVertexOne().getVertexID();
        var curr_v2_id = curr_edge.getVertexTwo().getVertexID();
        if(curr_v1_id == vertex_id || curr_v2_id == vertex_id){
          edge_indexes_to_remove.push(i);
        }
      }
      //Get indices of directed edges that are connected to vertex
      for(var i=0;i<this.directedEdges.length;i++){
        var curr_edge = this.directedEdges[i];
        var curr_v1_id = curr_edge.getVertexOne().getVertexID();
        var curr_v2_id = curr_edge.getVertexTwo().getVertexID();
        if(curr_v1_id == vertex_id || curr_v2_id == vertex_id){
          directed_edge_indexes_to_remove.push(i);
        }
      }

      //Delete all undirected edges at indices where that specific edge connects to the vertex
      for(var i=0;i<edge_indexes_to_remove.length;i++){
        var curr_edge_index = edge_indexes_to_remove[i]-i;
        var curr_edge = this.edges[curr_edge_index];
        var curr_v1_id = curr_edge.getVertexOne().getVertexID();
        var curr_v2_id = curr_edge.getVertexTwo().getVertexID();
        this.removeEdge(curr_v1_id,curr_v2_id);
      }

      //Delete all directed edges at indices where that specific edge connects to the vertex
      for(var i=0;i<directed_edge_indexes_to_remove.length;i++){
        var curr_edge_index = directed_edge_indexes_to_remove[i]-i;
        var curr_edge = this.directedEdges[curr_edge_index];
        var curr_v1_id = curr_edge.getVertexOne().getVertexID();
        var curr_v2_id = curr_edge.getVertexTwo().getVertexID();
        this.removeDirectedEdge(curr_v1_id,curr_v2_id);
      }

      //Remove vertex from vertices array
      this.vertices.splice(vertex_id,1);

      //Change all vertex indices to fill hole in array
      for(var i=0;i<this.vertices.length;i++){
        var curr_vertex = this.vertices[i];
        curr_vertex.setVertexID(i);
      }

      //Set vertex = null to avoid memory leak
      vertex_to_remove = null;
    }
  }

  //Remove a vertex from another vertexs' adjacency list based on vertex ids
  removeFromVertexAdjacenyList(v_remove_from_id,v_remove_id){
    var curr_vertex = this.getVertex(v_remove_from_id);
    var curr_vertex_adj_list = curr_vertex.getAdjacenyList();
    var ind_remove = null;
    for(var i = 0;i<curr_vertex_adj_list.length;i++){
      var curr_vertex_id_in_adj_list = curr_vertex_adj_list[i].getVertexID();
      if(curr_vertex_id_in_adj_list==v_remove_id){
        ind_remove = i;
        break;
      }
    }
    //Remove element at index from array
    curr_vertex_adj_list.splice(ind_remove,1);
  }

  //Remove edge from edges array and update relevant vertex adjaceny lists
  removeEdge(v1_id,v2_id){
    var edge_remove=null;
    var ind_remove=null;
    for(var i=0;i<this.edges.length;i++){
      var curr_edge = this.edges[i];
      var curr_v1_id = curr_edge.getVertexOne().getVertexID();
      var curr_v2_id = curr_edge.getVertexTwo().getVertexID();
      if((curr_v1_id==v1_id&&curr_v2_id==v2_id)||(curr_v1_id==v2_id&&curr_v2_id==v1_id)){
        edge_remove = curr_edge;
        ind_remove = i;
        break;
      }
    }
    if(ind_remove!==null){
      //Remove element at index from array
      this.edges.splice(ind_remove,1);
      this.removeFromVertexAdjacenyList(v1_id,v2_id);
      this.removeFromVertexAdjacenyList(v2_id,v1_id);
      //Set edge = null to avoid memory leak
      edge_remove = null;
    }
  }

  //Remove edge from edges array and update relevant vertex adjaceny lists
  removeDirectedEdge(v1_id,v2_id){
    var edge_remove=null;
    var ind_remove=null;
    for(var i=0;i<this.directedEdges.length;i++){
      var curr_edge = this.directedEdges[i];
      var curr_v1_id = curr_edge.getVertexOne().getVertexID();
      var curr_v2_id = curr_edge.getVertexTwo().getVertexID();
      if(curr_v1_id==v1_id&&curr_v2_id==v2_id){
        edge_remove = curr_edge;
        ind_remove = i;
        break;
      }
    }
    if(ind_remove!==null){
      //Remove element at index from array
      this.directedEdges.splice(ind_remove,1);
      this.removeFromVertexAdjacenyList(v1_id,v2_id);
      //Set edge = null to avoid memory leak
      edge_remove = null;
    }
  }
}
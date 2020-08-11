import java.util.ArrayList;
import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;
//Graph123.txt, Graph_graphcolouring_freebobby.txt
//Make sure delete is working by filling holes with ids cause dino added some weird userType = lecturer

public class Graph {
  private ArrayList<Vertex> vertices = new ArrayList<Vertex>();
  // all edges in this array list are directed
  // this means for an edge between vertex a and vertex b in an undirected graph, both edge a-b and edge b-a will be stored.
  private ArrayList<Edge> edges = new ArrayList<Edge>();
  private String adjacency_matrix_str;
  private int[][] adjacency_matrix;
  private int sourceNode;
  private String question;
  private String questionType;
  private boolean isColoured;

  public Graph(String filename) {
    //read in graph from file
    try {
      Scanner sc = new Scanner(new File(filename));
      // file has one line in JSON format
      String line = sc.nextLine();
      sc.close();
      convertStringToClasses(line);
      //System.out.println(getGraph());
    } catch (FileNotFoundException e) {
      System.out.println("File not found: " + e);
    }
  }

  public ArrayList<Vertex> getVertices() {
    return vertices;
  }

  public ArrayList<Edge> getEdges() {
    return edges;
  }

  public String getAdjacency_matrix_str() {
    return adjacency_matrix_str;
  }

  public int[][] getAdjacency_matrix() {
    return adjacency_matrix;
  }

  public int getSourceNode() {
    return sourceNode;
  }

  public String getQuestion() {
    return question;
  }

  public String getQuestionType() {
    return questionType;
  }

  public void setVertices(ArrayList<Vertex> vertices) {
    this.vertices = vertices;
  }

  public void setEdges(ArrayList<Edge> edges) {
    this.edges = edges;
  }

  public void setAdjacency_matrix_str(String adjacency_matrix_str) {
    this.adjacency_matrix_str = adjacency_matrix_str;
  }

  public void setAdjacency_matrix(int[][] adjacency_matrix) {
    this.adjacency_matrix = adjacency_matrix;
  }

  public void setSourceNode(int sourceNode) {
    this.sourceNode = sourceNode;
  }

  public void setQuestion(String question) {
    this.question = question;
  }

  public void setQuestionType(String questionType) {
    this.questionType = questionType;
  }

  private void convertStringToClasses(String line){
    // graph stringyfy keys: "vertices", "adjacency_matrix", "source_node", "question", "questionType"
    // remove all "" from input string;
    line = line.replace("\"","");

    // scan line, 2nd token is vertices, 4th is adjacency matrix
    String[] data = line.split(":");
    String verts = data[1];
    String adj = data[2];
    String source_node_str = data[3];
    String question_str = data[4];
    String question_type_str = data[5];

    // store source node, question, question type
    sourceNode = Integer.parseInt(source_node_str.split(",")[0]);
    question = question_str.split(",")[0];
    questionType = question_type_str.replace("}","");

    // clean relevant strings
    verts = verts.substring(1, verts.length() - 19);
    // adjacency matrix displayed without outer square brackets
    this.adjacency_matrix_str = adj.substring(1, adj.length() - 13);

    // split verts into individual Vertex objects
    // vertex: id,"value",xVal,yVal,"color"
    String[] vertArr = verts.split("]");
    isColoured = false; // check if colour is printed or not
    for (int i = 0; i < vertArr.length; i++) {
      String temp = vertArr[i];
      //System.out.println("Jesso: "+temp);
      if (i != 0) {
        temp = temp.substring(2, temp.length());
      } else {
        temp = temp.substring(1, temp.length());
      }
      String[] vert = temp.split(",");
      int id = Integer.parseInt(vert[0]);
      //String value = vert[1].substring(1, vert[1].length() - 1);
      String value = vert[1];
      //int colour = Integer.parseInt(vert[4].substring(1, vert[4].length() - 1));
      int colour = Integer.parseInt(vert[4]);
      if (colour > 0 && isColoured == false) {
        isColoured = true;
      }
      Vertex vertex = new Vertex(id, value, colour);
      //System.out.println(vertex);
      vertices.add(vertex);
    }


    // store edges, and adjacency matrix
    String[] rows_adj_matrix = adjacency_matrix_str.split("]");
    adjacency_matrix = new int[rows_adj_matrix.length][rows_adj_matrix.length];
    for(int vertex_id=0; vertex_id<rows_adj_matrix.length; vertex_id++){
      String[] curr_vertex_edges = rows_adj_matrix[vertex_id].substring(1).replace("[","").split(",");
      for(int curr_vertex_edge_id = 0; curr_vertex_edge_id<curr_vertex_edges.length; curr_vertex_edge_id++){
        int edge_weight = Integer.parseInt(curr_vertex_edges[curr_vertex_edge_id]);
        if(edge_weight>0){
          Edge curr_edge = new Edge(vertices.get(vertex_id),vertices.get(curr_vertex_edge_id),edge_weight);
          edges.add(curr_edge);
          adjacency_matrix[vertex_id][curr_vertex_edge_id] = edge_weight;
        }
      }
    }
  }

  private void print2dArr(int[][] arr_2d){
    for(int i=0;i<arr_2d.length;i++){
      for(int j=0;j<arr_2d[i].length;j++){
        System.out.print(String.valueOf(arr_2d[i][j]));
      }
      System.out.println("");
    }
  }

  private String convert2dArrToString(int[][] arr_2d){
    String out = "";
    for(int i=0;i<arr_2d.length;i++){
      for(int j=0;j<arr_2d[i].length;j++){
        out += String.valueOf(arr_2d[i][j]);
      }
      out+="\n";
    }
    return out;
  }

  public String getGraph() {
    return "Graph [vertices="
            + vertices
            + ", adjacency_matrix="
            + adjacency_matrix_str + "]";
  }

  @Override
  public String toString() {
    return "Graph [vertices="
            + vertices
            + ", \nadjacency_matrix=[\n"
            + convert2dArrToString(adjacency_matrix)
            + "],\nedges="+edges+"]\n";
  }
}

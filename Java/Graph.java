import java.util.ArrayList;
import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;

public class Graph {
  private ArrayList<Vertex> vertices = new ArrayList<Vertex>();
  private ArrayList<ArrayList<Edge>> edges = new ArrayList<ArrayList<Edge>>();
  private String adjacency_matrix;
  private int sourceNode;
  private String question;
  private String questionType;

  public Graph(String filename) {
    //read in graph from file
    try {
      Scanner sc = new Scanner(new File(filename));
      // file has one line in JSON format
      String line = sc.nextLine();
      sc.close();

      // scan line, 2nd token is vertices, 4th is adjacency matrix
      String[] data = line.split(":");
      String verts = data[1];
      String adj = data[2];

      // clean relevant strings
      verts = verts.substring(1, verts.length() - 20);
      // adjacency matrix displayed without outer square brackets
      this.adjacency_matrix = adj.substring(1, adj.length() - 16);

      // split verts into individual Vertex objects
      // vertex: id,"value",xVal,yVal,"color"
      String[] vertArr = verts.split("]");
      boolean isColoured = false; // check if colour is printed or not
      for (int i = 0; i < vertArr.length; i++) {
        String temp = vertArr[i];
        if (i != 0) {
          temp = temp.substring(2, temp.length());
        } else {
          temp = temp.substring(1, temp.length());
        }
        String[] vert = temp.split(",");
        int id = Integer.parseInt(vert[0]);
        String value = vert[1].substring(1, vert[1].length() - 1);
        int colour = Integer.parseInt(vert[4].substring(1, vert[4].length() - 1));
        if (colour > 0 && isColoured == false) {
          isColoured = true;
        }
        Vertex vertex = new Vertex(id, value, colour);
        //System.out.println(vertex);
        vertices.add(vertex);
      }

      //System.out.println(getGraph());
    } catch (FileNotFoundException e) {
      System.out.println("File not found: " + e);
    }
  }

  public String getGraph() {
    return "Graph [vertices="
      + vertices
      + ", adjacency_matrix="
      + adjacency_matrix + "]";
  }

  @Override
  public String toString() {
    return "Graph [vertices="
      + vertices
      + ", adjacency_matrix="
      + adjacency_matrix + "]";
  }
}

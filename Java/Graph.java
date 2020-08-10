import java.util.ArrayList;
import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;

public class Graph {
  private ArrayList<Vertex> vertices;
  private ArrayList<ArrayList<Edge>> edges;
  private ArrayList<ArrayList<Integer>> adjacency_matrix;
  private int sourceNode;
  private String question;
  private String questionType;

  public Graph(String filename) {
    //read in graph from file
    // vertex: id,"value",xVal,yVal,"color"
    try {
      Scanner sc = new Scanner(new File(filename));
      // file has one line in JSON format
      String line = sc.nextLine();
      sc.close();

      // scan line, 2nd token is vertices, 4th is adjacency matrix
      Scanner ln = new Scanner(line).useDelimiter(":");
      String temp = ln.next();
      String verts = ln.next();
      String adj = ln.next();
      ln.close();

      System.out.println(verts);
      System.out.println(adj);

      // split verts into individual Vertex objects
    } catch (FileNotFoundException e) {
      System.out.println("File not found: " + e);
    }
  }

  public String getGraph() {
    return "Graph [vertices="
      + vertices
      + ", edges="
      + edges + "]";
  }

  @Override
  public String toString() {
    return "Graph [vertices="
      + vertices
      + ", edges="
      + edges + "]";
  }
}

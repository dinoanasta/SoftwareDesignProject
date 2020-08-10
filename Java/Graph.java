import java.util.ArrayList;
import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;

public class Graph {
  private ArrayList<Vertex> vertices;
  private ArrayList<ArrayList<Edge>> edges;
  private ArrayList<ArrayList<Integer>> adjList;

  public Graph(String filename) {
    //read in graph from file
    // vertex: id,"value",xVal,yVal,"color"
    try {
      Scanner sc = new Scanner(new File(filename));
      // file has one line in JSON format
      line = sc.nextLine();
      
      sc.close();
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

  public String toString() {
    return "Graph [vertices="
      + vertices
      + ", edges="
      + edges + "]";
  }
}

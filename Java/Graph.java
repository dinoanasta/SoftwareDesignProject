import java.util.ArrayList;
import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;

public class Graph {
  private ArrayList<Vertex> vertices;
  private ArrayList<Edge> edges;

  public Graph(String filename) {
    //read in graph from file
    try {
      Scanner sc = new Scanner(new File(filename));

      while(sc.hasNext()) {
        String line = sc.nextLine();
        //handle line
      }
      sc.close();
    } catch (FileNotFoundException e) {
      System.out.println("File not found: " + e);
    }
  }

  public String getGraph() {
    string out = "";

    return out;
  }
}

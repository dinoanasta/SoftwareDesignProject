import java.util.Scanner;
import java.util.ArrayList;

public class Converter {
  private static ArrayList<Graph> graphs = new ArrayList<Graph>();

  public static void main(String args[]) {
    Scanner sc = new Scanner(System.in);
    String filename;
    while (sc.hasNext()) {
      filename = sc.nextLine();
      if (filename.equalsIgnoreCase("exit") || filename.equalsIgnoreCase("quit")) {
        break;
      }
      Graph graph = new Graph(filename);
      graphs.add(graph);
    }
    sc.close();

    // display graphs
    System.out.println(getGraphs());
  }

  public ArrayList<Graph> getGraphList() {
    return this.graphs;
  }

  public static String getGraphs() {
    String out = "";
    for (int i = 0; i < graphs.size(); i++) {
      out = out + graphs.get(i).toString() + "\n";
    }
    return out;
  }
}

import com.google.gson.Gson;
import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;

public class JsonToObject {
  public static void main(String args[]) {
    Scanner sc = new Scanner(System.in);
    while (sc.hasLine()) {
      // read JSON from file
      String filename = sc.nextLine();
      String file = readFile(filename);

      // creating Graph object
      Graph graph = new Graph();

      // converting JSON to Java Object
      graph = getGraphObject();

      // displaying object
      System.out.println(graph);
    }
    sc.close();
  }

  private String readFile(String filename) {
    String out = "";
    try {
      Scanner sc = new Scanner(new File(filename));
      out = sc.nextLine();
      sc.close();
    } catch (FileNotFoundException e) {
      System.out.println("File not found: " + e);
    }
    return out;
  }

  private static Graph getGraphObject() {
    // storing preprocessed JSON (added slashes)
    String GraphJson = "";

    // example for pre-processed JSON
    /* String OrganisationJson
            = "{\"organisation_name\"
            : \"GeeksforGeeks\",
            \"description\"
            : \"A computer Science portal for Geeks\",
            \"Employee\"
            : \"2000\"}"; */

    // creating a Gson object
    Gson gson = new Gson();

    // converting JSON to object
    // first parameter should be preprocesses JSON
    // second parameter should be mapping class
    Graph graph = gson.fromJson(GraphJson, Graph.class);

    //return converted object
    return graph;
  }
}

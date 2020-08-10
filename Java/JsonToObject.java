import com.google.gson.Gson;
import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;

public class JsonToObject {
  public static void main(String args[]) {
    // read JSON from file
    try {
      Scanner sc = new Scanner(new File("Graph123.txt"));
      String line = sc.nextLine();
      System.out.println(line);
      sc.close();

      // preprocess JSON (add slashes)
      Scanner ln = new Scanner(line).useDelimiter("\"");
      ln.close();
    } catch (FileNotFoundException e) {
      System.out.println("File not found: " + e);
    }

    // creating Graph object
    Graph graph = new Graph();

    // converting JSON to Java Object
    graph = getGraphObject();

    // displaying object
    //System.out.println(graph);
  }

  private static Graph getGraphObject() {
    // storing preprocessed JSON (added slashes)
    String GraphJson =

    String OrganisationJson
            = "{\"organisation_name\"
            : \"GeeksforGeeks\",
            \"description\"
            : \"A computer Science portal for Geeks\",
            \"Employee\"
            : \"2000\"}";

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

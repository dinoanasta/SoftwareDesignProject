import java.util.ArrayList;

public class Edge {
  // assume for directed edge that v1 --> v2
  private Vertex v1, v2;
  private ArrayList<Vertex> edge = new ArrayList<Vertex>;

  public Edge(Vertex v1, Vertex v2) {
    this.v1 = v1;
    this.v2 = v2;
    edge.add(v1);
    edge.add(v2);
  }

  public Edge(ArrayList<Vertex> edge) {
    this.edge = edge;
    this.v1 = edge.get(0);
    this.v2 = edge.get(1);
  }

  public void setEdge(ArrayList<vertex> edge) {
    this.edge = edge;
    this.v1 = edge.get(0);
    this.v2 = edge.get(1);
  }

  public void setEdge(Vertex v1, Vertex v2) {
    this.v1 = v1;
    this.v2 = v2;
    edge.set(0, v1);
    edge.set(1, v2);
  }

  public ArrayList<Vertex> getEdge() {
    return this.edge;
  }

  public Vertex getV1() {
    return this.v1;
  }

  public Vertex getV2() {
    return this.v2;
  }
}

import java.util.ArrayList;

public class Edge {
  // assume for directed edge that v1 --> v2
  private Vertex v1, v2;
  private ArrayList<Vertex> edge = new ArrayList<Vertex>();
  private int weight;
  boolean isWeighted = false;

  public Edge(Vertex v1, Vertex v2) {
    this.v1 = v1;
    this.v2 = v2;
    edge.add(v1);
    edge.add(v2);
  }

  public Edge(Vertex v1, Vertex v2, int weight) {
    this.v1 = v1;
    this.v2 = v2;
    edge.add(v1);
    edge.add(v2);
    this.weight = weight;
    this.isWeighted = true;
  }

  public Edge(ArrayList<Vertex> edge) {
    this.edge = edge;
    this.v1 = edge.get(0);
    this.v2 = edge.get(1);
  }

  public Edge(ArrayList<Vertex> edge, int weight) {
    this.edge = edge;
    this.v1 = edge.get(0);
    this.v2 = edge.get(1);
    this.weight = weight;
    this.isWeighted = true;
  }

  public void setEdge(ArrayList<Vertex> edge) {
    this.edge = edge;
    this.v1 = edge.get(0);
    this.v2 = edge.get(1);
  }

  public void setEdge(ArrayList<Vertex> edge, int weight) {
    this.edge = edge;
    this.v1 = edge.get(0);
    this.v2 = edge.get(1);
    this.weight = weight;
    this.isWeighted = true;
  }

  public void setEdge(Vertex v1, Vertex v2) {
    this.v1 = v1;
    this.v2 = v2;
    edge.set(0, v1);
    edge.set(1, v2);
  }

  public void setEdge(Vertex v1, Vertex v2, int weight) {
    this.v1 = v1;
    this.v2 = v2;
    edge.set(0, v1);
    edge.set(1, v2);
    this.weight = weight;
    this.isWeighted = true;
  }

  public void setWeight(int weight) {
    this.weight = weight;
    this.isWeighted = true;
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

  public int getWeight() {
    if (this.isWeighted == true) {
      return this.weight;
    } else {
      return -1;
    }
  }

//  @Override
//  public String toString() {
//    String out = this.v1.getID()+"-"+this.v2.getID()+": "+this.weight+", ";
//    return out;
//  }
}

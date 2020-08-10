public class Vertex {
  private int id;
  private String value;
  private int xVal;
  private int yVal;
  private int colour;
  boolean isColoured = false;

  public Vertex(int id) {
    this.id = id;
  }

  public Vertex(int id, int colour) {
    this.id = id;
    this.colour = colour;
    this.isColoured = true;
  }

  public int getID() {
    return this.id;
  }

  public void setID(int id) {
    this.id = id;
  }

  public int getColour() {
    if (this.isColoured == true) {
      return this.colour;
    } else {
      return -1;
    }
  }

  public void setColour(int colour) {
    this.colour = colour;
    this.isColoured = true;
  }

  public String getVertex() {
    String out = "";
    out = out + this.value;
    if (this.isColoured == true) {
      out = out + "," + this.colour;
    }
    return out;
  }

  @Override
  public String toString() {
    String out = this.id + "," + this.value;
    if (this.isColoured == true) {
      out = out + "," + this.colour;
    }
    return out;
  }
}

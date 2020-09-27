public class Vertex {
  private int id;
  private String value;
  private int xVal;
  private int yVal;
  private int colour;
  boolean isColoured = false;

  public Vertex(int id, String value) {
    this.id = id;
    this.value = value;
  }

  public Vertex(int id, String value, int colour) {
    this.id = id;
    this.value = value;
    this.colour = colour;
    this.isColoured = true;
  }

  public int getID() {
    return this.id;
  }

  public void setID(int id) {
    this.id = id;
  }

  public String getValue() {
    return this.value;
  }

  public void setValue(String value) {
    this.value = value;
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

  public void setColoured(boolean isColoured) {
    this.isColoured = isColoured;
  }

  public String getVertex() {
    String out = "" + this.id + ";" + this.value;
    if (this.isColoured == true) {
      out = out + ";" + this.colour;
    }
    return out;
  }
//
//  @Override
//  public String toString() {
//    String out = this.id + "," + this.value;
//    if (this.isColoured == true) {
//      out = out + "," + this.colour;
//    }
//    return out;
//  }
}

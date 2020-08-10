public class Vertex {
  private int id;
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
}

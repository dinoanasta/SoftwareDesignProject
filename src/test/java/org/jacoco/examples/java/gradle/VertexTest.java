import org.junit.Assert;
//...
//Assert.assertEquals(...)

//import static org.junit.jupiter.api.Assertions.*;
import org.junit.Test;
//import org.junit.jupiter.api.Test;

public class VertexTest {
	@Test
	public void testConstructor1() { // Test the Vertex constructors.  
		Vertex v1 = new Vertex(0, "one", 3);
		Assert.assertEquals(0, v1.getID());
		
		Vertex v2 = new Vertex(0,"one", 3);
		Assert.assertEquals(0, v2.getID());
		Assert.assertEquals(3, v2.getColour());
		Assert.assertEquals(v2.isColoured, true);
	}
	
	@Test
	public void testGetID() { // Test the getID() function.
		Vertex v = new Vertex(5,"seven");
		int ID = v.getID();
		Assert.assertEquals(ID, v.getID());
	}
	
	@Test
	public void testSetID() { // Test the setID() function.
		Vertex v = new Vertex(3,"six");
		v.setID(2);
		Assert.assertEquals(2, v.getID());
	}
	
	@Test
	public void testGetColour() { // Test the getColour() function.
		// Case 1: The vertex is colored (The default case).
		Vertex v1 = new Vertex(20,"two");
		int colourv1 = v1.getColour();
		Assert.assertEquals(colourv1, v1.getColour());
		
		// Case 2: The vertex is not colored.
		Vertex v2 = new Vertex(10,"seven");
		v2.isColoured = false;
		int colourv2 = v2.getColour(); 
		Assert.assertEquals(-1, v2.getColour());
	}
	
	@Test
	public void testSetColour() { // Test the setColour() function.
		Vertex v = new Vertex(4,"eight");
		v.setColour(6);
		Assert.assertEquals(6, v.getColour());
		Assert.assertEquals(v.isColoured, true);
	}
	
	// id, value, colour 
	
	@Test
	public void testGetValue() { // Test the getValue() function.
		Vertex v = new Vertex(5,"three",11);
		String value = v.getValue();
		Assert.assertEquals(value, v.getValue());
	}
	
	@Test
	public void testSetValue() { // Test the setValue() function.
		Vertex v = new Vertex(3,"six",21);
		v.setValue("fifty");
		Assert.assertEquals("fifty", v.getValue());
	}
}
	
	
	
	
	



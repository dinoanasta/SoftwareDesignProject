import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import testing.JunitTesting;

class VertexTest {
	@Test
	public void testConstructor1() { // Test the Vertex constructors.  
		Vertex v1 = new Vertex(0);
		assertEquals(0, v1.getID());

		Vertex v2 = new Vertex(0,1);
		assertEquals(0, v2.getID());
		assertEquals(1, v2.getColour());
		assertEquals(v2.isColoured, true);
	}
	
	@Test
	public void testGetID() { // Test the getID() function.
		Vertex v = new Vertex(5,7);
		int ID = v.getID();
		assertEquals(ID, v.getID());
	}
	
	@Test
	public void testSetID() { // Test the setID() function.
		Vertex v = new Vertex(3,6);
		v.setID(2);
		assertEquals(2, v.getID());
	}
	
	@Test
	public void testGetColour() { // Test the getColour() function.
		// Case 1: The vertex is colored (The default case).
		Vertex v1 = new Vertex(20,2);
		int colourv1 = v1.getColour();
		assertEquals(colourv1, v1.getColour());
		
		// Case 2: The vertex is not colored.
		Vertex v2 = new Vertex(10,7);
		v2.isColoured = false;
		int colourv2 = v2.getColour(); 
		assertEquals(-1, v2.getColour());
	}
	
	@Test
	public void testSetColour() { // Test the setColour() function.
		Vertex v = new Vertex(4,8);
		v.setColour(6);
		assertEquals(6, v.getColour());
		assertEquals(v.isColoured, true);
	}
	
}
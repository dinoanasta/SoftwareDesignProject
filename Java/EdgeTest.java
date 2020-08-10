import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;

import org.junit.jupiter.api.Test;

class EdgeTest {
	public Vertex vertex1;
	public Vertex vertex2;
	
	public ArrayList<Vertex> setEdge(ArrayList<Vertex> edge) {
	    vertex1 = edge.get(0);
	    vertex2 = edge.get(1);
	    return edge;
	  }
	
	@Test
	public void testGetV1() { // Test the getv1() function.
		Vertex v1 = new Vertex(9,0);
		Vertex v2 = new Vertex(3,1);
		Edge e = new Edge(v1, v2);
		assertEquals(v1, e.getV1());
	}
	
	@Test
	public void testGetV2() { // Test the getv2() function.
		Vertex v1 = new Vertex(8,1);
		Vertex v2 = new Vertex(4,2);
		Edge e = new Edge(v1, v2);
		assertEquals(v2, e.getV2());
	}

	@Test
	public void testConstructor() { // Test the Edge constructor.
			Vertex v1 = new Vertex(1,0);
			Vertex v2 = new Vertex(2,1);
			Edge e = new Edge(v1, v2);
			assertEquals(v1, e.getV1());
			assertEquals(v2, e.getV2());
		}
	
	@Test 
	public void testSetEdge() { // Test the setEdge() function.
		Vertex v1 = new Vertex(2,3);
		Vertex v2 = new Vertex(4,5);
		Vertex v3 = new Vertex(4,6);
		Vertex v4 = new Vertex(5,3);
		Edge edge = new Edge(v1, v2);
		edge.setEdge(v3,v4);
		assertEquals(edge.getV1(), v3);
		assertEquals(edge.getV2(), v4);
	}
	
	@Test
	public void testGetEdge() { // Test the getEdge() function.
		Vertex v1 = new Vertex(1,0);
		Vertex v2 = new Vertex(2,1);
		Edge edge = new Edge(v1, v2);
		Edge newEdge = new Edge(v1,v2);
		assertEquals(edge.getEdge(), newEdge.getEdge());
	}
	
	@Test
	public void testEdge() {
		ArrayList<Vertex>edge = new ArrayList<Vertex>();
		Vertex v1 = new Vertex(1,0);
		Vertex v2 = new Vertex(2,0);
		edge.add(v1);
		edge.add(v2);
		Edge edgeNew = new Edge(edge);
		assertEquals(v1,edgeNew.getV1());
		assertEquals(v2,edgeNew.getV2());
	}
	
	@Test
	public void TestSetEdge() {
		ArrayList<Vertex>edge = new ArrayList<Vertex>();
		Vertex v1 = new Vertex(1,0);
		Vertex v2 = new Vertex(2,0);
		edge.add(v1);
		edge.add(v2);
		ArrayList<Vertex>newEdge = new ArrayList<Vertex>();
		newEdge = setEdge(edge);
		assertEquals(edge.get(0),newEdge.get(0));
		assertEquals(edge.get(1),newEdge.get(1));
	}
	
}

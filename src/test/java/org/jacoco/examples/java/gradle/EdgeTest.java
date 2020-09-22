import org.junit.Assert;
//...
//Assert.assertEquals(...)

//import static org.junit.jupiter.api.Assertions.*;
import org.junit.Test;
//import org.junit.jupiter.api.Test;
import java.util.ArrayList;


public class EdgeTest {
	public Vertex vertex1;
	public Vertex vertex2;
	private int weight;
	boolean isWeighted = false;
	
	public ArrayList<Vertex> setEdge(ArrayList<Vertex> edge) {
	    vertex1 = edge.get(0);
	    vertex2 = edge.get(1);
	    return edge;
	  }
	
	@Test
	public void testGetV1() { // Test the getv1() function.
		Vertex v1 = new Vertex(9,"zero", 0);
		Vertex v2 = new Vertex(3,"one",1);
		Edge e = new Edge(v1, v2);
		Assert.assertEquals(v1, e.getV1());
	}
	
	@Test
	public void testGetV2() { // Test the getv2() function.
		Vertex v1 = new Vertex(8,"zero",1);
		Vertex v2 = new Vertex(4,"one",2);
		Edge e = new Edge(v1, v2);
		Assert.assertEquals(v2, e.getV2());
	}

	@Test
	public void testConstructor() { // Test the Edge constructor.
			Vertex v1 = new Vertex(1,"zero",0);
			Vertex v2 = new Vertex(2,"one",1);
			Edge e = new Edge(v1, v2);
			Assert.assertEquals(v1, e.getV1());
			Assert.assertEquals(v2, e.getV2());
		}
	
	@Test 
	public void testSetEdge() { // Test the setEdge() function.
		Vertex v1 = new Vertex(2,"zero",3);
		Vertex v2 = new Vertex(4,"one",5);
		Vertex v3 = new Vertex(4,"two",6);
		Vertex v4 = new Vertex(5,"three",3);
		Edge edge = new Edge(v1, v2);
		edge.setEdge(v3,v4);
		Assert.assertEquals(edge.getV1(), v3);
		Assert.assertEquals(edge.getV2(), v4);
	}
	
	@Test
	public void testGetEdge() { // Test the getEdge() function.
		Vertex v1 = new Vertex(1,"zero",0);
		Vertex v2 = new Vertex(2,"one",1);
		Edge edge = new Edge(v1, v2);
		Edge newEdge = new Edge(v1,v2);
		Assert.assertEquals(edge.getEdge(), newEdge.getEdge());
	}
	
	@Test
	public void testEdge() { // Test the Edge() constructor.
		ArrayList<Vertex>edge = new ArrayList<Vertex>();
		Vertex v1 = new Vertex(1,"zero",0);
		Vertex v2 = new Vertex(2,"one",0);
		edge.add(v1);
		edge.add(v2);
		Edge edgeNew = new Edge(edge);
		Assert.assertEquals(v1,edgeNew.getV1());
		Assert.assertEquals(v2,edgeNew.getV2());
	}
	
	@Test
	public void TestSetEdge() { // Test the setEdge() function.
		ArrayList<Vertex>edge = new ArrayList<Vertex>();
		Vertex v1 = new Vertex(1,"zero",0);
		Vertex v2 = new Vertex(2,"one",0);
		edge.add(v1);
		edge.add(v2);
		ArrayList<Vertex>newEdge = new ArrayList<Vertex>();
		newEdge = setEdge(edge);
		Assert.assertEquals(edge.get(0),newEdge.get(0));
		Assert.assertEquals(edge.get(1),newEdge.get(1));
	}
	
	@Test
	public void TestEdge() { // Test the second Edge() constructor.
		ArrayList<Vertex>edge = new ArrayList<Vertex>();
		Vertex v1 = new Vertex(1,"zero",0);
		Vertex v2 = new Vertex(2,"one",0);
		edge.add(v1);
		edge.add(v2);
		Edge edgeNew = new Edge(v1, v2, 3);
		Assert.assertEquals(v1,edgeNew.getV1());
		Assert.assertEquals(v2,edgeNew.getV2());
		Assert.assertEquals(3, edgeNew.getWeight());
		Assert.assertEquals(true, edgeNew.isWeighted);
	}
	
	@Test
	public void TestSetEdge2() { // Test the second setEdge() function.
		ArrayList<Vertex>edge = new ArrayList<Vertex>();
		Vertex v1 = new Vertex(1,"zero",0);
		Vertex v2 = new Vertex(2,"one",0);
		edge.add(v1);
		edge.add(v2);
		//setEdge(edge,10);
		Assert.assertEquals(v1,edge.get(0));
		Assert.assertEquals(v2,edge.get(1));
		
	}
	
	@Test
	public void testGetWeight() { // Test the getWeight function.
		Vertex v1 = new Vertex(2,"zero",3);
		Vertex v2 = new Vertex(4,"one",5);
		Edge edge = new Edge(v1, v2, 10);
		Assert.assertEquals(10, edge.getWeight());	
		Vertex v3 = new Vertex(4,"two",6);
		Vertex v4 = new Vertex(5,"three",3);
		Edge edge2 = new Edge(v3,v4);
		Assert.assertEquals(-1, edge2.getWeight());
	}
		
	@Test
	public void TestEdge3() { // Test the third Edge() constructor.
		ArrayList<Vertex>edge = new ArrayList<Vertex>();
		Vertex v1 = new Vertex(1,"zero",0);
		Vertex v2 = new Vertex(2,"one",0);
		edge.add(v1);
		edge.add(v2);
		Edge edgeNew = new Edge(edge,10);
		Assert.assertEquals(v1,edgeNew.getV1());
		Assert.assertEquals(v2,edgeNew.getV2());
		Assert.assertEquals(10,edgeNew.getWeight());
		Assert.assertEquals(true,edgeNew.isWeighted);
	}
	
	@Test
	public void testSetWeight() { // Test the setWeight() function.
		Vertex v1 = new Vertex(9,"zero", 0);
		Vertex v2 = new Vertex(3,"one",1);
		Edge e = new Edge(v1, v2);
		e.setWeight(10);
		Assert.assertEquals(10, e.getWeight());
		Assert.assertEquals(true, e.isWeighted);
		
	}
}

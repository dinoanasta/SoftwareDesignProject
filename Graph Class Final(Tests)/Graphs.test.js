const { Vertex } = require("./Vertex");
const { Edge } = require("./Edge");
const { Graph } = require("./Graphs");

function getFilledGraph() {
  var filled_graph = new Graph();
  filled_graph.addVertex(1, 0, 0, 0);
  filled_graph.addVertex(2, 0, 0, 10);
  filled_graph.addVertex(3, 0, 0, 14);
  filled_graph.addVertex(4, 0, 0, 5);
  filled_graph.addVertex(5, 0, 0, 4);
  filled_graph.addVertex(6, 0, 0, 12);
  filled_graph.addVertex(7, 0, 0, 64);
  filled_graph.addVertex(8, 0, 0, 6);
  //Adding with weight/not
  filled_graph.addEdge(0, 1);
  filled_graph.addEdge(0, 2, 4);
  filled_graph.addDirectedEdge(1, 4);
  filled_graph.addDirectedEdge(3, 1, 3);

  return filled_graph;
}

test("constructor works", () => {
  var g = new Graph();
  expect(g.vertices.length).toBe(0);
  expect(g.edges.length).toBe(0);
  expect(g.directedEdges.length).toBe(0);
  expect(g.sourceNode).toBe(0);
});

test("setSourceNode works", () => {
  var g = new Graph();
  g.setSourceNode(0);
  expect(g.sourceNode).toBe(0);
});

test("getSourceNode works", () => {
  var g = new Graph();
  g.setSourceNode(1);
  expect(g.getSourceNode()).toBe(1);
});

test("getNumberVertices empty graph works", () => {
  var g = new Graph();
  expect(g.getNumberVertices()).toBe(0);
});

test("getTotalWeight empty graph works", () => {
  var g = new Graph();
  expect(g.getTotalWeight()).toBe(0);
});

test("getAdjacencyMatrix empty graph works", () => {
  var g = new Graph();
  expect(g.getAdjacenyMatrix()).toEqual([]);
});

test("addVertex works", () => {
  var g = new Graph();
  g.addVertex(0, 1, 2, 3);
  var v = new Vertex(0, 0, 1, 2, 3);
  expect(g.getVertex(0)).toEqual(v);
});

test("addEdges(Directed/Undirected) works", () => {
  var g = getFilledGraph();

  expect(g.getAdjacenyMatrix()).toEqual([
    [0, 1, 4, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0],
    [4, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  //Test adding undirected edges where edges already exist
  g.addEdge(1, 0, 2);
  g.addEdge(0, 2);
  g.addEdge(4, 1);
  g.addEdge(3, 1, 3);
  expect(g.getAdjacenyMatrix()).toEqual([
    [0, 2, 1, 0, 0, 0, 0, 0],
    [2, 0, 0, 3, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  //Test adding directed edges where edges already exist
  g = getFilledGraph();
  g.addDirectedEdge(0, 1, 3);
  g.addDirectedEdge(2, 0);
  g.addDirectedEdge(1, 4, 2);
  g.addDirectedEdge(1, 3);
  expect(g.getAdjacenyMatrix()).toEqual([
    [0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test("getVertex works", () => {
  var g = new Graph();
  g.addVertex(0, 1, 2, 3);
  var v = new Vertex(0, 0, 1, 2, 3);
  expect(g.getVertex(0)).toEqual(v);
  expect(g.getVertex(1)).toBe(null);
});

test("getEdges(both undirected/directed) works", () => {
  var g = getFilledGraph();

  //Test getting und edge(Exists)
  var edge = g.getEdge(0, 1);
  expect(edge.getVertexOne().getVertexID()).toBe(0);
  expect(edge.getVertexTwo().getVertexID()).toBe(1);
  expect(edge.getWeightEdge()).toBe(1);

  //Test getting und edge(Exists)
  edge = g.getEdge(1, 0);
  expect(edge.getVertexOne().getVertexID()).toBe(0);
  expect(edge.getVertexTwo().getVertexID()).toBe(1);
  expect(edge.getWeightEdge()).toBe(1);

  //Test getting und edge(Doesn't exist)
  edge = g.getEdge(1, 3);
  expect(edge).toBe(null);

  //Test getting dir edge(Exists)
  edge = g.getDirectedEdge(3, 1);
  expect(edge.getVertexOne().getVertexID()).toBe(3);
  expect(edge.getVertexTwo().getVertexID()).toBe(1);
  expect(edge.getWeightEdge()).toBe(3);

  //Test getting und edge(Doesn't exist)
  edge = g.getDirectedEdge(1, 3);
  expect(edge).toBe(null);

  //Test getting und edge(Doesn't exist)
  edge = g.getDirectedEdge(4, 1);
  expect(edge).toBe(null);
});

test("getNumberVertices non-empty graph works", () => {
  var g = getFilledGraph();
  expect(g.getNumberVertices()).toBe(8);
});

test("getVertices works", () => {
  var g = new Graph();
  g.addVertex(0, 1, 2, 3);
  g.addVertex(4, 5, 6, 7);
  var v1 = new Vertex(0, 0, 1, 2, 3);
  var v2 = new Vertex(1, 4, 5, 6, 7);
  expect(g.getVertices()).toEqual([v1, v2]);
});

test("getEdges works", () => {
  //Undirected edges
  var g = new Graph();
  g.addVertex(0, 1, 2, 3);
  g.addVertex(4, 5, 6, 7);
  g.addVertex(8, 9, 10, 11);
  g.addEdge(0, 1);
  g.addEdge(0, 2, 4);

  var allEdges = g.getEdges();
  expect(allEdges[0].getVertexOne().getVertexID()).toBe(0);
  expect(allEdges[0].getVertexTwo().getVertexID()).toBe(1);
  expect(allEdges[0].getWeightEdge()).toBe(1);
  expect(allEdges[1].getVertexOne().getVertexID()).toBe(0);
  expect(allEdges[1].getVertexTwo().getVertexID()).toBe(2);
  expect(allEdges[1].getWeightEdge()).toBe(4);

  //Directed edges
  g = new Graph();
  g.addVertex(0, 1, 2, 3);
  g.addVertex(4, 5, 6, 7);
  g.addVertex(8, 9, 10, 11);
  g.addDirectedEdge(0, 1);
  g.addDirectedEdge(0, 2, 4);

  allEdges = g.getDirectedEdges();
  expect(allEdges[0].getVertexOne().getVertexID()).toBe(0);
  expect(allEdges[0].getVertexTwo().getVertexID()).toBe(1);
  expect(allEdges[0].getWeightEdge()).toBe(1);
  expect(allEdges[1].getVertexOne().getVertexID()).toBe(0);
  expect(allEdges[1].getVertexTwo().getVertexID()).toBe(2);
  expect(allEdges[1].getWeightEdge()).toBe(4);
});

test("getTotalWeight works", () => {
  var g = getFilledGraph();
  expect(g.getTotalWeight()).toBe(9);
});

test("updateVertex works", () => {
  var g = getFilledGraph();
  g.updateVertexVal(0, 101);
  g.updateXandYVal(0, 122, 31);
  g.updateVertexColor(0, 241);

  var v_get = g.getVertex(0);
  expect(v_get.getVertexVal()).toBe(101);
  expect(v_get.getXVal()).toBe(122);
  expect(v_get.getYVal()).toBe(31);
  expect(v_get.getColor()).toBe(241);

  g.updateVertexVal(8, 101);
  g.updateXandYVal(8, 122, 31);
  g.updateVertexColor(8, 241);
  v_get = g.getVertex(8);
  expect(v_get).toBe(null);
});

test("updateEdge works", () => {
  var g = getFilledGraph();
  g.updateEdge(1, 0, 20);
  g.updateEdge(3, 5, 70);

  //Test getting und edge(Exists)
  edge = g.getEdge(1, 0);
  expect(edge.getVertexOne().getVertexID()).toBe(0);
  expect(edge.getVertexTwo().getVertexID()).toBe(1);
  expect(edge.getWeightEdge()).toBe(20);

  //Test getting und edge(Doesn't exist)
  edge = g.getEdge(3, 5);
  expect(edge).toBe(null);

  g.updateDirectedEdge(1, 4, 70);
  g.updateDirectedEdge(0, 1, 20);

  //Test getting und edge(Exists)
  edge = g.getDirectedEdge(1, 4);
  expect(edge.getVertexOne().getVertexID()).toBe(1);
  expect(edge.getVertexTwo().getVertexID()).toBe(4);
  expect(edge.getWeightEdge()).toBe(70);

  //Test getting und edge(Doesn't exist)
  edge = g.getDirectedEdge(0, 1);
  expect(edge).toBe(null);
});

test("getTotalWeight works", () => {
  var g = getFilledGraph();
  g.removeVertex(8);
  expect(g.getAdjacenyMatrix()).toEqual([
    [0, 1, 4, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0],
    [4, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  g.removeVertex(5);
  expect(g.getAdjacenyMatrix()).toEqual([
    [0, 1, 4, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 0, 0],
    [4, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);

  g.removeVertex(1);
  expect(g.getAdjacenyMatrix()).toEqual([
    [0, 4, 0, 0, 0, 0],
    [4, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ]);
});

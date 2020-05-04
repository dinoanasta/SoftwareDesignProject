const { Vertex } = require("./Vertex");
const { Edge } = require("./Edge");
const { Graph } = require("./Graphs");
const { dfsMarker } = require("./dfsChecker");

function getGraphNoCycles() {
  // var graph_no_cycles_l = [
  //     [0, 1, 4, 0, 0, 0, 0, 0],
  //     [1, 0, 0, 1, 2, 3, 0, 0],
  //     [4, 0, 0, 0, 0, 0, 1, 0],
  //     [0, 1, 0, 0, 0, 0, 0, 1],
  //     [0, 2, 0, 0, 0, 0, 0, 0],
  //     [0, 3, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 1, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 1, 0, 0, 0, 0],
  //   ];
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
  filled_graph.addEdge(1, 3, 1);
  filled_graph.addEdge(1, 4, 2);
  filled_graph.addEdge(1, 5, 3);
  filled_graph.addEdge(2, 6, 1);
  filled_graph.addEdge(3, 7, 1);

  filled_graph.setSourceNode(0);

  return filled_graph;
}

function getGraphWithCycles() {
  // var graph_with_cycles_l = [
  //     [0, 1, 4, 0, 0, 0, 0, 0],
  //     [1, 0, 0, 1, 2, 3, 0, 0],
  //     [4, 0, 0, 0, 0, 1, 1, 0],
  //     [0, 1, 0, 0, 0, 0, 0, 1],
  //     [0, 2, 0, 0, 0, 0, 0, 1],
  //     [0, 3, 1, 0, 0, 0, 0, 0],
  //     [0, 0, 1, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 1, 1, 0, 0, 0],
  //   ];
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
  filled_graph.addEdge(1, 3, 1);
  filled_graph.addEdge(1, 4, 2);
  filled_graph.addEdge(1, 5, 3);
  filled_graph.addEdge(2, 6, 1);
  filled_graph.addEdge(3, 7, 1);
  filled_graph.addEdge(4, 7, 1);
  filled_graph.addEdge(2, 5, 1);

  filled_graph.setSourceNode(0);

  return filled_graph;
}

test("constructor works", () => {
  var lg = getGraphNoCycles();
  var sg = getGraphNoCycles();
  var dc = new dfsMarker(lg, sg, true);

  expect(dc.question_graph).toEqual([
    [0, 1, 4, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 2, 3, 0, 0],
    [4, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1],
    [0, 2, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
  ]);
  expect(dc.student_answer_graph).toEqual([
    [0, 1, 4, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 2, 3, 0, 0],
    [4, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1],
    [0, 2, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
  ]);
  expect(dc.start_node).toBe(0);
  expect(dc.lecturer_answer_graph).toBe(null);

  dc = new dfsMarker(lg, sg, false);

  expect(dc.lecturer_answer_graph).toEqual([
    [0, 1, 4, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 2, 3, 0, 0],
    [4, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1],
    [0, 2, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
  ]);
  expect(dc.student_answer_graph).toEqual([
    [0, 1, 4, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 2, 3, 0, 0],
    [4, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1],
    [0, 2, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
  ]);
  expect(dc.start_node).toBe(0);
  expect(dc.question_graph).toBe(null);
});

test("both same graph with no cycles works", () => {
  var lg = getGraphNoCycles();
  var sg = getGraphNoCycles();
  var dc = new dfsMarker(lg, sg, true);

  expect(dc.checkAnswerDFS()).toBe(true);
});

test("Graph with no cycles/graph with fake edges works", () => {
  var lg = getGraphNoCycles();
  var sg = getGraphNoCycles();
  sg.addEdge(4, 7, 1);
  var dc = new dfsMarker(lg, sg, true);

  expect(dc.checkAnswerDFS()).toBe(false);
});

test("Graph with no cycles/graph with left out node works", () => {
  var lg = getGraphNoCycles();
  var sg = getGraphNoCycles();
  sg.removeVertex(7);
  var dc = new dfsMarker(lg, sg, true);

  expect(dc.checkAnswerDFS()).toBe(false);
});

test("Graph with no cycles/graph with left out edge works", () => {
  var lg = getGraphNoCycles();
  var sg = getGraphNoCycles();
  sg.removeEdge(3, 7);
  var dc = new dfsMarker(lg, sg, true);

  expect(dc.checkAnswerDFS()).toBe(false);
});

test("Both graph with cycles works", () => {
  var lg = getGraphWithCycles();
  var sg = getGraphWithCycles();
  var dc = new dfsMarker(lg, sg, true);
  expect(dc.question_graph).toEqual([
    [0, 1, 4, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 2, 3, 0, 0],
    [4, 0, 0, 0, 0, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1],
    [0, 2, 0, 0, 0, 0, 0, 1],
    [0, 3, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
  ]);
  expect(dc.checkAnswerDFS()).toBe(false);
});

test("Graph with cycles/tree but not dfs works", () => {
  var lg = getGraphWithCycles();
  var sg = getGraphWithCycles();
  sg.removeEdge(2, 5);
  sg.removeEdge(4, 7);
  var dc = new dfsMarker(lg, sg, true);
  expect(dc.student_answer_graph).toEqual([
    [0, 1, 4, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 2, 3, 0, 0],
    [4, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1],
    [0, 2, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
  ]);
  expect(dc.checkAnswerDFS()).toBe(false);
});

test("Graph with cycles/correct dfs works", () => {
  var lg = getGraphWithCycles();
  var sg = getGraphWithCycles();
  lg.removeEdge(2, 5);
  lg.addEdge(0, 3, 1);
  sg.removeEdge(2, 5);
  sg.removeEdge(1, 4);

  var dc = new dfsMarker(lg, sg, true);
  expect(dc.question_graph).toEqual([
    [0, 1, 4, 1, 0, 0, 0, 0],
    [1, 0, 0, 1, 2, 3, 0, 0],
    [4, 0, 0, 0, 0, 0, 1, 0],
    [1, 1, 0, 0, 0, 0, 0, 1],
    [0, 2, 0, 0, 0, 0, 0, 1],
    [0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
  ]);
  expect(dc.student_answer_graph).toEqual([
    [0, 1, 4, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 3, 0, 0],
    [4, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
  ]);
  expect(dc.checkAnswerDFS()).toBe(true);
});

test("Graph with cycles/leave out edge works", () => {
  var lg = getGraphWithCycles();
  var sg = getGraphWithCycles();
  lg.removeEdge(2, 5);
  lg.addEdge(0, 3, 1);
  sg.removeEdge(2, 5);
  sg.removeEdge(1, 4);
  sg.removeEdge(4, 7);

  var dc = new dfsMarker(lg, sg, true);
  expect(dc.question_graph).toEqual([
    [0, 1, 4, 1, 0, 0, 0, 0],
    [1, 0, 0, 1, 2, 3, 0, 0],
    [4, 0, 0, 0, 0, 0, 1, 0],
    [1, 1, 0, 0, 0, 0, 0, 1],
    [0, 2, 0, 0, 0, 0, 0, 1],
    [0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
  ]);
  expect(dc.student_answer_graph).toEqual([
    [0, 1, 4, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 3, 0, 0],
    [4, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
  ]);
  expect(dc.checkAnswerDFS()).toBe(false);
});

test("Graph with cycles/correct dfs(directed edges) works", () => {
  var lg = getGraphWithCycles();
  var sg = getGraphWithCycles();
  lg.removeEdge(2, 5);
  lg.addEdge(0, 3, 1);
  lg.addDirectedEdge(3,7);
  lg.addDirectedEdge(4,7);
  sg.removeEdge(2, 5);
  sg.removeEdge(4, 7);
  sg.addDirectedEdge(3, 7);

  var dc = new dfsMarker(lg, sg, true);
  expect(dc.question_graph).toEqual([
    [0, 1, 4, 1, 0, 0, 0, 0],
    [1, 0, 0, 1, 2, 3, 0, 0],
    [4, 0, 0, 0, 0, 0, 1, 0],
    [1, 1, 0, 0, 0, 0, 0, 1],
    [0, 2, 0, 0, 0, 0, 0, 1],
    [0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  expect(dc.student_answer_graph).toEqual([
    [0, 1, 4, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 2, 3, 0, 0],
    [4, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1],
    [0, 2, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  expect(dc.checkAnswerDFS()).toBe(true);
});
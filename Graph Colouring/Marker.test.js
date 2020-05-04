const {Vertex}=require('./Vertex');
const {Edge}=require('./Edge');
const {Graph}=require('./Graphs');
const {Marker}=require('./Marker');

var mark=new Marker;



test("greedyColour works",()=>{
  var g=new Graph();
  g.addVertex(0,null,null,null);
  g.addVertex(1,null,null,null);
  g.addVertex(2,null,null,null);
  g.addVertex(3,null,null,null);
  g.addVertex(4,null,null,null);
  g.addVertex(5,null,null,null);

  g.addEdge(0, 1,null);
  g.addEdge(0, 2,null);
  g.addEdge(1, 2,null);
  g.addEdge(1, 3,null);
  g.addEdge(1, 4,null);
  g.addEdge(3, 4,null);
  g.addEdge(3, 5,null);
  g.addEdge(4, 5,null);
  expect(mark.greedyColour(g)).toBe(2);
});

test("isColored works",()=>{
  var g=new Graph();
  g.addVertex(0,null,null,null);
  g.addVertex(1,null,null,null);
  g.addVertex(2,null,null,null);
  g.addVertex(3,null,null,null);
  g.addVertex(4,null,null,null);
  g.addVertex(5,null,null,null);

  g.addEdge(0, 1,null);
  g.addEdge(0, 2,null);
  g.addEdge(1, 2,null);
  g.addEdge(1, 3,null);
  g.addEdge(1, 4,null);
  g.addEdge(3, 4,null);
  g.addEdge(3, 5,null);
  g.addEdge(4, 5,null);
  expect(mark.isColoured(g)).toBe(false);
  var h=new Graph();
  h.addVertex(0,null,null,0);
  h.addVertex(1,null,null,1);
  h.addVertex(2,null,null,2);
  h.addVertex(3,null,null,3);
  h.addVertex(4,null,null,4);
  h.addVertex(5,null,null,5);

  h.addEdge(0, 1,null);
  h.addEdge(0, 2,null);
  h.addEdge(1, 2,null);
  h.addEdge(1, 3,null);
  h.addEdge(1, 4,null);
  h.addEdge(3, 4,null);
  h.addEdge(3, 5,null);
  h.addEdge(4, 5,null);
  expect(mark.isColoured(h)).toBe(false);

  var i=new Graph();
  i.addVertex(0,null,null,1);
  i.addVertex(1,null,null,0);
  i.addVertex(2,null,null,2);
  i.addVertex(3,null,null,2);
  i.addVertex(4,null,null,1);
  i.addVertex(5,null,null,0);

  i.addEdge(0, 1,null);
  i.addEdge(0, 2,null);
  i.addEdge(1, 2,null);
  i.addEdge(1, 3,null);
  i.addEdge(1, 4,null);
  i.addEdge(3, 4,null);
  i.addEdge(3, 5,null);
  i.addEdge(4, 5,null);
  expect(mark.isColoured(i)).toBe(true);
});

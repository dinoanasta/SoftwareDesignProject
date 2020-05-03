const {Edge}=require('./Edge');
const{Vertex}=require('./Vertex');

var v=new Vertex(0,5,2,3,0);
var w=new Vertex(1,6,3,3,1);

test("constructor works",()=>{
  var e=new Edge(v,w,0);
  expect(e.vertexOne).toEqual(v);
  expect(e.vertexTwo).toEqual(w);
  expect(e.weightEdge).toBe(0);
});

test("setVertexOne works",()=>{
  var e=new Edge(v,w,0);
  var newVertex=new Vertex(2,3,4,5,2);
  e.setVertexOne(newVertex);
  expect(e.vertexOne).toEqual(newVertex);
});

test("setVertexTwo works",()=>{
  var e=new Edge(v,w,0);
  var newVertex=new Vertex(2,3,4,5,2);
  e.setVertexTwo(newVertex);
  expect(e.vertexTwo).toEqual(newVertex);
});

test("setWeightEdge works",()=>{
  var e=new Edge(v,w,0);
  e.setWeightEdge(3);
  expect(e.weightEdge).toBe(3);
});

test("getVertexOne works",()=>{
  var e=new Edge(v,w,0);
  expect(e.getVertexOne()).toEqual(v);
});

test("getVertexTwo works",()=>{
  var e=new Edge(v,w,0);
  expect(e.getVertexTwo()).toEqual(w);
});

test("setWeightEdge works",()=>{
  var e=new Edge(v,w,0);
  expect(e.getWeightEdge()).toBe(0);
});

test("drawEdge works",()=>{
  var e=new Edge(v,w,0);
  expect(e.drawEdge()).toBe(undefined);
});

test("updateCoOrds works",()=>{
  var e=new Edge(v,w,0);
  expect(e.updateCoOrds()).toBe(undefined);
});

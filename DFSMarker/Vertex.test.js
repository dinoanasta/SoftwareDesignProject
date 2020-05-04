const {Vertex}=require('./Vertex');


test("constructor works",()=>{
  var v=new Vertex(0,5,2,3,0);
  expect(v.vertexID).toBe(0);
  expect(v.vertexVal).toBe(5);
  expect(v.xVal).toBe(2);
  expect(v.yVal).toBe(3);
  expect(v.color).toBe(0);
  expect(v.AdjacencyList.length).toBe(0);
});

test("addAdjacency works",()=>{
  var v=new Vertex(0,5,2,3,0);
  var w=new Vertex(1,6,3,3,1);
  v.addAdjacency(w);
  expect(v.AdjacencyList.length).toBe(1);
});

test("popAdjaceny works",()=>{
  var v=new Vertex(0,5,2,3,0);

  v.popAdjaceny();
  expect(v.AdjacencyList.length).toBe(0);
});

test("getDegree works",()=>{
  var v=new Vertex(0,5,2,3,0);
  expect(v.AdjacencyList.length).toBe(0);
});

test("setColor works",()=>{
  var v=new Vertex(0,5,2,3,0);
  v.setColor(3);
  expect(v.color).toBe(3);
});

test("setX works",()=>{
  var v=new Vertex(0,5,2,3,0);
  v.setXVal(21);
  expect(v.xVal).toBe(21);
});

test("setVertexID works",()=>{
  var v=new Vertex(0,5,2,3,0);
  v.setVertexID(2);
  expect(v.vertexID).toBe(2);
});

test("setVertexVal works",()=>{
  var v=new Vertex(0,5,2,3,0);
  v.setVertexVal(20);
  expect(v.vertexVal).toBe(20);
});

test("setY works",()=>{
  var v=new Vertex(0,5,2,3,0);
  v.setYVal(15);
  expect(v.yVal).toBe(15);
});

test("setAdjacenyList works",()=>{
  var v=new Vertex(0,5,2,3,0);
  v.setAdjacenyList([1,2,3]);
  expect(v.AdjacencyList).toEqual([1,2,3]);
});

test("getColor works",()=>{
  var v=new Vertex(0,5,2,3,0);
  expect(v.getColor()).toBe(0);
});

test("getX works",()=>{
  var v=new Vertex(0,5,2,3,0);
  expect(v.getXVal()).toBe(2);
});

test("getVertexID works",()=>{
  var v=new Vertex(0,5,2,3,0);
  expect(v.getVertexID()).toBe(0);
});

test("getVertexVal works",()=>{
  var v=new Vertex(0,5,2,3,0);
  expect(v.getVertexVal()).toBe(5);
});

test("getY works",()=>{
  var v=new Vertex(0,5,2,3,0);
  expect(v.getYVal()).toBe(3);
});

test("getAdjacenyList works",()=>{
  var v=new Vertex(0,5,2,3,0);
  var w=new Vertex(1,6,3,2,1);
  v.addAdjacency(w);
  expect(v.getAdjacenyList()).toEqual([w]);
});

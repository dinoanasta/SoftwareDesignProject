const {Graph} = require('./Graphs');
const {Prim} = require('./Prim');
const {MWSTMarker} = require('./MWSTMarker');

describe('Marker', () => {
    it('Should output true if both spanning graphs are equivalent.', () => {
        let q = new Graph(); // This is the question graph.
        let s = new Graph(); // This is the student's graph (ie: Their answer to the question).

        q.addVertex(0,null,null,null);
        q.addVertex(1,null,null,null);
        q.addVertex(2,null,null,null);
        q.addVertex(3,null,null,null);
        q.addVertex(4,null,null,null);
        q.addVertex(5,null,null,null);

        q.addEdge(0,1,7);
        q.addEdge(1,2,3);
        q.addEdge(2,4,3);
        q.addEdge(4,3,2);
        q.addEdge(4,5,2);

        s.addVertex(0,null,null,null);
        s.addVertex(1,null,null,null);
        s.addVertex(2,null,null,null);
        s.addVertex(3,null,null,null);
        s.addVertex(4,null,null,null);
        s.addVertex(5,null,null,null);

        s.addEdge(0,1,7);
        s.addEdge(1,2,3);
        s.addEdge(2,4,3);
        s.addEdge(4,3,2);
        s.addEdge(4,5,2);

        expect(MWSTMarker(q,s)).toEqual(true);
    });

    it('Should output true if both spanning graphs have the same weight, even if they are not equivalent', () => {
        let q = new Graph(); // This is the question graph.
        let s = new Graph(); // This is the student's graph (ie: Their answer to the question).

        q.addVertex(0,null,null,null);
        q.addVertex(1,null,null,null);
        q.addVertex(2,null,null,null);
        q.addVertex(3,null,null,null);
        q.addVertex(4,null,null,null);
        q.addVertex(5,null,null,null);

        q.addEdge(0,1,7);
        q.addEdge(1,2,3);
        q.addEdge(2,4,3);
        q.addEdge(4,3,2);
        q.addEdge(4,5,2);

        s.addVertex(0,null,null,null);
        s.addVertex(1,null,null,null);
        s.addVertex(2,null,null,null);
        s.addVertex(3,null,null,null);
        s.addVertex(4,null,null,null);

        s.addEdge(0,1,5);
        s.addEdge(0,4,6);
        s.addEdge(1,2,3);
        s.addEdge(1,3,3);

        expect(MWSTMarker(q,s)).toEqual(true);
    });

    it('Should output false if the spanning graphs do not have the same weight', () => {
        let q = new Graph(); // This is the question graph.
        let s = new Graph(); // This is the student's graph (ie: Their answer to the question).

        q.addVertex(0,null,null,null);
        q.addVertex(1,null,null,null);
        q.addVertex(2,null,null,null);
        q.addVertex(3,null,null,null);
        q.addVertex(4,null,null,null);
        q.addVertex(5,null,null,null);

        q.addEdge(0,1,7);
        q.addEdge(1,2,3);
        q.addEdge(2,4,3);
        q.addEdge(4,3,2);
        q.addEdge(4,5,2);

        s.addVertex(0,null,null,null);
        s.addVertex(1,null,null,null);
        s.addVertex(2,null,null,null);
        s.addVertex(3,null,null,null);
        s.addVertex(4,null,null,null);
        s.addVertex(5,null,null,null);

        s.addEdge(0,1,5);
        s.addEdge(0,4,6);
        s.addEdge(1,2,3);
        s.addEdge(1,3,3);
        s.addEdge(4,5,4);

        expect(MWSTMarker(q,s)).toEqual(false);
    });
});
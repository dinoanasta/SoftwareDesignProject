const {Graph} = require('./Graphs');
const {Prim} = require('./Prim');

describe('Prim', () => {
    it('Should find the weight of the minimum spanning tree', () => {
        let g = new Graph();

        g.addVertex(0,null,null,null);
        g.addVertex(1,null,null,null);
        g.addVertex(2,null,null,null);
        g.addVertex(3,null,null,null);
        g.addVertex(4,null,null,null);
        g.addVertex(5,null,null,null);

        g.addEdge(0, 1,2);
        g.addEdge(0, 2,3);
        g.addEdge(1, 2,5);
        g.addEdge(1, 3,3);
        g.addEdge(1, 4,4);
        g.addEdge(3, 4,2);
        g.addEdge(3, 5,3);
        g.addEdge(4, 5,5);

        expect(Prim(g)).toEqual(13);
    });

    it('Should find the weight of the minimum spanning tree', () => {
        let g = new Graph();

        g.addVertex(0,null,null,null);
        g.addVertex(1,null,null,null);
        g.addVertex(2,null,null,null);
        g.addVertex(3,null,null,null);
        g.addVertex(4,null,null,null);
        g.addVertex(5,null,null,null);

        g.addEdge(0, 1,7);
        g.addEdge(0, 2,8);
        g.addEdge(1, 2,3);
        g.addEdge(1, 3,6);
        g.addEdge(2, 3,4);
        g.addEdge(2, 4,3);
        g.addEdge(3, 4,2);
        g.addEdge(3, 5,5);
        g.addEdge(4, 5,2);

        expect(Prim(g)).toEqual(17);
    });

    it('Should find the weight of the minimum spanning tree', () => {
        let g = new Graph();

        g.addVertex(0,null,null,null);
        g.addVertex(1,null,null,null);
        g.addVertex(2,null,null,null);
        g.addVertex(3,null,null,null);
        g.addVertex(4,null,null,null);
        g.addVertex(5,null,null,null);
        g.addVertex(6,null,null,null);
        g.addVertex(7,null,null,null);
        g.addVertex(8,null,null,null);

        g.addEdge(0, 1,4);
        g.addEdge(0, 7,8);
        g.addEdge(1, 7,11);
        g.addEdge(1, 2,8);
        g.addEdge(7, 8,7);
        g.addEdge(7, 6,1);
        g.addEdge(2, 8,2);
        g.addEdge(8, 6,6);
        g.addEdge(6, 5,2);
        g.addEdge(2, 5,4);
        g.addEdge(2, 3,7);
        g.addEdge(3, 5,14);
        g.addEdge(3, 4,9);
        g.addEdge(5, 4,10);

        expect(Prim(g)).toEqual(37);
    });



});
class Edge{
        constructor(vertex1, vertex2) {
                this.vertex1Val = vertex1.vertexVal;
                this.vertex1ID = vertex1.ID;
                this.vertex1x = vertex1.xVal;
                this.vertex1y = vertex1.yVal;
                this.vertex2Val = vertex2.vertexVal;
                this.vertex2ID = vertex2.ID;
                this.vertex2x = vertex2.xVal;
                this.vertex2y = vertex2.yVal;
        }
        drawEdge(){
                graphics.strokeLine(this.vertex1x, this.vertex1y, this.vertex2x, this.vertex2y);
        }

        updateCoOrds (v1newX, v1newY, v2newX, v2newY){
                this.vertex1x = v1newX;
                this.vertex1y = v1newY;

                this.vertex2x = v2newX;
                this.vertex2y = v2newY;
        }
}


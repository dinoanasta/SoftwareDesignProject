class Vertex{
    constructor(value) {
        this.vertexVal = value;
        this.xVal = 350;
        this.yVal = 300;
        this.ID = ID;
        ID++;
    }

    updateCoOrds (newX, newY){
        this.xVal = newX;
        this.yVal = newY;
    }

    AdjacencyList = [];

    drawVertex (){
        graphics.font = "20px Comic Sans MS bold";
        graphics.textAlign = "center";

        graphics.strokeStyle = "black";
        graphics.lineWidth = 5;
        graphics.strokeCircle(this.xVal, this.yVal, vertexRadius);

        graphics.fillStyle = "white";
        graphics.fillCircle(this.xVal, this.yVal, vertexRadius);

        graphics.fillStyle = "red";
        graphics.fillText(this.vertexVal, this.xVal, this.yVal+5, 20 );

        graphics.fillStyle = "black";
        graphics.fillText("ID: " + this.ID.toString(), this.xVal -35, this.yVal - 15, 30 );
    }
}

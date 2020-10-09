//Edge class stores two vertices(as vertex class) the edge exists between and the weight of the edge
class Edge{
    constructor(vertexOne,vertexTwo,weight){
	    this.vertexOne=vertexOne;
        this.vertexTwo=vertexTwo;
	    this.weightEdge=weight;
    }

    setVertexOne(v1){
        this.vertexOne = v1;
    }

    setVertexTwo(v2){
        this.vertexTwo = v2;
    }

    setWeightEdge(we){
        this.weightEdge = we;
    }

    getVertexOne(){
        return this.vertexOne;
    }

    getVertexTwo(){  
        return this.vertexTwo;
    }

    getWeightEdge(){
        return this.weightEdge;
    }

    drawEdge(){
        graphics.lineWidth = 3;  // Use 1 pixel as the default line width
        graphics.strokeStyle = "lightgrey";

        if(this == selectedEdge){

            graphics.strokeStyle = "red";

            // let xdist = Math.abs(this.getVertexOne().getXVal() - this.getVertexTwo().getXVal());
            // let ydist = Math.abs(this.getVertexOne().getYVal() - this.getVertexTwo().getYVal());
    
            // if(xdist < ydist){
            //     graphics.strokePoly(this.vertexOne.getXVal()+vertexRadius-2, this.vertexOne.getYVal(), this.vertexOne.getXVal()-vertexRadius+2, this.vertexOne.getYVal(), this.vertexTwo.getXVal()-vertexRadius+2, this.vertexTwo.getYVal(), this.vertexTwo.getXVal()+vertexRadius-2, this.vertexTwo.getYVal());
            // }else if(ydist < xdist){
            //     graphics.strokePoly(this.vertexOne.getXVal(), this.vertexOne.getYVal()+vertexRadius-2, this.vertexOne.getXVal(), this.vertexOne.getYVal()-vertexRadius+2, this.vertexTwo.getXVal(), this.vertexTwo.getYVal()-vertexRadius+2, this.vertexTwo.getXVal(),this.vertexTwo.getYVal()+vertexRadius-2);
            // }
        }

        graphics.strokeLine(this.getVertexOne().getXVal(), this.getVertexOne().getYVal(), this.getVertexTwo().getXVal(), this.getVertexTwo().getYVal());

        if(directed){

            // let xx = ( (1/3)*this.getVertexOne().getXVal() + (2/3)*this.getVertexTwo().getXVal() );
            // let yy = ( (1/3)*this.getVertexOne().getYVal() + (2/3)*this.getVertexTwo().getYVal() );
            // graphics.fillStyle = "lightgray";
            // graphics.fillCircle(xx, yy, 6);

            function drawDirected(vertexOneX,vertexOneY,vertexTwoX,vertexTwoY){

                var distance = Math.sqrt(Math.pow((vertexOneX-vertexTwoX),2)+Math.pow((vertexOneY-vertexTwoY),2))

                // graphics.save();
                // graphics.beginPath();
                // graphics.arc(vertexOneX,vertexOneY,20,0,2*Math.PI);
                // graphics.stroke();
                // graphics.restore();
                //
                // graphics.save();
                // graphics.beginPath();
                // graphics.arc(vertexTwoX,vertexTwoY,20,0,2*Math.PI);
                // graphics.stroke();
                // graphics.restore();

                if(vertexOneX<vertexTwoX){
                    var vec1X = (vertexOneX+distance-vertexOneX);
                    var vec1Y = (vertexOneY-vertexOneY);

                    var vec2X = vertexTwoX-vertexOneX;
                    var vec2Y = vertexTwoY-vertexOneY;

                    var dot=vec1X*vec2X + vec1Y*vec2Y;
                    var magnitudeOne=Math.sqrt(Math.pow(vec1X,2)+Math.pow(vec1Y,2));
                    var magnitudeTwo=Math.sqrt(Math.pow(vec2X,2)+Math.pow(vec2Y,2));
                    var angle=Math.acos(dot/(magnitudeOne*magnitudeTwo))*180/Math.PI;

                    graphics.save();
                    graphics.translate(vertexOneX,vertexOneY);

                    if(vertexOneY<vertexTwoY){
                        graphics.rotate(angle*Math.PI/180);
                    }
                    else{
                        graphics.rotate(-angle*Math.PI/180);
                    }

                    graphics.translate(-vertexOneX,-vertexOneY);
                    graphics.moveTo(vertexOneX+20,vertexOneY);
                    graphics.lineTo(vertexOneX+distance-20,vertexOneY);
                    graphics.lineTo(vertexOneX+distance-20-10,vertexOneY+10);
                    graphics.lineTo(vertexOneX+distance-20,vertexOneY);
                    graphics.lineTo(vertexOneX+distance-20-10,vertexOneY-10);
                    graphics.stroke();
                    graphics.restore();
                }

                else{
                    var vec1X = (vertexOneX-distance-vertexOneX);
                    var vec1Y = (vertexOneY-vertexOneY);

                    var vec2X = vertexTwoX-vertexOneX;
                    var vec2Y = vertexTwoY-vertexOneY;

                    var dot=vec1X*vec2X + vec1Y*vec2Y;
                    var magnitudeOne=Math.sqrt(Math.pow(vec1X,2)+Math.pow(vec1Y,2));
                    var magnitudeTwo=Math.sqrt(Math.pow(vec2X,2)+Math.pow(vec2Y,2));
                    var angle=Math.acos(dot/(magnitudeOne*magnitudeTwo))*180/Math.PI;

                    graphics.save();
                    graphics.translate(vertexOneX,vertexOneY);
                    if(vertexOneY<vertexTwoY){
                        graphics.rotate(-angle*Math.PI/180);
                    }
                    else{
                        graphics.rotate(angle*Math.PI/180);
                    }
                    graphics.translate(-vertexOneX,-vertexOneY);
                    graphics.moveTo(vertexOneX-20,vertexOneY);
                    graphics.lineTo(vertexOneX-distance+20,vertexOneY);
                    graphics.lineTo(vertexOneX-distance+20+10,vertexOneY+10);
                    graphics.lineTo(vertexOneX-distance+20,vertexOneY);
                    graphics.lineTo(vertexOneX-distance+20+10,vertexOneY-10);
                    graphics.stroke();
                    graphics.restore();
                }
            }
            drawDirected(this.getVertexOne().getXVal(),this.getVertexOne().getYVal(),this.getVertexTwo().getXVal(),this.getVertexTwo().getYVal());

            if(weighted){
                graphics.fillStyle = "black";
                graphics.fillText(this.getWeightEdge(), (1/3)*this.getVertexOne().getXVal() + (2/3)*this.getVertexTwo().getXVal() +15 ,  (1/3)*this.getVertexOne().getYVal() + (2/3)*this.getVertexTwo().getYVal()+15, 20 );
            }

        }else{
            if(weighted){
                graphics.fillStyle = "black";
                graphics.fillText(this.getWeightEdge(), Math.abs(this.getVertexOne().getXVal() + this.getVertexTwo().getXVal())/2 +15, Math.abs(this.getVertexOne().getYVal() + this.getVertexTwo().getYVal())/2 +15, 20 );
            }
        }

    }
}
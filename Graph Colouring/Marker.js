class Marker{
    constructor() {
    }

    isColoured(g) {
        //initialize check variables and vertex array
        var flag1 = true;
        var flag2 = true;
        let vertexArray = g.getVertices();
        //check that all adjacencies are different in colour
        for(var i=0; i<vertexArray.length; i++){
            let vertexCurrent = vertexArray[i];
            let currentAdjacency = vertexCurrent.getAdjacenyList();
            for(var j=0; j<currentAdjacency.length; j++){
                let adjacentVertex = currentAdjacency[j];
                if (vertexCurrent.getColor()==adjacentVertex.getColor()){
                    flag1 = false;
                }
            }
        }
        //check that chromatic number is at its minimum
        var maxCol=-1;
        for(var k=0; k<vertexArray.length; k++){
            let vertexCurrent = vertexArray[k];
            if (vertexCurrent.getColor()>maxCol){
                maxCol=vertexCurrent.getColor();
            }
        }
        if (maxCol>this.greedyColour(g)){
            flag2=false;
        }

        //final decision
        return (flag1&&flag2);
    }

    greedyColour(g){
        //initialize stuff
        let vertexArray = g.getVertices();
        var maxColour = -1;
        for(var i=0; i<vertexArray.length;i++){
            let x = vertexArray[i];
            x.setColor(-1);
        }
        let availableArray = new Array(vertexArray.length);
        //colour the vertices
        for(var i=0; i<vertexArray.length; i++){
            let vertexCurrent = vertexArray[i];
            let currColour = -1;
            for (var z=0; z<availableArray.length; z++){
                availableArray[z]=true;
            }
            let currentAdjacency = vertexCurrent.getAdjacenyList();
            for(var j=0; j<currentAdjacency.length; j++){
                let adjacentVertex = currentAdjacency[j];
                var adjColour = adjacentVertex.getColor();
                if (adjColour!=-1){
                    availableArray[adjColour]=false;
                }
            }
            var foundMin = false;
            while(foundMin==false){
                currColour++;
                foundMin=availableArray[currColour];
            }
            vertexCurrent.setColor(currColour);
            if (currColour>maxColour){
                maxColour=currColour;
            }
        }
        return maxColour;
    }


}

class Node {
    /**
     * 
     * @param {Object|string|float} value - either all the data to create a clone node (value or x or y) or a simple value (string or float)
     * @param {undefined|float} x - no need to give if value is an Object
     * @param {undefined|float} y - no need to give if value is an Object
     *
     */

    constructor(value , x , y){

        if(value instanceof Object){
            this.x = value.x
            this.y = value.y
            this.value = value.value

        }
        
        else {
            this.value = value;
            this.x     =     x; 
            this.y     =     y; 
        }


        this.d     =    50;
        this.id    =  null;
        

    }

    draw() {
        /**
        * draw the node
        * @return {void}
        */
        noStroke()
        fill(255)
        ellipse(this.x , this.y , this.d , this.d)
        fill(255 , 0 , 0)
        text(""+this.id , this.x-10 , this.y)
        noFill()
    }

    draw(listColor){
        /**
        * draw the node with specified color
        * @param {Array} - [red - O<255 , green - O<255 , blue - O<255]
        * @return {void}
        */

        noStroke()
        fill(listColor[0] , listColor[1] , listColor[2])
        ellipse(this.x , this.y , this.d , this.d)
        fill(255 , 0 , 0)
        text(""+this.id , this.x-10 , this.y)
        noFill()
    }
}


class Vertex {

    /**
     * 
     * @param {Node} nodeA 
     * @param {Node} nodeB 
     */

    constructor(nodeA , nodeB){
        this.nodeA = nodeA;
        this.nodeB = nodeB;
    }

    draw(){

        /**
        * draw the vertex
        * @return {void}
        */

        stroke(100 , 30 , 10)
        strokeWeight(2)
        line(this.nodeA.x , this.nodeA.y , this.nodeB.x , this.nodeB.y )
        strokeWeight(1)
        noStroke()

    }
}

class Graph {

    /**
     * represents a graph -  nodes and vertexes.
     * 
     * @param {String} name - graph's naame
     * @param {float} r     - red color
     * @param {float} g     - green color
     * @param {float} b     - blue color
     */

    constructor(name , r , g , b){

        if(name != null && r != null && g != null && b != null) {
            this.colors = [r , g , b]
        }

        else {
            this.colors = [Math.random() * 255 , Math.random() * 255 , Math.random() * 255]
        }

        this.nodes = []
        this.vertexes = [];
        this.name = name

        //counter

        this.counter = 0;
        this.idCounter = 0;
    }

    add(node){

        /**
        * Add a new node in the graph.
        * @param {Node} 
        * @return {void}
        */

        if(node.value === null){
            node.value = this.counter++;
        }

        if(node.id === null){
            node.id = this.idCounter++;
        }

        this.nodes.push(node)
    }

    remove(node){
        /**
         * Remove the given Node from the graph.
         * @param {(Node|int)}
         */

        if(node instanceof Node){

            var index = this.nodes.indexOf(node)
            this.nodes.splice(index , 1)

            for(let i = this.vertexes.length - 1 ; i >= 0 ; i--){
                var v  = this.vertexes[i]

                if((node.x == v.nodeA.x && node.y == v.nodeA.y) || (node.x == v.nodeB.x && node.y == v.nodeB.y)){
                    this.vertexes.splice(i , 1);
                }

            }
            this.updateId()
            return node;
        }

        for(let i = this.vertexes.length - 1 ; i >= 0 ; i--){
            var v  = this.vertexes[i]
            var n  = this.nodes[node]

            if((n.x == v[0].x && n.y == v[0].y) || (n.x == v[1].x && n.y == v[1].y)){
                this.vertexes.splice(i , 1);
            }
            
        }

        this.updateId()
        return this.nodes.splice(node , 1);
    }

    findAndremove(nodeX , nodeY){
        /**
         * Remove a Node using its coordinates
         * @param {float} nodeX
         * @param {float} nodeY
         * @return {void}
         */

        this.remove(this.getNodebyClick(nodeX , nodeY))
    }

    getNodebyClick(x , y){
        /**
        * Return the node at the cooordinate x , y
        * @param {float}
        * @param {float}
        * @return {Node|null} - return null if there is no Node in (x , y)
        */

        for(let i = 0 ; i<this.nodes.length ; i++){
            var node = this.nodes[i]

            if(dist(node.x , node.y ,x , y) < node.d / 2){
                return node;
            }
        }

        return null;
    }


    updateId(){
        /**
        * update nodes'id
        * @return {void}
        */

        this.idCounter = 0;

        for(let node of this.nodes){
            node.id = this.idCounter++;
        }
    }

    draw(){
        /**
        * Draw the Graph
        * @return {void}
        */

        // draw the vertex
        for(let v of this.vertexes){
            v.draw()
        }  

        // draw the nodes
        for(let node of this.nodes){
            node.draw(this.colors)
        }
    }


}

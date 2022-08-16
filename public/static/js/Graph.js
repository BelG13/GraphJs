
class Node {
    // a node is the basic tool that a graph is made up from.
    constructor(value , x , y){

        this.x     =     x; 
        this.y     =     y; 
        this.d     =    50;

        this.value = value;
        

    }


    draw() {
        // shows the node
        noStroke()
        fill(255)
        ellipse(this.x , this.y , this.d , this.d)
        fill(255 , 0 , 0)
        text(""+this.value , this.x-10 , this.y)
        noFill()
    }

    draw(listColor){
        // shows the node with a particular color
        noStroke()
        fill(listColor[0] , listColor[1] , listColor[2])
        ellipse(this.x , this.y , this.d , this.d)
        fill(255 , 0 , 0)
        text(""+this.value , this.x-10 , this.y)
        noFill()
    }
}


class Vertex {

    constructor(nodeA , nodeB){
        this.nodeA = nodeA;
        this.nodeB = nodeB;
    }

    draw(){

        stroke(100 , 30 , 10)
        strokeWeight(2)
        line(this.nodeA.x , this.nodeA.y , this.nodeB.x , this.nodeB.y )
        strokeWeight(1)
        noStroke()

    }
}

class Graph {

    // represents a collection of Node.

    constructor(name , r , g , b){

        if(name != null && r != null && g != null && b != null) {
            this.colors = [r , g , b]
        }

        else {
            this.colors = [random(255) , random(255) , random(255)]
        }

        this.nodes = []
        this.vertexes = [];
        this.name = name

        //counter

        this.counter = 0;
    }

    add(node){

        // we add a new node to the graph
        if(node.value === null){
            node.value = this.counter++;
        }

        this.nodes.push(node)
    }

    remove(node){
        // remove a node given as parameter

        if(node instanceof Node){

            var index = this.nodes.indexOf(node)
            this.nodes.splice(index , 1)

            for(let i = this.vertexes.length - 1 ; i >= 0 ; i--){
                var v  = this.vertexes[i]

                if((node.x == v.nodeA.x && node.y == v.nodeA.y) || (node.x == v.nodeB.x && node.y == v.nodeB.y)){
                    this.vertexes.splice(i , 1);
                }

            }
            return node;
        }

        for(let i = his.vertexes.length - 1 ; i >= 0 ; i--){
            var v  = this.vertexes[i]
            var n  = this.nodes[node]

            if((n.x == v[0].x && n.y == v[0].y) || (n.x == v[1].x && n.y == v[1].y)){
                this.vertexes.splice(i , 1);
            }
            
        }


        return this.nodes.splice(node , 1);
    }

    findAndremove(nodeX , nodeY){
        // find the node corresponding to nodeX and nodeY and remove it

        for(let i = this.nodes.length - 1 ; i >= 0 ; i--){
            var node = this.nodes[i]
            
            // the distance between the clicked point and the center of the node
            // has to be less than the radius

            if(dist(node.x , node.y , nodeX , nodeY) < node.d / 2){
                this.remove(node)
                return node;
            }

        }
    }

    getNodebyClick(x , y){
        for(let i = 0 ; i<this.nodes.length ; i++){
            var node = this.nodes[i]

            if(dist(node.x , node.y ,x , y) < node.d / 2){
                return node;
            }
        }

        return null;
    }

    draw(){
        // draw the graph using the colors field.

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
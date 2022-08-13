
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
        fill(255)
        ellipse(this.x , this.y , this.d , this.d)
        fill(255 , 0 , 0)
        text(""+this.value , this.x-10 , this.y)
        noFill()
    }

    draw(listColor){
        // shows the node with a particular color
        fill(listColor[0] , listColor[1] , listColor[2])
        ellipse(this.x , this.y , this.d , this.d)
        fill(255 , 0 , 0)
        text(""+this.value , this.x-10 , this.y)
        noFill()
    }
}

class Graph {

    // represents a collection of Node.

    constructor(name){
        this.nodes = []
        this.name = name
        this.colors = [random(255) , random(255) , random(255)]

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
            return node;
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

    draw(){
        // draw the graph using the colors field.
        for(let node of this.nodes){
            node.draw(this.colors)
        }
    }


}
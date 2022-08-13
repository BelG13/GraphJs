
class Node {
    // a node is the basic tool that a graph is made up from.
    constructor(value , x , y){
        this.x     = x;
        this.y     = y;
        this.value = value;

    }


    draw() {
        // shows the node
        fill(255)
        ellipse(this.x , this.y , 50 , 50)
        fill(255 , 0 , 0)
        text(""+this.value , this.x-10 , this.y)
        noFill()
    }

    draw(listColor){
        // shows the node with a particular color
        fill(listColor[0] , listColor[1] , listColor[2])
        ellipse(this.x , this.y , 50 , 50)
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
        var index = this.nodes.indexOf(node)
        this.nodes.splice(index , 1)
    }

    remove(index){
        // remove the node that the index is 
        // given as parameter.
        this.nodes.splice(index , 1)
    }

    draw(){
        // draw the graph using the colors field.
        for(let node of this.nodes){
            node.draw(this.colors)
        }
    }
}
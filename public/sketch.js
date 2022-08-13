


// GLOBAL VARIABLES

    // constantes
    const BOX_SIZE = 100;

    // variables
    var         size;
    var         MODE;
    var currentGraph;
    var       graphs;


    // client server
    var socket;

// MAIN FUNCTIONS
    
    // -- setup -- //

    function setup(){

        // drawing setup
        createCanvas(1200,640)
        size = max(Math.floor(width / BOX_SIZE) , Math.floor(height/ BOX_SIZE))

        //variables setup
        MODE         =    1;
        graphs       =   [];
        currentGraph = null;



        //  server part
        socket = io.connect('localhost:3000') // connection 


    }

    // -- end setup --//



    // -- mousePressed -- //

    function mousePressed() {

        if(mouseX<0){
            return;
        }

        if (MODE == 1) {
            currentGraph.add(new Node( null , mouseX , mouseY))
        }

    }

    // -- end mousePressed -- //



    // -- draw -- //

    function draw(){

        background(100);
        
        for(let graph of graphs){
            graph.draw()
        }

    }

    // -- end draw -- //

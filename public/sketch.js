


// GLOBAL VARIABLES

    // constantes
    const BOX_SIZE = 100;

    // variables
    var          size;
    var          MODE;
    var  currentGraph;
    var        graphs;
    var  canvas_width;
    var canvas_height;

    // mode gloabAL variable
    var forConnect;


    // client server
    var socket;

// MAIN FUNCTIONS
    
    // -- setup -- //

    function setup(){

        // drawing setup
        canvas_height = innerHeight - 167
        canvas_width  =  innerWidth - 150

        createCanvas(canvas_width ,canvas_height)
        size = max(Math.floor(width / BOX_SIZE) , Math.floor(height/ BOX_SIZE))

        //variables setup
        MODE         =    1;
        graphs       =   [];
        currentGraph = null;

        //mode global init
        forConnect        =    [];



        //  server part
        socket = io.connect('localhost:3000') // connection 

        socket.on('dfs' , (data) => {
            console.log(data);
            var newGraph = new Graph(data.name)

            data.nodes.map( obj => {
                var newNode = new Node(obj)
                newGraph.add(newNode)
            })

            for(let i = 1 ; i < newGraph.nodes.length ; i++){
                newGraph.vertexes.push(
                    new Vertex(newGraph.nodes[i-1] , newGraph.nodes[i])
                )
            }

            
            graphs.push(newGraph)
            refresh()
        })


    }

    // -- end setup --//



    // -- mousePressed -- //

    function mousePressed() {

        if(mouseX<0)return;
        if(mouseY > canvas_height)return;

        switch (MODE) {
            // each time we change the current mode we have to set forConnet to []
            case 1:
                currentGraph.add(new Node( null , mouseX , mouseY))
                forConnect = []
                break;

            case 2:
                var node_ = currentGraph.getNodebyClick(mouseX , mouseY)
                if(node_ == null) break;

                forConnect.push(node_)

                if(forConnect.length == 2){
                    currentGraph.vertexes.push(new Vertex(forConnect[0] , forConnect[1]))
                    forConnect = [];
                }

                break;

            case 3:
                currentGraph.findAndremove(mouseX , mouseY)
                forConnect = []
                break;

            case 4:
                //TODO  delete selected graphs
                break;
        
            default:
                break;
        }


    }

    // -- end mousePressed -- //



    // -- draw -- //

    function draw(){

        background(255);
        currentGraph == null ? () => {} : currentGraph.draw()

    }

    // -- end draw -- //




// GLOBAL VARIABLES

    // constantes
    const BOX_SIZE = 100;

    // variables
    var canvas_height;
    var  currentGraph;
    var  canvas_width;
    var    forConnect; // store the nodes you want to connect using a vertex.
    var        graphs;
    var        socket;
    var          MODE; // current mode

// MAIN FUNCTIONS
    
    // -- setup -- //

    function setup(){

        // drawing setup
        //TODO : better rendering
        canvas_height = innerHeight - 167
        canvas_width  =  innerWidth - 150

        createCanvas(canvas_width ,canvas_height)

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


        socket.on('bfs' , (data) => {
            var newGraph = new Graph(data.name)

            data.nodes.map(x => {
                newGraph.add(new Node(x))
            })

            data.vertexes.map(x => {
                newGraph.vertexes.push(new Vertex(x.nodeA , x.nodeB))
            })

            graphs.push(newGraph)
            refresh()
        })


    }

    // -- end setup --//



    // -- mousePressed -- //

    function mousePressed() {

        /**
        * Do something dependiing on the current mode 
        * @return {void}
        */

        if(mouseX<0)return;
        if(mouseY > canvas_height)return;

        switch (MODE) {
            // each time we change the current mode we have to set forConnet to []

            case 1: // => add node
                currentGraph.add(new Node( null , mouseX , mouseY))
                forConnect = []
                break;

            case 2: // => connect node
                var node_ = currentGraph.getNodebyClick(mouseX , mouseY)
                if(node_ == null) break;

                forConnect.push(node_)

                if(forConnect.length == 2){
                    currentGraph.vertexes.push(new Vertex(forConnect[0] , forConnect[1]))
                    forConnect = [];
                }

                break;

            case 3: // remove node
                currentGraph.findAndremove(mouseX , mouseY)
                forConnect = []
                break;
        
            default:
                break;
        }


    }

    // -- end mousePressed -- //



    // -- draw -- //

    function draw(){

        /**
        * draw everything
        * @return {void}
        */

        background(255);
        currentGraph == null ? () => {} : currentGraph.draw()

    }

    // -- end draw -- //


var k = 0;
function init(){

    // we add some event listerners on our buttons. those allow us to change the mode (add graph - add node - etc)

    // Graphs
    addGraphSetup()
    createGraphSetup()


    // Nodes
    addNodeSetup()
    remNodeSetup()
    moveNodeSetup()
    addVertexSetup()

    

    // rem graph
    remGraphSetup()
}



function setMode(value){
    // set the mode
    MODE = value;
    showMode()
}

function showMode() {
    // shows the current mode on the canvas
    document.getElementsByClassName("modeText")[0].innerHTML = "mode : " + MODE;

}

function createAndDisplay(name , r , g , b){

    if(name != null && r != null && g != null && b != null){
        // create a new graph and display it on the panel.

        var graph_ = new Graph(name,r,g,b); // create a new graph
        graphs.push(graph_)                 // push it on our array of current graph

        //we create a button labeled with our graph 
        document.getElementsByClassName("colOne")[0].innerHTML += `<button id="${graph_.name}" class='graph-elem' onclick='selectGraph("${graph_.name}")'>`+ graph_.name +" </div>"

        // we change the background color
        document.getElementById(`${graph_.name}`).setAttribute('style' , `background-color : rgb(${r} , ${g} , ${b})`)
    }

    else {
        // create a new graph and display it on the panel.

        var graph_ = new Graph("graph"+ k++); // create a new graph
        graphs.push(graph_)                   // push it on our array of current graph


        //we create a button labeled with our graph 
        document.getElementsByClassName("colOne")[0].innerHTML += `<button id="${graph_.name}" class='graph-elem' onclick='selectGraph("${graph_.name}")'>`+ graph_.name +" </div>"

        // we change the background color
        document.getElementById(`${graph_.name}`).setAttribute('style' , `background-color : rgb(${graph_.colors[0]} , ${graph_.colors[1]} , ${graph_.colors[2]})`)

    }

    // if this is the first graph we select it automatically
    if(graphs.length === 1){
        document.getElementById(graph_.name).click()
    }
}

function refresh(){

    var panel = document.getElementsByClassName("colOne")[0]
    panel.innerHTML = ''

    graphs.map(x => {
        //we create a button labeled with our graph 
        panel.innerHTML += `<button id="${x.name}" class='graph-elem' onclick='selectGraph("${x.name}")'>`+ x.name +" </div>"

        // we change the background color
        document.getElementById(`${x.name}`).setAttribute('style' , `background-color : rgb(${x.colors[0]} , ${x.colors[1]} , ${x.colors[2]})`)
    })
}

function getGraphByName(name){

    for(let g of graphs){
        if(g.name === name){
            return g
        }
    }

    console.error("no graph found");
}


function updateClasses(id , className , classListName){

    // go through the list of element which have ClassListName in their classList
    // we add or remove the className from their classList

    for(let func of document.getElementsByClassName(classListName)){
            

        if(func.classList.contains(className)){
            func.classList.toggle(className)
        }

        if(func.id === id){
            func.classList.toggle(className)
        }
    }

}

// setup functions

function generalButtonSetup(button_id , mode_id , toggle=false , toggleClassName){

    /**
    * Initialize the eventListener for most buttons
    * @param {string} button_id  id of the concerded button
    * @param {Integer} mode_id -id of the corresponding mode
    * @return {void}
    */

    document.getElementById(button_id).addEventListener('click' , () => {

        setMode(mode_id);

        if(toggle){
            document.getElementsByClassName(toggleClassName)[0].classList.toggle("hidden");
        }
        
        // highlight the button coresponding to the current mode
        updateClasses(id = button_id , className = "selected" , classListName = "functional")


    })
}


function addGraphSetup(){

    /**
    * initialize the add-graph button
    * @return {void}
    */

    generalButtonSetup("add-graph" , 0 , toggle=true , toggleClassName = "create-graph")
}

function createGraphSetup(){
    /**
    * Initialize the event listeners of the buttons from the interface that helps to create graph.
    * @return {void}
    */
    document.getElementById("create-graph-btn").addEventListener('click' , () => {

        createAndDisplay(

                document.getElementById('graph-name-input').value,
                parseInt(document.getElementById('red-nuance').value),
                parseInt(document.getElementById('green-nuance').value),
                parseInt(document.getElementById('blue-nuance').value)
        )
        
        document.getElementById("close-create-graph-btn").click()

    })

    // the close button

    document.getElementById("close-create-graph-btn").addEventListener('click' , () => {

        document.getElementsByClassName("create-graph")[0].classList.toggle("hidden");
        setMode(-1)

    })
}


function addNodeSetup(){
    /**
    * initialize the add-node button
    * @return {void}
    */

    generalButtonSetup("add-node" , 1)
}

function remNodeSetup(){
    /**
     * initialize rem-node button
     * @return {void}
     */

    generalButtonSetup("rem-node" , 3)
}

function moveNodeSetup(){
    
    /**
    * initialize the move-node button
    * @return {void}
    */
    generalButtonSetup("move-node" , 4)
}

function addVertexSetup(){
    /**
     * initialize rem-node button
     * @return {void}
     */

    generalButtonSetup("add-vertex" , 2)
}

function remGraphSetup(){
    /**
    * initialize the rem-graph button
    * @return {void}
    */

    // generalButtonSetup("rem-graph" , 4 , true , "select-graph-delete")

    document.getElementById("rem-graph").addEventListener('click' , () => {

        setMode(4);

        // add graphs's name into the select tag

        document.getElementById("graph-select").innerHTML = 0;
        try {
            graphs.map(x => {
                document.getElementById("graph-select").innerHTML += `<option id="graph-select-${x.name}" value='${x.name}'> ${x.name} </option>`;
            })
        } catch (error) {
            console.log(error);
        }

        document.getElementsByClassName("select-graph-delete")[0].classList.toggle("hidden");
        
        // highlight the button coresponding to the current mode
        updateClasses(id = "rem-graph" , className = "selected" , classListName = "functional")

    })

    // the close button for the graph deletion selection

    document.getElementById("close-select-graph-btn").addEventListener('click' , () => {

        document.getElementsByClassName("select-graph-delete")[0].classList.toggle("hidden");
        setMode(-1)

    })


    // the delete button

    document.getElementById("delete-graphs").addEventListener('click' , () => {
        for(let g of document.getElementById("graph-select").options){

            g.selected ? graphs.splice(graphs.indexOf(getGraphByName(g.value)) , 1) : () => {};

            // if the currentGraph is selected to be deleted too
            // we set currengrapth to null after the supression
            // so the next checks may raise an error (currentGraph is null)
            
            try {
                g.selected && (currentGraph.name === g.value) ? currentGraph = null : () => {};
            } catch (error) {
                console.log(error);
            }

        }

        refresh()
        document.getElementById("close-select-graph-btn").click()
    })

}


function selectGraph(name){

    /**
    * the current graph becomes the grave you've clicked on.
    * @param {int} name graphName
    */

    currentGraph = getGraphByName(name);
    updateClasses(id = name , className = "graphSelected" , classListName = "graph-elem")

}

init()

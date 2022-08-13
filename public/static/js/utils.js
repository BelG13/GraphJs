
var k = 0;
function init(){

    // we add some event listerners on our buttons. those allow us to change the mode (add graph - add node - etc)

    // add-graph
    document.getElementById("add-graph").addEventListener('click' , () => {

        setMode(0); // mode 0 => graph selection mode
        showMode(); // shows the current mode 

        createAndDisplay()

        
        // highlight the button coresponding to the current mode
        updateClasses(id = "add-graph" , className = "selected" , classListName = "functional")


    })

    //add node
    document.getElementById("add-node").addEventListener('click' , () => {

        setMode(1); // mode 1 => node creation mode
        showMode(); // shows the current mode 

        // highlight the button coresponding to the current mode
        updateClasses(id = "add-node" , className = "selected" , classListName = "functional")

    })

    // rem node
    document.getElementById("rem-node").addEventListener('click' , () => {
        setMode(2);
        showMode();

        updateClasses(id = 'rem-node' , className = "selected" , classListName = "functional")
    })
}


function showMode() {
    // shows the current mode on the canvas
    document.getElementsByClassName("modeText")[0].innerHTML = "mode : " + MODE;

}

function setMode(value){
    // set the mode
    MODE = value;
}


function createAndDisplay(){

    // create a new graph and display it on the panel.

    var graph_ = new Graph("graph"+ k++); // create a new graph
    graphs.push(graph_)                   // push it on our array of current graph


    //we create a button labeled with our graph 
    document.getElementsByClassName("colOne")[0].innerHTML += `<button id="${graph_.name}" class='graph-elem' onclick='selectGraph("${graph_.name}")'>`+ graph_.name +" </div>"

    // we change the background color
    document.getElementById(`${graph_.name}`).setAttribute('style' , `background-color : rgb(${graph_.colors[0]} , ${graph_.colors[1]} , ${graph_.colors[2]})`)

    // if this is the first graph we select it automatically
    if(graphs.length === 1){
        document.getElementById(graph_.name).click()
    }
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


function selectGraph(id){

    // set the current selected graph to the graph with
    // the given id given as parameter.

    currentGraph = getGraphByName(id);
    updateClasses(id = id , className = "graphSelected" , classListName = "graph-elem")

}

init()

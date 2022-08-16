
var k = 0;
function init(){

    // we add some event listerners on our buttons. those allow us to change the mode (add graph - add node - etc)

    // add-graph
    document.getElementById("add-graph").addEventListener('click' , () => {

        setMode(0); // mode 0 => graph selection mode

        document.getElementsByClassName("create-graph")[0].classList.toggle("hidden")
        
        // highlight the button coresponding to the current mode
        updateClasses(id = "add-graph" , className = "selected" , classListName = "functional")


    })

    // the close btn for the add-graph panel

    document.getElementById("close-create-graph-btn").addEventListener('click' , () => {

        document.getElementsByClassName("create-graph")[0].classList.toggle("hidden");
        setMode(-1)

    })

    // create button from the create button panel

    document.getElementById("create-graph-btn").addEventListener('click' , () => {

        createAndDisplay(

                document.getElementById('graph-name-input').value,
                parseInt(document.getElementById('red-nuance').value),
                parseInt(document.getElementById('green-nuance').value),
                parseInt(document.getElementById('blue-nuance').value)
        )

        document.getElementById("close-create-graph-btn").click()

    })

    //add node
    document.getElementById("add-node").addEventListener('click' , () => {

        setMode(1); // mode 1 => node creation mode

        // highlight the button coresponding to the current mode
        updateClasses(id = "add-node" , className = "selected" , classListName = "functional")

    })

    //add vertex
    document.getElementById("add-vertex").addEventListener('click' , () => {
        setMode(2);

        updateClasses(id = "add-vertex" , className = "selected" , classListName = "functional")
    })

    // rem node
    document.getElementById("rem-node").addEventListener('click' , () => {
        setMode(3);

        updateClasses(id = 'rem-node' , className = "selected" , classListName = "functional")
    })

    // rem graph
    document.getElementById("rem-graph").addEventListener('click' , () => {
        setMode(4);

        document.getElementsByClassName("select-graph-delete")[0].classList.toggle('hidden')

        // we add the graphs
        document.getElementById("graph-select").innerHTML = 0;
        graphs.map(x => {
            document.getElementById("graph-select").innerHTML += `<option id="graph-select-${x.name}" value='${x.name}'> ${x.name} </option>`;
        })


        updateClasses(id = 'rem-graph' , className = "selected" , classListName = "functional")
        
    })

    // the close button for the graph deletion selection

    document.getElementById("close-select-graph-btn").addEventListener('click' , () => {

        document.getElementsByClassName("select-graph-delete")[0].classList.toggle("hidden");
        setMode(-1)

    })

    // the delete button on the <delete-graph-panel>

    document.getElementById("delete-graphs").addEventListener('click' , () => {
        for(let g of document.getElementById("graph-select").options){
            g.selected ? graphs.splice(graphs.indexOf(getGraphByName(g.value)) , 1) : () => {};
        }

        refresh()
        document.getElementById("close-select-graph-btn").click()
    })
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


function selectGraph(id){

    // set the current selected graph to the graph with
    // the given id given as parameter.

    currentGraph = getGraphByName(id);
    updateClasses(id = id , className = "graphSelected" , classListName = "graph-elem")

}

init()

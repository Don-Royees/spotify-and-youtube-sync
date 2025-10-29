const cards = document.querySelectorAll(".card")
const lists = document.querySelectorAll(".list")

for(const card of cards){
    card.addEventListener("dragstart",dragStart)
    card.addEventListener("dragend",dragEnd)
}

for(const list of lists){
    list.addEventListener("dragover",dragOver)
    list.addEventListener("dragenter",dragEnter)
    list.addEventListener("dragleave",dragLeave)
    list.addEventListener("drop",dragDrop)
}
function dragStart(e){
    //the drag and drop feature
    e.dataTransfer.setData("text/plain",this.id)
}
function dragEnd(){
    
}
function dragLeave(e){
    e.preventDefault();
}
function dragOver(e) {
  // allow drop
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
}

function dragEnter(e){
    e.preventDefault();
    this.classList.remove("over");
}
function dragDrop(e){
    const id= e.dataTransfer.getData("text/plain");
    const card= document.getElementById(id);
    this.appendChild(card);
    this.classList.remove("over");
}
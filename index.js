
const addButton = document.getElementById("AddButt"),
deletButton = document.getElementById("DelButt")

const listOfNote = document.getElementById("ListOfNote")
const textArea = document.getElementById("Text")

let noteArr = []

function getData(){
    let dat=new Date()
    return  dat.toJSON().slice(0,4)+"."+dat.toJSON().slice(5,7)+"."+dat.toJSON().slice(8,10)+" "
   +dat.toJSON().slice(11,19)
}

addButton.addEventListener("click", ()=>{
    const tempNote = new Note(Date.now(), "New note", "Your note", getData(), false )
    const li = document.createElement("LI")
    noteArr.push(tempNote)
    li.className = "Note"
    li.innerHTML = tempNote.title+"<br>"+tempNote.time
    li.setAttribute("Id", tempNote.id)
    listOfNote.insertBefore(li, listOfNote.firstChild)

    noteArr.forEach(el => {
       let temp = document.getElementById(el.id)

        if(el.id == tempNote.id){
            el.state = true
            temp.setAttribute("choosen", true)
        } 
        else{
            el.state = false
            temp.setAttribute("choosen", false)
        }
    });
})


deletButton.addEventListener("click", ()=>{
 let counter = 0 
    noteArr.forEach(el => {
    
         if(el.state == true){
            const temp = document.getElementById(el.id)
            listOfNote.removeChild(temp)
            noteArr.splice(counter, 1)
            textArea.value = ""
        }
        counter++
    });
})

window.onclick = function (event) { 
    noteArr.forEach(el => {
        if(el.state == true){
            let temp = document.getElementById(el.id)
            temp.setAttribute("choosen", false)
        }
    })
    noteArr.forEach(el => {
        if(event.target.id == el.id){
            let temp = document.getElementById(el.id)
            el.state = true
            temp.setAttribute("choosen", true)
        }
    });
};


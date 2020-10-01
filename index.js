const addButton = document.getElementById("AddButt"),
deletButton = document.getElementById("DelButt")

const listOfNote = document.getElementById("ListOfNote")
const textArea = document.getElementById("Text")
const locals = window.localStorage
let link = window.location

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
       const temp = document.getElementById(el.id)

        if(el.id == tempNote.id){
            el.state = true
            temp.setAttribute("choosen", true)
            link.hash = el.id+"/"+el.title
        } 
        else{
            el.state = false
            temp.setAttribute("choosen", false)
        }
    });
    locals.setItem("Mynote", JSON.stringify(noteArr));
})


deletButton.addEventListener("click", ()=>{
 let counter = 0 
    noteArr.forEach(el => {
    
        if(el.state == true){
            const temp = document.getElementById(el.id)
            listOfNote.removeChild(temp)
            noteArr.splice(counter, 1)
            textArea.value = ""
            link.hash = ""
        }
        counter++
    });
    locals.setItem("Mynote", JSON.stringify( noteArr));
});

window.onclick = function (event) { 
    if(event.target.tagName == "LI"){
        noteArr.forEach(el => {
         if(event.target.id == el.id){
            const temp = document.getElementById(el.id)
            el.state = true
            temp.setAttribute("choosen", true)
            textArea.value = el.text
            link.hash = el.id+"/"+el.title
         }
          else{
            el.state = false
            const temp = document.getElementById(el.id)
            temp.setAttribute("choosen", false)
          }
        });
    }
    locals.setItem("Mynote", JSON.stringify( noteArr));
};

textArea.addEventListener("input", ()=>{
    noteArr.forEach(el => {
        if(el.state == true){
            el.text = textArea.value
            el.data = getData()
            el.title = textArea.value.split("\n")[0].substring(0, 20)
            const temp = document.getElementById(el.id)
            temp.innerHTML = el.title+"<br>"+el.time
            link.hash = el.id+"/"+el.title
        }
    });
    locals.setItem("Mynote", JSON.stringify( noteArr));
});

window.onload = function (){
let dataS = locals.getItem("Mynote")
link.hash = ""
 if(dataS != null, dataS.length > 0 ){
    noteArr = JSON.parse(dataS)
    noteArr.forEach(el => {
        const temp = document.createElement("LI")
        temp.className = "Note"
        temp.setAttribute("Id", el.id)
        if(el.state == true){
            textArea.value = el.text
            temp.setAttribute("choosen", true)
            link.hash = el.id+"/"+el.title
        } 
        else{
            temp.setAttribute("choosen", false)
        }
        listOfNote.insertBefore(temp, listOfNote.firstChild)
        temp.innerHTML = el.title+"<br>"+el.time
    });
 }
 else{
    noteArr = []
    locals.setItem("Mynote", JSON.stringify( noteArr));
    textArea.value = ""
 }
};

window.onhashchange = function (){
 if(link.hash.length > 1){
  noteArr.forEach(el => {
      const temp = document.getElementById(el.id)
      
       if(link.hash.substring(1, 14) == el.id){
           el.state = true
           temp.innerHTML = el.title+"<br>"+el.time
           textArea.value = el.text
           temp.setAttribute("choosen", true) 
        }  
        else{
            el.state = false
            temp.setAttribute("choosen", false) 
        }
    });    
 }
 else{
     noteArr.forEach(el => {
        const temp = document.getElementById(el.id)
        el.state = false
        temp.setAttribute("choosen", false) 
        textArea.value = ""
     });
    }
}

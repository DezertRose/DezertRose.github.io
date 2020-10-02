class Note{
    constructor( id, title, text, time, state){
        this.id = id
        this.title = title
        this.time = time
        this.text = text
        this.state = state
    }
}

function NoHTML(tempText) {
    let help="";
    for (let i=0; i<tempText.length; i++){
        if (tempText[i]=='<') {help+= '&lt;'}
        else if (tempText[i]=='>') {help+= '&gt;'}
        else if (tempText[i]=='"') {help+= '&quot;'}
        else if (tempText[i]=='&') {help+= '&amp;'}
        else {help+=tempText[i];}
    }
    return help;
}

function getData(){
    let dat=new Date()
    dat = dat.toString()
    return  dat.substring(0, 24)
}

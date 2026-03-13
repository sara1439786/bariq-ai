async function generate(){

const prompt=document.getElementById("prompt").value

const response = await fetch("/api/generate",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

prompt:prompt

})

})

const data = await response.json()

document.getElementById("result").innerText = data.choices[0].message.content

}


async function searchImages(){

const query=document.getElementById("imageQuery").value

const response=await fetch("/api/pexels?query="+query)

const data=await response.json()

let html=""

data.photos.forEach(photo=>{

html+=`<img src="${photo.src.medium}" width="200">`

})

document.getElementById("images").innerHTML=html

}

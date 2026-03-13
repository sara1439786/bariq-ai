require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const PORT = process.env.PORT || 3000

app.post('/api/generate', async (req,res)=>{

const prompt = req.body.prompt

const response = await fetch("https://api.openai.com/v1/chat/completions",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${process.env.OPENAI_API_KEY}`
},

body:JSON.stringify({

model:"gpt-4.1-mini",

messages:[
{role:"system",content:"You are Bariq AI creative assistant"},
{role:"user",content:prompt}
]

})

})

const data = await response.json()

res.json(data)

})


app.get('/api/pexels', async(req,res)=>{

const query = req.query.query

const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=6`,{

headers:{
Authorization:process.env.PEXELS_API_KEY
}

})

const data = await response.json()

res.json(data)

})


app.listen(PORT,()=>{

console.log("Bariq running on http://localhost:"+PORT)

})

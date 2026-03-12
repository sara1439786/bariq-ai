<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bariq AI | Create</title>

<style>

*{
box-sizing:border-box;
margin:0;
padding:0;
font-family:Inter,Arial;
}

body{
background:#fbf8ff;
color:#2f2954;
}

.container{
width:min(1100px,92%);
margin:auto;
}

header{
background:white;
border-bottom:1px solid #eadfbe;
}

.nav{
display:flex;
justify-content:space-between;
align-items:center;
padding:16px 0;
flex-wrap:wrap;
}

.brand{
font-size:30px;
font-weight:800;
background:linear-gradient(90deg,#d7b05f,#6b57d9);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
}

.menu{
display:flex;
gap:10px;
flex-wrap:wrap;
}

.menu a{
padding:10px 14px;
border-radius:12px;
font-weight:700;
font-size:14px;
color:#4d438a;
}

.menu a:hover,
.menu a.active{
background:#f2edff;
}

.page{
padding:40px 0;
}

.shell{
background:white;
border:1px solid #eadfbe;
border-radius:28px;
padding:28px;
}

h1{
font-size:40px;
margin-bottom:10px;
color:#34285f;
}

.subtitle{
color:#746d8e;
margin-bottom:20px;
font-size:15px;
}

textarea{
width:100%;
min-height:120px;
padding:16px;
border-radius:16px;
border:1px solid #eadfbe;
font-size:15px;
margin-bottom:18px;
}

.btn{
padding:14px 20px;
border:none;
border-radius:16px;
font-weight:700;
font-size:15px;
background:linear-gradient(135deg,#d7b05f,#6b57d9);
color:white;
cursor:pointer;
}

.result{
margin-top:30px;
display:none;
}

.card{
border:1px solid #eadfbe;
border-radius:20px;
padding:16px;
margin-bottom:14px;
background:#fffdf9;
}

.card h3{
font-size:18px;
margin-bottom:6px;
}

.card p{
font-size:14px;
line-height:1.6;
}

.templates{
display:grid;
grid-template-columns:repeat(3,1fr);
gap:14px;
margin-top:20px;
}

.template{
border-radius:18px;
overflow:hidden;
border:1px solid #eadfbe;
}

.template img{
width:100%;
height:160px;
object-fit:cover;
}

.template span{
display:block;
padding:10px;
font-size:13px;
}

footer{
margin-top:30px;
text-align:center;
font-size:13px;
color:#746d8e;
}

@media(max-width:800px){

.templates{
grid-template-columns:1fr 1fr;
}

}

@media(max-width:600px){

.templates{
grid-template-columns:1fr;
}

h1{
font-size:30px;
}

}

</style>
</head>

<body>

<header>
<div class="container nav">

<div class="brand">Bariq AI</div>

<nav class="menu">
<a href="index.html">Home</a>
<a href="create.html" class="active">Create</a>
<a href="marketplace.html">Marketplace</a>
<a href="business.html">Business</a>
<a href="influencers.html">Influencers</a>
<a href="login.html">Login</a>
</nav>

</div>
</header>

<section class="page">

<div class="container">
<div class="shell">

<h1>Create Marketing</h1>
<p class="subtitle">
Write one idea and Bariq will help you shape your marketing.
</p>

<textarea id="idea" placeholder="Example: Promote my laser hair clinic for women in Hyderabad with WhatsApp booking"></textarea>

<button class="btn" onclick="generate()">Generate Idea</button>

<div class="result" id="result">

<div class="card">
<h3>Ad Headline</h3>
<p id="headline"></p>
</div>

<div class="card">
<h3>Caption</h3>
<p id="caption"></p>
</div>

<div class="card">
<h3>Reel Idea</h3>
<p id="reel"></p>
</div>

<h3 style="margin-top:20px;">Visual Templates</h3>

<div class="templates">

<div class="template">
<img src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800">
<span>Clinic Promotion</span>
</div>

<div class="template">
<img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800">
<span>Beauty Product</span>
</div>

<div class="template">
<img src="https://images.unsplash.com/photo-1520975916090-3105956dac38?w=800">
<span>Fashion Brand</span>
</div>

</div>

</div>

</div>
</div>

</section>

<footer>
© 2026 Bariq AI
</footer>

<script>

function generate(){

const idea=document.getElementById("idea").value

document.getElementById("headline").innerText=
"Transform Your Look with Our Premium Service"

document.getElementById("caption").innerText=
"Discover a smarter way to experience beauty and confidence. Book your consultation today and see the difference."

document.getElementById("reel").innerText=
"Start with a problem scene, show transformation, then reveal happy customer and CTA."

document.getElementById("result").style.display="block"

}

</script>

</body>
</html>

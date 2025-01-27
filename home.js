let blogArray = [], category = '' ;

if(localStorage.getItem("blogs"))
    blogArray = JSON.parse((localStorage.getItem("blogs"))) ;

if(localStorage.getItem("categorySelected"))
    category = JSON.parse((localStorage.getItem("categorySelected"))) ;

function open_blog(id)
{
    const selectedBlog = blogArray.find(function(element){
        return id === element.id ? true : false ;
    })
    localStorage.setItem("selectedBlog", JSON.stringify(selectedBlog)) ;
    setTimeout(function(){
        window.open("C:\\Users\\Dell\\Desktop\\Web Deveploment\\class work\\Javascript\\Blog page\\openABlog.html") ;
    },1000)
}

//  yaha pe categories section <a> ki id aur viewBlog html me <select> value same honi chahiye
// category blogs
$("#tech").on("click", function(){
    category = 'tech' ;
    localStorage.setItem("categorySelected", JSON.stringify(category)) ;
})
$("#Lifestyle").on("click", function(){
    category = 'Lifestyle' ;
    localStorage.setItem("categorySelected", JSON.stringify(category)) ;
})
$("#finance").on("click", function(){
    category = 'finance' ;
    localStorage.setItem("categorySelected", JSON.stringify(category)) ;
})
$("#travel").on("click", function(){
    category = 'travel' ;
    localStorage.setItem("categorySelected", JSON.stringify(category)) ;
})

// Latest post at the third row 
console.log("before sorting", blogArray) ;
blogArray.sort(function(a,b){
    return b.id - a.id ;
})
console.log("after sorting in descending order", blogArray) ;
// after sorting local storage me(blogs) hm isliye save nhi krrhe 
// bcz all blog page pe hme starting se print krna h & not in descending order

let html = '', shortDiscription ;
for(let i=0 ; i<4 ; i++)    // if we have less than 4 blogs it will print undefined
{
  let element = blogArray[i] ;
  shortDiscription = '' ;
  if(element.discription.length > 51)     // trying to add Read more.... which i couldn't
    shortDiscription = element.discription.slice(0, 51) ;
  else
    shortDiscription = element.discription ;
  html += `
  <div class="col-md-6">
    <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative content">
      <div class="col p-4 d-flex flex-column position-static">
        <strong class="d-inline-block mb-2 text-success">${element.category}</strong>
        <h3 class="mb-0">${element.title}</h3>
        <div class="mb-1 time">${element.date}</div>
        <p class="card-text mb-auto">${shortDiscription}</p>
        <a href="#" class="icon-link gap-1 icon-link-hover stretched-link" onclick="open_blog(${element.id})" >
          Open blog
          <svg class="bi"><use xlink:href="#chevron-right"></use></svg>
        </a>
      </div>
      <div class="col-auto d-none d-lg-block">
        <img src="${element.img}" class="img-fluid" alt="...">
      </div>
    </div>
  </div>
  `
}
$(".third_row").append(html) ; 
{/* <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> */}
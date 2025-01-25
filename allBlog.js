let usersArray = [], blogArray= [] ;

if(localStorage.getItem("users"))
    usersArray = JSON.parse(localStorage.getItem("users")) ;

if(localStorage.getItem("blogs"))
    blogArray = JSON.parse((localStorage.getItem("blogs"))) ;

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

let html = '', shortDiscription ;
if(blogArray.length === 0)
{
  html += `
  <div class="p-4 notFound">
    <h5>this Website has Zero blogs, try to make some</h5>
  </div> `
}
  
// Printing all the blogs through blogArray
blogArray.forEach(function(element){
  shortDiscription = '' ;
  if(element.discription.length > 51)     // trying to add Read more.... which i couldn't
    shortDiscription = element.discription.slice(0, 51) ;
  else
    shortDiscription = element.discription ;
  html += `
  <div class="col-md-6">
    <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
      <div class="col p-4 d-flex flex-column position-static">
        <strong class="d-inline-block mb-2 text-success">${element.category}</strong>
        <h3 class="mb-0">${element.title}</h3>
        <div class="mb-1">${element.date}</div>
        <p class="card-text mb-auto">${shortDiscription}</p>
        <a href="#" onclick="open_blog(${element.id})" class="icon-link gap-1 icon-link-hover stretched-link">
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
})

// Printing all the blogs through usersArray[] -> user -> blog[] = nested obj
// html = '' ;
// usersArray.forEach(function(user){
//     if(user.blog.length !== 0)
//     {
//         user.blog.forEach(function(element){
//           shortDiscription = '' ;
//           if(element.discription.length > 51)     // trying to add Read more.... which i couldn't
//             shortDiscription = element.discription.slice(0, 51) ;
//           else
//             shortDiscription = element.discription ;
//             html += `
//             <div class="col-md-6">
//               <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
//                 <div class="col p-4 d-flex flex-column position-static">
//                   <strong class="d-inline-block mb-2 text-success">${element.category}</strong>
//                   <h3 class="mb-0">${element.title}</h3>
//                   <div class="mb-1">${element.date}</div>
//                   <p class="card-text mb-auto">${shortDiscription}</p>
//                   <a href="#" onclick="open_blog(${element.id})" class="icon-link gap-1 icon-link-hover stretched-link">
//                     Continue reading
//                     <svg class="bi"><use xlink:href="#chevron-right"></use></svg>
//                   </a>
//                 </div>
//                 <div class="col-auto d-none d-lg-block">
//                     <img src="${element.img}" class="img-fluid" alt="...">
//                 </div>
//               </div>
//             </div>
//             `
//         })
//     }
// })

$("#list").append(html) ;
{/* <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> */}
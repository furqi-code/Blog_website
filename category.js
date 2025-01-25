let usersArray = [], blogArray= [], category = '' ;

if(localStorage.getItem("users"))
    usersArray = JSON.parse(localStorage.getItem("users")) ;

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

let category_html = `
    <div class="d-flex justify-content-center">
        <h5>${category} Blogs</h5>
    </div> `
$("#greeting").append(category_html) ;

$("#listofsameCategory").empty() ;

let html = '', shortDiscription ;
// printing all the same category blog through blogArray
blogArray.forEach(function(element){
    shortDiscription = '' ;
    if(element.discription.length > 51)     
        shortDiscription = element.discription.slice(0, 51) ;
    else
        shortDiscription = element.discription ;
    if(element.category === category)
    {
        html += `
        <div class="col-md-6">
            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                    <strong class="d-inline-block mb-2 text-success">${element.category}</strong>
                    <h3 class="mb-0">${element.title}</h3>
                    <div class="mb-1 time">${element.date}</div>
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
    }
})

// Printing all the same category blogs through usersArray[] -> user -> blog[] = nested obj
// usersArray.forEach(function(user){
//     if(user.blog.length !== 0)
//     {
//         user.blog.forEach(function(element){
//             shortDiscription = '' ;
//             if(element.discription.length > 51)     
//                 shortDiscription = element.discription.slice(0, 51) ;
//             else
//                 shortDiscription = element.discription ;
//             if(element.category === category)
//             {
//                 html += `
//                 <div class="col-md-6">
//                     <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
//                         <div class="col p-4 d-flex flex-column position-static">
//                             <strong class="d-inline-block mb-2 text-success">${element.category}</strong>
//                             <h3 class="mb-0">${element.title}</h3>
//                             <div class="mb-1 time">${element.date}</div>
//                             <p class="card-text mb-auto">${shortDiscription}</p>
//                             <a href="#" onclick="open_blog(${element.id})" class="icon-link gap-1 icon-link-hover stretched-link">
//                             Open blog
//                             <svg class="bi"><use xlink:href="#chevron-right"></use></svg>
//                             </a>
//                         </div>
//                         <div class="col-auto d-none d-lg-block">
//                             <img src="${element.img}" class="img-fluid" alt="...">
//                         </div>
//                     </div>
//                 </div>
//                 `
//             }
//         })
//     }
// })
$("#listofsameCategory").append(html) ;
let usersArray = [], blogArray = [], activeUser = {} ;

// home page pe latest post k liye blogArray bnana pada
if(localStorage.getItem("blogs"))
    blogArray = JSON.parse((localStorage.getItem("blogs"))) ;

if(localStorage.getItem("users"))
    usersArray = JSON.parse(localStorage.getItem("users")) ;

if(localStorage.getItem("activeUser"))
    activeUser = JSON.parse((localStorage.getItem("activeUser"))) ;

class Blog{
    static count = localStorage.getItem("blog_count") ? JSON.parse(localStorage.getItem("blog_count")) : 0 ;

    constructor(title, photo, discription, category, date)
    {
        this.title = title ;
        this.discription = discription ;
        this.category = category ;
        this.date = date ;
        this.img = photo ;
        this.id = ++Blog.count ;
        localStorage.setItem("blog_count", Blog.count) ;
    }
}

// this time we are removing from usersArray in which we have multilple blog array of respective users
// array of objects(users) k andar ek property wo bhi array of object(blogs) = nested obj
function deleteBlog(id)
{
    // removing from blogArray
    const blog = blogArray.findIndex(function(element){
        return id === element.id ? true : false ;
    })
    blogArray.splice(blog,1) ;
    // removing from usersArray wo particular user find kr k phir updating the activeUser
    usersArray.forEach(function(user){ 
        if(user.email === activeUser.email && user.password === activeUser.password)
        {
            const blog_index = user.blog.findIndex(function(element){
                return id === element.id ? true : false ;
            })
            if(blog_index !== -1)
            {
                user.blog.splice(blog_index,1) ;
                activeUser = user ;
            }
        }  
    })
    localStorage.setItem("users",JSON.stringify(usersArray)) ;  
    localStorage.setItem("activeUser", JSON.stringify(activeUser)) ;
    localStorage.setItem("blogs", JSON.stringify(blogArray)) ;  
    location.reload(true) ;     // display the updated list 
}

// function editBlog()
// {

// }

// Greetings after signIn to the activeUser 
const time = new Date().getHours() ;
let sunPosition = '' ;
if(time >= 5  && time < 12)
    sunPosition = "Good Morning" ;
else if(time >= 12  && time < 17)
    sunPosition = "Good Afternoon" ;
else if(time >= 17  && time < 22)
    sunPosition = "Good Evening" ;
else
    sunPosition = "Good Night" ;

let greeting_html = `
    <div class="d-flex justify-content-center">
        <h5>Hello ${activeUser.name}, ${sunPosition}</h5>
    </div> `
$("#greeting").append(greeting_html) ;


// if the activeUser has any blogs it will show on the screen
let html = "" ;
if(activeUser.blog.length === 0)
{
    html += `
    <div class="p-4 notFound">
      <h5>you have Zero blogs, try to make some</h5>
    </div>`
}else{
    html = '' ;
    activeUser.blog.forEach(function(element){
        html += `
        <div class="col-md-4">
            <div class="card mt-3" style="width: 18rem;">
                <img src="${element.img}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.discription}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><h6>Category :</h6> ${element.category}</li>
                    <li class="list-group-item"><h6>Upload date :</h6> ${element.date}</li>
                </ul>
                <div class="card-body">
                    <div class="d-flex gap-2 justify-content-center">
                        <button type="button" class="btn btn-danger" onclick="deleteBlog(${element.id})">Remove</button>
                        <button type="button" class="btn btn-primary" onclick="editBlog(${element.id})">Edit</button>
                    </div>
                </div>
            </div>
        </div>
        `
    })
}
$("#list").append(html) ;

$("#post").on("click", function(){
    let title = $("#inputTitle").val() ;
    let discription = $("#floatingTextarea2").val() ;
    let category = $("#blogCategory").val() ;
    let date = $("#upload_date").val() ;
    let image = $("#inputImg").val() ;

    let obj = new Blog(title, image, discription, category, date) ;
    blogArray.push(obj) ;
    activeUser.blog.push(obj) ;
    usersArray.forEach(function(user){ 
        if(user.email === activeUser.email && user.password === activeUser.password)
            user.blog.push(obj) ;
    }) 

    localStorage.setItem("users", JSON.stringify(usersArray));
    localStorage.setItem("activeUser", JSON.stringify(activeUser)) ;
    localStorage.setItem("blogs", JSON.stringify(blogArray)) ;  
    $("#inputTitle, #inputImg, #floatingTextarea2, #blogCategory, upload_date").val("") ;
    location.reload(true) ;
})

$("#deleteall").on("click",function(){
    usersArray.forEach(function(user){ 
        if(user.email === activeUser.email && user.password === activeUser.password)
        {
            // delete from blogArray first of that particular user
            user.blog.forEach(function(blogs){
                const blog_index = blogArray.findIndex(function(element){
                    return blogs.id === element.id ? true : false ;
                })
                if(blog_index !== -1)
                    blogArray.splice(blog_index,1) ;
            })
            // delete from userArray -> user -> blog[] and then from activeUser
            user.blog = [] ;
            activeUser = user ;
        }
    }) 
    localStorage.setItem("users",JSON.stringify(usersArray)) ;  
    localStorage.setItem("activeUser", JSON.stringify(activeUser)) ;
    localStorage.setItem("blogs", JSON.stringify(blogArray)) ;
})

$("#loggingOut").on("click",function(){
    activeUser = {} ;
    localStorage.removeItem("activeUser") ;
})

$("#createBlog").addClass("d-none") ;
$("#list").removeClass("d-none") ;
// to show the div when its clicked
$("#blogadding").on("click",function(){
    $("#createBlog").removeClass("d-none") ;
    $("#list").addClass("d-none") ;
})
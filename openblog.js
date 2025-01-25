let selectedBlog = {} ;
if(localStorage.getItem("selectedBlog"))
    selectedBlog = JSON.parse(localStorage.getItem("selectedBlog")) ;

if(selectedBlog) 
{
    let blogHTML = `
        <div class="card">
            <img src="${selectedBlog.img}" class="card-img-top" alt="Blog Image">
            <div class="card-body">
                <h5 class="card-title">${selectedBlog.title}</h5>
                <p class="card-text">${selectedBlog.discription}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><h6>Category:</h6> ${selectedBlog.category}</li>
                <li class="list-group-item"><h6>Upload Date:</h6> ${selectedBlog.date}</li>
            </ul>
        </div>
    ` ;
    $("#list").append(blogHTML) ;
}else{
    let blogHTML = `
    <div class="mt-5 notFound">
        Blog not found.
    </div>
    ` ;
    $("#list").append(blogHTML) ;
}
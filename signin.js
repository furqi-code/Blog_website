let usersArray = [] ;
let activeUser = {} ;

if(localStorage.getItem("users"))
    usersArray = JSON.parse(localStorage.getItem("users")) ;

if(localStorage.getItem("activeUser"))
    activeUser = JSON.parse((localStorage.getItem("activeUser"))) ;

$("#signinBtn").on("click", function(){
    let password = $("#floatingPassword").val() ;
    let email = $("#floatingEmail").val() ;

    const is_exist = usersArray.find(function(element){
        return element.email === email && element.password === password ? true : false ;
    })
    if(is_exist)
    {
        activeUser = is_exist ;
        localStorage.setItem("activeUser",JSON.stringify(activeUser)) ;
        setTimeout(function(){
            window.open("C:\\Users\\Dell\\Desktop\\Web Deveploment\\class work\\Javascript\\Blog page\\Viewblog.html") ;
        },1000)
    }else{
        alert("Wrong ! plz Try again") ;
    }

    $("#floatingPassword, #floatingEmail").val("") ;
})
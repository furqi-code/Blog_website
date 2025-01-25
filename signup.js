let usersArray = [] ;

if(localStorage.getItem("users"))
    usersArray = JSON.parse(localStorage.getItem("users")) ;

class User{
    static count = localStorage.getItem("user_count") ? JSON.parse(localStorage.getItem("user_count")) : 0 ;
    constructor(name, email, password, gender)
    {
        this.name = name ;
        this.email = email ;
        this.password = password ;
        this.gender = gender ;
        this.blog = [] ;
        this.id = ++User.count ;
        localStorage.setItem("user_count", User.count) ;
    }
}

$("#submitBtn").on("click", function(){
    let name = $("#floatingName").val() ;
    let password = $("#floatingPassword").val() ;
    let email = $("#floatingEmail").val() ;
    let gender = $("input[name='gender']:checked").val() ;

    let obj = new User(name, email, password, gender) ;
    usersArray.push(obj) ;
    localStorage.setItem("users", JSON.stringify(usersArray)) ;

    // setTimeout(function(){
    //     window.open("C:\\Users\\Dell\\Desktop\\Web Deveploment\\class work\\Javascript\\Blog page\\signin.html") ;
    // },1000)

    $("#floatingName, #floatingPassword, #floatingEmail, #gender").val("") ;
})
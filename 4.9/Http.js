// function ajax(url) {
//     $.ajax({
//         url: url,
//         type: "get",
//         async:false,
//         success: function (data){
//             console.log("密码："+data)
//         }
//     })
// }
// ajax("http://vue.api.comcto.com/api/password1.php")
// ajax("http://vue.api.comcto.com/api/password2.php")
// ajax("http://vue.api.comcto.com/api/password3.php")
// ajax("http://vue.api.comcto.com/api/password4.php")

function http(url) {
    const axios = require("axios");
    // console.log(axios);
    axios.get(url)
        .then(response => {
            console.log(response.data);
        })
}
http("http://vue.api.comcto.com/api/password1.php")
http("http://vue.api.comcto.com/api/password2.php")
http("http://vue.api.comcto.com/api/password3.php")
http("http://vue.api.comcto.com/api/password4.php")
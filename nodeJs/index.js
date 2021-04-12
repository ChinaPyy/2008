let express = require('express');
let fs = require("fs");
let mysql      = require('mysql');


let connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    port: '3306',
    database : 'node'
});
let app = express();
connection.connect();
app.get("/", function(req, res){

    res.send("Hello , welcome to index!<br>"+
        "<a href='http://localhost:8081/addUser'>增</a><br>"+
        "<a href='http://localhost:8081/update/1'>改 +id,  默认1</a><br>"+
        "<a href='http://localhost:8081/delUser/1'>删 + id,  默认1</a><br>"+
        "<a href='http://localhost:8081/1'>id查询 +id， 默认1</a><br>"+
        "<a href='http://localhost:8081/listUsers'>list查询</a><br>"
    );
});


// 新增
app.get('/addUser', function(req, res) {

    var addSql = "INSERT INTO p_goods(goods_id,cat_id,goods_sn,goods_name,click_count,goods_number,shop_price,keywords,goods_desc,goods_img,add_time,is_delete,sale_num) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
    var addSqlParams = ["10000","52","ECS000222","AMD Athlon X4 750K 四核 3.4G APU 原盒","3883","6579","250","金士顿8G 内存条 8G内存 KST 金士顿 KST-8G1600 金士顿（Kingston） 8GB DDR3 1600","11","images/201501/goods_img/400_G_1421970546894.jpg","1361438709","0","0"]
    connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
            return res.end('[SELECT ERROR] - '+err.message);
        }
        if (result.affectedRows == 1) {
            res.send("添加成功！");
        }
    });

});

// 删除
app.get('/delUser/:id', function (req, res) {

    var delSql = 'DELETE FROM users where id='+req.params.id;
    connection.query(delSql,function (err, result) {
        if(err){
            console.log('[DELETE ERROR] - ',err.message);
            return;
        }
        if (result.affectedRows == 1) {
            res.send("删除成功");
        }
    });

})


// 修改
app.get('/update/:id', function (req, res) {

    var modSql = 'UPDATE users SET name = ?,profession = ? WHERE id = ?';
    var modSqlParams = ['老贾', '摆小摊的',req.params.id];
    connection.query(modSql,modSqlParams,function (err, result) {
        if(err){
            return res.end('[SELECT ERROR] - '+err.message);
        }
        if (result.affectedRows == 1) {
            res.send("修改成功");
        }

    });

})

// 列表查询
app.get('/listUsers', function (req, res) {

    var  sql = 'SELECT * FROM p_goods';
    connection.query(sql,function (err, result) {
        if(err){
            return res.end('[SELECT ERROR] - '+err.message);
        }
        res.send( result );
    });


})


// id查询
// 模拟数据的id和user+id对应
app.get('/:id', function (req, res) {

    var sql = "SELECT * FROM users where id="+req.params.id;
    connection.query(sql,function (err, result) {
        if(err){
            return res.end('[SELECT ERROR] - '+err.message);
        }
        res.send( result );
    });

})






var server = app.listen(8081, function () {

    console.log("访问地址: https://127.0.0.1:80")

})
console.log("链接成功")
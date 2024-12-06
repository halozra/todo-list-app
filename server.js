import express from "express";
import bodyParser from "body-parser";
import uuid from "uuid-random"
import methodOverride from "method-override";

const app = express();
const port = 3000;

// Mengatur view engine ke EJS
app.set('view engine', 'ejs');


// Menggunakan body-parser jika diperlukan nanti untuk form handling
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

const datas = []

// Route GET utama
app.get('/', (req, res) => {
    res.render('index',{datas}); // Render file index.ejs di folder views
});

app.post('/',(req,res)=>{
    const newPost = {
        id : uuid(),
        title : req.body.inputHope,
    };
    datas.push(newPost);
    console.log(`data berhasil di buat dengan id ${newPost.id}`)
    res.redirect("/")
})

app.delete("/:id",(req,res)=>{
    const id= req.params.id;
    const index = datas.findIndex(data=>data.id===id);
    if(index !== -1){
        datas.splice(index,1)
        console.log(`data berhasil di hapus dengan id ${id}`)
        res.redirect("/")
    }else{
        res.status(400).send("Data tidak ditemukan")
    }
})

// Menjalankan server
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

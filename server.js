const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');
const port = process.env.PORT || 3000;
let initial_path = path.join(__dirname, "Public");
const cloudinary = require('cloudinary').v2;
const app = express();
app.use(express.static(initial_path));

app.use(fileupload(
    {
        useTempFiles: true
    }
))

cloudinary.config({ 
    cloud_name: 'dgc09axyo', 
    api_key: '535259635535829', 
    api_secret: '5BlCSx36Fs_TZkJ97FE6TyXQ_vs' 
  });

app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "home.html"));
})

app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
})

app.get('/delete', (req, res) => {
    res.sendFile(path.join(initial_path, "delete.html"));
})

app.get('/artidelete', (req, res) => {
    res.sendFile(path.join(initial_path, "artidelete.html"));
})
//Upload

app.post('/upload', (req, res) => { 
    const file = req.files.image;
    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        console.log(result);
        //create upload
        res.json(result.url)
    });
    //let file = req.files.image;
    //let date = new Date();
    // image name
    //let imagename = date.getDate() + date.getTime() + file.name;
    // image upload path
    //let path = 'public/uploads/' + imagename;
    // create upload
    // file.mv(path, (err, result) => {
    //     if(err){
    //         throw err;
    //     } else{
    //         // our image upload path
    //         res.json(`uploads/${imagename}`)
    //     }
    // })
})

app.get("/:blog", (req, res) => {
    res.sendFile(path.join(initial_path, "blog.html"));
})



app.listen(port, () => {
    console.log('listening......');
})
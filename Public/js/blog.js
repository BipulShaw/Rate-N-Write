let blogId = decodeURI(location.pathname.split("/").pop());

let docRef = db.collection("reviews").doc(blogId);

docRef.get().then((doc) => {
    if(doc.exists){
        setupBlog(doc.data());
    } else{
        location.replace("/");
    }
})

const setupBlog = (data) => {
    const banner = document.querySelector('.banner');
    const blogTitle = document.querySelector('.title');
    const titleTag = document.querySelector('title');
    const publish = document.querySelector('.published');
    const cat = document.querySelector('.category');
    const score = document.querySelector('.score');
    banner.style.backgroundImage = `url(${data.bannerImage})`;

    titleTag.innerHTML += blogTitle.innerHTML = data.title;
    publish.innerHTML += data.publishedAt;
    cat.innerHTML += data.cat;
    if(parseInt(data.scor) >= 80){
        document.getElementById("score_col").style.color = "#42a832";
    }
    else if(parseInt(data.scor) >= 51 && parseInt(data.scor) < 80){
        document.getElementById("score_col").style.color = "bfa41f";
    }
    else{
        document.getElementById("score_col").style.color = "#c7381c";
    }
    score.innerHTML += data.scor;
    const article = document.querySelector('.article');
    addArticle(article, data.article);
}

const addArticle = (ele, data) => {
    data = data.split("\n").filter(item => item.length);
    // console.log(data);

    data.forEach(item => {
        // check for heading
        if(item[0] == '#'){
            let hCount = 0;
            let i = 0;
            while(item[i] == '#'){
                hCount++;
                i++;
            }
            let tag = `h${hCount}`;
            ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`
        } 
        //checking for image format
        else if(item[0] == "!" && item[1] == "["){
            let seperator;

            for(let i = 0; i <= item.length; i++){
                if(item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")"){
                    seperator = i;
                }
            }

            let alt = item.slice(2, seperator);
            let src = item.slice(seperator + 2, item.length - 1);
            ele.innerHTML += `
            <img src="${src}" alt="${alt}" class="article-image">
            `;
        }

        else{
            ele.innerHTML += `<p>${item}</p>`;
        }
    })
}
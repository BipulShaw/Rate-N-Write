const blogSection = document.querySelector('.cards');

db.collection("reviews").get().then((blogs) => {
    blogs.forEach(blog => {
        let blog_content = blog.data();
        if(blog_content.cat == "Electronics"){
            if(blog.id != decodeURI(location.pathname.split("/").pop())){
                createBlog(blog);
            }
        }
    })
})

const createBlog = (blog) => {
    let data = blog.data();
    blogSection.innerHTML += `
    <div class="card">
    <img class="card__image" src="${data.bannerImage}" alt="">
    <div class="card__content">
      <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
      <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
    </div>
    <div class="card__info">
        <div>
            <a href="/${blog.id}" class="card__link">View Article</a>
        </div>
    </div>
  </div>
    `;
}

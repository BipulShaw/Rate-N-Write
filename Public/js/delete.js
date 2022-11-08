window.addEventListener('load', () =>{
    
const del_section = document.querySelector('.r_arti');

db.collection("reviews").get().then((blogs) =>{
    blogs.forEach(blog => {
        let blog_content = blog.data();
        if(blog_content.reported == true){
            createtask(blog);
        }
    });
})

const createtask = (blog) =>{
    let data = blog.data();
    const article_list = document.createElement("div");
    article_list.classList.add("each_arti");
    const article_link = document.createElement("div");
    //Create the link
    article_link.classList.add("link");
    // article_link.innerText = "HELLO";
    article_link.innerHTML = `<a href="${blog.id}">${data.title}</a>`;
    article_list.appendChild(article_link);

    //create the action buttons
    const action_el = document.createElement("div");
    action_el.classList.add("actions");

    //Approve button
    const action_approve_but = document.createElement("button");
    action_approve_but.classList.add("approve");
    action_approve_but.innerHTML = "Approve";
    //Delete button
    const action_del_but = document.createElement("button");
    action_del_but.classList.add("delete");
    action_del_but.innerHTML = "Delete";

    //append the buttons
    action_el.appendChild(action_approve_but);
    action_el.appendChild(action_del_but);
    article_list.appendChild(action_el);
    //Most imp - Append the created elements to the main class
    del_section.appendChild(article_list);
    
    //Button action event listener
    action_approve_but.addEventListener('click', () =>{
        let txt = "Do you really want to approve this article? ";
        if(confirm(txt) == true){
            db.collection("reviews").doc(blog.id).update({
                "reported" : false
            })
            // alert("Approved! The changes might take some time to show up.");
        }
        else{
            alert("You cancelled!");
        }
    })

    action_del_but.addEventListener('click', () =>{
        let txt = "Do you really want to delete this article?";
        if(confirm(txt) == true){
            db.collection("reviews").doc(blog.id).delete();
            // alert("Deleted! The changes might take some time to show up.");
        }
        else{
            alert("You cancelled!");
        }
    })
}

})


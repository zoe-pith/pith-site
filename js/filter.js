window.onload = function() {
  var sub_menu = document.querySelector(".menu .menu");
  if (sub_menu) {
    sub_menu.childNodes.forEach(function(child) {
      child.children[0].addEventListener("click", filterPosts);
    });
  }
};

function filterPosts(e) {
  event.preventDefault();
  var tag = e.target.getAttribute("href").split("?")[1];
  if (tag) {
    var dispatch_link = document.getElementsByClassName("selected")[0];
    dispatch_link.classList.remove("selected");

    var tag_link = document.querySelector("[href='/dispatches?" + tag + "']");
    tag_link.parentNode.classList.add("selected");

    var posts = document.getElementById("posts").children;
    for (var i = 0; i < posts.length; i++) {
      var has_tag = posts[i].classList.contains(tag + "-tag");
      posts[i].style.display = has_tag ? "block" : "none";
    }
  }
}


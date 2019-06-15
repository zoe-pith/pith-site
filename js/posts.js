var previousScroll = 0;
var selectedMenuItem;
var postVisible = false;

window.onload = function() {

  var tag = window.location.hash.slice(1);
  var posts;

  selectedMenuItem = document.querySelector(".menu .selected");

  filterPosts(tag);

  var tag_links = document.querySelectorAll(".menu .menu a");
  tag_links.forEach(function(link) {
    link.addEventListener("click", function() {
      return filterPosts(link.getAttribute("href").slice(1))
    });
  });
  var parent_link = document.querySelector(".menu .menu").previousElementSibling;
  
  parent_link.addEventListener("click", function(e) {
    filterPosts(); window.location.hash = "#"; e.preventDefault()
  });
};

function filterPosts(tag) {
  if (postVisible)
    goBack();
  var newSelected;
  var posts = document.querySelectorAll("#posts li");
  posts.forEach(function(post) {
    if (!tag || post.classList.contains(tag + "-tag")) {
      post.style.display = "block";
    } else {
      post.style.display = "none";
    }
  });

  var tag_link = document.querySelector(".menu a[href='#" + tag + "']");
  
  if (tag) {
    if (tag_link)
      newSelected = tag_link.parentElement;
  } else {
    newSelected = document.querySelector(".menu .menu").parentElement;
  }
  selectedMenuItem.classList.remove("selected");
  if (newSelected) {
    selectedMenuItem = newSelected;
    selectedMenuItem.classList.add("selected");
  }
  return false;
}

function showPost(e) {
  previousScroll = document.getElementById("page-content").scrollTop;
  var post_wrapper = document.getElementById("post");
  var post = e.nextElementSibling.innerHTML;
  document.getElementById("posts").style.display = "none";
  post_wrapper.innerHTML = post;
  document.getElementById("back-button").style.display = "initial";
  postVisible = true;
  return false;
}

function goBack() {
  var post_wrapper = document.getElementById("post");
  post_wrapper.innerHTML = "";
  document.getElementById("posts").style.display = "grid";
  document.getElementById("back-button").style.display = "none";
  document.getElementById("page-content").scrollTop = previousScroll;
  postVisible = false;
}

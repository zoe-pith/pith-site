window.onload = function() {

  var url_items = window.location.search.split("?");
  var posts;
  console.log(url_items);
  if (url_items.length == 2) {
    var tag = url_items[url_items.length - 1];

    var tag_link = document.querySelector("[href='/dispatches?" + tag + "']");
    if (tag_link) {
      tag_link.parentNode.classList.add("selected");
      var dispatch_link = document.getElementsByClassName("selected")[0];
      dispatch_link.classList.remove("selected");
    }

    posts = document.querySelectorAll("#posts li." + tag + "-tag");
  } else {
    posts = document.querySelectorAll("#posts li");
  }
  posts.forEach(function(post) {
      post.style.display = "block";
    });
};

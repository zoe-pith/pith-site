var state = { postVisible: false, previousScroll: 0, isSearchVisible: false };

window.onload = function() {
  var url_data = window.location.hash.slice(1).split("/");
  var page = url_data[0];
  var tag = url_data[1];

  var pages = document.querySelectorAll("nav > ul > li > a");
  pages.forEach(link => {
    link.addEventListener("click", showPage);
  });

  var tag_links = document.querySelectorAll("nav ul ul a");
  tag_links.forEach(link => {
    var href = link.getAttribute("href").split("/");
    if (href[0] == "#diy" && href[1] != "search") {
      var filter = () => filterPosts(href[1]);
      link.addEventListener("click", () => filter());
    }
  });

  var search_link = document.querySelector("nav [href = '#diy/search']");
  search_link.addEventListener("click", e => {
    var field = document.createElement("input");
    field.addEventListener("input", e => searchPosts(e.srcElement.value));

    var link = e.target;
    link.style.display = "none";
    link.parentElement.appendChild(field);
    filterPosts();
    field.focus();
    state.isSearchVisible = true;
    e.preventDefault();
    return false;
  });

  var spoofE = {
    target: document.querySelector("nav a[href = '#" + page + "']")
  };
  showPage(spoofE);
  document.getElementById("loading").style.display = "none";
  if (page === "diy") filterPosts(tag);
};

function showPage(e) {
  if (state.postVisible) goBack();
  if (state.isSearchVisible) revertSearch();
  var page_name = e.target.href.split("#")[1];
  var pages = document.querySelectorAll(".page");
  pages.forEach(page => {
    if (page.id == (page_name || "about") + "-page") {
      page.style.display = "block";
      document.body.scrollTop = 0;
    } else {
      page.style.display = "none";
    }
  });

  if (state.selectedNavItem) {
    if (state.selectedNavItemParent) {
      if (
        state.selectedNavItemParent.contains(e.target.parentElement) &&
        state.selectedNavItemParent != e.target.parentElement
      ) {
        state.selectedNavItem.classList.remove("selected");
      } else {
        state.selectedNavItemParent.classList.remove("selected");
        state.selectedNavItem.classList.remove("selected");
        state.selectedNavItemParent = null;
      }
    } else if (state.selectedNavItem.contains(e.target.parentElement)) {
      state.selectedNavItemParent = state.selectedNavItem;
    } else {
      state.selectedNavItem.classList.remove("selected");
    }
  }
  state.selectedNavItem = e.target.parentElement;
  state.selectedNavItem.classList.add("selected");

  if (page_name === "diy") filterPosts();
  return false;
}

function showPost(e) {
  state.previousScroll = document.getElementById("page-content").scrollTop;

  document.getElementById("posts").style.display = "none";
  document.querySelector("#diy-page p:first-child").style.display = "none";
  var post_wrapper = document.getElementById("post");
  var post = e.nextElementSibling.innerHTML;
  post_wrapper.innerHTML = post;

  document.getElementById("back-button").style.display = "initial";
  state.postVisible = true;
  return false;
}

function searchPosts(text) {
  var posts = document.querySelectorAll("#posts li");
  posts.forEach(post => {
    if (!text || post.innerHTML.indexOf(text) > -1) {
      post.style.display = "block";
    } else {
      post.style.display = "none";
    }
  });
}

function filterPosts(tag) {
  if (state.postVisible) goBack();
  var newSelected;
  var posts = document.querySelectorAll("#posts li");
  posts.forEach(post => {
    if (!tag || post.classList.contains(tag + "-tag")) {
      post.style.display = "block";
    } else {
      post.style.display = "none";
    }
  });
  console.log(state);
  if (state.isSearchVisible) revertSearch();

  var link = document.querySelector(
    "nav ul ul a[href = '#diy" + (tag ? "/" + tag : "") + "']"
  );
  if (link) {
    // If another tag is already selected
    if (state.selectedNavItemParent) {
      state.selectedNavItem.classList.remove("selected");
      state.selectedNavItem = link.parentElement;
      state.selectedNavItem.classList.add("selected");
    } else {
      state.selectedNavItemParent = state.selectedNavItem;
      state.selectedNavItem = link.parentElement;
      state.selectedNavItem.classList.add("selected");
    }
  }
}

function revertSearch() {
  var search = document.querySelector("nav [href = '#diy/search']");
  search.parentElement.removeChild(search.nextElementSibling);
  search.style.display = "block";
  state.isSearchVisible = false;
}

function goBack() {
  var post_wrapper = document.getElementById("post");
  post_wrapper.innerHTML = "";
  document.querySelector("#diy-page p:first-child").style.display = "initial";
  document.getElementById("posts").style.display = "grid";
  document.getElementById("back-button").style.display = "none";
  document.getElementById("page-content").scrollTop = state.previousScroll;
  state.postVisible = false;
  return false;
}

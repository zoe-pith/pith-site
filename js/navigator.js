const MENU_ANIMATION_TIME = 300;
const MENU_HEIGHT = "70px";
const POST_PAGE = "diy";

const state = {
    postVisible: false,
    previousScroll: 0,
    isSearchVisible: false,
    isMenuOpen: false
};

window.onload = () => {
    const urlData = window.location.hash.slice(1).split("/");
    const page = urlData[0];
    const tag = urlData[1];
    let isUrlForElement = false;

    const pages = document.querySelectorAll("nav > ul > li > a");
    pages.forEach(link => {
        link.addEventListener("click", showPage);
    });

    const tag_links = document.querySelectorAll("nav ul ul a");
    tag_links.forEach(link => {
        const href = link.getAttribute("href").split("/");
        if (href[0] === "#" + POST_PAGE && href[1] != "search") {
            const filter = () => filterPosts(href[1]);
            link.addEventListener("click", () => filter());
        } else if (href[0] !== `#${POST_PAGE}` && href[0] === `#${page}`) {
            isUrlForElement = true;
        }
    });

    const search_link = document.querySelector(
        `nav [href = '#${POST_PAGE}/search']`
    );

    search_link.addEventListener("click", openSearchBox);

    const spoofE = {
        target: document.querySelector(`nav a[href = '#${page}']`)
    };

    if (isUrlForElement) {
        spoofE.target =
            spoofE.target.parentElement.parentElement.previousElementSibling;
    }

    showPage(spoofE);
    filterPosts(tag);
    document.getElementById("loading").style.display = "none";

    if (
        !page &&
        window
            .getComputedStyle(document.querySelector("nav > button"))
            .getPropertyValue("display") === "block"
    ) {
        toggleMenu();
    }
};

const openSearchBox = e => {
    const field = document.createElement("input");
    field.addEventListener("input", e => searchPosts(e.srcElement.value));

    const link = e.target;
    link.style.display = "none";
    link.parentElement.appendChild(field);
    filterPosts();
    field.focus();
    state.isSearchVisible = true;
    e.preventDefault();
    return false;
};

const showPage = e => {
    if (state.postVisible) goBack();
    if (state.isSearchVisible) revertSearch();

    const { target } = e;
    const page_name = target.href.split("#")[1];
    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        if (page.id == (page_name || "about") + "-page") {
            page.style.display = "block";
            state.previousScroll = document.body.scrollTop;
            document.body.scrollTop = 0;
        } else {
            page.style.display = "none";
        }
    });

    if (state.selectedNavItem) {
        if (state.selectedNavItemParent) {
            if (
                state.selectedNavItemParent.contains(target.parentElement) &&
                state.selectedNavItemParent != target.parentElement
            ) {
                state.selectedNavItem.classList.remove("selected");
            } else {
                state.selectedNavItemParent.classList.remove("selected");
                state.selectedNavItem.classList.remove("selected");
                state.selectedNavItemParent = null;
            }
        } else if (state.selectedNavItem.contains(target.parentElement)) {
            state.selectedNavItemParent = state.selectedNavItem;
        } else {
            state.selectedNavItem.classList.remove("selected");
        }
    }
    state.selectedNavItem = target.parentElement;
    state.selectedNavItem.classList.add("selected");

    if (page_name === POST_PAGE) filterPosts();
    if (state.isMenuOpen && page_name !== POST_PAGE) toggleMenu();
    return false;
};

const showPost = e => {
    state.previousScroll = document.body.scrollTop;
    document.body.scrollTop = 0;

    document.getElementById("posts").style.display = "none";
    document.querySelector(`#${POST_PAGE}-page p:first-child`).style.display =
        "none";
    const post_wrapper = document.getElementById("post");
    const post = e.nextElementSibling.innerHTML;
    post_wrapper.innerHTML = post;

    document.getElementById("back-button").style.display = "initial";
    state.postVisible = true;
    return false;
};

function searchPosts(text) {
    const posts = document.querySelectorAll("#posts li");
    posts.forEach(post => {
        if (!text || post.innerHTML.toLowerCase().indexOf(text) > -1) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }
    });
}

const filterPosts = tag => {
    if (state.postVisible) goBack();
    let keepMenu = false;
    const posts = document.querySelectorAll("#posts li");
    posts.forEach(post => {
        if (!tag || post.classList.contains(tag + "-tag")) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }
    });
    if (state.isSearchVisible) revertSearch();

    const link = document.querySelector(
        `nav ul ul a[href = '#${POST_PAGE + (tag ? "/" + tag : "")}']`
    );
    if (link) {
        // If another tag is already selected
        if (state.selectedNavItemParent) {
            state.selectedNavItem.classList.remove("selected");
            state.selectedNavItem = link.parentElement;
            state.selectedNavItem.classList.add("selected");
        } else {
            keepMenu = true;
            state.selectedNavItemParent = state.selectedNavItem;
            state.selectedNavItem = link.parentElement;
            state.selectedNavItem.classList.add("selected");
        }
    }
    // alert(tag);
    if (state.isMenuOpen && !keepMenu) toggleMenu();
};

const revertSearch = () => {
    const search = document.querySelector(
        `nav [href = '#${POST_PAGE}/search']`
    );
    search.parentElement.removeChild(search.nextElementSibling);
    search.style.display = "block";
    state.isSearchVisible = false;
};

const goBack = () => {
    const post_wrapper = document.getElementById("post");
    post_wrapper.innerHTML = "";
    document.querySelector(`#${POST_PAGE}-page p:first-child`).style.display =
        "initial";
    document.getElementById("posts").style.display = "grid";
    document.getElementById("back-button").style.display = "none";
    document.body.scrollTop = state.previousScroll;
    state.postVisible = false;
    return false;
};

const toggleMenu = () => {
    const menu = document.getElementsByTagName("nav")[0];
    const button = document.querySelector("nav button");
    const content = document.getElementById("page-content");
    if (state.isMenuOpen) {
        content.style.display = "block";
        button.innerHTML = "menu";
        menu.style.height = MENU_HEIGHT;
        setTimeout(() => {
            menu.children[1].style.display = "none";
            menu.children[2].style.display = "none";
        }, MENU_ANIMATION_TIME);
    } else {
        menu.children[1].style.display = "block";
        menu.children[2].style.display = "block";
        setTimeout(() => (content.style.display = "none"), MENU_ANIMATION_TIME);
        button.innerHTML = "&#10005;";
        menu.style.height = "100%";
    }
    state.isMenuOpen = !state.isMenuOpen;
};

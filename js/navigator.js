const MENU_ANIMATION_TIME = 300;
const MENU_HEIGHT = "55px";
const POST_PAGE = "diy";
let isMobileView = false;

const state = {
    postVisible: false,
    previousScroll: 0,
    isSearchVisible: false,
    isMenuOpen: false
};

window.onload = () => {
    isMobileView =
        window
            .getComputedStyle(document.querySelector("nav > button"))
            .getPropertyValue("display") === "block";
    const urlData = window.location.hash.slice(1).split("/");
    const page = urlData[0];
    const tag = urlData[1];
    let isUrlForElement = false;

    const pages = document.querySelectorAll("nav > div > ul > li > a");
    pages.forEach(link => {
        link.addEventListener("click", showPage);
    });

    const tag_links = document.querySelectorAll("nav ul ul a");
    tag_links.forEach(link => {
        const href = link.getAttribute("href").split("/");
        if (href[0] === "#" + POST_PAGE) {
            if (href[1] === "search") {
                link.addEventListener("click", openSearchBox);
            } else {
                link.addEventListener("click", () =>
                    filterPosts(href[1], true)
                );
            }
        } else {
            link.addEventListener("click", e => {
                document.querySelectorAll(".page").forEach(page => {
                    if (page.style.display === "block") {
                        page.style.paddingBottom = "100vh";
                        state.lengthenedPage = page;
                    }
                });
                toggleMenu();
            });
            if (href[0] !== `#${POST_PAGE}` && href[0] === `#${page}`) {
                isUrlForElement = true;
            }
        }
    });

    if (!isMobileView) {
        const spoofE = {
            target: document.querySelector(`nav a[href = '#${page}']`)
        };

        if (isUrlForElement) {
            spoofE.target =
                spoofE.target.parentElement.parentElement.previousElementSibling;
        }

        showPage(spoofE);
    }
    filterPosts(tag, false);
    document.getElementById("loading").style.display = "none";

    if (!page && isMobileView) {
        toggleMenu();
    }
    new SmoothScroll("a[data-scroll]", {
        offset: isMobileView ? MENU_HEIGHT : 140,
        speed: 450
    });
};

const openSearchBox = e => {
    const field = document.createElement("input");
    field.addEventListener("input", e => searchPosts(e.srcElement.value));
    field.addEventListener("keypress", e => {
        // Enter key
        if (e.keyCode === 13) {
            toggleMenu();
        }
    });
    const link = e.target;
    link.style.display = "none";
    link.parentElement.appendChild(field);
    filterPosts("search", false);
    field.focus();
    state.isSearchVisible = true;
    e.preventDefault();
    return false;
};

const showPage = e => {
    if (state.lengthenedPage) {
        state.lengthenedPage.style.removeProperty("padding-bottom");
    }
    if (state.postVisible) goBack();
    if (state.isSearchVisible) revertSearch();

    const { target } = e;
    const page_name = target.href.split("#")[1];
    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        if (page.id == (page_name || "about") + "-page") {
            page.style.display = "block";
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
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

    const oldNavItem = state.selectedNavItem;
    state.selectedNavItem = target.parentElement;
    state.selectedNavItem.classList.add("selected");

    const itemHasChildren = !!state.selectedNavItem.nextElementSibling;
    if (page_name === POST_PAGE) filterPosts("", false);
    if (!itemHasChildren || oldNavItem === state.selectedNavItem) toggleMenu();
    return false;
};

const showPost = postContent => {
    state.previousScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    document.getElementById("posts").style.display = "none";
    document.querySelector(`#${POST_PAGE}-page p:first-child`).style.display =
        "none";
    const post_wrapper = document.getElementById("post");
    const post = postContent.innerHTML;
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

const filterPosts = (tag, linkClicked) => {
    if (state.postVisible) goBack();
    let keepMenu = false;
    const posts = document.querySelectorAll("#posts li");
    posts.forEach(post => {
        if (!tag || tag === "search" || post.classList.contains(tag + "-tag")) {
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

    if (linkClicked && tag !== "search" && state.isMenuOpen && !keepMenu)
        toggleMenu();
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
    document.documentElement.scrollTop = state.previousScroll;
    state.postVisible = false;
    return false;
};

const toggleMenu = () => {
    if (!isMobileView) return;
    const menu = document.getElementsByTagName("nav")[0];
    const button = document.querySelector("nav button");
    const content = document.getElementById("page-content");
    if (state.isMenuOpen) {
        content.style.display = "block";
        button.innerHTML = "menu";
        menu.style.height = MENU_HEIGHT;
        setTimeout(() => {
            menu.children[1].style.display = "none";
        }, MENU_ANIMATION_TIME);
    } else {
        menu.children[1].style.display = "block";
        setTimeout(() => (content.style.display = "none"), MENU_ANIMATION_TIME);
        button.innerHTML = "&#10005;";
        menu.style.height = "100%";
    }
    state.isMenuOpen = !state.isMenuOpen;
};

const jumpToPost = postUrl => {
    showPage({
        target: document.querySelector(`nav a[href = '#${POST_PAGE}']`)
    });
    if (postUrl) {
        const realPostLink = document.querySelector(`li a[href='${postUrl}']`);
        realPostLink.parentElement.style.display = "block";
        console.log(realPostLink.parentElement);
        showPost(realPostLink.nextElementSibling, false);
    }
};

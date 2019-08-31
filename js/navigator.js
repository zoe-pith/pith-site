const MENU_ANIMATION_TIME = 300;
const MENU_HEIGHT = "55px";
const POST_PAGE = "diy";
const FAILED_POST_LOAD = "<p>Couldn't load post 😪</p>";
let isMobileView = false;

const state = {
    prevUrl: "",
    postVisible: false,
    previousScroll: 0,
    isSearchVisible: false,
    isMenuOpen: false
};

const setUrl = val => {
    history.pushState({}, "", val);
};
const getUrlParam = (param, url) => {
    const regex = new RegExp(`.*?[?&]${param}=(.*?)(&|$)`, "g");
    const match = regex.exec(url);
    return match && match[1];
};

window.onload = () => {
    handleLinks();
    isMobileView =
        window
            .getComputedStyle(document.querySelector("nav > button"))
            .getPropertyValue("display") === "block";
    const urlData = window.location.search;
    const page = getUrlParam("page", urlData);
    const tag = getUrlParam("tag", urlData);
    const { hash } = window.location;

    const pages = document.querySelectorAll("nav > div > ul > li > a");
    pages.forEach(link => {
        link.addEventListener("click", showPage);
    });

    const tag_links = document.querySelectorAll("nav ul ul a");
    tag_links.forEach(link => {
        const params = link.href;
        if (getUrlParam("page", params) === POST_PAGE) {
            const tag = getUrlParam("tag", params);
            if (tag === "search") {
                link.addEventListener("click", openSearchBox);
            } else {
                link.addEventListener("click", e => {
                    filterPosts(tag, true);
                    e.preventDefault();
                });
            }
        } else {
            link.addEventListener("click", () => {
                document.querySelectorAll(".page").forEach(page => {
                    if (page.style.display === "block") {
                        page.style.paddingBottom = "100vh";
                        state.lengthenedPage = page;
                    }
                });
                toggleMenu();
            });
        }
    });

    const spoofE = {
        spoof: true,
        target: document.querySelector(
            `nav a[href = '?page=${page || "about"}']`
        )
    };

    showPage(spoofE);
    filterPosts(tag, false);
    showPost(urlData);

    if (!page && isMobileView) {
        toggleMenu();
        setTimeout(toggleMenu, 1000);
    }
    new SmoothScroll("a[data-scroll]", {
        offset: isMobileView ? MENU_HEIGHT : 126,
        speed: 450
    });

    window.location.hash = hash;
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
    if (!e || !e.target) {
        return;
    }

    e.preventDefault && e.preventDefault();
    if (state.lengthenedPage) {
        state.lengthenedPage.style.removeProperty("padding-bottom");
    }
    if (state.postVisible) goBack();
    if (state.isSearchVisible) revertSearch();

    const { target } = e;
    const page_name = getUrlParam("page", target.search);
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

    if (
        !e.spoof &&
        (target.hasAttribute("close-menu") ||
            !itemHasChildren ||
            oldNavItem === state.selectedNavItem)
    )
        toggleMenu();
    setUrl(target.href);
    return false;
};

const showPost = path => {
    const post = getUrlParam("post", path);
    if (!path || !post) {
        return;
    }

    state.previousScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    document.getElementById("posts").style.display = "none";
    // Hide posts page header
    document.querySelector(`#${POST_PAGE}-page p:first-child`).style.display =
        "none";
    const post_wrapper = document.getElementById("post");
    const preamble = document.querySelector(`.post > a[href = "${path}"]`)
        .nextElementSibling.innerHTML;
    post_wrapper.innerHTML = preamble + "<p>Loading post…</p>";
    fetch("/" + post)
        .then(response => {
            if (response.ok) {
                response.text().then(html => {
                    document.getElementById("back-button").style.display =
                        "initial";
                    state.postVisible = true;
                    post_wrapper.innerHTML = preamble + html;
                    handleLinks(true);
                });
            } else {
                document.getElementById("back-button").style.display =
                    "initial";
                state.postVisible = true;
                post_wrapper.innerHTML = preamble + FAILED_POST_LOAD;
            }
        })
        .catch(() => {
            document.getElementById("back-button").style.display = "initial";
            state.postVisible = true;
            post_wrapper.innerHTML = preamble + FAILED_POST_LOAD;
        });
    state.prevUrl = window.location.search;
    setUrl(path);
    return false;
};

function searchPosts(text) {
    const posts = document.querySelectorAll("#posts li");
    posts.forEach(post => {
        if (
            !text ||
            post.innerHTML.toLowerCase().indexOf(text.toLowerCase()) > -1
        ) {
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
        `nav ul ul a[href = '?page=${POST_PAGE}${tag ? "&tag=" + tag : ""}']`
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
    if (linkClicked) {
        if (tag === "search") {
            setUrl(`?page=${POST_PAGE}`);
        } else {
            setUrl(link.href);
            if (state.isMenuOpen && !keepMenu) {
                toggleMenu();
            }
        }
    }
    return false;
};

const revertSearch = () => {
    const search = document.querySelector(
        `nav [href = '?page=${POST_PAGE}&tag=search']`
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
    setUrl(state.prevUrl);
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

const jumpToPost = postPath => {
    showPage({
        target: document.querySelector(`nav a[href = '?page=${POST_PAGE}']`)
    });
    if (postPath) {
        showPost(`?page=diy&post=${postPath}`);
    }
};

const handleLinks = inPost => {
    const links = document.querySelectorAll(`${inPost && "#post "}a`);
    links.forEach(link => {
        if (link.hostname && link.hostname !== location.hostname) {
            link.target = "_blank";
        }
    });
};

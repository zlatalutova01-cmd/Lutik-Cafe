// кнопка вверх
window.onscroll = function () {
    const btn = document.getElementById("toTopBtn");

    if (document.documentElement.scrollTop > 200) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// открыть модалку
function openModal(title, desc, img, price, country) {
    document.getElementById("modal").style.display = "block";

    document.getElementById("modal-title").innerText = title;
    document.getElementById("modal-desc").innerText = desc;
    document.getElementById("modal-price").innerText = price;
    document.getElementById("modal-country").innerText = country;

    const image = document.getElementById("modal-img");
    image.src = img;

    // ❗ фиксируем прокрутку
    document.body.style.overflow = "hidden";

    image.onclick = function () {
        document.getElementById("imageZoom").style.display = "flex";
        document.getElementById("zoomedImg").src = img;
    };
}

// закрыть модалку
function closeModal() {
    document.getElementById("modal").style.display = "none";

    // ❗ возвращаем прокрутку
    document.body.style.overflow = "auto";
}

// закрыть zoom
function closeZoom() {
    document.getElementById("imageZoom").style.display = "none";
}

function toggleLike(event) {
    event.stopPropagation(); // ❗ чтобы не открывалась модалка

    const btn = event.currentTarget;
    const count = btn.querySelector(".like-count");

    let current = parseInt(count.innerText);

    if (btn.classList.contains("active")) {
        btn.classList.remove("active");
        count.innerText = 0;
    } else {
        btn.classList.add("active");
        count.innerText = 1;
    }
}

let favorites = [];

function toggleLike(event, name, price, img) {
    event.stopPropagation();

    const btn = event.currentTarget;

    let index = favorites.findIndex(i => i.name === name);

    if (index !== -1) {
        favorites.splice(index, 1);
        btn.classList.remove("active");
    } else {
        favorites.push({ name, price, img });
        btn.classList.add("active");
    }

    updateFavorites();
}

function updateFavorites() {
    let panel = document.getElementById("fav-panel");
    let count = document.getElementById("cart-count");

    panel.innerHTML = "";

    favorites.forEach(item => {
        panel.innerHTML += `
            <div style="display:flex;gap:10px;margin-bottom:10px;align-items:center;">
                <img src="${item.img}" width="50" height="50"
                style="object-fit:cover;border-radius:8px;">
                <div>
                    <b>${item.name}</b><br>
                    ${item.price} ₽
                </div>
            </div>
        `;
    });

    count.innerText = favorites.length;
}

document.getElementById("fav-btn").onclick = function () {
    let panel = document.getElementById("fav-panel");

    panel.style.display =
        panel.style.display === "block" ? "none" : "block";
};
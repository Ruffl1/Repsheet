function toggleFavorite(name, link, img, price, button) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = favorites.find(item => item.name === name);

    if (exists) {
        favorites = favorites.filter(item => item.name !== name);
        if (button) {
            button.textContent = "🤍";
        }
    } else {
        favorites.push({ name, link, img, price });
        if (button) {
            button.textContent = "❤️";
        }
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
}

function createHeartButton(name, link, img, price) {
    const btn = document.createElement("button");
    btn.className = "favorite-button";
    btn.textContent = "🤍";
    btn.style.marginTop = "5px";

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.find(item => item.name === name)) {
        btn.textContent = "❤️";
    }

    btn.onclick = (e) => {
        e.stopPropagation();
        toggleFavorite(name, link, img, price, btn);
    };

    return btn;
}

document.querySelectorAll(".item").forEach(item => {
    const name = item.dataset.name;
    const img = item.dataset.img;
    const link = item.dataset.link;
    const price = item.dataset.price;

    const heartBtn = createHeartButton(name, link, img, price);
    const itemContent = item.querySelector('div') || item;
    itemContent.appendChild(heartBtn);
});

function showFavorites() {
    document.querySelectorAll(".wardrobe-category").forEach(el => el.style.display = "none");
    document.getElementById("favorites-section").style.display = "block";
    renderFavorites();
}

function showMain() {
    document.querySelectorAll(".wardrobe-category").forEach(el => el.style.display = "block");
    document.getElementById("favorites-section").style.display = "none";
}

function renderFavorites() {
    const container = document.getElementById("favorites-container");
    container.innerHTML = "";

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.length === 0) {
        container.innerHTML = "<p>Brak ulubionych rzeczy. Kliknij ❤️ przy przedmiocie.</p>";
        return;
    }

    favorites.forEach(item => { // Zmiana nazwy zmiennej z ({ name, link, img, price }) na item
        const div = document.createElement("div");
        div.className = "item";
        div.onclick = () => window.location.href = item.link; // Użycie item.link
        div.innerHTML = `<img src="images/${item.img}" alt="${item.name}"><span>${item.name}</span><span class="price">${item.price} PLN</span>`; // Użycie item.name, item.img, item.price

        const unfavoriteButton = document.createElement("button");
        unfavoriteButton.className = "unfavorite-button";
        unfavoriteButton.textContent = "Odpolub";
        unfavoriteButton.style.marginTop = "5px";
        unfavoriteButton.onclick = (e) => {
            e.stopPropagation();
            toggleFavorite(item.name, item.link, item.img, item.price, document.querySelector(`.item[data-name="${item.name}"] > div > .favorite-button`));
            renderFavorites();
        };
        div.appendChild(unfavoriteButton);
        container.appendChild(div);
    });
}

renderFavorites();
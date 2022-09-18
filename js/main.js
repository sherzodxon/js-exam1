const list = document.querySelector(".parrots-wrapper");
const parrotTemplate = document.querySelector("#parrot-template");

const firstShowParrots = function (parrots) {
    const {
        id,
        title,
        img,
        price,
        birthDate,
        sizes,
        isFavorite,
        features
    } = parrots
    currentParrots = parrots;


    const parrotItem = parrotTemplate.content.cloneNode(true);

    const parrotCardDiv = parrotItem.querySelector(".parrots-card-div");

    parrotCardDiv.querySelector(".card-img-top").src = img;

    const parrotCardBodyDiv = parrotCardDiv.querySelector(".card-body");
    parrotCardBodyDiv.querySelector(".card-title").textContent = title;
    const parrotBodyMarkTxt = parrotCardBodyDiv.querySelector(".fw-bold");
    parrotBodyMarkTxt.querySelector("#mark").textContent = `$${price}`;
    parrotCardBodyDiv.querySelector(".sizes").textContent = birthDate;

    const parrotSizes = `${sizes.width}/${sizes.height}`
    parrotCardBodyDiv.querySelector(".bg-success").textContent = parrotSizes;

    const parrotFeatureslist = parrotCardBodyDiv.querySelector(".list-unstyled");

    const splitedFeatures = features.split(",");
    for (let i = 0; i < splitedFeatures.length; i++) {
        const parrotFeaturesItem = document.createElement('li');
        parrotFeaturesItem.className = "badge bg-primary me-1 mb-1";
        parrotFeaturesItem.textContent = splitedFeatures[i];
        parrotFeatureslist.append(parrotFeaturesItem);
    }

    const parrotBtnBody = parrotCardBodyDiv.querySelector(".btn-div");

    const parrotDelete = parrotBtnBody.querySelector(".del");
    parrotDelete.setAttribute("data-delete", id);

    const parrotEdit = parrotCardBodyDiv.querySelector(".edit");
    parrotEdit.setAttribute("data-editing", id);
    parrotEdit.setAttribute("data-bs-toggle", "modal");
    parrotEdit.setAttribute("data-bs-target", "#edit-parrot-modal");

    list.append(parrotItem);
    return parrotItem;
}
let showingProducts = products.slice();
const remainingProducts = function (remainingProduct = showingProducts) {
    list.innerHTML = "";
    remainingProduct.forEach(function (products) {
        const productItem = firstShowParrots(products);
        list.append(productItem);
    })
}


for (let i = 0; i < products.length; i++) {
    const currentParrots = products[i];
    const productItem = firstShowParrots(currentParrots);
    list.append(productItem);
}

const addForm = document.querySelector("#add-form");
const addParrotModalEl = document.querySelector("#add-parrot-modal");
const addParrotModal = new bootstrap.Modal(addParrotModalEl);

addForm.addEventListener("submit", function (evt) {
    evt.preventDefault();

    const values = evt.target.elements;

    const titleValue = values["parrot-title"].value;
    const imgValue = values["parrot-img"].value;
    const priceValue = values.price.value;
    const birthDateValue = values["parrot-date"].value;
    const widthValue = values["parrot_width"].value;
    const heightValue = values["parrot_height"].value;
    const featuresValue = values.features.value;

    const newProduct = {
        id: Math.floor(Math.random() * 100),
        title: titleValue,
        img: imgValue,
        price: priceValue,
        birthDate: birthDateValue,
        sizes: {
            width: widthValue,
            height: heightValue
        },
        features: featuresValue
    }
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    showingProducts.push(newProduct)
    firstShowParrots(newProduct);
    addForm.reset();
    addParrotModal.hide();
})

const editForm = document.querySelector("#edit-form");
const editParrotModalEl = document.querySelector("#edit-parrot-modal");
const editParrotModal = new bootstrap.Modal(editParrotModalEl);

const editTitle = editForm.querySelector("#edit-parrot-title");
const editImg = editForm.querySelector("#edit-parrot-img");
const editPrice = editForm.querySelector("#edit-price");
const editBirthdate = editForm.querySelector("#edit-parrot-date");
const editWidth = editForm.querySelector("#edit-parrot_width");
const editHeight = editForm.querySelector("#edit-parrot_height");
const editFeatures = editForm.querySelector("#edit-features");

list.addEventListener("click", function (evt) {
    if (evt.target.matches(".del")) {
        const clickedDelId = +evt.target.dataset.delete;
         console.log(clickedDelId);
        const clickedDelIndex = products.findIndex(function (findingIndex) {
            return findingIndex.id == clickedDelId;
        })
        products.splice(clickedDelIndex, 1);
        remainingProducts(products)
    } else if (evt.target.matches(".edit")) {
        const clickedEditId = +evt.target.dataset.editing;

        const clickedEditItem = products.find(function (findingItem) {
            return findingItem.id == clickedEditId
        })

        editTitle.value = clickedEditItem.title;
        editImg.value = clickedEditItem.img;
        editPrice.value = clickedEditItem.price;
        editBirthdate.value = clickedEditItem.birthDate;
        editWidth.value = clickedEditItem.sizes.width;
        editHeight.value = clickedEditItem.sizes.height;
        editFeatures.value = clickedEditItem.features;

        editForm.setAttribute("data-editing-id", clickedEditItem.id);

    }
})
editForm.addEventListener("submit", function (evt) {
    evt.preventDefault();

    const editingId = +evt.target.dataset.editingId;

    const newTitle = editTitle.value;
    const newImg = editImg.value;
    const newPrice = editPrice.value;
    const newBirthdate = editBirthdate.value;
    const newWidth = editWidth.value;
    const newHeight = editHeight.value;
    const newFeatures = editFeatures.value;

    const editProducts = {
        id: Math.floor(Math.random() * 100),
        title: newTitle,
        img: newImg,
        price: newPrice,
        birthDate: newBirthdate,
        sizes: {
            width: newWidth,
            height: newHeight,
        },
        features: newFeatures
    }
    const editingProductIndex = showingProducts.findIndex(function (findedIndex) {
        return findedIndex.id == editingId;
    })
    products.splice(editingProductIndex, 1, editProducts);
    showingProducts.splice(editingProductIndex, 1, editProducts);
    localStorage.setItem("products", JSON.stringify(products));
    remainingProducts(products);
    editParrotModal.hide();

})

const filterForm = document.querySelector("#filter-form");

filterForm.addEventListener("submit", function (evt) {
    evt.preventDefault();

    const elements = evt.target.elements;

    const searchValue = elements.search.value;
    const fromValue = elements.from.value;
    const toValue = elements.to.value;
    const sortbyValue = elements.sortby.value

    showingProducts = products
        .sort(function (a, b) {
            switch (sortbyValue) {
                case "1":
                    if (a.title > b.title) {
                        return 1
                    } else if (a.title < b.title) {
                        return -1
                    } else {
                        return 0
                    }
                    case "2":
                        return b.price - a.price;
                    case "3":
                        return a.price - b.price;

                    case "4":
                        return a.birthDate - b.birthDate;
                    case "5":
                        return b.birthDate - a.birthDate;
                    default:
                        break;

            }

        })
        .filter(function (filtiringProduct) {
            const filtredItem = filtiringProduct.price
            return filtredItem >= fromValue;
        })
        .filter(function (filtiringProduct) {
            const filtredItem = filtiringProduct.price
            return !toValue ? true : filtredItem <= toValue;
        })
    remainingProducts()
})
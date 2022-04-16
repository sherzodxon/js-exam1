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

    const parrotBtnBody=parrotCardBodyDiv.querySelector(".btn-div");

    const parrotDelete= parrotBtnBody.querySelector(".del");
    parrotDelete.setAttribute("data-delete",id);

    const parrotEdit = parrotCardBodyDiv.querySelector(".edit");
    parrotEdit.setAttribute("data-editing",id)

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
    showingProducts.push(newProduct)
    firstShowParrots(newProduct);
    addForm.reset();
})
list.addEventListener("click",function(evt){
    if(evt.target.matches(".del")){
        const clickedDelId=+evt.target.dataset.delete;
        
        const clickedDelIndex=products.findIndex(function(findingIndex){
            return findingIndex.id==clickedDelId;
        })
       products.splice(clickedDelIndex,1);
       remainingProducts(products)
    }

})
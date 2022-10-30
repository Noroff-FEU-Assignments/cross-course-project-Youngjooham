const baseUrl = "http://localhost/rainydays/wp-json/wc/store/products"
const productContainer = document.querySelector(".products");
const perPage = document.querySelector(".per-page-selection");
const categories = document.querySelectorAll(".categories");
const searchButton = document.querySelector(".search-button");

async function getProducts(url){
    const response = await fetch(url);
    const products = await response.json();
    console.log(products)
    products.forEach(function(product){
        productContainer.innerHTML += `
        <div class="product"><h2>${product.name}</h2>
        <div class="product-image" style="background-image:url('${product.images[0].src}');"
        </div>`
    })
}

getProducts(baseUrl);

perPage.onchange = function(event){
    const newUrl = baseUrl + `?per_page=${event.target.value}`;
    productContainer.innerHTML = "";
    getProducts(newUrl);
}

categories.forEach(function(category){
    category.onclick = function(event){
        let newUrl;
        if(event.target.id === "featured"){
            newUrl = baseUrl + "?featured=true";
        }
        else{
            const categoryChosen = event.target.value;
            newUrl = baseUrl + `?category=${categoryChosen}`
        }
        productContainer.innerHTML = "";
        getProducts(newUrl); 
    }
})

searchButton.onclick = function(){
    const searchInput = document.querySelector("#search-input").value;
    const newUrl = baseUrl + `?search=${SearchInput}`;
    productContainer.innerHTML = "";
    getProducts(newUrl); 
}
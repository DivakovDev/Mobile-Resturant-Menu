import { menuData } from './menu.js';

let totalPrice = 0

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        addToOrderList(e.target.dataset.add)
    }
    if(e.target.dataset.remove){
        removeProductFromOrder(e.target.dataset.remove)
    }
})

function addToOrderList(productId){

 const targetProductObj = menuData.filter(function(product){
    return product.uuid === productId
 })[0]

 showYourOrder()

 document.getElementById('order-prod').innerHTML += `
 
    
    <div class="both">
        <section id="two">
        <h1 class="productN">${targetProductObj.productName}</h1>
        <button data-remove="${targetProductObj.uuid}">remove</button>
        </section>
        <h3 class="price">$${targetProductObj.price}</h3>
    </div>

 `
 totalPrice += targetProductObj.price;

 document.getElementById('total').innerHTML = `
 <h1>Total Price</h1>
 <h3 class="order-total-price">$${totalPrice}</h3>

 `
}

function showYourOrder(){
    document.getElementById('order').classList.remove('hidden')
}

function removeProductFromOrder(productId){
    const targetProductObj = menuData.filter(function(product) {
        return product.uuid === productId;
    })[0];

    const orderProdContainer = document.getElementById('order-prod');
    const productToRemove = orderProdContainer.querySelector(`[data-remove="${productId}"]`).parentNode.parentNode;
    orderProdContainer.removeChild(productToRemove);

    totalPrice -= targetProductObj.price;

    document.getElementById('total').innerHTML = `
        <h1>Total Price</h1>
        <h3 class="order-total-price">$${totalPrice}</h3>
    `;
}

function getMenu(){
    let menuHtml = ''

    menuData.forEach(function(product){
        menuHtml += `
        <div class="products">
            <div class="product-img-desc">
                <img class="product-img" src="${product.productImage}" alt="Icon of first product from menu"/>
                <div class="product-desc">
                    <h3 class="productName">${product.productName}</h3>
                    <p class="productDesc">${product.productDescription}</p>
                    <h3 class="price">$${product.price}</h3>
                </div>
            </div>
            <button id="addBtn" data-add="${product.uuid}">+</button>
        </div>
        `
    })
    
    return menuHtml
}


function render(){
    document.getElementById('menu').innerHTML = getMenu()
}
render()

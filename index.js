import { menuData } from './menu.js';

let totalPrice = 0

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        addToOrderList(e.target.dataset.add)
    }
    if(e.target.dataset.remove){
        removeProductFromOrder(e.target.dataset.remove)
    }
    if(e.target.id === 'complete-btn'){
        showConfirmNotification()
    }
    if(e.target.id === 'close-notification'){
        hideConfirmNotification()
    }
    if(e.target.id === 'pay-btn'){
        confrimingOrder()
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
        <h1 class="productN margin-left">${targetProductObj.productName}</h1>
        <button data-remove="${targetProductObj.uuid}">remove</button>
        </section>
        <h3 class="price margin-right">$${targetProductObj.price}</h3>
    </div>

 `
 totalPrice += targetProductObj.price;

 document.getElementById('total').innerHTML = `
 <h1 class="margin-left">Total Price</h1>
 <h3 class="order-total-price margin-right">$${totalPrice}</h3>
 `

 document.getElementById('complete-order').innerHTML = `
 <button id="complete-btn">Complete order</button>
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

    if (totalPrice === 0) {
        hideEmptyOrder();
    }
}

function hideEmptyOrder(){
    document.getElementById('order').classList.add('hidden')
}

function showConfirmNotification(){
    document.getElementById('confirm-notification').classList.toggle('hidden')
}

function hideConfirmNotification(){
    document.getElementById('confirm-notification').classList.add('hidden')
}

function confrimingOrder(){
    const confrimNotification = document.getElementById('confirm-notification')
    confrimNotification.addEventListener('submit',function(e){
    e.preventDefault()

    const confirmNotificationData = new FormData(confrimNotification)
    const cardHolderName = confirmNotificationData.get('fullName')

    document.getElementById('card-details').innerHTML = `
    <div id="confirm-notification-loading">
        <h1 class="confirm-loading-title">Wait a second to check card information!</h1>
        <img class="loading-gif" src="img/loadingForFoodApp.gif"/>
        <p id="upload-text">Uploading your data</p>
        <span id="close-notification">x</span>
    </div>
    `

    setTimeout(function(){
        document.getElementById('upload-text').innerHTML = `
        Making the sale...`
    }, 3500)
    
    
    setTimeout(function(){
        document.getElementById('confirm-notification-loading').innerHTML = `
        <h2 class="complete-title">Thanks for ordering from us <span class="confirm-display-name">${cardHolderName}</span></h2>
        <img class="cooking-gif" src="img/start-cooking.gif">
        <p class="wait-order">You are going to get your order after 30min/1h</p>
        <span id="close-notification">x</span>

    `}, 6000)

    hideEmptyOrder()
})
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

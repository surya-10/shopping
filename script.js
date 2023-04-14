let cartIcon = document.querySelector(".icon");
let cart = document.querySelector(".mycart");
//  cart-active
let closeBtn = document.querySelector(".close-cart");

cartIcon.addEventListener("click", function(){
    cart.classList.add("cart-active");
});
closeBtn.addEventListener("click", function(){
    cart.classList.remove("cart-active");
});

document.addEventListener("DOMContentLoaded", loadFood);

function loadFood(){
    loadContent()
}
function loadContent(){
    let productRemove = document.querySelectorAll(".delete");
    productRemove.forEach((btn)=>{
        console.log(btn);
        btn.addEventListener("click", removeItem)
    });

    let quantity = document.querySelectorAll(".number");
    quantity.forEach((inp)=>{
        inp.addEventListener("change", checkInp);
    })
    let cartButton = document.querySelectorAll(".card-icon");
    cartButton.forEach((btn)=>{
        btn.addEventListener("click", addCart)
    });
    updateTotal();

}
function removeItem(){
    console.log("clicked");
    let title = this.parentElement.querySelector(".food-name").innerHTML;
    console.log(title);
    item = item.filter(el=>el.foodTitle!=title);
    console.log(item);
    this.parentElement.remove();
    loadContent()
}


function checkInp(){
    if(isNaN(this.value) || (this.value<1)){
        this.value = 1;
    }
    loadContent()
}



let item = [];
function addCart(){
    let parentCart = this.parentElement;
    let foodTitle = parentCart.querySelector(".food-name").innerHTML;
    let foodPrice = parentCart.querySelector(".price").innerHTML;
    let foodImg = parentCart.querySelector("img").src;
    console.log(foodImg);

    let prod = {foodTitle, foodPrice, foodImg};
    console.log(prod)
    if(item.find((el)=>el.foodTitle== prod.foodTitle)){
        alert("already added")
        return;
    }
    else{
        item.push(prod);
    }
    let newProd = createCartProduct(foodTitle, foodPrice, foodImg);
    let div = document.createElement("div");
    div.innerHTML = newProd;
    let cartBasket = document.querySelector(".cart-container");
    cartBasket.append(div);
    loadContent();
}
function createCartProduct(foodTitle, foodPrice, foodImg){

    return `
    <div class="product">
        <img src="${foodImg}" class="cart-img">
            <div class="details">
                <div class="food-name">${foodTitle}</div>
                <div class="order-price">
                    <div class="item-price">${foodPrice}</div>
                    <div class="total">${foodPrice}</div>
                </div>
                <input type="number" value="1" class="number">
            </div>
        <ion-icon name="trash-outline" class="delete"></ion-icon>
    </div>`
}

function updateTotal(){
    let cartItems = document.querySelectorAll(".product");
    totPrice = document.querySelector(".final-price");

    let tot = 0;

    cartItems.forEach((prod)=>{
        let priceEle = prod.querySelector(".item-price");
        let price = parseFloat(priceEle.innerHTML.replace("Rs: ", ""));
        let qty = prod.querySelector(".number").value;
        tot +=(price*qty);
        prod.querySelector(".total").innerText = "Rs: "+price*qty;
    });
    totPrice.innerHTML = "Rs: "+tot;

    let count = document.querySelector(".count");
    count.innerHTML = item.length;
}
//---------------OUVRIR ET FERMER PANIER ----------
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close-cart");

cartIcon.addEventListener("click",()=>{  //ouvrir panier
    cart.classList.add("active");
});

closeCart.addEventListener("click",()=>{  //ouvrir panier
    cart.classList.remove("active");
});

//----commencer quand le documenrt est prêt-----
if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", start);
}else{
    start();
}


//---------------DEBUT-----------------------
function start() {
    addEvents();

}

//---------------Mis à jour-------------------
function update() {
    addEvents();
    updateTotal();

}

//---------------Ajouter articles--------------
function addEvents() {
    //supprimer articles du panier 
    let cartRemove_btns =  document.querySelectorAll(".cart-remove");
    console.log(cartRemove_btns);
    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click", handle_removeCartItem);
    });

    //changer la quantité d'articles
    let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
    cartQuantity_inputs.forEach(input => {
        input.addEventListener("change", handle_changeItemQuantity);
    });

    //ajouter article au panier 
    let addCart_btns = document.querySelectorAll(".add-cart");
    addCart_btns.forEach(btn => {
        btn.addEventListener("click", handle_addCartitem);
    });

    //bouton acheter
    const buy_btn = document.querySelector(".btn-reserver");
    buy_btn.addEventListener("click", handle_buyOrder);

}

//--------------gestion des fonctions d'évènements------
let itemsAdded =[]
function handle_addCartitem(){
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;
    console.log(title, price, imgSrc);

    let newToAdd = {
        title,
        price,
        imgSrc,
    };

    // article déjà dans le panier alerte
    if (itemsAdded.find(el => el.title == newToAdd.title)){
        alert("Cet article est déjà dans votre panier");
        return;
    }else{
        itemsAdded.push(newToAdd);
    }


    //ajouter article dans panier 
    let cartBoxElement =  cartBoxComponent(title, price, imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

    update();
}

function handle_removeCartItem(){
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(el=>el.title != 
        this.parentElement.querySelector(".cart-product-title").innerHTML
        );

    update();
}

function handle_changeItemQuantity(){
    if(isNaN(this.value) || this.value < 1){
        this.value = 1;
    };
    this.value = Math.floor(this.value); //garder entier

    update();
}

function handle_buyOrder(){  //pas d'article dans le panier commande 
    if(itemsAdded.length <= 0) {
        alert("Il n'y a pas d'article dans le panier! \nVous devez d'abord ajouter des articles dans votre panier pour pouvoir effectuer une commande.");
        return;
    }
    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = "";
    alert("Votre commande a bien été prise en compte :)");
    itemsAdded = [];

    update();
}


// ------------fonctions de mis à jour et rendu------
function updateTotal() {
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector (".total-price");
    let total = 0;
    cartBoxes.forEach(cartBox =>{
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("€",""));
        let quantity =  cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
    });

    //avoir 2 chiffres après la virgule 
    total = total.toFixed(2);//OU---total = Math.round(total * 100) / 100


    totalElement.innerHTML = "€" + total;
}


//---------------CONTENU HTML-------------------
function cartBoxComponent(title, price, imgSrc){
    return  `
    <div class="cart-box">
    <img src="${imgSrc}" alt="" class="cart-img">
    <div class="detail-box">
    <div class="cart-product-title"> ${title} </div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>

    <!------Enlever un article du panier------->
    <i class='bx bxs-trash-alt cart-remove'></i>
    </div>`;
}


    

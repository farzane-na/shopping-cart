const $=document;
const productWrapper=$.querySelector(".products");
const allProducts=[
    {id:1,name:"Gaming keyboard",src:"./img/keyboard.jpg",price:65.99,count:1},
    {id:2,name:"Headphone",src:"./img/headphone.jpg",price:137.99,count:1},
    {id:3,name:"Smart Watch",src:"./img/watch.jpg",price:100.99,count:1},
    {id:4,name:"Chair",src:"./img/chai5r.jpg",price:300.79,count:1},
    {id:5,name:"Laptop",src:"./img/laptop.jpg",price:1000.50,count:1},
    {id:6,name:"Mouse",src:"./img/mouse.jpg",price:200.46,count:1},
    {id:7,name:"pillow Sliper",src:"./img/pillow.jpg",price:20.35,count:1},
    {id:8,name:"flower",src:"./img/flower.jpg",price:31.19,count:1}
];
let userBasket=[];
allProducts.forEach(function(product){
    let newProduct=$.createElement("div");
    newProduct.className="products__item d-flex";

    let newProductLabel=$.createElement("label");
    newProductLabel.classList.add("products__title");
    newProductLabel.innerHTML=product.name;

    let newProductImageWrapper=$.createElement("div");
    newProductImageWrapper.classList.add("products__image");

    let newProductImage=$.createElement("img");
    newProductImage.setAttribute("src",product.src);
    newProductImage.setAttribute("alt",product.name);

    let newProductProperty=$.createElement("div");
    newProductProperty.className="products__property d-flex";

    let newProductPrice=$.createElement("div");
    newProductPrice.classList.add("products__price");
    newProductPrice.innerHTML="$"+product.price;

    let newProductAddBtn=$.createElement("button");
    newProductAddBtn.classList.add("Add-btn");
    newProductAddBtn.innerHTML="Add To Cart";
    newProductAddBtn.addEventListener("click",()=>{
        addProductToBasket(product.id);
    })

    newProductProperty.append(newProductPrice,newProductAddBtn);
    newProductImageWrapper.append(newProductImage);
    newProduct.append(newProductLabel,newProductImageWrapper,newProductProperty);
    productWrapper.append(newProduct);
});

////////////////////// Variables //////////////////////////

const addItemBtn=$.querySelectorAll(".Add-btn");
const removeBasket=$.querySelectorAll(".remove-btn");
const basketWrapper=$.querySelector(".carts__final-basket");
let totalPrice=$.querySelector(".total-price");
const removeAll=$.querySelector(".remove-btn");

////////////////////// Functions //////////////////////////

function addProductToBasket(productId){
    let mainProduct=allProducts.find((product)=>{
        return product.id===productId;
    });
    let isExistProduct=userBasket.some(function(product){
        return product.id===productId;
    });
    if(isExistProduct){
        mainProduct.count+=1;
    }
    else{
        userBasket.push(mainProduct);
    }
    createBasket(userBasket);
    clacuteTotalPriceBasket(userBasket);
};

function createBasket(userBasketArray){
    basketWrapper.innerHTML="";
    userBasketArray.forEach(function(product){
        let newSelectProduct=$.createElement("div");
        newSelectProduct.classList.add("carts__select");

        let newSelectProductProperty=$.createElement("div");
        newSelectProductProperty.className="carts__select-name d-flex";

        let newSelectProductImage=$.createElement("img");
        newSelectProductImage.setAttribute("src",product.src);

        let newSelectProductName=$.createElement("span");
        newSelectProductName.innerHTML=product.name;

        let newSelectProductPrice=$.createElement("div");
        newSelectProductPrice.classList.add("carts__select-price");
        newSelectProductPrice.innerHTML="$"+product.price;
    
        let newSelectProductQuantity=$.createElement("div");
        newSelectProductQuantity.className="carts__select-quantity d-flex";

        let itemCounter=$.createElement("input");
        itemCounter.classList.add("input-number");
        itemCounter.type="number";
        itemCounter.value=product.count;
        itemCounter.addEventListener("change",function(){
            updateProductCount(product.id,itemCounter.value)
        })
    
        let itemRemover=$.createElement("button");
        itemRemover.classList.add("remove-item");
        itemRemover.setAttribute("id",product.id);
        itemRemover.innerHTML="Remove";
        itemRemover.addEventListener("click",function(){
            removeSelectedItem(product.id);
        });
    
        newSelectProductQuantity.append(itemCounter,itemRemover);
        newSelectProductProperty.append(newSelectProductImage,newSelectProductName);
        newSelectProduct.append(newSelectProductProperty,newSelectProductPrice,newSelectProductQuantity);
        basketWrapper.append(newSelectProduct);
    });
};

function removeSelectedItem(productId){
    userBasket=userBasket.filter(function(item){
        return item.id!==productId;
    })
    createBasket(userBasket);
    clacuteTotalPriceBasket(userBasket);
};

function removeAllBasket(){
    userBasket=[];
    createBasket(userBasket);
    clacuteTotalPriceBasket(userBasket);
};

function clacuteTotalPriceBasket(userBasketArray){
    let totalPriceValue=0;
    userBasketArray.forEach(function(product){
        totalPriceValue+=product.count*product.price;
    })
    totalPrice.innerHTML="$"+totalPriceValue.toFixed(2);
};

function updateProductCount(productId,newCount){
    userBasket.forEach(function(product){
        if(product.id===productId){
            product.count=newCount;
        }
    })
    clacuteTotalPriceBasket(userBasket);
};

////////////////////// Events //////////////////////////
removeAll.addEventListener("click",removeAllBasket);
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready);
}
{
  ready();
}

function ready() {
  const deleteBtn = document.querySelectorAll(".delete-btn");

  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", cartRemoval);
  });

  const inputEl = document.querySelectorAll(".cart-quantity");

  inputEl.forEach((input) => {
    input.addEventListener("change", inputUpdate);
  });

  const addToCartBtn = document.querySelectorAll(".addToCart");

  addToCartBtn.forEach((item) => {
    item.addEventListener("click", addCartItem);
  });

  const purchase__btn = document.querySelector(".purchase");

  purchase__btn.addEventListener("click", () => {
    const cart__container  = document.querySelector(".cart-container")
    const product = cart__container.querySelectorAll(".cart-product")

    product.forEach(item => {
      alert("successfull purchased")
        item.parentElement.remove()
    })
    cartTotalUpdate();
  });


}

function cartRemoval(e) {
  const btns = e.target;
  btns.parentElement.parentElement.parentElement.remove();
  cartTotalUpdate();
}

function inputUpdate(e) {
  const input = e.target;
  if (isNaN(input.value) || input.value <= 1) {
    input.value = 1;
  }
  cartTotalUpdate();
}

function addCartItem(e) {
  const item = e.target;

  const shopProducts = item.parentElement.parentElement;
  const productImage = shopProducts.querySelector(".img").src;
  const productName = shopProducts.querySelector(".Item-Name");
  const productPrice = shopProducts.querySelector(".product-price");

  addItemToCart(productImage, productName, productPrice);
}

function addItemToCart(productImage, productName, productPrice) {
  const productCard = document.querySelector(".cart-container");
  const div = document.createElement("div");

  

  const productDisplayInnerHtml = `
 
 <div class="cart-product">
 <div class="cart-image">
     <img src=${productImage} alt="" class="cart-img">
 </div>
 <div class="cart-details">
     <div class="cart-name">
         <h2 class="item-cart-name">${productName.innerText}</h2>
         <div><p class="cart-price">${productPrice.innerText}</p></div>
         <input type="number"  class="cart-quantity" value="">
     </div>
     <button class="delete-btn"><h3>Delete</h3></button>
 </div>
</div>
 
 `;
//  const cartDetail = document.querySelectorAll(".product-card");

//   cartDetail.forEach((item) => {
//     const cartNames = item.querySelector(".Item-Name");
//     // console.log(cartNames)

//     if (cartNames.innerText === productName.innerText) {
//       // console.log(true)
//       alert("item already exist in cart");
//       return;
//     } else {
//       // console.log(false)
//     }
    
//   });

  div.innerHTML = productDisplayInnerHtml;

  productCard.appendChild(div);

  const removeItem = div.querySelector(".delete-btn");
  const inputValue = div.querySelector(".cart-quantity");

  removeItem.addEventListener("click", cartRemoval);
  inputValue.addEventListener("change", inputUpdate);
}

function cartTotalUpdate() {
  const cartContainer = document.querySelector(".cart-container");
  const cartProduct = cartContainer.querySelectorAll(".cart-product");
  const cartTotalEl = document.querySelector(".total-price");

  let total = 0;

  cartProduct.forEach((item) => {
    const cartPriceEl = item.querySelector(".cart-price");
    const price = parseFloat(cartPriceEl.innerText.replace("$", ""));

    const quantityEl = item.querySelector(".cart-quantity");

    const quantity = quantityEl.value;

    total = total + price * quantity;
  });
  total = Math.round(total * 100) / 100;
  cartTotalEl.innerHTML = "$" + total;
}

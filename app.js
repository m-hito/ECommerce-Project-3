document.addEventListener("DOMContentLoaded", () => {
    const products = [
        {id: 1, name: "Product 1", price: 10.99},
        {id: 2, name: "Product 2", price: 21.00},
        {id: 3, name: "Product 3", price: 11.5623123213},
        {id: 4, name: "Product 4", price: 60.99},
        {id: 5, name: "Product 5", price: 212.00},
        {id: 6, name: "Product 6", price: 111.5623123213},
        {id: 7, name: "Product 7", price: 130.99},
        {id: 8, name: "Product 8", price: 241.00},
        {id: 9, name: "Product 9", price: 191.5623123213}
    ]
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productList = document.getElementById("product-list")
    const cartItems = document.getElementById("cart-items")
    const emptyCartDisplay = document.getElementById("empty-cart")
    const cartTotalDisplay = document.getElementById("cart-total")
    const checkoutBtn = document.getElementById("checkout-btn")
    const totalPriceDisplay = document.getElementById("total-price")
    
    console.log(cart);
    cart.forEach(() => {
        renderCart()
    })

    products.forEach((product) => {
        const productDiv = document.createElement("div")
        productDiv.classList.add("product")
        productDiv.innerHTML = `
        <span>${product.name} - ${product.price.toFixed(2)}$</span>
        <button data-id="${product.id}">Add to cart.</button>
        `
        productList.appendChild(productDiv)
    });

    productList.addEventListener("click", (product) => {
        if (product.target.tagName === "BUTTON") {
            const productId = parseInt(product.target.getAttribute("data-id"))
            const productDetail = products.find((p) => productId === p.id)
            addToCart(productDetail);
        }
    })

    function saveCart(){
        localStorage.setItem("cart",JSON.stringify(cart));
    }
    function addToCart(product) {
        cart.push(product);
        renderCart()
        saveCart()
    }

    function removeFromCart(item) {
        const index = cart.findIndex(i => i.id === item.id);
        cart.splice(index, 1);
        renderCart()
        saveCart()
    }

    function renderCart() {
        cartItems.innerText = "";
        let totalPrice = 0;
        if (cart.length) {
            emptyCartDisplay.classList.add("hidden")
            cartTotalDisplay.classList.remove("hidden")
            
            cart.forEach((item, index) => {
                totalPrice += item.price
                let cartItem = document.createElement("div")
                cartItem.classList.add(item.id)
                cartItem.innerHTML = `
                ${item.name} - $ ${item.price.toFixed(2)}
                <button id="remove" class="${item.id}">Remove</button>
                ` 
                cartItems.appendChild(cartItem)
                totalPriceDisplay.innerText = `$${totalPrice.toFixed(2)}`

                const btn = cartItem.querySelector("button");
                btn.addEventListener("click", () => {
                    removeFromCart(item)
                })
                // console.log(removeBtn);
                
            });

        } else {
            cartItems.innerHTML = `
            <p id="empty-cart" >Your cart is empty.</p>
            `
            emptyCartDisplay.classList.remove("hidden")
            totalPriceDisplay.textContent = `$${0.00}`
            emptyCartDisplay.textContent = `Your cart is empty.`
        }
    }

    checkoutBtn.addEventListener("click", () => {
        let total = totalPriceDisplay.innerText
        cart.length = 0;
        alert("Bill of: " + total)
        renderCart()
    })
})

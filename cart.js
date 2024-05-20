document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            const button = event.target;
            const title = button.getAttribute("data-title");
            const price = parseFloat(button.getAttribute("data-price"));
            addToCart(title, price);
        });
    });
    updateCartDisplay(); // Оновлення вмісту кошика при завантаженні сторінки

    // Додавання обробника подій для форми оформлення замовлення
    const checkoutForm = document.getElementById("checkout-form");
    checkoutForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        if (validateForm()) {
            alert("Замовлення оформлено!");
            clearCart();
            closeCheckoutModal();
        }
    });
});

function addToCart(title, price) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    
    let existingItem = cartItems.find(item => item.title === title);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ title: title, price: price, quantity: 1 });
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("total-price");
    let totalPrice = 0;

    cartContainer.innerHTML = "";
    cartItems.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `<p>${item.title} - Ціна: $${item.price.toFixed(2)} - Кількість: ${item.quantity}</p>`;
        cartContainer.appendChild(cartItem);

        totalPrice += item.price * item.quantity;
    });

    totalContainer.innerText = `Загальна сума: $${totalPrice.toFixed(2)}`;
}

function clearCart() {
    localStorage.removeItem("cartItems");
    updateCartDisplay();
}

function openCheckoutModal() {
    const modal = document.getElementById("checkout-modal");
    modal.style.display = "block";
}

function closeCheckoutModal() {
    const modal = document.getElementById("checkout-modal");
    modal.style.display = "none";
}

function validateForm() {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    
    const nameRegex = /^[А-Яа-яІіЇїЄєҐґ' -]+$/; // Тільки українські літери, апостроф, дефіс та пробіл
    const addressRegex = /^[А-Яа-яІіЇїЄєҐґ0-9\s,.'-]+$/; // Українські літери, цифри, пробіли та деякі спеціальні символи
    const phoneRegex = /^[0-9]+$/; // Тільки цифри
    
    if (!nameRegex.test(name)) {
        alert("Будь ласка, введіть правильне ім'я, використовуючи тільки українські літери.");
        return false;
    }
    if (!addressRegex.test(address)) {
        alert("Будь ласка, введіть правильну адресу, використовуючи українські літери та цифри.");
        return false;
    }
    if (!phoneRegex.test(phone)) {
        alert("Будь ласка, введіть правильний номер телефону, використовуючи тільки цифри.");
        return false;
    }
    return true;
}



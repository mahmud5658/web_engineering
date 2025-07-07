const cardData = [
  {
    id: 1,
    name: "Cappuccino",
    category: "Beverage",
    currentPrice: 180,
    discount: 80,
    applyDiscount: true,
    image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg",
  },
  {
    id: 2,
    name: "Chocolate Cake",
    category: "Dessert",
    currentPrice: 320,
    discount: 0,
    applyDiscount: false,
    image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg",
  },
  {
    id: 3,
    name: "Iced Latte",
    category: "Beverage",
    currentPrice: 200,
    discount: 50,
    applyDiscount: true,
    image: "https://i.ibb.co/1Tt7bxS/5.png",
  },
  {
    id: 4,
    name: "Fresh Garden Salad",
    category: "Healthy",
    currentPrice: 150,
    discount: 0,
    applyDiscount: false,
    image: "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg",
  },
  {
    id: 5,
    name: "Cheeseburger",
    category: "Burger",
    currentPrice: 450,
    discount: 50,
    applyDiscount: true,
    image: "https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg",
  },
  {
    id: 6,
    name: "BBQ Chicken Pizza",
    category: "Pizza",
    currentPrice: 700,
    discount: 0,
    applyDiscount: false,
    image: "https://images.pexels.com/photos/845808/pexels-photo-845808.jpeg",
  },
  {
    id: 7,
    name: "Club Sandwich",
    category: "Snack",
    currentPrice: 350,
    discount: 25,
    applyDiscount: true,
    image: "https://images.pexels.com/photos/27672768/pexels-photo-27672768.jpeg",
  },
  {
    id: 8,
    name: "Hot Dog",
    category: "Fast Food",
    currentPrice: 250,
    discount: 0,
    applyDiscount: false,
    image: "https://images.pexels.com/photos/4518656/pexels-photo-4518656.jpeg",
  },
];

const cart = {};

function renderCards() {
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";

  cardData.forEach((item) => {
    const actualPrice = item.applyDiscount
      ? item.currentPrice - item.discount
      : item.currentPrice;

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="card-body">
        <h3 class="card-title">${item.name}</h3>
        <p class="card-category">${item.category}</p>
        ${
          item.applyDiscount
            ? `<p class="card-price"><del>৳${item.currentPrice}</del> <span style="color:green">৳${actualPrice}</span></p>`
            : `<p class="card-price">৳${item.currentPrice}</p>`
        }
        <button class="add-to-cart-btn" onclick="addToCart(${item.id})">Add to Cart</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function toggleCart() {
  document.getElementById("cartSidebar").classList.toggle("show");
}

function closeCart() {
  document.getElementById("cartSidebar").classList.remove("show");
}

function getActualPrice(item) {
  return item.applyDiscount ? item.currentPrice - item.discount : item.currentPrice;
}

function addToCart(id) {
  if (cart[id]) {
    cart[id].quantity++;
  } else {
    const product = cardData.find((item) => item.id === id);
    cart[id] = { ...product, quantity: 1 };
  }
  updateCart();
}

function increment(id) {
  cart[id].quantity++;
  updateCart();
}

function decrement(id) {
  if (cart[id].quantity > 1) {
    cart[id].quantity--;
  } else {
    delete cart[id];
  }
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  cartItems.innerHTML = "";

  let totalCount = 0;
  let totalPrice = 0;

  Object.values(cart).forEach((item) => {
    totalCount += item.quantity;
    const actualPrice = getActualPrice(item);
    totalPrice += actualPrice * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <img src="${item.image}" />
      <div>
        <p><strong>${item.name}</strong></p>
        <p>৳${actualPrice} × ${item.quantity} = ৳${actualPrice * item.quantity}</p>
        <div class="quantity-controls">
          <button onclick="decrement(${item.id})">-</button>
          <span class="cart-item-quantity">${item.quantity}</span>
          <button onclick="increment(${item.id})">+</button>
        </div>
      </div>
    `;
    cartItems.appendChild(cartItem);
  });

  if (totalCount === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    const totalElement = document.createElement("div");
    totalElement.style.marginTop = "15px";
    totalElement.innerHTML = `<h3>Total: ৳${totalPrice}</h3>`;
    cartItems.appendChild(totalElement);
  }

  cartCount.innerText = totalCount;
}

renderCards();

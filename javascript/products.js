// json data for list of products
var products = {
  1: {
    name: "Side Bag",
    desc: "Easy to carry side bag.",
    img: "bag.webp",
    price: 17
  },
  2: {
    name: "Belt",
    desc: "Genuine leather belt.",
    img: "belt.webp",
    price: 12
  },
  3: {
    name: "Bracelet",
    desc: "High quality bracelet.",
    img: "bracelet.webp",
    price: 120
  },
  4: {
    name: "Cap",
    desc: "Summer Cap for sexy man.",
    img: "cap.webp",
    price: 20
  },
  5: {
    name: "Chain",
    desc: "Neck Chain original Diamond.",
    img: "chain.webp",
    price: 5000
  },
  6: {
    name: "Glass",
    desc: "Reading glass, Scratch proof",
    img: "glass.webp",
    price: 842
  },
  7: {
    name: "Hat",
    desc: "Stylish hat for gentleman",
    img: "hat.webp",
    price: 842
  },
  8: {
    name: "Perfume",
    desc: "Long lasting perfume man",
    img: "perfume.webp",
    price: 842
  },
  9: {
    name: "Ring",
    desc: "Original Ring for him",
    img: "ring.webp",
    price: 842
  },
  10: {
    name: "Tie",
    desc: "Gentlemen's tie",
    img: "tie.webp",
    price: 842
  },
  11: {
    name: "T-shirt",
    desc: "Black original cotton t-shirt",
    img: "tshirt.jpg",
    price: 842
  },
  12: {
    name: "wallet",
    desc: "Leather wallet",
    img: "wallet.jpg",
    price: 842
  },
};

var cart = {
  // Cart properties
  hPdt: null,      // list of products
  hItems: null,    // current cart
  items: {},       // current items
  iURL: "images/products/", // product image url

  save: () => {
    localStorage.setItem("cart", JSON.stringify(cart.items));
  },

  // loading cart from local storage
  load: () => {
    cart.items = localStorage.getItem("cart");
    if (cart.items == null) { cart.items = {}; }
    else { cart.items = JSON.parse(cart.items); }
  },

  // empty the cart
  empty: () => {
    if (confirm("Empty cart?")) {
      cart.items = {};
      localStorage.removeItem("cart");
      cart.list();
    }
  },

  // initilize product list
  init: () => {
    cart.hPdt = document.getElementById("products_list");
    cart.hItems = document.getElementById("cart-items");

    // set products list
    cart.hPdt.innerHTML = "";
    let template = document.getElementById("template-product").content,
      p, item, part;
    for (let id in products) {
      p = products[id];
      item = template.cloneNode(true);
      item.querySelector(".p-img").src = cart.iURL + p.img;
      item.querySelector(".p-name").textContent = p.name;
      item.querySelector(".p-desc").textContent = p.desc;
      item.querySelector(".p-price").textContent = "$" + p.price.toFixed(2);
      item.querySelector(".p-add").onclick = () => { cart.add(id); };
      cart.hPdt.appendChild(item);
    }

    // load cart from session
    cart.load();

    // list the cart item
    cart.list();
  },

  // list items in cart
  list: () => {
    cart.hItems.innerHTML = "";
    let item, part, pdt, empty = true;
    for (let key in cart.items) {
      if (cart.items.hasOwnProperty(key)) { empty = false; break; }
    }

    // check cart is empty
    if (empty) {
      item = document.createElement("div");
      item.innerHTML = "<div id='empty-message'>Cart is empty</div>";
      cart.hItems.appendChild(item);
    }

    // if not emplty list cart items
    else {
      let template = document.getElementById("template-cart").content,
        p, total = 0, subtotal = 0;
      for (let id in cart.items) {
        p = products[id];
        item = template.cloneNode(true);
        item.querySelector(".c-del").onclick = () => { cart.remove(id); };
        item.querySelector(".c-name").textContent = p.name;

        item.querySelector(".c-img").src = cart.iURL + p.img;
        item.querySelector(".c-qty").value = cart.items[id];
        item.querySelector(".c-qty").onchange = function () { cart.change(id, this.value); };
        cart.hItems.appendChild(item);

        // calculate total
        subtotal = cart.items[id] * p.price;
        total += subtotal;
      }

      // display total
      item = document.createElement("div");
      item.className = "c-total";
      item.id = "c-total";
      item.innerHTML = "TOTAL: $" + total;
      cart.hItems.appendChild(item);

      // checkout and empty
      item = document.getElementById("template-cart-checkout").content.cloneNode(true);
      cart.hItems.appendChild(item);
    }
  },

  // add item to cart
  add: (id) => {
    if (cart.items[id] == undefined) { cart.items[id] = 1; }
    else { cart.items[id]++; }
    cart.save(); cart.list();
  },

  // change quantity
  change: (pid, qty) => {
    if (qty <= 0) {
      delete cart.items[pid];
      cart.save(); cart.list();
    }
    else {
      cart.items[pid] = qty;
      var total = 0;
      for (let id in cart.items) {
        total += cart.items[id] * products[id].price;
        document.getElementById("c-total").innerHTML = "TOTAL: $" + total;
      }
    }
  },

  // remove item from cart
  remove: (id) => {
    delete cart.items[id];
    cart.save();
    cart.list();
  },

  // Checkout
  checkout: () => {
    alert("Do later");
  }
};
window.addEventListener("DOMContentLoaded", cart.init);



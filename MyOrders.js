// MyOrders.js

import { db } from "./fbConfig.js";
import {
  collection,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

const displayAllProducts = document.getElementById("displayAllProducts");

// Get logged-in buyer info from localStorage
const loginbuyer = JSON.parse(localStorage.getItem("buyerCredentails"));

// Display buyer name in navbar
const buyerNameElement = document.getElementById("buyerName");
if (buyerNameElement) {
  if (loginbuyer && loginbuyer.nameSeller) {
    buyerNameElement.textContent = loginbuyer.nameSeller;
  } else {
    buyerNameElement.textContent = "Guest";
  }
}

function getStatusColor(status) {
  switch ((status || "").toLowerCase()) {
    case "pending":
      return "warning";
    case "shipped":
      return "info";
    case "delivered":
      return "success";
    case "cancelled":
      return "danger";
    default:
      return "secondary";
  }
}

function calculateOrderTotal(cartItems) {
  return cartItems
    .reduce((total, item) => total + item.price * (item.quantity || 1), 0)
    .toFixed(2);
}

async function fetchBuyerOrders() {
  if (!loginbuyer || !loginbuyer.nameSeller) {
    alert("Please login to view your orders");
    displayAllProducts.innerHTML = `<p class="no-orders">You are not logged in.</p>`;
    return [];
  }

  try {
    const sellersRef = collection(db, "sellers");
    const sellersSnapshot = await getDocs(sellersRef);

    let allOrders = [];

    for (const sellerDoc of sellersSnapshot.docs) {
      const ordersRef = collection(db, "sellers", sellerDoc.id, "orders");
      const q = query(ordersRef, where("buyerName", "==", loginbuyer.nameSeller));
      const ordersSnapshot = await getDocs(q);

      ordersSnapshot.forEach((orderDoc) => {
        const orderData = orderDoc.data();
        allOrders.push({
          ...orderData,
          sellerName: sellerDoc.data().nameSeller || sellerDoc.id,
          orderDocId: orderDoc.id,
          orderedAt: new Date(orderData.orderedAt).toLocaleString(),
        });
      });
    }

    // Sort orders newest first
    return allOrders.sort(
      (a, b) => new Date(b.orderedAt) - new Date(a.orderedAt)
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    displayAllProducts.innerHTML = `<p class="no-orders text-danger">Failed to load orders. Try again later.</p>`;
    return [];
  }
}

function displayOrders(orders) {
  displayAllProducts.innerHTML = "";

  if (orders.length === 0) {
    displayAllProducts.innerHTML = `
      <div class="no-orders">
        <h4 class="mt-3">No orders found</h4>
        <p>You haven't placed any orders yet.</p>
      </div>
    `;
    return;
  }

  const ordersAccordion = document.createElement("div");
  ordersAccordion.className = "accordion";
  ordersAccordion.id = "ordersAccordion";

  orders.forEach((order, index) => {
    const orderElement = document.createElement("div");
    orderElement.className = "accordion-item";

    orderElement.innerHTML = `
      <h2 class="accordion-header" id="heading${index}">
        <button
          class="accordion-button ${index !== 0 ? "collapsed" : ""}"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapse${index}"
          aria-expanded="${index === 0 ? "true" : "false"}"
          aria-controls="collapse${index}"
        >
          <div class="d-flex justify-content-between w-100 pe-3">
            <div>
              <span class="badge bg-${getStatusColor(order.status)} me-2">
                ${(order.status || "pending").toUpperCase()}
              </span>
              Order #${order.orderId ? order.orderId.split("_")[2] || order.orderId : "N/A"}
            </div>
            <div><small class="text-muted">${order.orderedAt}</small></div>
          </div>
        </button>
      </h2>

      <div
        id="collapse${index}"
        class="accordion-collapse collapse ${index === 0 ? "show" : ""}"
        aria-labelledby="heading${index}"
        data-bs-parent="#ordersAccordion"
      >
        <div class="accordion-body">
          <div class="row mb-3">
            <div class="col-md-6">
              <h5>Seller: ${order.sellerName}</h5>
              <p><strong>Order Total:</strong> $${order.totalAmount?.toFixed(2) || calculateOrderTotal(order.cartItems)}</p>
              <p><strong>Items:</strong> ${order.totalQuantity || order.cartItems.reduce((sum, i) => sum + (i.quantity || 1), 0)}</p>
            </div>
            <div class="col-md-6">
              <h5>Shipping Address</h5>
              <p>${order.shippingAddress?.address || "N/A"}</p>
              <p>${order.shippingAddress?.city || ""}, ${order.shippingAddress?.district || ""}</p>
              <p>${order.shippingAddress?.state || ""} - ${order.shippingAddress?.pincode || ""}</p>
              <p><strong>Payment:</strong> ${order.shippingAddress?.paymentMethod || "N/A"}</p>
            </div>
          </div>

          <h5>Order Items</h5>
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead class="table-light">
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${order.cartItems
                  .map(
                    (item) => {
                      const price = Number(item.price) || 0;
                      const quantity = item.quantity || 1;
                      const total = price * quantity;
                      return `
                        <tr>
                          <td>
                            <div class="d-flex align-items-center">
                              <img src="${item.image}" alt="${item.name}" class="img-thumbnail me-2" />
                              <div>
                                <h6 class="mb-0">${item.name}</h6>
                                <small class="text-muted">${item.description ? item.description.substring(0, 50) : ""}${item.description && item.description.length > 50 ? "..." : ""}</small>
                              </div>
                            </div>
                          </td>
                          <td>$${price.toFixed(2)}</td>
                          <td>${quantity}</td>
                          <td>$${total.toFixed(2)}</td>
                        </tr>
                      `;
                    }
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    ordersAccordion.appendChild(orderElement);
  });

  displayAllProducts.appendChild(ordersAccordion);
}

async function init() {
  displayAllProducts.innerHTML = `<p class="text-center">Loading orders...</p>`;
  const orders = await fetchBuyerOrders();
  displayOrders(orders);
}

// Run on load
init();


let cartIcon = document.getElementById("cartIcon");
cartIcon.addEventListener("click", ()=>{
  location.href = "./AddToCart.html"
})
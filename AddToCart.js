// import {
//   doc,
//   getDoc, updateDoc
// } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
// import { db } from "./fbConfig.js";

// let loginbuyer = JSON.parse(localStorage.getItem("buyerCredentails"));
// console.log(loginbuyer);

// if (loginbuyer) {
//   let buyerName = document.getElementById("buyerName");
//   buyerName.innerHTML = loginbuyer.nameSeller;
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const fetchBuyerCart = async () => {
//     if (!loginbuyer || !loginbuyer.nameSeller) {
//       console.error("Buyer not logged in or nameSeller not found.");
//       return;
//     }

//     try {
//       const buyerDocRef = doc(db, "buyers", loginbuyer.nameSeller);
//       const buyerDocSnap = await getDoc(buyerDocRef);
//       console.log(buyerDocRef);

//       if (buyerDocSnap.exists()) {
//         const buyerData = buyerDocSnap.data();
//         const cartItems = buyerData.cart || [];
//         console.log(cartItems);

//         const cartContainer = document.getElementById("cartContainer");

//         if (cartItems.length === 0) {
//           cartContainer.innerHTML = `<p class="text-center text-muted fs-5">Your cart is empty.</p>`;
//           return;
//         }

//         let html = `
//           <div class="container mt-4 p-4 border rounded shadow-sm bg-light">
//             <h2 class="mb-4 text-center">Your Cart</h2>
//             <table class="table table-striped table-bordered table-hover align-middle text-center">
//               <thead class="table-dark">
//                 <tr>
//                   <th>S No</th>
//                   <th>Product Name</th>
//                   <th>Product Image</th>
//                   <th>Price</th>
//                   <th>Description</th>
//                   <th>Quantity</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//         `;

//         cartItems.forEach((item, index) => {
//           html += `
//             <tr>
//               <td>${index + 1}</td>
//               <td>${item.name}</td>
//               <td><img src="${item.image}" alt="${item.name}" width="80" class="img-thumbnail" /></td>
//               <td>$${item.price}</td>
//               <td>${item.description}</td>
//               <td><input type="number" min="1" value="${item.quantity != null ? item.quantity : 1}" class="form-control quantity-input" /></td>
//               <td>
//                 <div class="d-flex justify-content-center gap-2">
//                   <button id="deleteBtn" class="btn btn-danger btn-sm px-3 py-1 fw-semibold shadow-sm delete-btn" data-index="${index}">
//                     <i class="bi bi-trash-fill me-1"></i>Delete
//                   </button>
//                 </div>
//               </td>

//             </tr>
//           `;
//         });

//         html += `
//               </tbody>
//                 <tfoot>
//                   <tr>
//                     <td colspan="6" class="text-end fw-bold">Total:</td>
//                     <td id="totalPrice" class="fw-bold text-success">$0.00</td>
//                   </tr>
//               </tbody>
//             </table>
//           </div>
//         `;

//         cartContainer.innerHTML = html;

//         // Delete functionality
//         document.querySelectorAll(".delete-btn").forEach((btn) =>{
//           btn.addEventListener("click", async (e) =>{
//             const indexToDelete = parseInt(e.currentTarget.getAttribute("data-index"));
//             await handleDeleteCartItem(indexToDelete)
//           })
//         })

//         // Quantity change calculation
//         document.querySelectorAll(".quantity-input").forEach((input) => {
//           input.addEventListener("input", calculateTotal);
//         });

//         // Initial total
//         calculateTotal();

//         function calculateTotal() {
//           let total = 0;
//           document.querySelectorAll('.quantity-input').forEach(input => {
//             const price = parseFloat(input.getAttribute('data-price'));
//             const quantity = parseInt(input.value) || 1;
//             total += price * quantity;
//           });
//           document.getElementById('totalPrice').textContent = `$${total}`;
//         }

//         // Delete cart item from Firestore
//         async function handleDeleteCartItem(deleteCartIndex){
//           const confirnDeleteCartItem = confirm("Are you sure you want to delete this product?")
//           if (!confirnDeleteCartItem) return;

//           try{
//             // Get the current cart
//             const buyerDocRef = doc(db, "buyers", loginbuyer.nameSeller);
//             const buyerDocSnap = await getDoc(buyerDocRef)

//             if (buyerDocSnap.exists()){
//               let cart = buyerDocSnap.data().cart || []

//               // Remove the item
//               cart.splice(deleteCartIndex, 1);

//               //Update Firestore
//               await updateDoc(buyerDocRef, {
//                 cart: cart
//               });

//               alert("Item deleted successfully from cart.")
//               location.reload();// Reload page to reflect the changes (or you can re-render instead)
//             }else{
//               alert("Buyer not found in Firebase.");
//             }
//           }catch(error){
//             console.error("Error deleting from cart:", error);
//             alert("Failed to delete item from cart.");
//           }
//         }

//       } else {
//         console.log("Buyer document does not exist.");
//         document.getElementById("cartContainer").innerHTML =
//           "<p>No cart found for this buyer.</p>";
//       }
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//       document.getElementById("cartContainer").innerHTML =
//         "<p>Error loading cart.</p>";
//     }
//   };

//   fetchBuyerCart();
// });






// import {
//   doc,
//   getDoc,
//   updateDoc,
//   setDoc, collection, query, where, getDocs
// } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
// import { db } from "./fbConfig.js";
// // import { doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

// let loginbuyer = JSON.parse(localStorage.getItem("buyerCredentails"));
// console.log(loginbuyer);

// if (loginbuyer) {
//   let buyerName = document.getElementById("buyerName");
//   buyerName.innerHTML = loginbuyer.nameSeller;
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const fetchBuyerCart = async () => {
//     if (!loginbuyer || !loginbuyer.nameSeller) {
//       console.error("Buyer not logged in or nameSeller not found.");
//       return;
//     }

//     try {
//       const buyerDocRef = doc(db, "buyers", loginbuyer.nameSeller);
//       const buyerDocSnap = await getDoc(buyerDocRef);

//       if (buyerDocSnap.exists()) {
//         const buyerData = buyerDocSnap.data();
//         const cartItems = buyerData.cart || [];

//         renderCart(cartItems);
//       } else {
//         document.getElementById("cartContainer").innerHTML =
//           "<p>No cart found for this buyer.</p>";
//       }
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//       document.getElementById("cartContainer").innerHTML =
//         "<p>Error loading cart.</p>";
//     }
//   };

//   const renderCart = (cartItems) => {
//     const cartContainer = document.getElementById("cartContainer");

//     if (cartItems.length === 0) {
//       cartContainer.innerHTML = `<p class="text-center text-muted fs-5">Your cart is empty.</p>`;
//       return;
//     }

//     let html = `
//       <div class="container mt-4 p-4 border rounded shadow-sm bg-light">
//         <h2 class="mb-4 text-center">Your Cart</h2>
//         <table class="table table-striped table-bordered table-hover align-middle text-center">
//           <thead class="table-dark">
//             <tr>
//               <th>S No</th>
//               <th>Product Name</th>
//               <th>Product Image</th>
//               <th>Price</th>
//               <th>Description</th>
//               <th>Quantity</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//     `;

//     cartItems.forEach((item, index) => {
//       const quantity = item.quantity != null ? item.quantity : 1;
//       html += `
//         <tr>
//           <td>${index + 1}</td>
//           <td>${item.name}</td>
//           <td><img src="${item.image}" alt="${item.name}" width="80" class="img-thumbnail" /></td>
//           <td>$${item.price}</td>
//           <td>${item.description}</td>
//           <td>
//             <input type="number" min="1" value="${quantity}" 
//               class="form-control quantity-input" 
//               data-price="${item.price}" />
//           </td>
//           <td>
//             <div class="d-flex justify-content-center gap-2">
//               <button class="btn btn-danger btn-sm px-3 py-1 fw-semibold shadow-sm delete-btn" data-index="${index}">
//                 <i class="bi bi-trash-fill me-1"></i>Delete
//               </button>
//             </div>
//           </td>
//         </tr>
//       `;
//     });

//     html += `
//           </tbody>
//           <tfoot>
//             <tr>
//               <td colspan="6" class="text-end fw-bold">Total:</td>
//               <td id="totalPrice" class="fw-bold text-success">$0.00</td>
//             </tr>
//           </tfoot>
//         </table>

//         <div class="text-end mt-3">
//           <button id="buyNowBtn" class="btn btn-success px-4 py-2 fw-bold shadow-sm">
//             <i class="bi bi-cart-check-fill me-2"></i>Buy Now
//           </button>
//         </div>
//       </div>
//     `;

//     cartContainer.innerHTML = html;

//     // Handle Buy Now Button click
//     const buyNowBtn = document.getElementById("buyNowBtn");
//     if (buyNowBtn) {
//       buyNowBtn.addEventListener("click", () => {
//         const buyModal = new bootstrap.Modal(document.getElementById("buyModal"));
//         buyModal.show();
//       });
//     }


//     document.querySelectorAll(".quantity-input").forEach((input) => {
//       input.addEventListener("input", calculateTotal);
//     });

//     document.querySelectorAll(".delete-btn").forEach((btn) => {
//       btn.addEventListener("click", async (e) => {
//         const indexToDelete = parseInt(e.currentTarget.getAttribute("data-index"));
//         await handleDeleteCartItem(indexToDelete);
//       });
//     });

//     calculateTotal();
//   };

//   const calculateTotal = () => {
//     let total = 0;
//     document.querySelectorAll(".quantity-input").forEach((input) => {
//       const price = parseFloat(input.getAttribute("data-price"));
//       const quantity = parseInt(input.value) || 1;

//       if (!isNaN(price) && !isNaN(quantity)) {
//         total += price * quantity;
//       }
//     });
//     document.getElementById("totalPrice").textContent = `$${total.toFixed(2)}`;
//   };

//   const handleDeleteCartItem = async (deleteCartIndex) => {
//     const confirmDelete = confirm("Are you sure you want to delete this product?");
//     if (!confirmDelete) return;

//     try {
//       const buyerDocRef = doc(db, "buyers", loginbuyer.nameSeller);
//       const buyerDocSnap = await getDoc(buyerDocRef);

//       if (buyerDocSnap.exists()) {
//         let cart = buyerDocSnap.data().cart || [];

//         cart.splice(deleteCartIndex, 1);

//         await updateDoc(buyerDocRef, { cart });

//         alert("Item deleted successfully from cart.");
//         renderCart(cart); // Re-render cart without reloading
//       } else {
//         alert("Buyer not found in Firebase.");
//       }
//     } catch (error) {
//       console.error("Error deleting from cart:", error);
//       alert("Failed to delete item from cart.");
//     }
//   };

//   fetchBuyerCart();
  
//   const shippingForm = document.getElementById("shippingForm");

// shippingForm.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   // Get form values
//   const address = document.getElementById("address").value.trim();
//   const pincode = document.getElementById("pincode").value.trim();
//   const state = document.getElementById("city").value.trim();
//   const city = document.getElementById("district").value.trim();
//   const district = document.getElementById("state").value.trim();
//   const paymentSelect = document.querySelector("select.form-select");
//   const paymentMethod = paymentSelect.options[paymentSelect.selectedIndex].value;

//   // Validation
//   if (!address || !pincode || !state || !city || !district || paymentMethod === "Payment Method") {
//     alert("Please fill in all fields and select a payment method.");
//     return;
//   }

//   const buyerCreds = JSON.parse(localStorage.getItem("buyerCredentails"));
  
//   if (!buyerCreds) {
//     alert("Buyer not logged in properly.");
//     return;
//   }

//   // Get cart items from Firestore (consistent with earlier code)
//   const buyerDocRef = doc(db, "buyers", buyerCreds.nameSeller);
//   const buyerDocSnap = await getDoc(buyerDocRef);
  
//   if (!buyerDocSnap.exists()) {
//     alert("Buyer document not found.");
//     return;
//   }

//   const cartItems = buyerDocSnap.data().cart || [];
  
//   if (cartItems.length === 0) {
//     alert("Cart is empty. Add items first.");
//     return;
//   }

//   try {
//     // Group cart items by seller ID
//     const sellerGroups = {};
//     cartItems.forEach((item) => {
//       const sellerId = item.id; // This is the seller's name/ID
//       if (!sellerGroups[sellerId]) {
//         sellerGroups[sellerId] = [];
//       }
//       sellerGroups[sellerId].push(item);
//     });

//     // Process each seller's group
//     for (const sellerId in sellerGroups) {
//       const itemsForSeller = sellerGroups[sellerId];
      
//       // Generate a unique order ID with timestamp
//       const timestamp = new Date().getTime();
//       const orderId = `${buyerCreds.nameSeller}_${sellerId}_${timestamp}`;
      
//       // Calculate total quantity and amount
//       const totalQuantity = itemsForSeller.reduce((sum, item) => sum + (item.quantity || 1), 0);
//       const totalAmount = itemsForSeller.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

//       // Create order document in seller's orders subcollection
//       const orderRef = doc(db, "sellers", sellerId, "orders", orderId);
      
//       const orderDetails = {
//         buyerName: buyerCreds.nameSeller,
//         buyerId: buyerCreds.id || null,
//         cartItems: itemsForSeller,
//         shippingAddress: {
//           address,
//           pincode,
//           city,
//           district,
//           state,
//           paymentMethod,
//         },
//         orderedAt: new Date().toISOString(),
//         orderId,
//         status: "pending", // Add order status
//         totalQuantity,
//         totalAmount,
//       };

//       await setDoc(orderRef, orderDetails);
//     }

//     // Clear buyer's cart
//     await updateDoc(buyerDocRef, { cart: [] });
    
//     alert("Order placed successfully!");
//     const buyModal = bootstrap.Modal.getInstance(document.getElementById("buyModal"));
//     if (buyModal) buyModal.hide();
    
//     location.href = "./OrderSucessfull.html";

//   } catch (error) {
//     console.error("Error placing order:", error);
//     alert("Failed to place order. Please try again.");
//   }
// });


// shippingForm.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const address = document.getElementById("address").value.trim();
//   const pincode = document.getElementById("pincode").value.trim();
//   const state = document.getElementById("state").value.trim();
//   const city = document.getElementById("city").value.trim();
//   const district = document.getElementById("district").value.trim();
//   const paymentSelect = document.querySelector("select.form-select");
//   const paymentMethod = paymentSelect.options[paymentSelect.selectedIndex].value;

//   if (!address || !pincode || !state || !city || !district || paymentMethod === "Payment Method") {
//     alert("Please fill in all fields and select a payment method.");
//     return;
//   }

//   const buyerCreds = JSON.parse(localStorage.getItem("buyerCredentails"));
//   const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

//   if (!buyerCreds) {
//     alert("Buyer not logged in properly.");
//     return;
//   }

//   if (cartItems.length === 0) {
//     alert("Cart is empty. Add items first.");
//     return;
//   }

//   try {
//     // ✅ Group cart items by seller ID (which is stored as `item.id`)
//     const sellerGroups = {};

//     cartItems.forEach((item) => {
//       const sellerId = item.id; // ✅ Confirmed: item.id is seller ID

//       if (!sellerGroups[sellerId]) {
//         sellerGroups[sellerId] = [];
//       }

//       sellerGroups[sellerId].push(item);
//     });

//     console.log("Grouped by seller:", sellerGroups); // Debug log

//     // ✅ Loop over each seller group
//     for (const sellerId in sellerGroups) {
//   const itemsForSeller = sellerGroups[sellerId];
//   const sellerDocRef = doc(db, "sellers", sellerId);
//   const orderId = `${buyerCreds.nameSeller}_${sellerId}`;
//   const orderRef = doc(sellerDocRef, "orders", orderId);

//   let existingCartItems = [];
//   const existingSnap = await getDoc(orderRef);
//   if (existingSnap.exists()) {
//     const existingData = existingSnap.data();
//     existingCartItems = existingData.cartItems || [];
//   }

//   const mergedCartItems = [...existingCartItems, ...itemsForSeller];

//   const orderDetails = {
//     buyerName: buyerCreds.nameSeller,
//     buyerId: buyerCreds.id || null,
//     cartItems: mergedCartItems,
//     shippingAddress: {
//       address,
//       pincode,
//       city,
//       district,
//       state,
//       paymentMethod,
//     },
//     orderedAt: new Date().toISOString(),
//     orderId,
//   };

//   await setDoc(orderRef, orderDetails, { merge: true });
// }


//     // ✅ Clear buyer's cart
//     const buyerDocRef = doc(db, "buyers", buyerCreds.nameSeller);
//     await updateDoc(buyerDocRef, { cart: [] });
//     localStorage.removeItem("cartItems");

//     alert("Order placed successfully!");
//     const buyModal = bootstrap.Modal.getInstance(document.getElementById("buyModal"));
//     if (buyModal) buyModal.hide();
//     location.href = "./OrderSucessfull.html";

//   } catch (error) {
//     console.error("🔥 Error placing order:", error);
//     alert("Failed to place order. Please try again.");
//   }
// });



// });



import {
  doc,
  getDoc,
  updateDoc,
  setDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
import { db } from "./fbConfig.js";

let loginbuyer = JSON.parse(localStorage.getItem("buyerCredentails"));
console.log(loginbuyer);

if (loginbuyer) {
  let buyerName = document.getElementById("buyerName");
  buyerName.innerHTML = loginbuyer.nameSeller;
  let buyerNameMobile = document.getElementById("buyerNameMobile");
  buyerNameMobile.innerHTML = loginbuyer.nameSeller
}

document.addEventListener("DOMContentLoaded", () => {
  const fetchBuyerCart = async () => {
    if (!loginbuyer || !loginbuyer.nameSeller) {
      console.error("Buyer not logged in or nameSeller not found.");
      return;
    }

    try {
      const buyerDocRef = doc(db, "buyers", loginbuyer.nameSeller);
      const buyerDocSnap = await getDoc(buyerDocRef);

      if (buyerDocSnap.exists()) {
        const buyerData = buyerDocSnap.data();
        const cartItems = buyerData.cart || [];

        renderCart(cartItems);
      } else {
        document.getElementById("cartContainer").innerHTML =
          "<p>No cart found for this buyer.</p>";
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      document.getElementById("cartContainer").innerHTML =
        "<p>Error loading cart.</p>";
    }
  };

  const renderCart = (cartItems) => {
    const cartContainer = document.getElementById("cartContainer");

    if (cartItems.length === 0) {
      cartContainer.innerHTML = `<p class="text-center text-muted fs-5">Your cart is empty.</p>`;
      return;
    }

    let html = `
      <div class="container mt-4 p-4 border rounded shadow-sm bg-light">
        <h2 class="mb-4 text-center">Your Cart</h2>
        <table class="table table-striped table-bordered table-hover align-middle text-center">
          <thead class="table-dark">
            <tr>
              <th>S No</th>
              <th>Product Name</th>
              <th>Product Image</th>
              <th>Price</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
    `;

    cartItems.forEach((item, index) => {
      const quantity = item.quantity != null ? item.quantity : 1;
      html += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.name}</td>
          <td><img src="${item.image}" alt="${item.name}" width="80" class="img-thumbnail" /></td>
          <td>$${item.price}</td>
          <td>${item.description}</td>
          <td>
            <input type="number" min="1" value="${quantity}" 
              class="form-control quantity-input" 
              data-index="${index}"
              data-price="${item.price}" />
          </td>
          <td>
            <div class="d-flex justify-content-center gap-2">
              <button class="btn btn-danger btn-sm px-3 py-1 fw-semibold shadow-sm delete-btn" data-index="${index}">
                <i class="bi bi-trash-fill me-1"></i>Delete
              </button>
            </div>
          </td>
        </tr>
      `;
    });

    html += `
          </tbody>
          <tfoot>
            <tr>
              <td colspan="6" class="text-end fw-bold">Total:</td>
              <td id="totalPrice" class="fw-bold text-success">$0.00</td>
            </tr>
          </tfoot>
        </table>

        <div class="text-end mt-3">
          <button id="buyNowBtn" class="btn btn-success px-4 py-2 fw-bold shadow-sm">
            <i class="bi bi-cart-check-fill me-2"></i>Buy Now
          </button>
        </div>
      </div>
    `;

    cartContainer.innerHTML = html;

    // Handle Buy Now Button click
    const buyNowBtn = document.getElementById("buyNowBtn");
    if (buyNowBtn) {
      buyNowBtn.addEventListener("click", () => {
        const buyModal = new bootstrap.Modal(document.getElementById("buyModal"));
        buyModal.show();
      });
    }

    // Update quantity in cart when input changes
    document.querySelectorAll(".quantity-input").forEach((input) => {
      input.addEventListener("change", async (e) => {
        const index = parseInt(e.target.getAttribute("data-index"));
        const newQuantity = parseInt(e.target.value) || 1;
        
        try {
          const buyerDocRef = doc(db, "buyers", loginbuyer.nameSeller);
          const buyerDocSnap = await getDoc(buyerDocRef);
          
          if (buyerDocSnap.exists()) {
            const cart = [...buyerDocSnap.data().cart];
            if (index >= 0 && index < cart.length) {
              cart[index].quantity = newQuantity;
              await updateDoc(buyerDocRef, { cart });
              calculateTotal();
            }
          }
        } catch (error) {
          console.error("Error updating quantity:", error);
        }
      });
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const indexToDelete = parseInt(e.currentTarget.getAttribute("data-index"));
        await handleDeleteCartItem(indexToDelete);
      });
    });

    calculateTotal();
  };

  const calculateTotal = () => {
    let total = 0;
    document.querySelectorAll(".quantity-input").forEach((input) => {
      const price = parseFloat(input.getAttribute("data-price"));
      const quantity = parseInt(input.value) || 1;

      if (!isNaN(price) && !isNaN(quantity)) {
        total += price * quantity;
      }
    });
    document.getElementById("totalPrice").textContent = `$${total.toFixed(2)}`;
  };

  const handleDeleteCartItem = async (deleteCartIndex) => {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const buyerDocRef = doc(db, "buyers", loginbuyer.nameSeller);
      const buyerDocSnap = await getDoc(buyerDocRef);

      if (buyerDocSnap.exists()) {
        let cart = buyerDocSnap.data().cart || [];

        cart.splice(deleteCartIndex, 1);

        await updateDoc(buyerDocRef, { cart });

        alert("Item deleted successfully from cart.");
        renderCart(cart); // Re-render cart without reloading
      } else {
        alert("Buyer not found in Firebase.");
      }
    } catch (error) {
      console.error("Error deleting from cart:", error);
      alert("Failed to delete item from cart.");
    }
  };

  fetchBuyerCart();
  
  const shippingForm = document.getElementById("shippingForm");

  shippingForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form values
    const address = document.getElementById("address").value.trim();
    const pincode = document.getElementById("pincode").value.trim();
    const state = document.getElementById("state").value.trim();
    const city = document.getElementById("city").value.trim();
    const district = document.getElementById("district").value.trim();
    const paymentSelect = document.querySelector("select.form-select");
    const paymentMethod = paymentSelect.options[paymentSelect.selectedIndex].value;

    // Validation
    if (!address || !pincode || !state || !city || !district || paymentMethod === "Payment Method") {
      alert("Please fill in all fields and select a payment method.");
      return;
    }

    const buyerCreds = JSON.parse(localStorage.getItem("buyerCredentails"));
    
    if (!buyerCreds) {
      alert("Buyer not logged in properly.");
      return;
    }

    // Get cart items from Firestore
    const buyerDocRef = doc(db, "buyers", buyerCreds.nameSeller);
    const buyerDocSnap = await getDoc(buyerDocRef);
    
    if (!buyerDocSnap.exists()) {
      alert("Buyer document not found.");
      return;
    }

    const cartItems = buyerDocSnap.data().cart || [];
    
    if (cartItems.length === 0) {
      alert("Cart is empty. Add items first.");
      return;
    }

    try {
      // Group cart items by seller ID
      const sellerGroups = {};
      cartItems.forEach((item) => {
        const sellerId = item.sellerId || item.id; // Use sellerId if available, fallback to id
        if (!sellerGroups[sellerId]) {
          sellerGroups[sellerId] = [];
        }
        // Get the current quantity from the form inputs
        const quantityInput = document.querySelector(`.quantity-input[data-index="${cartItems.indexOf(item)}"]`);
        const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : item.quantity || 1;
        
        sellerGroups[sellerId].push({
          ...item,
          quantity: quantity
        });
      });

      // Create an array to hold all orders for the buyer
      const buyerOrders = [];

      // Process each seller's group
      for (const sellerId in sellerGroups) {
        const itemsForSeller = sellerGroups[sellerId];
        
        // Generate a unique order ID with timestamp
        const timestamp = new Date().getTime();
        const orderId = `${buyerCreds.nameSeller}_${sellerId}_${timestamp}`;
        
        // Calculate total quantity and amount
        const totalQuantity = itemsForSeller.reduce((sum, item) => sum + (item.quantity || 1), 0);
        const totalAmount = itemsForSeller.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

        // Create order document in seller's orders subcollection
        const orderRef = doc(db, "sellers", sellerId, "orders", orderId);
        
        const orderDetails = {
          buyerName: buyerCreds.nameSeller,
          buyerId: buyerCreds.id || null,
          cartItems: itemsForSeller,
          shippingAddress: {
            address,
            pincode,
            city,
            district,
            state,
            paymentMethod,
          },
          orderedAt: new Date().toISOString(),
          orderId,
          status: "pending",
          totalQuantity,
          totalAmount,
          sellerId: sellerId
        };

        await setDoc(orderRef, orderDetails);
        
        // Add this order to the buyer's orders array
        buyerOrders.push(orderDetails);
      }

      // Update buyer's document - clear cart and add to myOrders array
      await updateDoc(buyerDocRef, {
        cart: [],
        myOrders: arrayUnion(...buyerOrders)
      });
      
      alert("Order placed successfully!");
      const buyModal = bootstrap.Modal.getInstance(document.getElementById("buyModal"));
      if (buyModal) buyModal.hide();
      
      location.href = "./OrderSucessfull.html";

    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  });
});

let homePage = document.getElementById("homePage");
homePage.addEventListener("click", () => {
  console.log("Home clicked");
  location.href = "./BuyerDashbord.html";
});


let myOrdersBtn = document.getElementById("myOrdersBtn");
myOrdersBtn.addEventListener("click", ()=>{
  location.href = "./MyOrders.html";
})






// import {
//   doc,
//   getDoc,
//   updateDoc,
//   setDoc
// } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
// import { db } from "./fbConfig.js";

// let loginbuyer = JSON.parse(localStorage.getItem("buyerCredentails"));
// console.log(loginbuyer);

// if (loginbuyer) {
//   let buyerName = document.getElementById("buyerName");
//   if (buyerName) buyerName.innerHTML = loginbuyer.nameSeller;
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const fetchBuyerCart = async () => {
//     if (!loginbuyer || !loginbuyer.nameSeller) {
//       console.error("Buyer not logged in or nameSeller not found.");
//       return;
//     }

//     try {
//       const buyerDocRef = doc(db, "buyers", loginbuyer.nameSeller);
//       const buyerDocSnap = await getDoc(buyerDocRef);

//       if (buyerDocSnap.exists()) {
//         const buyerData = buyerDocSnap.data();
//         const cartItems = buyerData.cart || [];
//         renderCart(cartItems);
//       } else {
//         document.getElementById("cartContainer").innerHTML =
//           "<p>No cart found for this buyer.</p>";
//       }
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//       document.getElementById("cartContainer").innerHTML =
//         "<p>Error loading cart.</p>";
//     }
//   };

//   const renderCart = (cartItems) => {
//     const cartContainer = document.getElementById("cartContainer");

//     if (cartItems.length === 0) {
//       cartContainer.innerHTML = `<p class="text-center text-muted fs-5">Your cart is empty.</p>`;
//       return;
//     }

//     let html = `
//       <div class="container mt-4 p-4 border rounded shadow-sm bg-light">
//         <h2 class="mb-4 text-center">Your Cart</h2>
//         <table class="table table-striped table-bordered table-hover align-middle text-center">
//           <thead class="table-dark">
//             <tr>
//               <th>S No</th>
//               <th>Product Name</th>
//               <th>Product Image</th>
//               <th>Price</th>
//               <th>Description</th>
//               <th>Quantity</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//     `;

//     cartItems.forEach((item, index) => {
//       const quantity = item.quantity != null ? item.quantity : 1;
//       html += `
//         <tr>
//           <td>${index + 1}</td>
//           <td>${item.name}</td>
//           <td><img src="${item.image}" alt="${item.name}" width="80" class="img-thumbnail" /></td>
//           <td>$${item.price}</td>
//           <td>${item.description}</td>
//           <td>
//             <input type="number" min="1" value="${quantity}" 
//               class="form-control quantity-input" 
//               data-price="${item.price}" />
//           </td>
//           <td>
//             <div class="d-flex justify-content-center gap-2">
//               <button class="btn btn-danger btn-sm px-3 py-1 fw-semibold shadow-sm delete-btn" data-index="${index}">
//                 <i class="bi bi-trash-fill me-1"></i>Delete
//               </button>
//             </div>
//           </td>
//         </tr>
//       `;
//     });

//     html += `
//           </tbody>
//           <tfoot>
//             <tr>
//               <td colspan="6" class="text-end fw-bold">Total:</td>
//               <td id="totalPrice" class="fw-bold text-success">$0.00</td>
//             </tr>
//           </tfoot>
//         </table>

//         <div class="text-end mt-3">
//           <button id="buyNowBtn" class="btn btn-success px-4 py-2 fw-bold shadow-sm">
//             <i class="bi bi-cart-check-fill me-2"></i>Buy Now
//           </button>
//         </div>
//       </div>
//     `;

//     cartContainer.innerHTML = html;

//     // Show modal on Buy Now click
//     const buyNowBtn = document.getElementById("buyNowBtn");
//     if (buyNowBtn) {
//       buyNowBtn.addEventListener("click", () => {
//         const buyModal = new bootstrap.Modal(document.getElementById("buyModal"));
//         buyModal.show();
//       });
//     }

//     // Quantity change event to recalc total
//     document.querySelectorAll(".quantity-input").forEach((input) => {
//       input.addEventListener("input", calculateTotal);
//     });

//     // Delete button click event
//     document.querySelectorAll(".delete-btn").forEach((btn) => {
//       btn.addEventListener("click", async (e) => {
//         const indexToDelete = parseInt(e.currentTarget.getAttribute("data-index"));
//         await handleDeleteCartItem(indexToDelete);
//       });
//     });

//     calculateTotal();
//   };

//   const calculateTotal = () => {
//     let total = 0;
//     document.querySelectorAll(".quantity-input").forEach((input) => {
//       const price = parseFloat(input.getAttribute("data-price"));
//       const quantity = parseInt(input.value) || 1;

//       if (!isNaN(price) && !isNaN(quantity)) {
//         total += price * quantity;
//       }
//     });
//     document.getElementById("totalPrice").textContent = `$${total.toFixed(2)}`;
//   };

//   const handleDeleteCartItem = async (deleteCartIndex) => {
//     const confirmDelete = confirm("Are you sure you want to delete this product?");
//     if (!confirmDelete) return;

//     try {
//       const buyerDocRef = doc(db, "buyers", loginbuyer.nameSeller);
//       const buyerDocSnap = await getDoc(buyerDocRef);

//       if (buyerDocSnap.exists()) {
//         let cart = buyerDocSnap.data().cart || [];
//         cart.splice(deleteCartIndex, 1);
//         await updateDoc(buyerDocRef, { cart });
//         alert("Item deleted successfully from cart.");
//         renderCart(cart); // Refresh cart UI
//       } else {
//         alert("Buyer not found in Firebase.");
//       }
//     } catch (error) {
//       console.error("Error deleting from cart:", error);
//       alert("Failed to delete item from cart.");
//     }
//   };

//   fetchBuyerCart();

//   // Shipping form order submission
//   const shippingForm = document.getElementById("shippingForm");
//   if (shippingForm) {
//     shippingForm.addEventListener("submit", async (e) => {
//       e.preventDefault();

//       const address = document.getElementById("address").value.trim();
//       const pincode = document.getElementById("pincode").value.trim();
//       const state = document.getElementById("city").value.trim();
//       const city = document.getElementById("district").value.trim();
//       const district = document.getElementById("state").value.trim();
//       const paymentSelect = document.querySelector("select.form-select");
//       const paymentMethod = paymentSelect.options[paymentSelect.selectedIndex].value;

//       if (!address || !pincode || !state || !city || !district || paymentMethod === "Payment Method") {
//         alert("Please fill in all fields and select a payment method.");
//         return;
//       }

//       try {
//         const buyerDocRef = doc(db, "buyers", loginbuyer.nameSeller);
//         const buyerDocSnap = await getDoc(buyerDocRef);

//         if (!buyerDocSnap.exists()) {
//           alert("Buyer document not found.");
//           return;
//         }

//         const buyerData = buyerDocSnap.data();
//         const cartItems = buyerData.cart || [];

//         if (cartItems.length === 0) {
//           alert("Cart is empty. Cannot place order.");
//           return;
//         }

//         const sellerName = cartItems[0]?.sellerName;

//         if (!sellerName) {
//           console.error("sellerName not found in cart item:", cartItems[1]);
//           alert("Seller name is missing from cart item. Cannot proceed.");
//           return;
//         }


//         // if (!sellerName) {
//         //   console.error("sellerName not found in cart item:", cartItems[0]);
//         //   alert("Seller name is missing from cart item. Cannot proceed.");
//         //   return;
//         // }

//         const orderId = `${loginbuyer.nameSeller}_${Date.now()}`;

//         const orderDetails = {
//           buyerName: loginbuyer.nameSeller,
//           cart: cartItems,
//           shippingAddress: {
//             address,
//             pincode,
//             city,
//             district,
//             state,
//             paymentMethod,
//           },
//           orderedAt: new Date().toISOString(),
//           orderId,
//         };

//         const orderRef = doc(db, `sellers/${sellerName}/orders/${orderId}`);
//         await setDoc(orderRef, orderDetails);

//         console.log("Order successfully added to Firestore at:", orderRef.path);
//         console.log("Order Details:", orderDetails);

//         // Clear buyer cart
//         await updateDoc(buyerDocRef, { cart: [] });

//         alert("Order placed successfully!");

//         // Close modal
//         bootstrap.Modal.getInstance(document.getElementById("buyModal")).hide();

//         // Rerender empty cart
//         renderCart([]);

//       } catch (error) {
//         console.error("Error placing order:", error);
//         alert("Something went wrong. Order not placed.");
//       }
//     });
//   }
// });

// let homePage = document.getElementById("homePage");
// if (homePage) {
//   homePage.addEventListener("click", () => {
//     console.log("Home clicked");
//     location.href = "./BuyerDashbord.html";
//   });
// }

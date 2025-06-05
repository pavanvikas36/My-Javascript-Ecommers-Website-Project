// import { db, authentication } from "./fbConfig.js";
// import { doc, updateDoc, arrayUnion, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
// import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

// let singleProduct = document.getElementById("singleProduct");
// let productImage = document.getElementById("productImage");
// let goBack = document.getElementById("goBack");

// // Go back to dashboard
// goBack.addEventListener("click", () => {
//     window.location.href = "./BuyerDashbord.html";
// });

// // Display logged-in buyer name
// let loginbuyer = JSON.parse(localStorage.getItem("buyerCredentails"));
// if (loginbuyer) {
//     let buyerName = document.getElementById("buyerName");
//     buyerName.innerHTML = loginbuyer.nameSeller;
// }

// // Get product data from URL params
// const params = new URLSearchParams(window.location.search);
// const productId = params.get("id");

// const singleItem = {
//     id: productId,
//     name: params.get("name"),
//     price: params.get("price"),
//     description: params.get("description"),
//     image: params.get("image")
// };

// // Display product details
// singleProduct.innerHTML = `
//     <h2>${singleItem.name}</h2>
//     <h3>Price: $${singleItem.price}</h3>
//     <p>${singleItem.description}</p>
//     <div class="buttons">
//         <button class="cart-btn" onclick="addToCart()">Add to Cart</button>
//         <button class="wishlist-btn" onclick="addToWishlist()">Add to Wishlist</button>
//     </div>
// `;

// productImage.innerHTML = `
//     <img src="${singleItem.image}" alt="${singleItem.name}" />
// `;

// // Function to add product to Firestore cart array
// async function addToCart() {
//     const buyerCreds = JSON.parse(localStorage.getItem("buyerCredentails"));

//     if (!buyerCreds || !buyerCreds.nameSeller) {
//         console.error("Buyer not logged in or nameSeller not found.");
//         alert("Please login first.");
//         return;
//     }

//     const buyerDocRef = doc(db, "buyers", buyerCreds.nameSeller);

//     try {
//         const buyerDocSnap = await getDoc(buyerDocRef);

//         let updatedCart = [];

//         if (buyerDocSnap.exists()) {
//             const data = buyerDocSnap.data();
//             const cart = data.cart || [];

//             // Check if product already exists in cart by id
//             const isInCart = cart.some(item => item.id === singleItem.id);
//             if (isInCart) {
//                 alert("Product already in cart.");
//                 return;
//             }

//             // Append new product to existing cart
//             updatedCart = [...cart, singleItem];
//         } else {
//             // No buyer doc, start cart with current product
//             updatedCart = [singleItem];
//         }

//         // Update cart array fully in Firestore
//         await updateDoc(buyerDocRef, { cart: updatedCart });

//         alert("Item added to cart!");
//         console.log("Added to cart:", singleItem);

//     } catch (error) {
//         console.error("Error adding to cart:", error);
//         alert("Failed to add to cart.");
//     }
// }

// window.addToCart = addToCart;



// import { db, authentication } from "./fbConfig.js";
// import { doc, updateDoc, arrayUnion, getDocs, getDoc, collection } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
// import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

// let singleProduct = document.getElementById("singleProduct");
// let productImage = document.getElementById("productImage");
// let goBack = document.getElementById("goBack");

// // Go back to dashboard
// goBack.addEventListener("click", () => {
//     window.location.href = "./BuyerDashbord.html";
// });

// // Display logged-in buyer name
// let loginbuyer = JSON.parse(localStorage.getItem("buyerCredentails"));
// if (loginbuyer) {
//     let buyerName = document.getElementById("buyerName");
//     buyerName.innerHTML = loginbuyer.nameSeller;
// }

// // Get product data from URL params
// const params = new URLSearchParams(window.location.search);
// const productId = params.get("id");

// const singleItem = {
//     id: productId,
//     name: params.get("name"),
//     price: params.get("price"),
//     description: params.get("description"),
//     image: params.get("image")
// };

// // Display product details
// singleProduct.innerHTML = `
//     <h2>${singleItem.name}</h2>
//     <h3>Price: $${singleItem.price}</h3>
//     <p>${singleItem.description}</p>
//     <div class="buttons">
//         <button class="cart-btn" onclick="addToCart()">Add to Cart</button>
//         <button class="wishlist-btn" onclick="addToWishlist()">Add to Wishlist</button>
//     </div>
// `;

// productImage.innerHTML = `
//     <img src="${singleItem.image}" alt="${singleItem.name}" />
// `;

// async function addToCart() {
//     const buyerCreds = JSON.parse(localStorage.getItem("buyerCredentails"));

//     if (!buyerCreds || !buyerCreds.nameSeller) {
//         console.error("Buyer not logged in or nameSeller not found.");
//         return;
//     }

//     const buyerDocRef = doc(db, "buyers", buyerCreds.nameSeller);

//     try {
//         // 1. Add item to Firestore
//         await updateDoc(buyerDocRef, {
//             cart: arrayUnion(singleItem)
//         });

//         // 2. Add item to localStorage
//         let localCart = JSON.parse(localStorage.getItem("cartItems")) || [];

//         // Optional: Avoid duplicates based on product ID
//         const isAlreadyInCart = localCart.some(item => item.id === singleItem.id);
//         if (!isAlreadyInCart) {
//             localCart.push(singleItem);
//             localStorage.setItem("cartItems", JSON.stringify(localCart));
//         }

//         alert("Item added to cart!");
//         console.log("Added to cart (Firestore & localStorage):", singleItem);
//     } catch (error) {
//         console.error("Error adding to cart:", error);
//         alert("Failed to add to cart.");
//     }
// }


// // ✅ Make function accessible globally
// window.addToCart = addToCart;

// let cartIconBtn = document.getElementById("cartIcon");
// cartIconBtn.addEventListener("click", ()=>{
//     location.href = "./AddToCart.html"
// })

// let homePage = document.getElementById("homePage");
// homePage.addEventListener("click", () => {
//   console.log("Home clicked");
//   location.href = "./BuyerDashbord.html";
// });




import { db, authentication } from "./fbConfig.js";
import { doc, updateDoc, arrayUnion, getDocs, getDoc, collection } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

// DOM Elements
let singleProduct = document.getElementById("singleProduct");
let productImage = document.getElementById("productImage");
let goBack = document.getElementById("goBack");
let cartIconBtn = document.getElementById("cartIcon");
let homePage = document.getElementById("homePage");

// Go back to dashboard
goBack.addEventListener("click", () => {
    window.location.href = "./BuyerDashbord.html";
});

// Display logged-in buyer name
let loginbuyer = JSON.parse(localStorage.getItem("buyerCredentails"));
if (loginbuyer) {
    let buyerName = document.getElementById("buyerName");
    buyerName.innerHTML = loginbuyer.nameSeller;
}

// Get product data from URL params
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const singleItem = {
    id: productId,
    name: params.get("name"),
    price: params.get("price"),
    description: params.get("description"),
    image: params.get("image")
};

// Display product details
singleProduct.innerHTML = `
    <h2>${singleItem.name}</h2>
    <h3>Price: ₹${singleItem.price}</h3>
    <p>${singleItem.description}</p>
    <div class="buttons">
        <button class="cart-btn" onclick="addToCart()">Add to Cart</button>
        <button class="wishlist-btn" onclick="addToWishlist()">Add to Wishlist</button>
    </div>
`;

productImage.innerHTML = `
    <img src="${singleItem.image}" alt="${singleItem.name}" />
`;

// ✅ Add to Cart Function: Firestore + localStorage
async function addToCart() {
    const buyerCreds = JSON.parse(localStorage.getItem("buyerCredentails"));

    if (!buyerCreds || !buyerCreds.nameSeller) {
        console.error("Buyer not logged in or nameSeller not found.");
        return;
    }

    const buyerDocRef = doc(db, "buyers", buyerCreds.nameSeller);

    // Create a new item object with sellerName included
    const cartItemWithSeller = {
        ...singleItem,
        sellerName: buyerCreds.nameSeller  // add sellerName here
    };

    try {
        // 1. Add to Firestore (cart)
        await updateDoc(buyerDocRef, {
            cart: arrayUnion(cartItemWithSeller)
        });

        // 2. Add to localStorage cartItems
        let localCart = JSON.parse(localStorage.getItem("cartItems")) || [];

        const isAlreadyInCart = localCart.some(item => item.id === cartItemWithSeller.id);

        if (!isAlreadyInCart) {
            localCart.push(cartItemWithSeller);
            localStorage.setItem("cartItems", JSON.stringify(localCart));
            console.log("Added to localStorage cart:", cartItemWithSeller);
        } else {
            console.log("Item already in localStorage cart");
        }

        alert("Item added to cart!");
    } catch (error) {
        console.error("Error adding to cart:", error);
        alert("Failed to add to cart.");
    }
}

// ✅ Expose to global scope
window.addToCart = addToCart;

// Cart Icon redirect
cartIconBtn.addEventListener("click", () => {
    location.href = "./AddToCart.html";
});

// Home redirect
homePage.addEventListener("click", () => {
    console.log("Home clicked");
    location.href = "./BuyerDashbord.html";
});








// You can implement addToWishlist similarly


// async function addToCart() {
//     const buyerCreds = JSON.parse(localStorage.getItem("buyerCredentails"));
    
//     if (!buyerCreds || !buyerCreds.nameSeller) {
//         console.error("Buyer not logged in or nameSeller not found.");
//         return;
//     }

//     const buyerDocRef = doc(db, "buyers", buyerCreds.nameSeller);

//     try {
//         const buyerDocSnap = await getDoc(buyerDocRef);
//         let cart = [];

//         if (buyerDocSnap.exists()) {
//             cart = buyerDocSnap.data().cart || [];
//         }

//         // Check if product ID already in cart
//         if (cart.includes(singleItem.id)) {
//             alert("Product is already in cart.");
//             return;
//         }

//         // Add product ID to cart array
//         await updateDoc(buyerDocRef, {
//             cart: arrayUnion(singleItem.id)
//         });

//         alert("Item added to cart!");
//         console.log("Added product ID to cart:", singleItem.id);

//     } catch (error) {
//         console.error("Error adding to cart:", error);
//         alert("Failed to add to cart.");
//     }
// }
// window.addToCart = addToCart;


// Display logged-in buyer name
// let loginbuyer = JSON.parse(localStorage.getItem("buyerCredentails"));

// let cartIconBtn = document.getElementById("cartIcon");
// cartIconBtn.addEventListener("click", ()=>{
//     location.href = "./AddToCart.html";
// })


// // async function addToCart(){
// //     const buyer = JSON.parse(localStorage.getItem("buyerCredentails"))
// //     if (!buyer || !buyer.uid){
// //         alert("You must be logged in to add items to the cart.")
// //         return ;
// //     }
// //     const cartRef = doc(db, "buyer", buyer.uid)
// //     const cartDoc = await getDoc(cartRef)

// //     let existingCart = [];
// //     if (cartDoc.exists()){
// //         existingCart = cartDoc.data().cart || []
// //     }

// //     const isAlreadyInCart = existingCart.some(item=> item.id === singleItem.id);

// //     if (!isAlreadyInCart){
// //         existingCart.push(singleItem)

// //         await setDoc(cartRef, {
// //             cart: existingCart, 
// //             nameSeller: buyer.nameSeller
// //         });
// //         alert("Product added to cart!")
// //     }else{
// //         alert("Product is already in the cart.");
// //     }
// // }
// // addToCart()

// // function goBack() {
// //     window.location.href = "./BuyerDashbord.html"
// // }


// import { db, authentication } from "./fbConfig.js";
// import { doc, getDoc, setDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
// import { signOut } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

// let singleProduct = document.getElementById("singleProduct");
// let productImage = document.getElementById("productImage");
// let goBack = document.getElementById("goBack");

// goBack.addEventListener("click", () => {
//     window.location.href = "./BuyerDashbord.html";
// });

// let loginbuyer = JSON.parse(localStorage.getItem("buyerCredentails"));
// if (loginbuyer) {
//     let buyerName = document.getElementById("buyerName");
//     buyerName.innerHTML = loginbuyer.nameSeller;
// }

// const params = new URLSearchParams(window.location.search);
// const singleItem = {
//     id: params.get("id"),
//     name: params.get("name"),
//     price: params.get("price"),
//     description: params.get("description"),
//     image: params.get("image")
// };

// singleProduct.innerHTML = `
//     <h2>${singleItem.name}</h2>
//     <h3>Price: $${singleItem.price}</h3>
//     <p>${singleItem.description}</p>
//     <div class="buttons">
//         <button class="cart-btn" onclick="addToCart()">Add to Cart</button>
//         <button class="wishlist-btn" onclick="addToWishlist()">Add to Wishlist</button>
//     </div>
// `;

// productImage.innerHTML = `
//     <img src="${singleItem.image}" alt="${singleItem.name}" />
// `;

// window.addToCart = async function () {
//     const buyer = JSON.parse(localStorage.getItem("buyerCredentails"));
//     if (!buyer || !buyer.uid) {
//         alert("You must be logged in to add items to the cart.");
//         return;
//     }

//     const cartRef = doc(db, "buyers", buyer.uid);
//     const cartDoc = await getDoc(cartRef);

//     let existingCart = [];
//     if (cartDoc.exists()) {
//         existingCart = cartDoc.data().cart || [];
//     }

//     const isAlreadyInCart = existingCart.some(item => item.id === singleItem.id);

//     if (!isAlreadyInCart) {
//         existingCart.push(singleItem);

//         await setDoc(cartRef, {
//             cart: existingCart,
//             nameSeller: buyer.nameSeller
//         });

//         alert("Product added to cart!");
//     } else {
//         alert("Product is already in the cart.");
//     }
// }


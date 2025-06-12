// import { doc,updateDoc,arrayUnion,getDoc } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js"
// import { db, authentication } from "./fbConfig.js"
// import { signOut } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js"

// document.addEventListener("DOMContentLoaded", ()=>{

//     let logoutBtn = document.getElementById("logoutBtn");
//     logoutBtn.addEventListener("click", async()=>{
//         alert("Logout Button Clicked")
//         const loggedout = await signOut(authentication)
//         console.log(loggedout)

//         if(loggedout){
//             location.href = "./SellerDashbord.html"
//         }else{
//             localStorage.removeItem("sellerCredentails")
//             localStorage.removeItem("productsList")
//             location.href = "./Login.html"
//             alert("Loggedout")
//         }
//     })

//     let loginSeller = JSON.parse(localStorage.getItem("sellerCredentails"))
//     console.log(loginSeller)

//     let sellername = document.getElementById("sellerName")
//     sellername.innerHTML = loginSeller.nameSeller;

//     let addProductsBtn = document.getElementById("addProducts");
//     addProductsBtn.addEventListener("click", () => {
//         let addProductModal = document.getElementById("addProductModal");
//         let showModal = new bootstrap.Modal(addProductModal); 
//         showModal.show();

//         let submitAddProducts = document.getElementById("submitAddProducts");
//         submitAddProducts.addEventListener("click",async(event)=>{
//             event.preventDefault();
//             let productName = document.getElementById("productName").value;
//             let productImage = document.getElementById("productImage").value;
//             let price = document.getElementById("price").value;
//             let category = document.getElementById("category").value;
//             let description = document.getElementById("description").value;

//             const newProduct = {
//                 productName, productImage, price, category, description
//             }
            
//             const docRef = doc(db, "sellers", loginSeller.nameSeller)

//             try{
//                 await updateDoc(docRef,{
//                     products:arrayUnion(newProduct)
//                 })
//                 alert("Product added successfully!")
//                 document.querySelector("#addProductModal form").reset();
//                 const modalInstance = bootstrap.Modal.getInstance(document.getElementById("addProductModal"));
//                 modalInstance.hide();
//             }catch(error){
//                 console.log("Error adding product:", error)
//                 alert("Failed to add product.");
//             }
//         })
//     });

    
//     let myProducts = document.getElementById("myProducts")
//     myProducts.addEventListener("click", async()=>{
//         // alert("Products Fetched!!!")
//         const sellerDocRef = doc(db, "sellers", loginSeller.nameSeller)
//         console.log(sellerDocRef,"seller Doc Ref")
//         const sellerDocFinalRef = await getDoc(sellerDocRef)
//         console.log(sellerDocFinalRef)

//         if(sellerDocFinalRef.exists()){
//             // const products = sellerDocFinalRef._document.data.value.mapValue.fields.products;
//             const products = sellerDocFinalRef.data();
//             const finalProducts = products.products

//             localStorage.setItem("productsList",JSON.stringify(finalProducts))

//             if(finalProducts.length > 0){
//                 renderProducts(finalProducts)
//             }else{
//                 alert("No Products Found!!!")
//             }
//             console.log(finalProducts)
//         }
//     })

//     let productsListContainer = document.getElementById("productsListContainer")    
//     let finalProducts = JSON.parse(localStorage.getItem("productsList"))
//     function renderProducts(productsArray){
//         productsListContainer.innerHTML = ""
//         // console.log(abc, "abc data")
//         productsArray.forEach((product, index)=>{
//             let productCart = document.createElement("div");
//             productCart.classList = "cardsContainer"
//             productCart.innerHTML = `
//                 <img src=${product.productImage} alt=""/>
//                 <h5>${product.productName}</h5>
//                 <h4>$${product.price}</h4>
//                 <p>${product.description}</p>
//                 <div class="btns-container">
//                     <button class="delete-btn">Delete</button>
//                     <button class="edit-btn">Edit</button>
//                 </div>
//             `;

//             productCart.querySelector(".delete-btn").addEventListener("click", () => {
//                 handleDeleteProduct(index);
//             });
//             productsListContainer.appendChild(productCart)
//         })
//     }
//     async function handleDeleteProduct(deleteIndex) {
//         const confirmDelete = confirm("Are you sure you want to delete this product?");
//         if (!confirmDelete) return;

//         const updatedProducts = finalProducts.filter((_, index) => index !== deleteIndex);
//         localStorage.setItem("productsList", JSON.stringify(updatedProducts));
//         finalProducts = updatedProducts;
//         renderProducts(finalProducts);

//         try {
//             const loginSeller = JSON.parse(localStorage.getItem("sellerCredentails"));
//             const sellerRef = doc(db, "sellers", loginSeller.nameSeller); // consistent collection

//             const sellerSnap = await getDoc(sellerRef);

//             if (sellerSnap.exists()) {
//                 let firebaseProducts = sellerSnap.data().products || [];
//                 firebaseProducts.splice(deleteIndex, 1);

//                 await updateDoc(sellerRef, {
//                     products: firebaseProducts
//                 });

//                 alert("Product deleted from Firebase successfully!");
//             } else {
//                 alert("Seller not found in Firebase.");
//             }
//         } catch (error) {
//             console.error("Error deleting from Firebase:", error);
//             alert("Failed to delete product from Firebase.");
//         }
//     }

//     renderProducts(finalProducts)
// })




// console.log(finalProducts)
// // let submitAddProducts = document.getElementById("submitAddProducts");
// //         submitAddProducts.addEventListener("click", async()=>{
// //             let pName = document.getElementById("productName").value;
// //             let pImag = document.getElementById("productImage").value;
// //             let pPrice = document.getElementById("price").value;
// //             let pCategory = document.getElementById("category").value;
// //             let pDescription = document.getElementById("description").value;

// //             const newProduct = {
// //                 pName, pImag, pPrice, pCategory, pDescription
// //             }

// //             const docRef = doc(db, "sellers", loginSeller.nameSeller)
// //             await updateDoc(docRef,{
// //                 products: arrayUnion(newProduct)
// //             });
// //         });

// import { doc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
// import { db } from "./fbConfig.js";

// document.addEventListener("DOMContentLoaded", () => {
//     let loginSeller = JSON.parse(localStorage.getItem("sellerCredentails"));
//     console.log(loginSeller);

//     let sellername = document.getElementById("sellerName");
//     sellername.innerHTML = loginSeller.nameSeller;

//     let addProductsBtn = document.getElementById("addProducts");

//     // Show modal when "Add Products" is clicked
//     addProductsBtn.addEventListener("click", () => {
//         let addProductModal = document.getElementById("addProductModal");
//         let showModal = new bootstrap.Modal(addProductModal);
//         showModal.show();
//     });

//     // Attach submit handler only once
//     let submitAddProducts = document.getElementById("submitAddProducts");
//     submitAddProducts.addEventListener("click", async (event) => {
//         event.preventDefault(); // Prevent form reload

//         let productName = document.getElementById("productName").value;
//         let productImage = document.getElementById("productImage").value;
//         let price = document.getElementById("price").value;
//         let category = document.getElementById("category").value;
//         let description = document.getElementById("description").value;

//         if (!productName || !productImage || !price || !category) {
//             alert("Please fill all required fields");
//             return;
//         }

//         const newProduct = {
//             productName,
//             productImage,
//             price,
//             category,
//             description
//         };

//         try {
//             const docRef = doc(db, "sellers", loginSeller.nameSeller);
//             await updateDoc(docRef, {
//                 products: arrayUnion(newProduct)
//             });

//             alert("Product added successfully!");
//             document.querySelector("#addProductModal form").reset();
//             const modalInstance = bootstrap.Modal.getInstance(document.getElementById("addProductModal"));
//             modalInstance.hide();
//         } catch (error) {
//             console.error("Error adding product:", error);
//             alert("Failed to add product.");
//         }
//     });
// });



import {
    doc,
    updateDoc,
    arrayUnion,
    getDoc,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
import { db, authentication } from "./fbConfig.js";
import { signOut } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
    let logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", async () => {
        try {
            await signOut(authentication);
            alert("Logout Successful!");
            localStorage.removeItem("sellerCredentails");
            localStorage.removeItem("productsList");
            location.href = "https://myjavascriptprojectecom.netlify.app/";
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Failed to logout");
        }
    });

    let loginSeller = JSON.parse(localStorage.getItem("sellerCredentails"));
    console.log("Logged in seller:", loginSeller);

    let sellername = document.getElementById("sellerName");
    sellername.innerHTML = loginSeller.nameSeller;

    let addProductsBtn = document.getElementById("addProducts");
    addProductsBtn.addEventListener("click", () => {
        let addProductModal = document.getElementById("addProductModal");
        let showModal = new bootstrap.Modal(addProductModal);
        showModal.show();

        let submitAddProducts = document.getElementById("submitAddProducts");
        submitAddProducts.addEventListener("click", async (event) => {
            event.preventDefault();

            let productName = document.getElementById("productName").value.trim();
            let productImage = document.getElementById("productImage").value.trim();
            let price = document.getElementById("price").value.trim();
            let category = document.getElementById("category").value.trim();
            let description = document.getElementById("description").value.trim();

            if (!productName || !productImage || !price || !category || !description) {
                alert("Please fill in all fields.");
                return;
            }

            const newProduct = { productName, productImage, price, category, description };
            const docRef = doc(db, "sellers", loginSeller.nameSeller);

            try {
                await updateDoc(docRef, {
                    products: arrayUnion(newProduct)
                });
                alert("Product added successfully!");
                document.querySelector("#addProductModal form").reset();
                const modalInstance = bootstrap.Modal.getInstance(document.getElementById("addProductModal"));
                modalInstance.hide();
            } catch (error) {
                console.log("Error adding product:", error);
                alert("Failed to add product.");
            }
        }, { once: true });
    });

    let myProducts = document.getElementById("myProducts");
    myProducts.addEventListener("click", async () => {
        const sellerDocRef = doc(db, "sellers", loginSeller.nameSeller);
        try {
            const sellerDocFinalRef = await getDoc(sellerDocRef);
            if (sellerDocFinalRef.exists()) {
                const products = sellerDocFinalRef.data();
                const finalProducts = products.products || [];

                localStorage.setItem("productsList", JSON.stringify(finalProducts));

                if (finalProducts.length > 0) {
                    renderProducts(finalProducts);
                } else {
                    alert("No Products Found!!!");
                    productsListContainer.innerHTML = "<p>No products found.</p>";
                }
                console.log(finalProducts);
            } else {
                alert("Seller document not found.");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            alert("Failed to fetch products.");
        }
    });

    let ordersBtn = document.getElementById("viewOrders");
    ordersBtn.addEventListener("click", async () => {
        try {
            const ordersRef = collection(db, "sellers", loginSeller.nameSeller, "orders");
            const querySnapshot = await getDocs(ordersRef);

            let orders = [];
            querySnapshot.forEach((doc) => {
                orders.push(doc.data());
            });

            if (orders.length > 0) {
                renderOrders(orders);
            } else {
                productsListContainer.innerHTML = "<p>No orders found.</p>";
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            alert("Failed to fetch orders.");
        }
    });

    let productsListContainer = document.getElementById("productsListContainer");
    let finalProducts = JSON.parse(localStorage.getItem("productsList")) || [];
    renderProducts(finalProducts);

    function renderProducts(productsArray) {
        productsListContainer.innerHTML = "";
        productsArray.forEach((product, index) => {
            let productCart = document.createElement("div");
            productCart.classList = "cardsContainer";
            productCart.innerHTML = `
                <img src="${product.productImage}" alt=""/>
                <h5>${product.productName}</h5>
                <h4>₹${product.price}</h4>
                <p>${product.description}</p>
                <div class="btns-container">
                    <button class="delete-btn">Delete</button>
                    <button class="edit-btn">Edit</button>
                </div>
            `;

            productCart.querySelector(".delete-btn").addEventListener("click", () => {
                handleDeleteProduct(index);
            });

            productCart.querySelector(".edit-btn").addEventListener("click", () => {
                handleEditProduct(index);
            });


            productsListContainer.appendChild(productCart);
        });
    }

    async function handleDeleteProduct(deleteIndex) {
        const confirmDelete = confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        const updatedProducts = finalProducts.filter((_, index) => index !== deleteIndex);
        localStorage.setItem("productsList", JSON.stringify(updatedProducts));
        finalProducts = updatedProducts;
        renderProducts(finalProducts);

        try {
            const loginSeller = JSON.parse(localStorage.getItem("sellerCredentails"));
            const sellerRef = doc(db, "sellers", loginSeller.nameSeller);
            const sellerSnap = await getDoc(sellerRef);

            if (sellerSnap.exists()) {
                let firebaseProducts = sellerSnap.data().products || [];
                firebaseProducts.splice(deleteIndex, 1);

                await updateDoc(sellerRef, {
                    products: firebaseProducts
                });

                alert("Product deleted from Firebase successfully!");
            } else {
                alert("Seller not found in Firebase.");
            }
        } catch (error) {
            console.error("Error deleting from Firebase:", error);
            alert("Failed to delete product from Firebase.");
        }
    }

    // function handleEditProduct(editIndex) {
    //     const productToEdit = finalProducts[editIndex];

    //     // Fill the modal form with product details
    //     document.getElementById("productName").value = productToEdit.productName;
    //     document.getElementById("productImage").value = productToEdit.productImage;
    //     document.getElementById("price").value = productToEdit.price;
    //     document.getElementById("category").value = productToEdit.category;
    //     document.getElementById("description").value = productToEdit.description;

    //     // Show the modal
    //     const addProductModal = new bootstrap.Modal(document.getElementById("addProductModal"));
    //     addProductModal.show();

    //     // Update product on submit
    //     const submitBtn = document.getElementById("submitAddProducts");

    //     const updateHandler = async (event) => {
    //         event.preventDefault();

    //         const updatedProduct = {
    //             productName: document.getElementById("productName").value.trim(),
    //             productImage: document.getElementById("productImage").value.trim(),
    //             price: document.getElementById("price").value.trim(),
    //             category: document.getElementById("category").value.trim(),
    //             description: document.getElementById("description").value.trim(),
    //         };

    //         finalProducts[editIndex] = updatedProduct;
    //         localStorage.setItem("productsList", JSON.stringify(finalProducts));
    //         renderProducts(finalProducts);

    //         try {
    //             const sellerRef = doc(db, "sellers", loginSeller.nameSeller);
    //             await updateDoc(sellerRef, {
    //                 products: finalProducts
    //             });
    //             alert("Product updated successfully!");
    //             addProductModal.hide();
    //         } catch (error) {
    //             console.error("Error updating product:", error);
    //             alert("Failed to update product.");
    //         }

    //         // Clean up to avoid multiple bindings
    //         submitBtn.removeEventListener("click", updateHandler);
    //     };

    //     // Remove previous event if any and attach new one (once)
    //     submitBtn.addEventListener("click", updateHandler, { once: true });
    // }


    function renderOrders(ordersArray) {
    productsListContainer.innerHTML = "";

    ordersArray.forEach((order, index) => {
        let cartItemsHtml = "";

        if (Array.isArray(order.cartItems)) {
            cartItemsHtml = order.cartItems.map(item => `
                <li class="cart-item">
                    <strong>${item.productName || item.name || "Unknown Product"}</strong><br>
                    Quantity: ${item.quantity || 1}<br>
                    Price: ₹${item.price || 0}
                </li>
            `).join("");
        } else {
            cartItemsHtml = "<li>No cart details available</li>";
        }

        let formattedShipping = "N/A";
        if (typeof order.shippingAddress === "object" && order.shippingAddress !== null) {
            formattedShipping = `
                <div class="shipping-address">
                    ${order.shippingAddress.address || ""}<br>
                    ${order.shippingAddress.paymentMethod || ""}<br>
                    ${order.shippingAddress.state || ""}<br>
                    ${order.shippingAddress.pincode || ""}<br>
                    ${order.shippingAddress.district || ""}
                </div>
            `;
        } else if (typeof order.shippingAddress === "string") {
            formattedShipping = `<div class="shipping-address">${order.shippingAddress}</div>`;
        }

        const orderCard = document.createElement("div");
        orderCard.classList.add("cardsContainer", "order-card");
        orderCard.innerHTML = `
            <h5 class="order-title">Order ${index + 1}</h5>
            <p><strong>Buyer Name:</strong> <span class="buyer-name">${order.buyerName || "N/A"}</span></p>
            <p><strong>Shipping Address:</strong><br>${formattedShipping}</p>
            <p><strong>Status:</strong> <span class="order-status ${order.status ? order.status.toLowerCase() : 'pending'}">${order.status || "Pending"}</span></p>
            <p><strong>Cart Items:</strong></p>
            <ul class="cart-list">${cartItemsHtml}</ul>
        `;

        productsListContainer.appendChild(orderCard);
    });
}



});

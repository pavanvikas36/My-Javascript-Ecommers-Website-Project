// import {db, authentication} from "./fbConfig.js"
// import {doc, getDocs, collection} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js"
// import { signOut } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js"

// // document.addEventListener("DOMContentLoaded", ()=>{

// //     let logoutBtn = document.getElementById("logoutBtn");
// //     logoutBtn.addEventListener("click", async()=>{
// //         try {
// //             alert("Loggout Sucessfully!!!")
// //             await signOut(authentication);
// //             localStorage.removeItem("buyerCredentails");
// //             location.href = "./Login.html";
// //         } catch (error) {
// //             console.error("Logout failed:", error);
// //             alert("Failed to logout. Try again.");
// //         }

// //         if(logout){
// //             location.href = "./BuyerDashbord.html"
// //         }else{
// //             localStorage.removeItem("buyerCredentails")
// //             location.href = "./Login.html"
// //         }
// //     })

// //     let loginbuyer = JSON.parse(localStorage.getItem("buyerCredentails"))
// //     // console.log(loginbuyer)

// //     let buyerName = document.getElementById("buyerName")
// //     buyerName.innerHTML = loginbuyer.nameSeller;

// //     function showSkeletons(count = 4) {
// //         const container = document.getElementById("displayAllProducts");
// //         container.innerHTML = "";
// //         for (let i = 0; i < count; i++) {
// //             const skeleton = document.createElement("div");
// //             skeleton.classList = "col";
// //             skeleton.innerHTML = `
// //                 <div class="skeleton-card"></div>
// //             `;
// //             container.appendChild(skeleton);
// //         }
// //     }
// //     showSkeletons(8); // Show 8 skeleton cards

// //     // fetch("https://firestore.googleapis.com/v1/projects/project-js-5c5c2/databases/(default)/documents/sellers")
// //     // .then(response => response.json())
// //     // .then(data =>{
// //     //     console.log(data)
// //     //     const sellerData = data.documents || [];
// //     //     const allProductsArray = []
// //     //     sellerData.forEach(seller =>{
// //     //         const sellerId = seller.name.split("/").pop();
// //     //         const productsField = seller.fields.products;
// //     //         // const products = seller.fields.products.arrayValue.values || [];
// //     //         if(productsField && productsField.arrayValue && productsField.arrayValue.values){
// //     //             const products = productsField.arrayValue.values;
// //     //             console.log(products, "Products")
// //     //             products.forEach(product =>{
// //     //                 const fields = product.mapValue.fields || {};
// //     //                 // console.log(fields)
// //     //                 const plainProduct = {};
    
// //     //                 for (const key in fields){
// //     //                     plainProduct[key] = fields[key].stringValue || fields[key].integerValue || fields[key].doubleValue || "";
// //     //                 }
// //     //                 plainProduct.id = sellerId;
// //     //                 allProductsArray.push(plainProduct);
// //     //             });
// //     //         }
// //     //     });
// //     //     console.log(allProductsArray)

// //     let allProductsArray = []; // Store all products here
// //     let filteredArray = [];    // Stores filtered + searched products


// //     const fetchSellerProducts = async ()=>{
// //         try{
// //             const sellerCollectionRef = collection(db, "sellers")
// //             const allDocs = await getDocs(sellerCollectionRef)

// //             const allProductsArray = []

// //             allDocs.forEach(doc => {
// //                 const sellerId = doc.id;
// //                 const sellerData = doc.data()
// //                 const products = sellerData.products || []

// //                 products.forEach(product => {
// //                     const plainProduct = {...product, id: sellerId}
// //                     allProductsArray.push(plainProduct)
// //                 });
// //             });
// //             console.log(allProductsArray);
// //             displayCards(allProductsArray)   

// //             // Handle category filtering
// //             const selectCategory = document.querySelector("#selectCategory");
// //             selectCategory.addEventListener("change", ()=>{
// //                 const option = selectCategory.value.toLowerCase();
// //                 const filtered = option === "all categories" 
// //                     ? allProductsArray 
// //                     : allProductsArray.filter(p => p.category.toLowerCase() === option);
// //                 displayCards(filtered)
// //             })
// //         }
// //         catch(error){
// //             console.error("Error fetching sellers:", error)
// //         }

// //         let allProductsArray = [];

// //         // ...inside fetchSellerProducts
// //         allProductsArray = [];

// //         allDocs.forEach(doc => {
// //             const sellerId = doc.id;
// //             const sellerData = doc.data()
// //             const products = sellerData.products || []

// //             products.forEach(product => {
// //                 const plainProduct = {...product, id: sellerId}
// //                 allProductsArray.push(plainProduct)
// //             });
// //         });

// //         console.log(allProductsArray);
// //         displayCards(allProductsArray);

// //         // Filter by category
// //         const selectCategory = document.querySelector("#selectCategory");
// //         selectCategory.addEventListener("change", () => {
// //             const option = selectCategory.value.toLowerCase();
// //             const filtered = option === "all categories" 
// //                 ? allProductsArray 
// //                 : allProductsArray.filter(p => p.category.toLowerCase() === option);
// //             displayCards(filtered);
// //         });

// //         // ✅ Search filter
// //         const searchInput = document.getElementById("searchInput");
// //         searchInput.addEventListener("input", () => {
// //             const query = searchInput.value.toLowerCase().trim();
// //             const filtered = allProductsArray.filter(p => 
// //                 p.productName.toLowerCase().includes(query) ||
// //                 p.description.toLowerCase().includes(query) ||
// //                 p.category.toLowerCase().includes(query)
// //             );
// //             displayCards(filtered);
// //         });

// //             }

// //             // Display cards
// //             const displayCards = (products) => {
// //                 const container = document.getElementById("displayAllProducts");
// //                 container.innerHTML = "";
// //                 products.forEach(product => {
// //                 const card = document.createElement("div");
// //                 card.classList.add("displayCards");
// //                 card.innerHTML = `
// //                     <img src="${product.productImage}" alt="Product Image" />
// //                     <h5>${product.productName}</h5>
// //                     <h4>$${product.price}</h4>
// //                     <p>${product.description}</p>
// //                 `;
// //                 card.addEventListener("click", () => {
// //                     const params = new URLSearchParams({
// //                     id: product.id,
// //                     name: product.productName,
// //                     price: product.price,
// //                     description: product.description,
// //                     image: product.productImage,
// //                     category: product.category
// //                     });
// //                     window.location.href = `SingleProduct.html?${params.toString()}`;
// //                 });
// //                 container.appendChild(card);
// //                 });
// //             };

// //   // Call the function
// //   fetchSellerProducts();

// //         // let selectCategory = document.querySelector("#selectCategory")
// //         // selectCategory.addEventListener("change", filterByCategory)
// //         // function filterByCategory(){
// //         //     let optionElement = selectCategory.value.toLowerCase()
// //         //     console.log(optionElement)

// //         //     const filterProducts = optionElement === "all categories" ? allProductsArray : 
// //         //         allProductsArray.filter((categoryProduct) => categoryProduct.category == optionElement)
// //         //         console.log(filterProducts)
// //         //     displayCards(filterProducts)
// //         // }

// //         // function displayCards(allProductsArray){
// //         //     let displayAllProducts = document.getElementById("displayAllProducts")
// //         //     displayAllProducts.innerHTML = ""; // Clear previous cards
// //         //     allProductsArray.forEach((sellerProducts)=>{
// //         //         // console.log(sellerProducts)
// //         //         let userDisplayProducts = document.createElement("div")
// //         //         userDisplayProducts.classList = "displayCards";
// //         //         userDisplayProducts.innerHTML = `
// //         //             <img src=${sellerProducts.productImage} alt=""/>
// //         //             <h5>${sellerProducts.productName}</h5>
// //         //             <h4>$${sellerProducts.price}</h4>
// //         //             <p>${sellerProducts.description}</p>
// //         //         `;
// //         //         userDisplayProducts.addEventListener("click", ()=>{
// //         //             const params = new URLSearchParams({
// //         //                 id: sellerProducts.id,
// //         //                 name: sellerProducts.productName,
// //         //                 price: sellerProducts.price,
// //         //                 description: sellerProducts.description,
// //         //                 image: sellerProducts.productImage,
// //         //                 category: sellerProducts.category
// //         //             })
// //         //         window.location.href = `SingleProduct.html?${params.toString()}`
// //         //     })
// //         //     displayAllProducts.append(userDisplayProducts)
// //         // })
// //         // }

// //         // displayCards(allProductsArray)
// //     // })
// //     // .catch(error => {
// //     //     console.error("Error fetching data:", error);
// //     // });
// // })

// // let cartIconBtn = document.getElementById("cartIcon");
// // cartIconBtn.addEventListener("click", ()=>{
// //     location.href = "./AddToCart.html"
// // })

// // async function getData(){
//     //     try{
//     //         let response = await fetch("https://firestore.googleapis.com/v1/projects/project-js-5c5c2/databases/(default)/documents/sellers")
//     //         let result = await response.json()
//     //         console.log(result.documents)
//     //     }
//     //     catch(error){
//     //         alert("No Data Found")
//     //         console.log("No Data Found")
//     //     }
//     // }
//     // getData()

// // userDisplayProducts.addEventListener("click", ()=>{
//             //     window.location.href = `SingleProduct.html?productId=${sellerProducts.id}`
//             //     console.log(sellerProducts.id)
//             // })


// // import { db, authentication } from "./fbConfig.js";
// // import { doc, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
// // import { signOut } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

// // document.addEventListener("DOMContentLoaded", async () => {

// //     let logoutBtn = document.getElementById("logoutBtn");
// //     logoutBtn.addEventListener("click", async () => {
// //         alert("Logout Button Clicked");
// //         alert("Logout Button Clicked")
// //         const logedout = await signOut(authentication)
// //         console.log(logedout)

// //         if(logedout){
// //             location.href = "./BuyerDashbord.html"
// //         }else{
// //             localStorage.removeItem("buyerCredentails")
// //             location.href = "./Login.html"
// //         }
        
// //     });

// //     let loginbuyer = JSON.parse(localStorage.getItem("buyerCredentails"));
// //     if (loginbuyer) {
// //         let buyerName = document.getElementById("buyerName");
// //         buyerName.innerHTML = loginbuyer.nameSeller;
// //     }

// //     function showSkeletons(count = 4) {
// //         const container = document.getElementById("displayAllProducts");
// //         container.innerHTML = "";
// //         for (let i = 0; i < count; i++) {
// //             const skeleton = document.createElement("div");
// //             skeleton.classList = "col";
// //             skeleton.innerHTML = `
// //                 <div class="skeleton-card"></div>
// //             `;
// //             container.appendChild(skeleton);
// //         }
// //     }
// //     showSkeletons(8); // Show 8 skeleton cards

// //     try {
// //         const sellersSnapshot = await getDocs(collection(db, "sellers"));
// //         const allProductsArray = [];

// //         sellersSnapshot.forEach((sellerDoc) => {
// //             const sellerId = sellerDoc.id;
// //             const sellerData = sellerDoc.data();
// //             const products = sellerData.products || [];

// //             products.forEach((product) => {
// //                 const plainProduct = {
// //                     id: sellerId,
// //                     productName: product.productName || "",
// //                     price: product.price || "",
// //                     productImage: product.productImage || "",
// //                     description: product.description || "",
// //                     category: product.category || ""
// //                 };
// //                 allProductsArray.push(plainProduct);
// //             });
// //         });

// //         console.log("All Products:", allProductsArray);

// //         let selectCategory = document.querySelector("#selectCategory");
// //         selectCategory.addEventListener("change", filterByCategory);

// //         function filterByCategory() {
// //             let optionElement = selectCategory.value.toLowerCase();
// //             const filterProducts = optionElement === "all categories"
// //                 ? allProductsArray
// //                 : allProductsArray.filter((product) => product.category.toLowerCase() === optionElement);
// //             displayCards(filterProducts);
// //         }

// //         function displayCards(productsArray) {
// //             const displayAllProducts = document.getElementById("displayAllProducts");
// //             displayAllProducts.innerHTML = "";
// //             productsArray.forEach((product) => {
// //                 const card = document.createElement("div");
// //                 card.classList = "displayCards";
// //                 card.innerHTML = `
// //                     <img src="${product.productImage}" alt="Product Image" />
// //                     <h5>${product.productName}</h5>
// //                     <h4>$${product.price}</h4>
// //                     <p>${product.description}</p>
// //                 `;
// //                 card.addEventListener("click", () => {
// //                     const params = new URLSearchParams({
// //                         id: product.id,
// //                         name: product.productName,
// //                         price: product.price,
// //                         description: product.description,
// //                         image: product.productImage,
// //                         category: product.category
// //                     });
// //                     window.location.href = `SingleProduct.html?${params.toString()}`;
// //                 });
// //                 displayAllProducts.appendChild(card);
// //             });
// //         }

// //         displayCards(allProductsArray);

// //     } catch (error) {
// //         console.error("Error fetching products:", error);
// //     }
// // });


// document.addEventListener("DOMContentLoaded", () => {
//     const logoutBtn = document.getElementById("logoutBtn");
//     const buyerName = document.getElementById("buyerName");
//     const selectCategory = document.getElementById("selectCategory");
//     const searchInput = document.getElementById("searchInput");
//     const sortPrice = document.getElementById("sortPrice");
//     const cartIconBtn = document.getElementById("cartIcon");

//     let allProductsArray = [];
//     let filteredArray = [];

//     // Logout functionality
//     logoutBtn.addEventListener("click", async () => {
//         try {
//             await signOut(authentication);
//             alert("Logout Successful!");
//             localStorage.removeItem("buyerCredentails");
//             location.href = "./Login.html";
//         } catch (error) {
//             console.error("Logout failed:", error);
//             alert("Failed to logout. Try again.");
//         }
//     });

//     // Display buyer name
//     const loginbuyer = JSON.parse(localStorage.getItem("buyerCredentails"));
//     if (loginbuyer && loginbuyer.nameSeller) {
//         buyerName.innerHTML = loginbuyer.nameSeller;
//     }

//     // // Skeleton loading
//     // function showSkeletons(count = 8) {
//     //     const container = document.getElementById("displayAllProducts");
//     //     container.innerHTML = "";
//     //     for (let i = 0; i < count; i++) {
//     //         const skeleton = document.createElement("div");
//     //         skeleton.className = "col";
//     //         skeleton.innerHTML = `<div class="skeleton-card"></div>`;
//     //         container.appendChild(skeleton);
//     //     }
//     // }

//     // showSkeletons();

//     function showSkeletons(count = 8) {
//         const container = document.getElementById("displayAllProducts");
//         container.innerHTML = "";

//         for (let i = 0; i < count; i++) {
//             const skeleton = document.createElement("div");
//             skeleton.className = "skeleton-card";
//             skeleton.innerHTML = `
//                 <div class="skeleton-image"></div>
//                 <div class="skeleton-line full"></div>
//                 <div class="skeleton-line short"></div>
//                 <div class="skeleton-line medium"></div>
//             `;
//             container.appendChild(skeleton);
//         }
//     }

//     showSkeletons()


//     // Fetch and display products
//     async function fetchSellerProducts() {
//         try {
//             const sellerCollectionRef = collection(db, "sellers");
//             const allDocs = await getDocs(sellerCollectionRef);
//             allProductsArray = [];

//             allDocs.forEach(doc => {
//                 const sellerId = doc.id;
//                 const sellerData = doc.data();
//                 const products = sellerData.products || [];

//                 products.forEach(product => {
//                     const plainProduct = { ...product, id: sellerId };
//                     allProductsArray.push(plainProduct);
//                 });
//             });

//             filteredArray = [...allProductsArray];
//             applyFilters(); // Initial display

//         } catch (error) {
//             console.error("Error fetching sellers:", error);
//         }
//     }

//     // Filtering + Search + Sort Combined
//     function applyFilters() {
//         const category = selectCategory.value.toLowerCase();
//         const query = searchInput.value.toLowerCase().trim();
//         const sortOption = sortPrice.value;

//         let result = [...allProductsArray];

//         // Filter by category
//         if (category !== "all categories") {
//             result = result.filter(p => p.category.toLowerCase() === category);
//         }

//         // Search
//         result = result.filter(p =>
//             p.productName.toLowerCase().includes(query) ||
//             p.description.toLowerCase().includes(query) ||
//             p.category.toLowerCase().includes(query)
//         );

//         // Sort
//         if (sortOption === "lowToHigh") {
//             result.sort((a, b) => Number(a.price) - Number(b.price));
//         } else if (sortOption === "highToLow") {
//             result.sort((a, b) => Number(b.price) - Number(a.price));
//         }

//         filteredArray = result;
//         displayCards(filteredArray);
//     }

//     // Event listeners
//     selectCategory.addEventListener("change", applyFilters);
//     searchInput.addEventListener("input", applyFilters);
//     sortPrice.addEventListener("change", applyFilters);

//     // Display product cards
//     function displayCards(products) {
//         const container = document.getElementById("displayAllProducts");
//         container.innerHTML = "";

//         if (products.length === 0) {
//             container.innerHTML = "<p class='text-center'>No products found.</p>";
//             return;
//         }

//         products.forEach(product => {
//             const card = document.createElement("div");
//             card.classList.add("displayCards");
//             card.innerHTML = `
//                 <img src="${product.productImage}" alt="Product Image" />
//                 <h5>${product.productName}</h5>
//                 <h4>$${product.price}</h4>
//                 <p>${product.description}</p>
//             `;
//             card.addEventListener("click", () => {
//                 const params = new URLSearchParams({
//                     id: product.id,
//                     name: product.productName,
//                     price: product.price,
//                     description: product.description,
//                     image: product.productImage,
//                     category: product.category
//                 });
//                 window.location.href = `SingleProduct.html?${params.toString()}`;
//             });
//             container.appendChild(card);
//         });
//     }

//     // Cart redirect
//     cartIconBtn.addEventListener("click", () => {
//         location.href = "./AddToCart.html";
//     });

//     // Fetch products on page load
//     fetchSellerProducts();
// });







import {db, authentication} from "./fbConfig.js"
import {doc, getDocs, collection, query, where} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js"
import { signOut } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js"

document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");
    const buyerName = document.getElementById("buyerName");
    const selectCategory = document.getElementById("selectCategory");
    const searchInput = document.getElementById("searchInput");
    const sortPrice = document.getElementById("sortPrice");
    const cartIconBtn = document.getElementById("cartIcon");
    const myOrdersBtn = document.getElementById("myOrdersBtn");
    const displayAllProducts = document.getElementById("displayAllProducts");
    const mainHeading = document.createElement("h2"); // Dynamic heading

    // Add heading to the page
    mainHeading.className = "text-center mb-4";
    displayAllProducts.before(mainHeading);

    let allProductsArray = [];
    let filteredArray = [];
    let isShowingOrders = false;

    // Logout functionality
    logoutBtn.addEventListener("click", async () => {
        try {
            await signOut(authentication);
            alert("Logout Successful!");
            localStorage.removeItem("buyerCredentails");
            localStorage.removeItem("buyerOrders");
            localStorage.removeItem("cart");
            localStorage.removeItem("cartItems");
            location.href = "https://myjavascriptprojectecom.netlify.app/";
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Failed to logout. Try again.");
        }
    });

    const logoutBtnMobile = document.getElementById("logoutBtnMobile");
    logoutBtnMobile.addEventListener("click", async()=>{
        try {
            await signOut(authentication);
            alert("Logout Successful!");
            localStorage.removeItem("buyerCredentails");
            localStorage.removeItem("buyerOrders");
            localStorage.removeItem("cart");
            localStorage.removeItem("cartItems");
            location.href = "https://myjavascriptprojectecom.netlify.app/";
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Failed to logout. Try again.");
        }
    })

    // Display buyer name
    const loginbuyer = JSON.parse(localStorage.getItem("buyerCredentails"));
    if (loginbuyer && loginbuyer.nameSeller) {
        buyerName.innerHTML = loginbuyer.nameSeller;
        let buyerNameMobile = document.getElementById("buyerNameMobile");
        buyerNameMobile.innerHTML = loginbuyer.nameSeller
    }

    // Skeleton loading
    function showSkeletons(count = 16) {
        displayAllProducts.innerHTML = "";
        for (let i = 0; i < count; i++) {
            const skeleton = document.createElement("div");
            skeleton.className = "skeleton-card";
            skeleton.innerHTML = `
                <div class="skeleton-image"></div>
                <div class="skeleton-line full"></div>
                <div class="skeleton-line short"></div>
                <div class="skeleton-line medium"></div>
            `;
            displayAllProducts.appendChild(skeleton);
        }
    }

    // Fetch and display products
    async function fetchSellerProducts() {
        showSkeletons();
        try {
            const sellerCollectionRef = collection(db, "sellers");
            const allDocs = await getDocs(sellerCollectionRef);
            allProductsArray = [];

            allDocs.forEach(doc => {
                const sellerId = doc.id;
                const sellerData = doc.data();
                const products = sellerData.products || [];

                products.forEach(product => {
                    const plainProduct = { 
                        ...product, 
                        id: sellerId,
                        sellerName: sellerData.nameSeller || sellerId
                    };
                    allProductsArray.push(plainProduct);
                });
            });

            filteredArray = [...allProductsArray];
            showProductsView();
        } catch (error) {
            console.error("Error fetching sellers:", error);
            displayAllProducts.innerHTML = `<p class="text-center text-danger">Error loading products. Please try again.</p>`;
        }
    }

    // Filtering + Search + Sort Combined
    function applyFilters() {
        const category = selectCategory.value.toLowerCase();
        const query = searchInput.value.toLowerCase().trim();
        const sortOption = sortPrice.value;

        let result = [...allProductsArray];

        // Filter by category
        if (category !== "all categories") {
            result = result.filter(p => p.category.toLowerCase() === category);
        }

        // Search
        result = result.filter(p =>
            p.productName.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );

        // Sort
        if (sortOption === "lowToHigh") {
            result.sort((a, b) => Number(a.price) - Number(b.price));
        } else if (sortOption === "highToLow") {
            result.sort((a, b) => Number(b.price) - Number(a.price));
        }

        filteredArray = result;
        displayCards(filteredArray);
    }

    // Display product cards
    function displayCards(products) {
        displayAllProducts.innerHTML = "";

        if (products.length === 0) {
            displayAllProducts.innerHTML = "<p class='text-center'>No products found.</p>";
            return;
        }

        products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("displayCards");
            card.innerHTML = `
                <img src="${product.productImage}" alt="Product Image" />
                <h5>${product.productName}</h5>
                <h5>₹${product.price}</h5>
                <p>${product.description}</p>
            `;
            card.addEventListener("click", () => {
                const params = new URLSearchParams({
                    id: product.id,
                    name: product.productName,
                    price: product.price,
                    description: product.description,
                    image: product.productImage,
                    category: product.category,
                    sellerName: product.sellerName
                });
                window.location.href = `SingleProduct.html?${params.toString()}`;
            });
            displayAllProducts.appendChild(card);
        });
    }

    // ========== ORDERS FUNCTIONALITY ==========
    async function fetchBuyerOrders() {
        if (!loginbuyer || !loginbuyer.nameSeller) {
            alert("Please login to view your orders");
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
                
                ordersSnapshot.forEach(orderDoc => {
                    const orderData = orderDoc.data();
                    allOrders.push({
                        ...orderData,
                        sellerName: sellerDoc.id,
                        orderDocId: orderDoc.id,
                        orderedAt: new Date(orderData.orderedAt).toLocaleString()
                    });
                });
            }

            return allOrders.sort((a, b) => new Date(b.orderedAt) - new Date(a.orderedAt));

        } catch (error) {
            console.error("Error fetching orders:", error);
            throw error;
        }
    }

    function displayOrders(orders) {
        displayAllProducts.innerHTML = "";

        if (orders.length === 0) {
            displayAllProducts.innerHTML = `
                <div class="text-center py-5">
                    <i class="bi bi-box-seam fs-1 text-muted"></i>
                    <h4 class="mt-3">No orders found</h4>
                    <p class="text-muted">You haven't placed any orders yet.</p>
                </div>
            `;
            return;
        }

        const ordersAccordion = document.createElement("div");
        ordersAccordion.className = "accordion";
        ordersAccordion.id = "ordersAccordion";

        orders.forEach((order, index) => {
            const orderElement = document.createElement("div");
            orderElement.className = "accordion-item mb-3 border rounded";
            orderElement.innerHTML = `
                <h2 class="accordion-header" id="heading${index}">
                    <button class="accordion-button ${index !== 0 ? 'collapsed' : ''}" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#collapse${index}" 
                            aria-expanded="${index === 0 ? 'true' : 'false'}" 
                            aria-controls="collapse${index}">
                        <div class="d-flex justify-content-between w-100 pe-3">
                            <div>
                                <span class="badge bg-${getStatusColor(order.status || 'pending')} me-2">
                                    ${(order.status || 'pending').toUpperCase()}
                                </span>
                                Order #${order.orderId.split('_')[2] || order.orderId}
                            </div>
                            <div>
                                <small class="text-muted">${order.orderedAt}</small>
                            </div>
                        </div>
                    </button>
                </h2>
                <div id="collapse${index}" 
                     class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" 
                     aria-labelledby="heading${index}" 
                     data-bs-parent="#ordersAccordion">
                    <div class="accordion-body">
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <h5>Seller: ${order.sellerName}</h5>
                                <p class="mb-1"><strong>Order Total:</strong> $${order.totalAmount?.toFixed(2) || calculateOrderTotal(order.cartItems)}</p>
                                <p class="mb-1"><strong>Items:</strong> ${order.totalQuantity || order.cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)}</p>
                            </div>
                            <div class="col-md-6">
                                <h5>Shipping Address</h5>
                                <p class="mb-1">${order.shippingAddress?.address || 'N/A'}</p>
                                <p class="mb-1">${order.shippingAddress?.city || ''}, ${order.shippingAddress?.district || ''}</p>
                                <p class="mb-1">${order.shippingAddress?.state || ''} - ${order.shippingAddress?.pincode || ''}</p>
                                <p class="mb-1"><strong>Payment:</strong> ${order.shippingAddress?.paymentMethod || 'N/A'}</p>
                            </div>
                        </div>
                        
                        <h5 class="mt-3">Order Items</h5>
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
                                    ${order.cartItems.map(item => `
                                        <tr>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <img src="${item.image}" alt="${item.name}" width="50" class="me-2 img-thumbnail">
                                                    <div>
                                                        <h6 class="mb-0">${item.name}</h6>
                                                        <small class="text-muted">${item.description?.substring(0, 50)}${item.description?.length > 50 ? '...' : ''}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>$${item.price.toFixed(2)}</td>
                                            <td>${item.quantity || 1}</td>
                                            <td>$${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                                        </tr>
                                    `).join('')}
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

    // Helper functions
    function getStatusColor(status) {
        switch (status.toLowerCase()) {
            case 'pending': return 'warning';
            case 'shipped': return 'info';
            case 'delivered': return 'success';
            case 'cancelled': return 'danger';
            default: return 'secondary';
        }
    }

    function calculateOrderTotal(cartItems) {
        return cartItems.reduce((total, item) => {
            return total + (item.price * (item.quantity || 1));
        }, 0).toFixed(2);
    }

    // View management
    function showProductsView() {
        isShowingOrders = false;
        mainHeading.textContent = "All Products";
        applyFilters();
    }

    async function showOrdersView() {
        isShowingOrders = true;
        mainHeading.textContent = "My Orders";
        showSkeletons();
        try {
            const orders = await fetchBuyerOrders();
            displayOrders(orders);
        } catch (error) {
            displayAllProducts.innerHTML = `
                <div class="alert alert-danger mt-4">
                    <i class="bi bi-exclamation-triangle-fill"></i> Error loading orders. Please try again.
                </div>
            `;
        }
    }

    // ========== EVENT LISTENERS ==========
    selectCategory.addEventListener("change", () => {
        if (!isShowingOrders) applyFilters();
    });
    searchInput.addEventListener("input", () => {
        if (!isShowingOrders) applyFilters();
    });
    sortPrice.addEventListener("change", () => {
        if (!isShowingOrders) applyFilters();
    });

    // Cart redirect
    cartIconBtn.addEventListener("click", () => {
        location.href = "./AddToCart.html";
    });

    const cartIconMobile = document.getElementById("cartIconMobile");
    if (cartIconMobile) {
        cartIconMobile.addEventListener("click", () => {
        location.href = "./AddToCart.html";
        });
    }

    // My Orders button click handler
    myOrdersBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        if (isShowingOrders) {
            showProductsView();
        } else {
            await showOrdersView();
        }
    });

    // Initialize the page with products view
    fetchSellerProducts();
});


myOrdersBtn.addEventListener("click", () => {
    window.location.href = "./MyOrders.html";
});


// import {db, authentication} from "./fbConfig.js"
// import {doc, getDocs, collection, query, where} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js"
// import { signOut } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js"

// document.addEventListener("DOMContentLoaded", () => {
//     const logoutBtn = document.getElementById("logoutBtn");
//     const buyerName = document.getElementById("buyerName");
//     const selectCategory = document.getElementById("selectCategory");
//     const searchInput = document.getElementById("searchInput");
//     const sortPrice = document.getElementById("sortPrice");
//     const cartIconBtn = document.getElementById("cartIcon");
//     const myOrdersBtn = document.getElementById("myOrdersBtn");
//     const displayAllProducts = document.getElementById("displayAllProducts");
//     const mainHeading = document.createElement("h2"); // Dynamic heading

//     // Add heading to the page
//     mainHeading.className = "text-center mb-4";
//     displayAllProducts.before(mainHeading);

//     let allProductsArray = [];
//     let filteredArray = [];
//     let isShowingOrders = false;

//     // Logout functionality
//     logoutBtn.addEventListener("click", async () => {
//         try {
//             await signOut(authentication);
//             alert("Logout Successful!");
//             localStorage.removeItem("buyerCredentails");
//             location.href = "./Login.html";
//         } catch (error) {
//             console.error("Logout failed:", error);
//             alert("Failed to logout. Try again.");
//         }
//     });

//     // Display buyer name
//     const loginbuyer = JSON.parse(localStorage.getItem("buyerCredentails"));
//     if (loginbuyer && loginbuyer.nameSeller) {
//         buyerName.innerHTML = loginbuyer.nameSeller;
//     }

//     // Skeleton loading
//     function showSkeletons(count = 8) {
//         displayAllProducts.innerHTML = "";
//         for (let i = 0; i < count; i++) {
//             const skeleton = document.createElement("div");
//             skeleton.className = "skeleton-card";
//             skeleton.innerHTML = `
//                 <div class="skeleton-image"></div>
//                 <div class="skeleton-line full"></div>
//                 <div class="skeleton-line short"></div>
//                 <div class="skeleton-line medium"></div>
//             `;
//             displayAllProducts.appendChild(skeleton);
//         }
//     }

//     // Fetch and display products
//     async function fetchSellerProducts() {
//         showSkeletons();
//         try {
//             const sellerCollectionRef = collection(db, "sellers");
//             const allDocs = await getDocs(sellerCollectionRef);
//             allProductsArray = [];

//             allDocs.forEach(doc => {
//                 const sellerId = doc.id;
//                 const sellerData = doc.data();
//                 const products = sellerData.products || [];

//                 products.forEach(product => {
//                     const plainProduct = { 
//                         ...product, 
//                         id: sellerId,
//                         sellerName: sellerData.nameSeller || sellerId
//                     };
//                     allProductsArray.push(plainProduct);
//                 });
//             });

//             filteredArray = [...allProductsArray];
//             showProductsView();
//         } catch (error) {
//             console.error("Error fetching sellers:", error);
//             displayAllProducts.innerHTML = `<p class="text-center text-danger">Error loading products. Please try again.</p>`;
//         }
//     }

//     // Filtering + Search + Sort Combined
//     function applyFilters() {
//         const category = selectCategory.value.toLowerCase();
//         const query = searchInput.value.toLowerCase().trim();
//         const sortOption = sortPrice.value;

//         let result = [...allProductsArray];

//         // Filter by category
//         if (category !== "all categories") {
//             result = result.filter(p => p.category.toLowerCase() === category);
//         }

//         // Search
//         result = result.filter(p =>
//             p.productName.toLowerCase().includes(query) ||
//             p.description.toLowerCase().includes(query) ||
//             p.category.toLowerCase().includes(query)
//         );

//         // Sort
//         if (sortOption === "lowToHigh") {
//             result.sort((a, b) => Number(a.price) - Number(b.price));
//         } else if (sortOption === "highToLow") {
//             result.sort((a, b) => Number(b.price) - Number(a.price));
//         }

//         filteredArray = result;
//         displayCards(filteredArray);
//     }

//     // Display product cards
//     function displayCards(products) {
//         displayAllProducts.innerHTML = "";

//         if (products.length === 0) {
//             displayAllProducts.innerHTML = "<p class='text-center'>No products found.</p>";
//             return;
//         }

//         products.forEach(product => {
//             const card = document.createElement("div");
//             card.classList.add("displayCards");
//             card.innerHTML = `
//                 <img src="${product.productImage}" alt="Product Image" />
//                 <h5>${product.productName}</h5>
//                 <h4>$${product.price}</h4>
//                 <p>${product.description}</p>
//             `;
//             card.addEventListener("click", () => {
//                 const params = new URLSearchParams({
//                     id: product.id,
//                     name: product.productName,
//                     price: product.price,
//                     description: product.description,
//                     image: product.productImage,
//                     category: product.category,
//                     sellerName: product.sellerName
//                 });
//                 window.location.href = `SingleProduct.html?${params.toString()}`;
//             });
//             displayAllProducts.appendChild(card);
//         });
//     }

//     // ========== ORDERS FUNCTIONALITY ==========
//     async function fetchBuyerOrders() {
//     if (!loginbuyer || !loginbuyer.nameSeller) {
//         alert("Please login to view your orders");
//         return [];
//     }

//     try {
//         // Get the buyer document
//         const buyerDocRef = doc(db, "buyers", loginbuyer.nameSeller);
//         const buyerDocSnap = await getDoc(buyerDocRef);
        
//         if (buyerDocSnap.exists()) {
//             const buyerData = buyerDocSnap.data();
            
//             // Check if myOrders field exists
//             if (buyerData.myOrders && Array.isArray(buyerData.myOrders)) {
//                 // Process and return the orders
//                 return buyerData.myOrders.map(order => ({
//                     ...order,
//                     orderedAt: new Date(order.orderedAt).toLocaleString(),
//                     sellerName: order.sellerId || 'Unknown Seller'
//                 })).sort((a, b) => new Date(b.orderedAt) - new Date(a.orderedAt));
//             }
//         }
        
//         return []; // Return empty array if no orders found

//     } catch (error) {
//         console.error("Error fetching orders:", error);
//         throw error;
//     }   
//     }

//     function displayOrders(orders) {
//     displayAllProducts.innerHTML = "";

//     if (orders.length === 0) {
//         displayAllProducts.innerHTML = `
//             <div class="text-center py-5">
//                 <i class="bi bi-box-seam fs-1 text-muted"></i>
//                 <h4 class="mt-3">No orders found</h4>
//                 <p class="text-muted">You haven't placed any orders yet.</p>
//             </div>
//         `;
//         return;
//     }

//     // Group orders by orderId (combine items from same order)
//     const groupedOrders = {};
//     orders.forEach(order => {
//         if (!groupedOrders[order.orderId]) {
//             groupedOrders[order.orderId] = {
//                 orderId: order.orderId,
//                 orderedAt: order.orderedAt,
//                 status: order.status || 'pending',
//                 sellerName: order.sellerName,
//                 items: []
//             };
//         }
//         groupedOrders[order.orderId].items.push(...order.cartItems);
//     });

//     // Display each order group
//     Object.values(groupedOrders).forEach(orderGroup => {
//         const orderCard = document.createElement("div");
//         orderCard.className = "card mb-4 border-0 shadow-sm";
        
//         orderCard.innerHTML = `
//             <div class="card-header bg-white border-bottom-0">
//                 <div class="d-flex justify-content-between align-items-center">
//                     <div>
//                         <span class="badge bg-${getStatusColor(orderGroup.status)} me-2">
//                             ${orderGroup.status.toUpperCase()}
//                         </span>
//                         <span class="fw-bold">Order #${orderGroup.orderId.split('_')[2] || orderGroup.orderId}</span>
//                     </div>
//                     <div class="text-muted small">
//                         ${orderGroup.orderedAt}
//                     </div>
//                 </div>
//                 <div class="mt-2 small">
//                     <span class="text-muted">Seller:</span>
//                     <span class="fw-semibold"> ${orderGroup.sellerName}</span>
//                 </div>
//             </div>
//             <div class="card-body">
//                 <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
//                     ${orderGroup.items.map(item => `
//                         <div class="col">
//                             <div class="card h-100 border-0 shadow-sm">
//                                 <img src="${item.image}" class="card-img-top p-3" alt="${item.name}" style="height: 200px; object-fit: contain;">
//                                 <div class="card-body">
//                                     <h5 class="card-title">${item.name}</h5>
//                                     <p class="card-text text-muted small">${item.description?.substring(0, 60)}${item.description?.length > 60 ? '...' : ''}</p>
//                                 </div>
//                                 <div class="card-footer bg-white border-top-0">
//                                     <div class="d-flex justify-content-between align-items-center">
//                                         <span class="fw-bold">$${item.price.toFixed(2)}</span>
//                                         <span class="badge bg-light text-dark">Qty: ${item.quantity || 1}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     `).join('')}
//                 </div>
//             </div>
//             <div class="card-footer bg-white border-top-0 text-end">
//                 <div class="fw-bold">
//                     Order Total: $${orderGroup.items.reduce((total, item) => 
//                         total + (item.price * (item.quantity || 1)), 0).toFixed(2)}
//                 </div>
//             </div>
//         `;
        
//         displayAllProducts.appendChild(orderCard);
//     });
// }

//     // Helper functions
//     function getStatusColor(status) {
//         switch (status.toLowerCase()) {
//             case 'pending': return 'warning';
//             case 'shipped': return 'info';
//             case 'delivered': return 'success';
//             case 'cancelled': return 'danger';
//             default: return 'secondary';
//         }
//     }

//     function calculateOrderTotal(cartItems) {
//         return cartItems.reduce((total, item) => {
//             return total + (item.price * (item.quantity || 1));
//         }, 0).toFixed(2);
//     }

//     // View management
//     function showProductsView() {
//         isShowingOrders = false;
//         mainHeading.textContent = "All Products";
//         applyFilters();
//     }

//     async function showOrdersView() {
//         isShowingOrders = true;
//         mainHeading.textContent = "My Orders";
//         showSkeletons();
//         try {
//             const orders = await fetchBuyerOrders();
//             displayOrders(orders);
//         } catch (error) {
//             displayAllProducts.innerHTML = `
//                 <div class="alert alert-danger mt-4">
//                     <i class="bi bi-exclamation-triangle-fill"></i> Error loading orders. Please try again.
//                 </div>
//             `;
//         }
//     }

//     // ========== EVENT LISTENERS ==========
//     selectCategory.addEventListener("change", () => {
//         if (!isShowingOrders) applyFilters();
//     });
//     searchInput.addEventListener("input", () => {
//         if (!isShowingOrders) applyFilters();
//     });
//     sortPrice.addEventListener("change", () => {
//         if (!isShowingOrders) applyFilters();
//     });

//     // Cart redirect
//     cartIconBtn.addEventListener("click", () => {
//         location.href = "./AddToCart.html";
//     });

//     // My Orders button click handler
//     myOrdersBtn.addEventListener("click", async (e) => {
//         e.preventDefault();
//         if (isShowingOrders) {
//             showProductsView();
//         } else {
//             await showOrdersView();
//         }
//     });

//     // Initialize the page with products view
//     fetchSellerProducts();
// });
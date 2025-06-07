// import { authentication, db } from "./fbConfig.js";
// import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js"
// import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js"

// document.addEventListener("DOMContentLoaded", ()=>{
//     let loginForm = document.getElementById("loginForm")
//     loginForm.addEventListener("submit", async(e)=>{
//         e.preventDefault()
//         let email = document.getElementById("email").value;
//         let password = document.getElementById("password").value;
//         let role = document.getElementById("role").value
        
//         const userSignedIn = await signInWithEmailAndPassword(authentication, email, password)
//         const nameSeller = userSignedIn.user.displayName;
//         const useruid = userSignedIn.user.uid;
//         console.log(nameSeller)
        
//         const userDocRef = doc(db, `${role}s`, userSignedIn.user.displayName);
//         const finalDocRef = await getDoc(userDocRef)
//         console.log(finalDocRef)

//         if(finalDocRef.exists()){
//             alert("yes doc there in fb")
//             if("sellerDashbord.html" === `${role}Dashbord.html`){
//                 location.href = `${role}Dashbord.html`
//                 console.log(email, role, nameSeller)
//                 localStorage.setItem("sellerCredentails", JSON.stringify({email, role, nameSeller, useruid}))
//             }else if("buyerDashbord.html" === `${role}Dashbord.html`){
//                 location.href = `${role}Dashbord.html`
//                 console.log(email, role, nameSeller)
//                 localStorage.setItem("buyerCredentails", JSON.stringify({email, role, nameSeller, useruid}))
//             }
//             // alert(`${role } is Logged in`)
//             // location.href = `${role}Dashbord.html`
//             // console.log(email, role, nameSeller)

//             // localStorage.setItem("sellerCredentails", JSON.stringify({email, role, nameSeller}))
//         }else{
//             alert("Email & Password is incorrect")
//         }
//         console.log(userSignedIn, "User Signin")
//     })

//     let buttonSignup = document.getElementById("buttonSignup")
//     buttonSignup.addEventListener("click", ()=>{
//         location.href = "./Signup.html"
//     })
// })


import { authentication, db } from "./fbConfig.js";
import { signInWithEmailAndPassword, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js"
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js"

document.addEventListener("DOMContentLoaded", ()=>{
    let loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", async(e)=>{
        e.preventDefault();
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let role = document.getElementById("role").value;

        try {
            const userSignedIn = await signInWithEmailAndPassword(authentication, email, password);
            const nameSeller = userSignedIn.user.displayName;
            const useruid = userSignedIn.user.uid;
            
            const userDocRef = doc(db, `${role}s`, nameSeller);
            const finalDocRef = await getDoc(userDocRef);

            if(finalDocRef.exists()){
                alert("Logged in successfully!");

                if(role === "seller"){
                    localStorage.setItem("sellerCredentails", JSON.stringify({email, role, nameSeller, useruid}));
                    location.href = `${role}Dashbord.html`;
                } else if(role === "buyer"){
                    localStorage.setItem("buyerCredentails", JSON.stringify({email, role, nameSeller, useruid}));
                    location.href = `${role}Dashbord.html`;
                }
            } else {
                alert("Email or Password is incorrect.");
            }
        } catch (error) {
            console.error("Login failed", error.message);
            alert("Invalid Credentials.");
        }
    });

    // 🚀 GUEST LOGIN LOGIC
    let guestLoginBtn = document.getElementById("guestLoginBtn");
    guestLoginBtn.addEventListener("click", async () => {
        try {
            const userCredential = await signInAnonymously(authentication);
            const guestUser = userCredential.user;
            console.log("Signed in as guest:", guestUser.uid);

            localStorage.setItem("guestUser", JSON.stringify({
                uid: guestUser.uid,
                role: "guest"
            }));

            // Redirect to a common guest dashboard or buyerDashboard
            location.href = "./buyerDashbord.html";
        } catch (e) {
            if (e.code === "auth/operation-not-allowed") {
                alert("Anonymous auth hasn't been enabled for this project.");
            } else {
                alert("Unknown error during guest login.");
            }
            console.error("Guest login failed:", e.message);
        }
    });

    let buttonSignup = document.getElementById("buttonSignup");
    buttonSignup.addEventListener("click", ()=>{
        location.href = "./Signup.html";
    });
});

import { authentication, db } from "./fbConfig.js"
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js"
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js"

document.addEventListener("DOMContentLoaded", ()=>{
    let signupForm = document.getElementById("signupForm");

    signupForm.addEventListener("submit", async(e)=>{
        e.preventDefault()
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let role = document.getElementById("role").value;

        const userCredential = await createUserWithEmailAndPassword(authentication, email, password)
        console.log(userCredential)
        const userDetails = userCredential.user;
        console.log(userDetails, "userDetails")
        await updateProfile(userDetails, {
            displayName:name,
        })

        await setDoc(doc(db, `${role}s`, name),{
            name, 
            email,
            role,
            password,
            id: userCredential.user.uid
        })

        console.log(userCredential, "user created")
        alert(`${role }Created Successfully`)
        location.href = "https://myjavascriptprojectecom.netlify.app/"
    })
})
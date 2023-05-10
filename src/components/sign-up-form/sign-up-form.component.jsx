
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import { createAuthUserWithEmailAndPassword , createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    displayName: '' ,
    email: '' ,
    password: '',
    confirmPassword: ''

}

const SignUpForm = ( ) =>{

const [formFields , setFormFields] = useState(defaultFormFields);
const { displayName , email , password ,confirmPassword} = formFields;

const resetFormFields = () =>{
    setFormFields(defaultFormFields);
}

console.log(formFields);

const handleSubmit = async (event) =>{
    event.preventDefault();

    if(password !== confirmPassword ) {

        alert("Şifreler Eşleşmiyor")
        return;


    }
    try{
        const {user} = await createAuthUserWithEmailAndPassword(email,password);

        await createUserDocumentFromAuth (user,{displayName});
        resetFormFields();


    } catch(error) {
       if(error.code == "auth/email-already-in-use"){
        alert("Daha önce kullanılmış mail adresi!")
       }else{

       }

    }
}; 

const handleChange = (event) => {
    const {name,value} = event.target;

    setFormFields({...formFields,[name]:value});

};

    return(
        <div>
        <h1>Mail ve Şifrenizle Kayıt olunuz</h1>
        <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input type="text" required onChange={handleChange} name="displayName" value={displayName} />
        <label>E-mail</label>
        <input type="email"  required onChange={handleChange} name="email" value={email} />
        <label>Password</label>
        <input type="password"  required onChange={handleChange} name="password" value={password}/>
        <label>Confirm Password</label>
        <input type="password"  required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
        <button type="submit">Sign Up</button>
        </form>
        </div>
    )
}

export default SignUpForm;
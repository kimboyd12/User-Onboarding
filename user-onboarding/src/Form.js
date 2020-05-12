import React, { useState } from "react";
import * as yup from "yup";
import axios from "axios";


const formSchema = yup.object().shape({
    name: yup.string().required("Please enter your name"),
    email: yup.string().email("Must be a valid email address").required("Please enter your email address"),
    password: yup.string().required("Please enter your password"),
    terms: yup.boolean().oneOf([true], "Please agree to the Terms and Conditions")
});


export default function Form() {

    const initialState = {
        name: "",
        email: "",
        password: "",
        terms: "",
    };

    const [formState, setFormState] = useState(initialState);
    const [errorState, setErrorState] = useState(initialState);


    const [users, setUsers] = useState([]);


    const validate = e => {
        yup 
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrorState({
                    ...errorState, [e.target.name]: ""
                });
            })
            .catch(err => {
                console.log(err.errors);
                setErrorState({
                    ...errorState,
                    [e.target.name]: err.errors[0]
                });
            });
    };

    const changeHandler = e => {
        e.persist();
        validate(e);
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

        setFormState({ ...formState, [e.target.name]: value })
    }

    const formSubmit = (e) => {
        e.preventDefault();
        console.log("form submitted!");

        axios
            .post("https://reqres.in/api/users", formState)
            .then((response) => {
                setUsers([...users, response.data]);
                setFormState(initialState);
                console.log(response);
    
            })
            .catch((err) => console.log(err.response));

    }

    return (
        <form onSubmit={formSubmit}> 
            <label htmlFor="name">
                Name:
                <input 
                    type="text"
                    name="name"
                    id="name"
                    value={formState.name}
                    onChange={changeHandler}
                />
            </label>
            <label htmlFor="email">
                Email:
                <input 
                    type="email"
                    name="email"
                    id="email"
                    value={formState.email}
                    onChange={changeHandler}
                />
                {errorState.email.length > 0 ?( <p className="error">{errorState.email}</p>) : null}
            </label>
            <label htmlFor="password">
                Password:
                <input 
                    type="password"
                    name="password"
                    id="password"
                    value={formState.password}
                    onChange={changeHandler}
                />
                {errorState.password.length > 0 ?( <p className="error">{errorState.password}</p>) : null}
            </label>
            <label htmlFor="terms" className="terms">
                I have read the Terms and Conditions
                <input 
                    type="checkbox"
                    id="terms"
                    name="terms"
                    checked={formState.terms}
                    onChange={changeHandler}
                />
            </label>
            <button>Submit</button>
            <pre>{JSON.stringify(users, null, 2)}</pre>

        </form>
    )


}

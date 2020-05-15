import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

// validation schema aka what we want required
const formSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email("Must be a valid email address").required(),
    password: yup.string().required(),
    role: yup.string(),
    terms: yup.boolean().oneOf([true])
});


export default function Form() {

    // made an initial state so that it was easier to reuse in code
    const initialState = {
        name: "",
        email: "",
        password: "",
        role: "",
        terms: ""
    };

    const [formState, setFormState] = useState(initialState);
    const [errorState, setErrorState] = useState(initialState);

    // state for button to not allow submit unless form is complete
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState]);

    // state for user list array, initialized with empty array 
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

    // submit handler / will populate user list array with users upon button submit
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
               {errorState.name.length > 0 ?( <p className="error">{errorState.name}</p>) : null}
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
                {errorState.password.length > 0 ? ( <p className="error">{errorState.password}</p> ) : null}
            </label>
            <label htmlFor="role">
                Role:
                <select 
                    id="role"
                    value={formState.role}
                    name="role"
                    onChange={changeHandler}
                >
                    <option value="" disable selected>Select your role...</option>
                    <option value="frontend">Front End Developer</option>
                    <option value="backend">Back End Developer</option>
                    <option value="ux">User Experience Designer</option>
                    <option value="ios">iOS Developer</option>
                </select>

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
            <button disabled={buttonDisabled}>Submit</button>
            {/* JSON stringify displays rendered user list to screen */}
            <pre>{JSON.stringify(users, null, 2)}</pre>
        </form>
    )


}

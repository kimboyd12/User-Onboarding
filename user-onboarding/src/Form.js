import React, { useState } from "react";
import * as yup from "yup";
import axios from "axios";

// need to import form to App

export default function Form() {

    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        terms: false
    });

    const changeHandler = e => {

    }

    const formSubmit = e => {

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
            </label>
            <label htmlFor="terms">
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
        </form>
    )


}
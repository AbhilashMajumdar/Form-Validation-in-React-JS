import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Style.css";

const Form = () => {
    const [offshore, setOffShore] = useState(false);
    const [onshore, setOnShore] = useState(false);

    function clickHandler1(){
        setOffShore(true);
        setOnShore(false);
    }

    function clickHandler2(){
        setOffShore(false);
        setOnShore(true);
    }

    const initialValue = {
        fullname : "",
        asoid : "",
        proid : "",
        location : "",
        skills : "",
        profile : "",
        comment : ""
    };

    const [formValues, setFormValues] = useState(initialValue);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const[skillsArray, setSkillsArray] = useState([]);

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]:value});
    }

    const formHandler = (e) =>{
        e.preventDefault();
        setFormErrors(validateForm(formValues));
        setIsSubmit(true);
    }

    const skillsHandler = (e) =>{
        setSkillsArray(skillsArray=> [...skillsArray, e.target.value]);
    }


    useEffect(()=>{
        console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && setIsSubmit){
            // console.log(formValues);
        }
    }, [formErrors])

    const validateForm = (values) =>{
        const errors = {};

        const regexName = /^[a-zA-Z][a-zA-Z\s]+$/;
        const regexAsoId = /^[0-9]+$/;
        const regexProId = /^[0-9a-zA-Z]+$/;

        if(!values.fullname){
            errors.fullname = "Please Enter Associate Name";
        }else if(!regexName.test(values.fullname)){
            errors.fullname = "Please Enter Valid Associate Name";
        }else if(values.fullname.length < 5){
            errors.fullname = "Minimum 5 characters required for Associate Name";
        }else if(values.fullname.length > 30){
            errors.fullname = "Maximum 30 characters required for Associate Name";
        }

        if(!values.asoid){
            errors.asoid = "Please Enter Associate Id";
        }else if(!regexAsoId.test(values.asoid)){
            errors.asoid = "Invalid Associate Id";
        }else if(values.asoid.length < 6){
            errors.asoid = "Invalid Associate Id";
        }else if(values.asoid.length >6){
            errors.asoid = "Invalid Associate Id";
        }

        if(!values.proid){
            errors.proid = "Please Enter Project Id";
        }else if(!regexProId.test(values.proid)){
            errors.proid = "Invalid Project Id";
        }else if(values.proid.length < 12){
            errors.proid = "Invalid Project Id";
        }else if(values.proid.length > 12){
            errors.proid = "Invalid Project Id";
        }

        if(values.location.length === 0){
            errors.location = "Please select Location";
        }else if(values.location === "Select Location"){
            errors.location = "Please select Location";
        }

        if(skillsArray.length < 5){
            errors.skills = "Please select Minimum 5 skills";
        }

        if(values.comment.length === 0){
            errors.comment = "Please Enter Comments";
        }

        if(values.profile.length === 0){
            errors.profile = "Please Enter Profile Picture";
        }

        return(errors);
    }

    return (
        <div>
            {/* Heading - form validation  */}
            <div className="row justify-content-center mt-4">
                <div className="col-md-5 col-8 form-header">
                    <h1 className="form-heading">Form Validation</h1>
                </div>
            </div>

            {/* Input name, id, project, ofshore/onshore, location id  */}
            <div className="row justify-content-center mt-3">
                <div className="col-md-5 col-10">
                    <form onSubmit={formHandler}>
                        <div className="mb-4">
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputname"
                                name="fullname"
                                placeholder="Associate Name"
                                value={formValues.fullname}
                                onChange={inputHandler}
                            />
                            <p className="mt-2">{formErrors.fullname}</p>
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputid"
                                name="asoid"
                                placeholder="Associate id"
                                value={formValues.asoid}
                                onChange={inputHandler}
                            />
                            <p className="mt-2">{formErrors.asoid}</p>
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputproid"
                                name="proid"
                                placeholder="Project ID"
                                value={formValues.proid}
                                onChange={inputHandler}
                            />
                            <p className="mt-2">{formErrors.proid}</p>
                        </div>

                        {/* select offshore/onshore  */}
                        <fieldset className="row mb-4">
                            <div className="col-sm-2 radio-btn">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gridRadios"
                                        id="gridRadios1"
                                        value="option1"
                                        onClick={clickHandler1}
                                    />
                                    <label className="form-check-label" htmlFor="gridRadios1">
                                        Offshore
                                    </label>
                                </div>
                                <div className="form-check mx-3">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gridRadios"
                                        id="gridRadios2"
                                        value="option2"
                                        onClick={clickHandler2}
                                    />
                                    <label className="form-check-label" htmlFor="gridRadios2">
                                        Onshore
                                    </label>
                                </div>
                            </div>
                        </fieldset>


                        {/* select location  */}
                        {
                            offshore?<div className="row mb-4">
                                <div className="col-md-12">
                                    <div className="col-auto">
                                        <label className="visually-hidden" htmlFor="autoSizingSelect">Preference</label>
                                        <select className="form-select" id="autoSizingSelect" name="location" value={formValues.location} onChange={inputHandler}>
                                            <option value="Select Location">Select Location</option>
                                            <option value="Chennai">Chennai</option>
                                            <option value="Bangalore">Bangalore</option>
                                            <option value="Hyderabad">Hyderabad</option>
                                            <option value="Pune">Pune</option>
                                            <option value="Kochi">Kochi</option>
                                        </select>
                                    </div>
                                </div>
                            </div>:null
                        }

                        {
                            onshore?<div className="row mb-4">
                                <div className="col-md-12">
                                    <div className="col-auto">
                                        <label className="visually-hidden" htmlFor="autoSizingSelect">Preference</label>
                                        <select className="form-select" id="autoSizingSelect" name="location" value={formValues.location} onChange={inputHandler}>
                                            <option value="Select Location">Select Location</option>
                                            <option value="US">US</option>
                                            <option value="Non US">Non US</option>
                                        </select>
                                    </div>
                                </div>
                            </div>:null
                        }

                        <p className="mt-2 mb-4">{formErrors.location}</p>
                        

                        {/* select skills  */}
                        {/* 1st row  */}
                        <div className="row mb-3">
                            <div className="col-md-4 col-4">
                                <div className="form-check">
                                    <input
                                        className="form-check-input form-skills-input"
                                        type="checkbox"
                                        id="gridCheck1"
                                        value="HTML5, CSS3, JS"
                                        onChange={skillsHandler}
                                    />
                                    <label className="form-check-label" htmlFor="gridCheck1">
                                        HTML5, CSS3, JS
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-4 col-4">
                                <div className="form-check">
                                    <input
                                        className="form-check-input form-skills-input"
                                        type="checkbox"
                                        id="gridCheck2"
                                        value="Angular 8"
                                        onChange={skillsHandler}
                                    />
                                    <label className="form-check-label" htmlFor="gridCheck2">
                                        Angular 8
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-4 col-4">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="Express JS"
                                        id="gridCheck3"
                                        onChange={skillsHandler}
                                    />
                                    <label className="form-check-label" htmlFor="gridCheck3">
                                        Express JS
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* 2nd row  */}
                        <div className="row mb-3">
                            <div className="col-md-4 col-4">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="SASS"
                                        id="gridCheck4"
                                        onChange={skillsHandler}
                                    />
                                    <label className="form-check-label" htmlFor="gridCheck4">
                                        SASS
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-4 col-4">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="React JS"
                                        id="gridCheck5"
                                        onChange={skillsHandler}
                                    />
                                    <label className="form-check-label" htmlFor="gridCheck5">
                                        React JS
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-4 col-4">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="Node JS"
                                        id="gridCheck6"
                                        onChange={skillsHandler}
                                    />
                                    <label className="form-check-label" htmlFor="gridCheck6">
                                        Node JS
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* 3rd row  */}
                        <div className="row mb-3">
                            <div className="col-md-4 col-4">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="ES5, ES6, ES7, ..."
                                        id="gridCheck7"
                                        onChange={skillsHandler}
                                    />
                                    <label className="form-check-label" htmlFor="gridCheck7">
                                        ES5, ES6, ES7, ...
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-4 col-4">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="Veu JS"
                                        id="gridCheck8"
                                        onChange={skillsHandler}
                                    />
                                    <label className="form-check-label" htmlFor="gridCheck8">
                                        Veu JS
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-4 col-4">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="Mongo DB"
                                        id="gridCheck9"
                                        onChange={skillsHandler}
                                    />
                                    <label className="form-check-label" htmlFor="gridCheck9">
                                        Mongo DB
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* 4th row  */}
                        <div className="row mb-4">
                            <div className="col-md-4 col-4">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="Bootstrap 4"
                                        id="gridCheck10"
                                        onChange={skillsHandler}
                                    />
                                    <label className="form-check-label" htmlFor="gridCheck10">
                                        Bootstrap 4
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-4 col-4">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="TypeScript"
                                        id="gridCheck11"
                                        onChange={skillsHandler}
                                    />
                                    <label className="form-check-label" htmlFor="gridCheck11">
                                        TypeScript
                                    </label>
                                </div>
                            </div>
                        </div>
                        <p className="mt-2 mb-4">{formErrors.skills}</p>


                        {/* Upload profile  */}
                        <div className="row mb-4">
                            <div className="col-md-9 col-10">
                                <div className="input-group">
                                    <input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" name="profile" value={formValues.profile} onChange={inputHandler}/>
                                    <button className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Upload</button>
                                </div>
                                <p className="mt-2 mb-2">{formErrors.profile}</p>
                            </div>
                        </div>
                        

                        {/* comment section  */}
                        <div className="form-floating mb-4">
                            <textarea className="form-control form-textarea" placeholder="Comments" id="textarea-form" name="comment" value={formValues.comment} onChange={inputHandler}></textarea>
                            <label className="text-dark" htmlFor="textarea-form">Comments</label>
                            <p className="mt-2">{formErrors.comment}</p>
                        </div>



                        {/* form buttons  */}
                        <div className="row mb-5">
                            <div className="col-md-2 col-6">
                                <button type="submit" className="btn btn-primary">
                                Submit
                                </button>
                            </div>
                            <div className="col-md-2 col-6">
                                <button type="reset" className="btn btn-danger">
                                Reset
                                </button>
                            </div>
                            <div className="col-md-8 col-12"></div>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Form;

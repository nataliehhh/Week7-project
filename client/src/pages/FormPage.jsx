import { useState, useEffect } from 'react'
import '../css/form.css'
import { API_URL } from '../../config';

export default function FormPage() {
    const [form, setForm] = useState({
        username: "",
        brew_name: "",
        roaster_name: "",
        single_origin: "",
        origin_country: "",
        process: "",
        brew_method: "",
        flavour_tags: "",
        review: "",
        image: "",
    });

    const [countryOptions, setCountryOptions] = useState([]);
    const [flavourOptions, setFlavourOptions] = useState([]);
    const [methodOptions, setMethodOptions] = useState([]);

    useEffect(() => {
        fetchData("form/origin_country", setCountryOptions);
        fetchData("form/flavour_tags", setFlavourOptions);
        fetchData("form/brew_method", setMethodOptions);
    }, []);

    async function fetchData(endpoint, setOptions) {
        const response = await fetch(`${API_URL}${endpoint}`);
        const data = await response.json();
        setOptions(data);
        console.log(`${endpoint} opts:`, data);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("Form has been submitted");
        console.log("form:", form);
        const response = await fetch(`${API_URL}form/addPost`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });
        const json = await response.json();
        console.log("json", json);
    }

    function handleChange(event) {
        setForm({
            ...form, [event.target.name]: event.target.value,
        });
    }

    return (
        <div className="formContainer">
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input name="username" placeholder="Enter your username" required onChange={handleChange}/>

                <label>Brew</label>
                <input name="brew_name" placeholder="Enter the name of your coffee" onChange={handleChange}/>

                <label>Roaster</label>
                <input name="roaster_name" placeholder="Enter the name of the roasters" onChange={handleChange}/>

                <label>Single Origin?</label>
                <select name="single_origin" onChange={handleChange}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>

                <label>Beans Origin</label>
                <select className="multipleInput" name="origin_country" multiple onChange={handleChange}>
                {countryOptions.map((option) => (
                   <option key={option.id} value={option.origin_country}>{option.origin_country}
                   </option>
                ))}
                </select>

                <label>Process</label>
                <select name="process" onChange={handleChange}>
                    <option value="washed">Washed</option>
                    <option value="natural">Natural</option>
                    <option value="honey">Honey</option>
                </select>

                <label>Brew Method</label>
                <select name="brew_method" onChange={handleChange}>
                {methodOptions.map((option) => (
                   <option key={option.id} value={option.method}>{option.method}
                   </option>
                ))}
                </select>

                <label>Flavour Tags</label>
                <select className="multipleInput" name="flavour_tags" multiple onChange={handleChange}>
                {flavourOptions.map((option) => (
                   <option key={option.id} value={option.flavour_tags}>{option.flavour_tags}
                   </option>
                ))}
                </select>

                <label>Review</label>
                <input name="review" placeholder="Share your thoughts" onChange={handleChange}/>

                <label>Photo</label>
                <input name="image" placeholder="Enter a link to a photo of your brew" onChange={handleChange}/>
                
                <button>Submit</button>
            </form>

        </div>
    )
}
import { useState, useEffect } from 'react'
import '../css/form.css'

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

    const [dropdownOptions, setDropdownOptions] = useState([]);

    useEffect(() => {
        handleDropdownOptions();
    }, []);

    async function handleDropdownOptions() {
        const response = await fetch("/posts/dropdownOptions");
        const data = await response.json();
        setDropdownOptions(data);
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        console.log("Form has been submitted");
        console.log(form);
    }

    function handleChange(event) {
        setForm({
            ...form, [event.target.name]: event.target.value,
        });
    }

    return (
        <div>
            <h1>Form Page</h1>
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
                <select name="origin_country" onChange={handleChange}>{dropdownOptions.map((option) => (
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
                <select name="brew_method" onChange={handleChange}></select>
                <label>Flavour Tags</label>
                <select name="flavour_tags" onChange={handleChange}></select>
                <label>Review</label>
                <input name="review" placeholder="Share your thoughts" onChange={handleChange}/>
                <label>Photo</label>
                <input name="image" placeholder="Enter a link to a photo of your brew" onChange={handleChange}/>
                <button>Submit</button>
            </form>

        </div>
    )
}
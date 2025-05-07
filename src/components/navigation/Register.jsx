import { useState } from "react";
import { register } from "../../api/auth";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const data = await register(form);
            console.log("Registered:", data);
        } catch (err) {
            console.error("Register error:", err);
            setError("Registration failed.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>

            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
            <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
            <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit">Register</button>
        </form>
    );
}

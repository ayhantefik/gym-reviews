import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { addGym } from "../services/gymService";
import type { Gym } from "../types";
import "./AddGym.css";

interface AddGymProps{
    reload: () => void;
}

function AddGym({ reload }: AddGymProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { user } = useContext(UserContext);

    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [city, setCity] = useState<string>("");

    const handleSubmit = async () => {
        try {
            const gym: Gym = {
                name: name,
                city: city,
                address: address
            }
            setIsLoading(true);
            await addGym(gym, user?.accessToken);
            await reload();
        } catch(error) {

        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) return <p className="loading">Loading...</p>;

    return (
        <div className="add-gym">
            <form onSubmit={handleSubmit}>
                <h4>Add gym</h4>
                <label>
                    Gym name
                    <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    />
                </label>
                <label>
                    Address
                    <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    />
                </label>
                <label>
                    City
                    <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    />
                </label>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default AddGym;
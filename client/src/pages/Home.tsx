import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import type { Gym } from "../types";
import { getGyms } from "../services/gymService";
import gymimage from "../../public/images/gym-image.png";
import { BsGeoAltFill } from "react-icons/bs";
import AddGym from "../components/AddGym";
import "./Home.css";

function Home(){
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { user } = useContext(UserContext);
    const [gyms, setGyms] = useState<Gym[]>([]);
    
    const [isAddGymModal, setIsAddGymModal] = useState<boolean>(false);

    const fetchGyms = async () => {
        setIsLoading(true);
        const data = await getGyms();
        setGyms(data);
        setIsLoading(false);
    };

    const reload = async () => {
        await fetchGyms();
        setIsAddGymModal(false);
    }

    useEffect(() => {
        fetchGyms();
    }, []);

    if (isLoading) return <p className="loading">Loading...</p>;
    return(
        <div className="home">
            {user && (<button className="add-btn" onClick={() => setIsAddGymModal(!isAddGymModal)}>
                {isAddGymModal ? "X" : "Add gym"}
            </button>)}
            {isAddGymModal ? (
                <AddGym reload={reload} />
            ) : (
                <div className="gym-list">
                    {gyms.map((gym, i) => (
                        <div className="gym-list-row" key={i} style={{borderTop: i > 0 ? "1px solid #e6e6e6" : "none"}}>
                            <img src={gymimage} />
                            <div className="gym-info">
                                <h3>{gym.name}</h3>
                                <p>{<BsGeoAltFill />} {gym.address}, {gym.city}</p>
                                <div className="gym-review">4.5</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Home;
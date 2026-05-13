import { useState, useEffect } from "react";
import type { Gym } from "../types";
import { getGyms } from "../services/gymService";
import gymimage from "../../public/images/gym-image.png";
import { BsGeoAltFill } from "react-icons/bs";
import "./Home.css";

function Home(){
    const [gyms, setGyms] = useState<Gym[]>([]);

    useEffect(() => {
        const fetchGyms = async () => {
            const data = await getGyms();
            setGyms(data);
        };

        fetchGyms();
    }, []);
    return(
        <div className="home">
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
        </div>
    )
}

export default Home;
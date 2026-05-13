import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import type { Gym, Review } from "../types";
import { getGyms } from "../services/gymService";
import { getReviews, addReview } from "../services/reviewService";
import gymimage from "../../public/images/gym-image.png";
import { BsGeoAltFill, BsStarFill } from "react-icons/bs";
import AddGym from "../components/AddGym";
import "./Home.css";

function Home(){
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { user } = useContext(UserContext);
    const [gyms, setGyms] = useState<Gym[]>([]);
    const [reviews, setReviews] = useState<Review[]>([])
    
    const [isAddGymModal, setIsAddGymModal] = useState<boolean>(false);

    const fetchData = async () => {
        setIsLoading(true);
        const gymsData = await getGyms();
        setGyms(gymsData);
        console.log("gymsData ", gymsData)
        const reviewsData = await getReviews();
        setReviews(reviewsData);
        console.log("reviewsData ", reviewsData)
        setIsLoading(false);
    };

    const reload = async () => {
        await fetchData();
        setIsAddGymModal(false);
    }

    const review = (gymId: string | undefined) => {
        const gymReviews = reviews.filter(review => review.gymId === gymId);
        const average = gymReviews.reduce((sum, review) => sum + review.rating, 0) / gymReviews.length;
        return gymReviews.length > 0 ? (
            <div className="gym-review">{average}</div>
        ) : (
            <div style={{fontSize: "14px"}}>No reviews yet</div>
        )
    }

    const handleAddReview = async (gymId: string | undefined, rating: number) => {
        if(gymId != undefined){
            try{
                const review: Review = {
                    uid: user!.uid,
                    gymId: gymId,
                    rating: rating
                }
                await addReview(review, user?.accessToken);
                await reload();
            } catch(error) {
                console.log()
            }
        }
    }
    const ratings = (gymId: string | undefined) => {
        const items = [];
        const userId = user?.uid;
        const isRated = reviews.find(review => review.uid == userId && review.gymId == gymId);

        if(isRated && user != null){
            for (let i = 5; i >= 1; i--) {
                items.push(<BsStarFill className="rated" style={{color: i > isRated.rating ? "#ccc" : "#FFC107" }} key={i} />);
            }
        } else {
            for (let i = 5; i >= 1; i--) {
                items.push(<span onClick={() => handleAddReview(gymId, i)}><BsStarFill key={i} /></span>);
            }
        }
        return items;
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) return <p className="loading">Loading...</p>;
    return(
        <div className="home">
            {user && (
                <button className="add-btn" onClick={() => setIsAddGymModal(!isAddGymModal)}>
                    {isAddGymModal ? "X" : "Add gym"}
                </button>
            )}
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
                                {review(gym._id)}
                                {user && (<div className="ratings">{ratings(gym._id)}</div>)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Home;
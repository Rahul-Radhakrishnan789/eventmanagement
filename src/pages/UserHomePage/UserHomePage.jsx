import React, { useEffect } from "react";
import Navbar from "../../components/userComponents/navbar";
import CorouselItem from "../../components/userComponents/Corousel";
import Footer from "../../components/userComponents/Footer";
import Features from "../../components/userComponents/Features";
import FAQ from "../../components/userComponents/FAQ";
import EventStats from "../../components/userComponents/EventStats";
import { BookNow } from "../../components/userComponents/BookNow";
import axios from "../../utils/AxiosInstance"
import { useState } from "react";

const carouselItems = [
    {
        image: "https://images.unsplash.com/photo-1611244806964-91d204d4a2a7?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3Vuc2V0JTIwcGFydHl8ZW58MHx8MHx8fDA%3D",
        title: "SUNDOWN PARTY",
        subtitle: "Coming on march",
        buttonText: "Book Now",
    },
    {
        image: "https://media.istockphoto.com/id/499517325/photo/a-man-speaking-at-a-business-conference.jpg?s=612x612&w=0&k=20&c=gWTTDs_Hl6AEGOunoQ2LsjrcTJkknf9G8BGqsywyEtE=",
        title: "COMFORTABLE CONFERENCES",
        subtitle: "",
        buttonText: "Book Now",
    },
    {
        image: "https://www.shutterstock.com/image-photo/wedding-stage-decoration-260nw-1019017123.jpg",
        title: "MAKE YOUR WEDDING LUXURIOUS",
        subtitle: "",
        buttonText: "Book Now",
    },
];

function UserHomePage() {

    const [data,setData] = useState({})
    console.log(data)

    const fetchData = async () => {

         const response = await axios.get("/api/fetchstatistics")

         setData(response.data.data)

        
    }

    useEffect(() => {
        fetchData()
    },[])
    return (
        <>
            <Navbar />

            <CorouselItem items={carouselItems} />

            <Features />

            <FAQ />
            
            <EventStats data={data} />

            <BookNow />

            <Footer />
        </>
    );
}

export default UserHomePage;

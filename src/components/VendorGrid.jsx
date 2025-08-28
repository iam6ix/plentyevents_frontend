import React from "react";
import VendorCard from "./VendorCard";
import "./VendorGrid.css";

const vendors = [
  {
    name: "Adaobi Nwosu",
    image: "https://randomuser.me/api/portraits/women/65.jpg", 
    category: "Caterers",
    bio: "Professional",
    description: "Expert in Nigerian dishes and event catering.",
    rating: 5,
  },
  {
    name: "Tunde Balogun",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    category: "Event Planners",
    bio: "Creative Strategist",
    description: "Turns every event into a magical experience.",
    rating: 4,
  },
  {
    name: "Chika Okoro",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    category: "Drink Vendors",
    bio: "Mixologist",
    description: "Refreshing drinks for weddings and parties.",
    rating: 5,
  },
  {
    name: "Emeka Obi",
    image: "https://randomuser.me/api/portraits/men/38.jpg",
    category: "Caterers",
    bio: "Professional Chef",
    description: "Spicy and local menu specialist.",
    rating: 4,
  },
  {
    name: "Zainab Yusuf",
    image: "https://randomuser.me/api/portraits/women/56.jpg",
    category: "Event Planners",
    bio: "Decorator",
    description: "Elegant, modern designs tailored for any event.",
    rating: 5,
  },
  {
    name: "Kunle Ajayi",
    image: "https://randomuser.me/api/portraits/men/47.jpg",
    category: "Drink Vendors",
    bio: "Bartender",
    description: "Cocktail expert for indoor and outdoor parties.",
    rating: 4,
  },
  {
    name: "Ngozi Eze",
    image: "https://randomuser.me/api/portraits/women/88.jpg",
    category: "Caterers",
    bio: "Pastry Chef",
    description: "Bakes cakes, small chops, and event treats.",
    rating: 5,
  },
  {
    name: "Ibrahim Musa",
    image: "https://randomuser.me/api/portraits/men/29.jpg",
    category: "Drink Vendors",
    bio: "Juice Vendor",
    description: "Natural fruit juices for any kind of celebration.",
    rating: 4,
  },
  {
    name: "Yetunde Alabi",
    image: "https://randomuser.me/api/portraits/women/74.jpg",
    category: "Event Planners",
    bio: "Logistics Coordinator",
    description: "Handles logistics for large weddings and parties.",
    rating: 5,
  },
  {
    name: "Femi Durojaiye",
    image: "https://randomuser.me/api/portraits/men/64.jpg",
    category: "Caterers",
    bio: "Chef & Decorator",
    description: "Combines cooking with small event decor.",
    rating: 4,
  },
];

const VendorGrid = () => {
  return (
    <div className="VendorGrid">
      {vendors.map((vendor, index) => (
        <VendorCard key={index} {...vendor} />
      ))}
    </div>
  );
};

export default VendorGrid;

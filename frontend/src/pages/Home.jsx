import React from "react"
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className="home-container">
            <h1>Some title here</h1>
            <p>Add adventure to your life by joining the #places movement. Rent the perfect van to make your perfect road trip.</p>
            <Link to="places">Find your fuking places here {/* hope no one find this shit*/}</Link>
        </div>
    )
};
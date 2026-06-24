import { useState, useEffect } from 'react'
import "./App.css"

// Safe Fallback: We'll reference image profiles directly inside the component tags 
// rather than using top-level imports that break the compiler when spaces exist.

function App() {

  const [bookingForm, setBookingForm] = useState(() => {
    const savedData = localStorage.getItem("bookingApplication");
    return savedData 
      ? JSON.parse(savedData) 
      : { name: "", date: "", time: "", service: "" };
  });

  // Save form data to Local Storage whenever it changes
  useEffect(() => {
    localStorage.setItem("bookingApplication", JSON.stringify(bookingForm));
  }, [bookingForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((currentData) => ({ 
      ...currentData, 
      [name]: value 
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    // Validation:
    if (!bookingForm.name || bookingForm.name.trim() === "") {
        console.log("Validation failed: Name cannot be empty");
        alert("Name cannot be empty");
        return; 
    }

    console.log("👤 Form Name:", bookingForm.name);
    console.log("🚀 Form submitted successfully:", bookingForm);
  };

  const printLocalStorage = () => {
    const data = localStorage.getItem("bookingApplication");
    console.log("--- Debug Console Log ---");
    console.log("Raw Data in Storage:", data); 
  };

  return (
    <>
      <div className="hero-section">
        <div className="title-row">
          {/* Changed src to a relative string line to prevent runtime import crashes */}
          <img
            src="/Booking Logo.webp"
            alt="Booking logo"
            className="booking-logo"
            onError={(e) => { e.target.style.display = 'none'; }} // Hidden dynamically if asset is missing
          />
          <h1 className="app-title">Service Booking Website</h1>
        </div>
        <p>Fill out the details below to secure your appointment.</p>
      </div>

      <div className="container">
        <div className="center">
          <form onSubmit={handleSubmit}>
            
            <input 
              type="text" 
              placeholder="name" 
              name="name" 
              value={bookingForm.name || ""} 
              onChange={handleChange} 
            />
            <input 
              type="date" 
              name="date" 
              value={bookingForm.date || ""} 
              onChange={handleChange} 
            />
            <input 
              type="time" 
              name="time" 
              value={bookingForm.time || ""} 
              onChange={handleChange} 
            />
            <input 
              type="text" 
              placeholder="service" 
              name="service" 
              value={bookingForm.service || ""} 
              onChange={handleChange} 
            />

            <div className="button-layout" style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
              <button type="button" onClick={printLocalStorage}>
                Click to print to console
              </button>
              
              <button type="submit">
                Validate and Submit form
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}

export default App;
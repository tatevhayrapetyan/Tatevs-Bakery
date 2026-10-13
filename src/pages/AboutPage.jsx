import bakeryImage from "../assets/bakery.jpeg";

export default function AboutPage() {
  return (
    <main className="contact-container-big">
      <div className="contact-container">
        <div className="about-container">
          <img src={bakeryImage} alt="Inside Tatev's Bakery" className="about-image" />
          <div className="about-section">
            <h2 className="about-title">About Tatev's Bakery</h2>
            <p className="about-text">Thank you for visiting Tatev's Bakery! We hope you enjoy the sweet foods that we offer at our bakery.</p>
            <p className="about-text">Our recipes are brought to you from themealdb.com and we could not be more grateful to be collaborating with them on such a special project.</p>
            <p className="about-text">Tatev's Bakery came to life in 2011 but its dream had blossomed when our founder had baked a lemon cake at her elementary school.</p>
            <p className="about-text">This dream is now a dream we gladly share with you as we give you a piece of our greatest recipes.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

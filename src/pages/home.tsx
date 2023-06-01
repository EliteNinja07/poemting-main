import "../styles/home.sass";
import { LogoIcon } from "../assets/icons";
//@ts-ignore
import poetImage from "../assets/images/home-poet.png";
import { Link } from "react-router-dom";
import React from "react";

const Home = () => {
  const steps = [
    "Describe your idea",
    "Review Generated words",
    "Review Generated Tune",
    "Review Generated Background Music",
    "Generate Image",
    "Review Generated Image",
    "Choose a singing voice",
  ];

  return (
    <div className="home">
      <header className="hero flex-column">
        <div className="logo flex">
          <LogoIcon />
          <p>PoemTing</p>
        </div>

        <div className="text_content">
          <h1>Unleash Your Inner Poet with PoemTing</h1>
          <h2>
            Transform your thoughts and feelings into captivating poetry and
            music with the help of AI. Just provide a few keywords and let
            PoemTing do the rest. From romantic ballads to uplifting melodies,
            the possibilities are endless.
          </h2>
        </div>

        <Link to="/generate-poem" className="button">
          Get Started
        </Link>
      </header>

      <section className="how_it_works flex-column">
        <h3>How it works</h3>
        <div className="poet_and_steps flex">
          <img src={poetImage} alt="poet" />
          <div className="steps flex-column">
            {steps.map((step, index) => (
              <div className="step flex" key={index}>
                <p className="step_count flex">{index + 1}</p>
                <h4>{step}</h4>
              </div>
            ))}
          </div>
        </div>
        <Link to="/generate-poem" className="button">
          Generate yours today!
        </Link>
      </section>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import BosongoSong from "../../../assets/Bosongo song.mp4";
import Steps from "../../../assets/Steps.png";

const PensionService = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    const video = document.getElementById("videoPlayer");
    if (video) {
      video.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex h-[36rem] flex-col lg:flex-row w-full">
      {/* Left Section */}
      <div
        className="w-full lg:w-1/2 bg-[#003087] px-4 md:px-12 lg:px-16 py-16 md:py-24"
        style={{
          backgroundImage: `url(${Steps})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-xl ml-auto">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Building <span className="text-blue-300">Healthier Futures</span> Together
          </h1>

          <div className="space-y-4 mt-6">
            <p className="text-xl md:text-xl font-medium">
              Bosongo Hospital is a leading multispecialist healthcare provider committed to excellence.  
              We deliver compassionate, high-quality, and patient-centered care.  
              <br />
              Our expert team ensures top-tier treatment with state-of-the-art facilities.  
              Your health is our priority, and we provide trusted, comprehensive care.
            </p>
            <button className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-[#003087] transition-colors duration-200 rounded-lg text-lg font-semibold">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Right Section (Video) */}
      <div
        className="w-full lg:w-1/2 px-4 md:px-12 lg:px-16 py-16 md:py-24 flex items-center justify-center relative"
        style={{
          backgroundImage: `url(${Steps})`, // Background Image
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#f3f4f6", // Fallback color
        }}
      >
        {/* Video Player */}
        <video
          id="videoPlayer"
          src={BosongoSong}
          controls={isPlaying} // Show controls only after clicking play
          className="w-full h-full object-cover rounded-lg"
        />

        {/* Play Button (Only Before Playing) */}
        {!isPlaying && (
  <button
    onClick={handlePlay}
    className="absolute inset-0 flex items-center justify-center"
    style={{
      animation: "pulse 1.5s infinite",
    }}
  >
    <svg
      className="w-16 h-16 text-white"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M4 4l12 6-12 6V4z" />
    </svg>
  </button>
)}
<style>
  {`
    @keyframes pulse {
      0% { transform: scale(1); opacity: 0.8; }
      50% { transform: scale(1.2); opacity: 1; }
      100% { transform: scale(1); opacity: 0.8; }
    }
  `}
</style>

      </div>
    </div>
  );
};

export default PensionService;

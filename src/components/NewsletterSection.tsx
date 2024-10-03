import React from "react";

const NewsletterSection: React.FC = () => {
  return (
    <>
      <section
        className="flex flex-col items-center justify-center py-10 h-96 mt-52 bg-cover bg-center bg-[url('https://hekto.miladsdgh.ir/static/media/update-banner.0c7558e6d0ce8034e48e.png')]" // Update the path to your image
      ></section>
      <div className="flex items-center justify-center mt-10">
        <img
          src="https://hekto.miladsdgh.ir/static/media/logos.6c4f50e762b2aeec98a7.png"
          alt=""
        />
      </div>
    </>
  );
};

export default NewsletterSection;

import ServiceSection from "../components/ServiceSection";
import TestimonialsSection from "../components/testimonialsSection";
const AboutPage = () => {
  return (
    <>
      <section id="about" className="m-auto w-3/4 mb-20 mt-20">
        <h1 className="text-4xl text-center font-bold text-indigo-900 m-6">About Us</h1>
        <div className="container mx-auto flex flex-col md:flex-row items-center space-x-0 md:space-x-14 space-y-10 md:space-y-0">
          <div className="md:w-1/2 bg-blue-900 pb-10 rounded-md">
            <img
              className="ml-0 md:ml-9 rounded-md"
              src="https://fdicampus.com/wp-content/uploads/2021/09/muhammad-faiz-zulkeflee-alw-CwGFmwQ-unsplash-small.jpg"
              alt="About Us"
            />
          </div>
          <div className="md:w-1/2 space-y-12 text-center md:text-left px-2">
            <h2 className="text-4xl font-bold text-blue-950">
              Know About Our Ecommerce Business, History
            </h2>
            <p className="leading-5 text-blue-800">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Molestiae quibusdam enim vel eius, sed vitae in laborum sint
              corporis obcaecati voluptates iusto tempore placeat! Excepturi
              fugiat inventore repellendus sunt nobis.
            </p>
            <button className="bg-pink-600 rounded-md hover:bg-pink-800 px-9 py-2 text-white">
              <a href="#">Contact Us</a>
            </button>
          </div>
        </div>
      </section>
      <ServiceSection />
      <TestimonialsSection />
    </>
  );
};

export default AboutPage;

const ServiceSection = () => {
  return (
    <section id="features" className="m-auto w-3/4">
      <h1 className="text-5xl font-bold text-center mb-12">Our Features</h1>
      <div className="container mx-auto flex flex-col md:flex-row md:space-x-3 space-y-6 md:space-y-0">
        {[
          {
            image:
              "https://th.bing.com/th/id/OIP.-4_lVnkaV_y663My20LP7AHaHa?rs=1&pid=ImgDetMain",
            title: "Free Delivery",
          },
          {
            image:
              "https://th.bing.com/th/id/OIP.5txiLoDikb7YkJjNtL3yfwEsEs?rs=1&pid=ImgDetMain",
            title: "100% Cash Back",
          },
          {
            image:
              "https://th.bing.com/th/id/R.0e74c52196091288d2af1a160cdd4906?rik=GR%2bkRrLvIf9M0g&pid=ImgRaw&r=0",
            title: "Quality Product",
          },
          {
            image: "https://cdn-icons-png.flaticon.com/512/3306/3306014.png",
            title: "24/7 Support",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="md:w-1/4 shadow-xl flex flex-col space-y-4 text-center mx-auto py-12 px-3 border-slate-200 hover:border-b-orange-600 border-2 rounded-md"
          >
            <div className="w-20 h-20 mx-auto flex items-center justify-center">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl text-blue-900 font-bold">
              {feature.title}
            </h3>
            <p className="text-blue-800">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem, aut
              ut.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;

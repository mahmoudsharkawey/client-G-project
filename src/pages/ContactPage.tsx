const ContactPage = () => {
  return (
    <>
      <h1 className="text-4xl text-center font-bold text-indigo-900 m-6">Contact Page</h1>
      <div className="contact-page container m-auto w-3/4 px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="left-column space-y-8">
          <section className="information-about-us">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">
              Information About us
            </h2>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
              neque ultrices mattis aliquam, malesuada diam est. Malesuada sem
              tristique amet erat vitae eget dolor lobortis. Accumsan faucibus
              vitae lobortis quis bibendum quam.
            </p>
            <div className="color-dots flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
              <div className="w-3 h-3 rounded-full bg-pink-500"></div>
              <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
            </div>
          </section>

          <section className="get-in-touch">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
              neque ultrices tristique amet erat vitae eget dolor los vitae
              lobortis quis bibendum quam.
            </p>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name*"
                  className="p-2 border border-gray-300 rounded"
                />
                <input
                  type="email"
                  placeholder="Your E-mail"
                  className="p-2 border border-gray-300 rounded"
                />
              </div>
              <input
                type="text"
                placeholder="Subject*"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <textarea
                placeholder="Type Your Message*"
                className="w-full p-2 border border-gray-300 rounded h-32"
              ></textarea>
              <button
                type="submit"
                className="bg-pink-500 text-white py-2 px-6 rounded hover:bg-pink-600 transition duration-300"
              >
                Send Mail
              </button>
            </form>
          </section>
        </div>

        <div className="right-column space-y-8">
          <section className="contact-way">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">
              Contact Way
            </h2>
            <div className="contact-items grid grid-cols-2 gap-4">
              {[
                {
                  icon: "bg-indigo-600",
                  text1: "Tel: 877-67-88-99",
                  text2: "E-Mail: shop@store.com",
                },
                {
                  icon: "bg-orange-500",
                  text1: "20 Margaret st, London",
                  text2: "Great Britain, 3NM98-LK",
                },
                {
                  icon: "bg-pink-500",
                  text1: "Support Forum",
                  text2: "For over 24hr",
                },
                {
                  icon: "bg-green-500",
                  text1: "Free standard shipping",
                  text2: "on all orders.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="contact-item flex items-center space-x-3"
                >
                  <div
                    className={`icon w-10 h-10 rounded-full ${item.icon}`}
                  ></div>
                  <div className="info">
                    <p className="text-sm text-gray-700">{item.text1}</p>
                    <p className="text-sm text-gray-700">{item.text2}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="illustration">
            <img
              src="https://unblast.com/wp-content/uploads/2020/09/Contact-Us-Vector-Illustration-Part-02-1-1024x768.jpg"
              alt="Contact illustration"
              width={500}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;

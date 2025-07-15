import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const data = [
  {
    image: "/img/servise/delivery-1.png",
    title: "Global Delivery",
  },
  {
    image: "/img/servise/delivery-2.jpg",
    title: "Real-Time Tracking",
  },
  {
    image: "/img/servise/delivery-3.jpg",
    title: "Secure Packaging",
  },
  {
    image: "/img/servise/delivery-4.jpg",
    title: "Fast Shipping",
  },
  {
    image: "/img/servise/delivery-5.jpg",
    title: "Customer Support",
  },
];


function ServiceSection() {

    const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false, 
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  return (
     <div className="slider-section">
      <h2 className="slider-heading">Our Services</h2>
      <div className="slider-wrapper">
        <Slider {...settings}>
          {data.map((item, index) => (
            <div key={index} className="slide-card">
              <div className="image-wrapper">
                <img src={item.image} alt={item.title} />
                <div className="overlay">
                  <p className="overlay-title">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default ServiceSection

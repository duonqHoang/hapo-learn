import Slider from "react-slick";
import "./ReviewsCarousel.scss";
import { Rating, Star } from "@smastrom/react-rating";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToScroll: 1,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
  nextArrow: <img src="images/nextArrow.png" alt="Next Arrow" />,
  prevArrow: <img src="images/prevArrow.png" alt="Previous Arrow" />,
};

const starStyles = {
  itemShapes: Star,
  activeFillColor: "#FFD567",
  inactiveFillColor: "#D8D8D8",
};

export default function ReviewsCarousel({ reviews }) {
  return (
    <div className="carousel">
      <Slider {...settings} {...{ slidesToShow: reviews.length > 1 ? 2 : 1 }}>
        {reviews.map((review) => {
          return (
            <div key={review.id} className="review-container">
              <div className="reviewBox">
                <div className="verticalBar" />
                <div>{review.comment}</div>
              </div>
              <div className="review-info">
                <div className="avatar">
                  <img
                    src={
                      review.user
                        ? `http://localhost:8080/images/${review.user.avatar}`
                        : "images/user-avatar.jpg"
                    }
                    alt="User avatar"
                    onError={(event) => {
                      event.currentTarget.src = "images/user-avatar.jpg";
                    }}
                  />
                </div>
                <div>
                  <div className="userName">
                    {review?.user?.name || "Anonymous"}
                  </div>
                  <div className="courseName">{review.course.name}</div>
                  <Rating
                    itemStyles={starStyles}
                    spaceBetween="small"
                    spaceInside="medium"
                    style={{
                      maxWidth: "100px",
                      marginLeft: "-5px",
                      marginTop: "5px",
                    }}
                    value={review.star}
                    readOnly
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

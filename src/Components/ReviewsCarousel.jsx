import Slider from "react-slick";
import "./ReviewsCarousel.scss";

export default function ReviewsCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 2,
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
  const reviews = [
    {
      comment: `“A wonderful course on how to start. Eddie beautifully conveys all essentials of a becoming a good Angular developer. Very glad to have taken this course. Thank you Eddie Bryan.”`,
      star: 4.5,
      userName: "Tran Tuan Hoang",
      courseName: "Python",
    },
    {
      comment: `“A wonderful course on how to start. Eddie beautifully conveys all essentials of a becoming a good Angular developer. Very glad to have taken this course. Thank you Eddie Bryan.”`,
      star: 4.5,
      userName: "Tran Tuan Hoang",
      courseName: "Python",
    },
    {
      comment: `“A wonderful course on how to start. Eddie beautifully conveys all essentials of a becoming a good Angular developer. Very glad to have taken this course. Thank you Eddie Bryan.”`,
      star: 4.5,
      userName: "Tran Tuan Hoang",
      courseName: "Python",
    },
    {
      comment: `“A wonderful course on how to start. Eddie beautifully conveys all essentials of a becoming a good Angular developer. Very glad to have taken this course. Thank you Eddie Bryan.”`,
      star: 4.5,
      userName: "Tran Tuan Hoang",
      courseName: "Python",
    },
  ];
  return (
    <div className="carousel">
      <Slider {...settings}>
        {reviews.map((review, i) => {
          return <Review index={i} review={review} />;
        })}
      </Slider>
    </div>
  );
}

function Review({ review }) {
  return (
    <div className="review-container">
      <div className="reviewBox">
        <div className="verticalBar" />
        <div>{review.comment}</div>
      </div>
      <div className="review-info">
        <div className="avatar">
          <img src="/images/catAI.png" alt="User avatar" />
        </div>
        <div>
          <div className="userName">{review.userName}</div>
          <div className="courseName">{review.courseName}</div>
          <div>{review.star}</div>
        </div>
      </div>
    </div>
  );
}

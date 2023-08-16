import { Link, useLocation, useParams } from "react-router-dom";
import "./RoutePath.scss";

export default function RoutePath() {
  const path = useLocation().pathname;
  const { courseID, lessonID } = useParams();

  console.log(path);

  return (
    <div className="route-container">
      <div className="route">
        <Link to="/">Home</Link>
        {path.includes("courses") ? (
          <>
            &nbsp;&gt;&nbsp;
            <Link to=".." relative="path">
              All courses
            </Link>
          </>
        ) : (
          <></>
        )}
        {courseID ? (
          <>
            &nbsp;&gt;&nbsp;
            <Link to=".." relative="path">
              Course detail
            </Link>
          </>
        ) : (
          <></>
        )}
        {lessonID ? (
          <>
            &nbsp;&gt;&nbsp;<Link>Lesson detail</Link>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

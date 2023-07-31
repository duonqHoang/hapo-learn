import { Pagination } from "react-bootstrap";
import "./PageControl.scss";

export default function PageControl() {
  return (
    <Pagination className="page-control justify-content-end pt-2">
      <Pagination.Prev
        className="back"
        linkClassName="page-a"
      ></Pagination.Prev>
      {[1, 2, 3, 4, 5].map((item) => {
        return <Pagination.Item linkClassName="page-a">{item}</Pagination.Item>;
      })}
      <Pagination.Next
        className="next"
        linkClassName="page-a"
      ></Pagination.Next>
    </Pagination>
  );
}

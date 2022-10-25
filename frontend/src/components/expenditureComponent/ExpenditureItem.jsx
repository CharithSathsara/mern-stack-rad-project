import { useDispatch } from "react-redux";
import { deleteExpenditure } from "../../features/expenditures/expenditureSlice";
import { Link } from "react-router-dom";
import React from "react";

function ExpenditureItem({ expenditure }) {
  const dispatch = useDispatch();

  function setData(expenditure) {
    console.log(expenditure);
    localStorage.setItem('ID', expenditure._id);
    localStorage.setItem('DESCRIPTION', expenditure.description);
    localStorage.setItem('AMOUNT', expenditure.amount);
  }

  return (
    <div className="item">
      <div>{new Date(expenditure.createdAt).toLocaleString("en-US")}</div>
      <h3>Description: {expenditure.description}</h3>
      <h3>Amount : Rs. {expenditure.amount}</h3>
      <br />
      <button
        onClick={() => dispatch(deleteExpenditure(expenditure._id))}
        className="del-btn"
      >
        DELETE
      </button>
      <Link to={`/update-expenditure/${expenditure._id}`}>
        <button onClick={() => setData(expenditure)} className="update-btn">
            UPDATE
        </button>
      </Link>
    </div>
  );
}

export default ExpenditureItem;

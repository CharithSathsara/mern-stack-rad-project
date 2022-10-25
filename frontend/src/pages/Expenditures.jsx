import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//use the useDispatch in order to get the expenditure
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";

//import the expenditure form components
import ExpenditureForm from "../components/expenditureComponent/ExpenditureForm";

import ExpenditureItem from "../components/expenditureComponent/ExpenditureItem";
import { getExpenditures, reset } from "../features/expenditures/expenditureSlice";

function Expenditures() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { expenditures, isLoading } = useSelector((state) => state.expenditures);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    //dispatch our expenditures
    // get the expenditures from the back end put in the line 19 goals, so we can access it
    dispatch(getExpenditures());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  //now we want to show our goals using 19 line goals//from state
  //add expression

  return (
    <>
      <section className="heading">
        <p>{user && user.name} Expenditures Dashboard</p>
      </section>

      <ExpenditureForm />

      <section className="content">
        {expenditures.length > 0 ? (
          <div className="items">
            {expenditures.map((expenditure) => (
              <ExpenditureItem
                key={expenditure._id}
                expenditure={expenditure}
              />
            ))}
          </div>
        ) : (
          <h3>You have Not any Expenditures</h3>
        )}
      </section>
    </>
  );
}

export default Expenditures;

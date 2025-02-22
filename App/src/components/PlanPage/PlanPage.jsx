import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PlanPage.css";
import { useAuth } from "../../auth/AuthContext";
import { IoReturnUpBack } from "react-icons/io5";


const PlanPage = () => {
  const { planName } = useParams();
  const [planData, setPlanData] = useState(null);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    //Fetch plan data from the backend
    const fetchPlanData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/api/v1/gym/plans/${planName}`
        );
        setPlanData(response.data.plan);
      } catch (error) {
        console.error("Error fetching plan data:", error);
      }
    };

    fetchPlanData();
  }, [planName]);

  if (!planData) return <p>Loading plan details...</p>;

  // Ensure planData.prices is not null or undefined
  if (!planData.prices) return <p>Plan pricing information is unavailable.</p>;

  const handleSelectPlan = (months, price, planId) => {
    navigate(`/plans/${planName}/confirm`, {
      state: { planName: planData.name, months, price, planId },
    });
  };

  return (
    <>
      <div className="back-btn" onClick={() => navigate("/")}>
        <IoReturnUpBack size={30} />
        <span>Back</span>
      </div>
      <div className="plan-page">
        <h1>{planData.name} Plan</h1>
        <p>{planData.description}</p>

        <h2>Pricing Options</h2>
        <div className="pricing-options">
          {Object.keys(planData.prices).map((duration) => {
            const months = parseInt(
              duration.replace("price", "").replace("Months", "")
            );
            return (
              <div
                key={duration}
                className="pricing-option"
                onClick={() =>
                  isLoggedIn
                    ? handleSelectPlan(
                        months,
                        planData.prices[duration],
                        planData._id
                      )
                    : navigate("/register")
                }
              >
                <h3>
                  {months} Month{months > 1 ? "s" : ""}
                </h3>
                <p>₹{planData.prices[duration]}</p>
              </div>
            );
          })}
        </div>

        <button className="back-button" onClick={() => navigate("/")}>
          Back to Plans
        </button>
      </div>
    </>
  );
};

export default PlanPage;

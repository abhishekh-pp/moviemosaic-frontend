import React, { useEffect } from "react";
import axios from "axios";
import Seat from "../components/Seat/Seat";
import { useLoaderData, useNavigate } from "react-router-dom";
import Row from "../components/Row/Row";
import Tier from "../components/Tier/Tier";
import styles from "./SelectSeats.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addTiers,
  selectShow,
  deselectSeat,
  setBookedSeats,
} from "../store/screenSlice";

export async function loader({ params }) {
  const res = await axios.get("http://localhost:3000/shows/" + params.showId);
  const show = res.data;
  const showId = params.showId;
  const bookingRes = await axios.get(
    "http://localhost:3000/bookings?show=" + showId
  );
  const bookingList = bookingRes.data;
  const bookedSeats = [];
  bookingList.map((booking) => {
    booking.selectedSeats.map((seat) => {
      bookedSeats.push(seat);
    });
  });
  return { show, showId, bookedSeats };
}

function SelectSeats(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { show, showId, bookedSeats } = useLoaderData();
  const screen = show.screen;
  const screenData = useSelector((state) => state.screen);
  const totalPrice = useSelector((state) => state.screen.totalPrice);

  useEffect(() => {
    dispatch(addTiers(screen.tier));
    dispatch(setBookedSeats(bookedSeats));
  }, []);

  const handleSeatConfirmation = () => {
    dispatch(selectShow(showId));
    navigate("/booking-summary");
  };

  return (
    <main className={styles.SelectSeatsMain}>
      <ul className={styles.Tiers}>
        {screenData.tiers.map((tier) => {
          return <Tier key={tier._id} tier={tier} />;
        })}
      </ul>
      <div className={styles.ScreenDiv}>&nbsp;</div>
      <div>
        <button
          onClick={handleSeatConfirmation}
          className={styles.CheckoutButton}
        >
          Pay Rs.{totalPrice}
        </button>
      </div>
    </main>
  );
}

export default SelectSeats;

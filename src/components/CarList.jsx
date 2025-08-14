// import { useSelector, useDispatch } from "react-redux";
// import { createSelector } from "@reduxjs/toolkit";
// import { removeCar } from "../store";

// const memoizedCars = createSelector(
//   [(state) => state.cars.data, (state) => state.cars.searchTerm],
//   (data, searchTerm) =>
//     data.filter((car) =>
//       car.name.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//    return {
//       cars: filteredCars,
//       name: form.name,
//     };
// );

// function CarList() {
//   const dispatch = useDispatch();
//   const cars = useSelector(memoizedCars);
//  const name = useSelector((state) => state.form.name);

import { useDispatch, useSelector } from "react-redux";
import { removeCar } from "../store";

function CarList() {
  const dispatch = useDispatch();
  const { cars, name } = useSelector(({ form, cars: { data, searchTerm } }) => {
    const filteredCars = data.filter((car) =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return {
      cars: filteredCars,
      name: form.name,
    };
  });

  const handleCarDelete = (car) => {
    dispatch(removeCar(car.id));
  };

  const renderedCars = cars.map((car) => {
    // Decide if the cars should be bold
    // state.form.name
    const bold = name && car.name.toLowerCase().includes(name.toLowerCase());

    return (
      <div key={car.id} className={`panel ${bold && "bold"}`}>
        <p>
          {car.name} - ${car.cost}
        </p>
        <button
          onClick={() => handleCarDelete(car)}
          className="button is-danger"
        >
          Delete
        </button>
      </div>
    );
  });
  return (
    <div className="car-list">
      {renderedCars} <hr />
    </div>
  );
}

export default CarList;

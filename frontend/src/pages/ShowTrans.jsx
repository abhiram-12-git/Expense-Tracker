import React from "react";

const ShowTrans = ({ amounts = [] }) => {
  // Calculate expense
  const expense = (
    amounts
      .filter((a) => a < 0)
      .reduce((acc, item) => acc + item, 0) * -1
  ).toFixed(2);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 text-center border-r-4 border-red-400 max-w-sm mx-auto transition-transform transform hover:scale-105">
      <h4 className="text-gray-500 font-medium uppercase tracking-wide">
        Expense
      </h4>
      <p className="text-2xl font-bold text-red-500 mt-2">
        -${expense}
      </p>
    </div>
  );
};

export default ShowTrans;

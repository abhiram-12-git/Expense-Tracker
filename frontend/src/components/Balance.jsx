import React from "react";

const Balance = ({ transactions }) => {
  const amounts = transactions.map((t) => t.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
      <h4 className="text-gray-500 font-medium uppercase tracking-wide">
        Your Balance
      </h4>
      <h1 className="text-3xl font-bold text-indigo-600 mt-2">
        ${total}
      </h1>
    </div>
  );
};

export default Balance;

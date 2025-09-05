import React from "react";

const IncomeExpense = ({ transactions }) => {
  const amounts = transactions.map((t) => t.amount);
  const income = amounts
    .filter((a) => a > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);
  const expense = (
    amounts.filter((a) => a < 0).reduce((acc, item) => acc + item, 0) * -1
  ).toFixed(2);

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {/* Income Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center border-r-4 border-green-400">
        <h4 className="text-gray-500 font-medium uppercase tracking-wide">
          Income
        </h4>
        <p className="text-2xl font-bold text-green-500 mt-2">
          +${income}
        </p>
      </div>

      {/* Expense Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center border-r-4 border-red-400">
        <h4 className="text-gray-500 font-medium uppercase tracking-wide">
          Expense
        </h4>
        <p className="text-2xl font-bold text-red-500 mt-2">
          -${expense}
        </p>
      </div>
    </div>
  );
};

export default IncomeExpense;

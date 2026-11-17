
"use client";

import { useState } from "react";

type Payout =
  | "Yearly"
  | "Half Yearly"
  | "Quarterly"
  | "At Maturity";

export default function Home() {
  const [deposit, setDeposit] = useState(100000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(5);
  const [payout, setPayout] = useState<Payout>("Quarterly");

  const [calculated, setCalculated] = useState(true);

  const interest = (deposit * rate * years) / 100;
  const maturity = deposit + interest;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  const handleCalculate = () => {
    if (deposit <= 0 || rate < 0 || years <= 0) {
      alert("Please enter valid values");
      return;
    }

    setCalculated(true);
  };

  return (
    <main className="calculator">

      <header className="header">
        <h1>FD Calculator</h1>
        <p>
          Estimate how much your fixed deposit
          investment will grow over time.
        </p>
      </header>

      <div className="calculator-content">

        {/* Input Section */}
        <section className="input-section">

          <div className="field">
            <div className="field-heading">
              <label>Deposit Amount</label>
              <span>{formatCurrency(deposit)}</span>
            </div>

            <input
              type="number"
              min="1"
              value={deposit}
              onChange={(e) => {
                setDeposit(Number(e.target.value));
                setCalculated(false);
              }}
            />

            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={Math.min(deposit, 100000)}
              onChange={(e) => {
                setDeposit(Number(e.target.value));
                setCalculated(false);
              }}
            />

            <div className="range-labels">
              <span>1000</span>
              <span>100000</span>
            </div>
          </div>

          <div className="field">
            <div className="field-heading">
              <label>Rate of Return</label>
              <span>{rate}</span>
            </div>

            <input
              type="number"
              min="0"
              max="50"
              step="0.1"
              value={rate}
              onChange={(e) => {
                setRate(Number(e.target.value));
                setCalculated(false);
              }}
            />

            <input
              type="range"
              min="0"
              max="50"
              step="0.1"
              value={rate}
              onChange={(e) => {
                setRate(Number(e.target.value));
                setCalculated(false);
              }}
            />

            <div className="range-labels">
              <span>0%</span>
              <span>50%</span>
            </div>
          </div>

          <div className="field">
            <label>Interest Payout</label>

            <div className="payout-options">
              {(
                [
                  "Quarterly",
                  "Half Yearly",
                  "Yearly",
                  "At Maturity",
                ] as Payout[]
              ).map((option) => (
                <button key={option} type="button"className={
                    payout === option ? "active" : ""
                  }
                  onClick={() => {
                    setPayout(option);
                    setCalculated(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <div className="field-heading">
              <label>Time Period (Years)</label>
              <span>{years} Years</span>
            </div>

            <input
              type="range"
              min="1"
              max="50"
              value={years}
              onChange={(e) => {
                setYears(Number(e.target.value));
                setCalculated(false);
              }}
            />

            <div className="range-labels">
              <span>1 Year</span>
              <span>50 Years</span>
            </div>
          </div>

          <button
            className="calculate-btn"
            onClick={handleCalculate}
          >
            Calculate
          </button>

        </section>

        {/* Results Section */}
        <section className="result-section">

          <div className="result-item">
            <span>Maturity Amount</span>
            <h2>
              {calculated
                ? formatCurrency(maturity)
                : "—"}
            </h2>
          </div>

          <div className="result-item">
            <span>Interest Earned</span>
            <h2>
              {calculated
                ? formatCurrency(interest)
                : "—"}
            </h2>
          </div>

        </section>

      </div>
    </main>
  );
}
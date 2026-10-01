export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Choose",
      text: "Select Overdraft or Personal Loan.",
    },
    {
      number: "2",
      title: "Tell Us",
      text: "Enter your basic income and requirement details.",
    },
    {
      number: "3",
      title: "Review",
      text: "Our team reviews your enquiry and contacts you.",
    },
    {
      number: "4",
      title: "Discuss",
      text: "Understand applicable eligibility, terms and next steps.",
    },
  ];

  return (
    <section
      className="section"
      id="how-it-works"
    >
      <div className="container">

        <div className="section-title">
          <h2>How It Works</h2>

          <p>
            Four simple steps to submit your enquiry.
          </p>
        </div>

        <div className="steps">

          {steps.map((step) => (
            <div
              className="step"
              key={step.number}
            >
              <div className="step-number">
                {step.number}
              </div>

              <h3>{step.title}</h3>

              <p>{step.text}</p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
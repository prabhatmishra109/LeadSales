export default function Benefits() {
  const benefits = [
    {
      number: "01",
      title: "Simple Process",
      text: "Share your basic details through a simple online form.",
    },
    {
      number: "02",
      title: "Multiple Options",
      text: "Tell us whether you are interested in overdraft or personal loan options.",
    },
    {
      number: "03",
      title: "Human Assistance",
      text: "Our team can contact you and explain the applicable process and requirements.",
    },
  ];

  return (
    <section className="section">
      <div className="container">

        <div className="section-title">
          <h2>Why Use Our Website?</h2>

          <p>
            A simple way to submit your financial enquiry.
          </p>
        </div>

        <div className="benefits-grid">

          {benefits.map((benefit) => (
            <div
              className="benefit-card"
              key={benefit.number}
            >
              <div className="benefit-number">
                {benefit.number}
              </div>

              <h3>{benefit.title}</h3>

              <p>{benefit.text}</p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
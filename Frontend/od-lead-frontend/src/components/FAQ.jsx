export default function FAQ() {
  const faqs = [
    {
      question: "What is an overdraft?",
      answer:
        "An overdraft is a credit facility that may allow an eligible customer to access funds up to an approved limit. Interest and other charges depend on the lender and facility terms.",
    },
    {
      question: "What is a personal loan?",
      answer:
        "A personal loan is a loan where an approved amount is provided to the borrower and generally repaid through scheduled EMIs.",
    },
    {
      question: "Will submitting this form guarantee approval?",
      answer:
        "No. Submitting an enquiry does not guarantee approval. Final eligibility, amount, rate, fees and terms are decided by the applicable lender.",
    },
    {
      question: "Who can submit an enquiry?",
      answer:
        "Eligible salaried, self-employed or business customers can submit an enquiry. Actual eligibility depends on the lender's criteria.",
    },
    {
      question: "Why do you need my mobile number?",
      answer:
        "The mobile number is used to contact you regarding the enquiry after you provide the required consent.",
    },
  ];

  return (
    <section
      className="section"
      id="faq"
    >
      <div className="container">

        <div className="section-title">
          <h2>Frequently Asked Questions</h2>

          <p>
            Common questions about our enquiry process.
          </p>
        </div>

        <div className="faq-list">

          {faqs.map((faq, index) => (
            <div
              className="faq-item"
              key={index}
            >
              <div className="faq-question">
                {faq.question}
              </div>

              <div className="faq-answer">
                {faq.answer}
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
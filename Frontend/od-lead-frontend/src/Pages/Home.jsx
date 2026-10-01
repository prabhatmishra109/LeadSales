import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductCards from "../components/ProductCards";
import ODCalculator from "../components/ODCalculator";
import Benefits from "../components/Benefits";
import HowItWorks from "../components/HowItWorks";
import LeadForm from "../components/LeadForm";

import Footer from "../components/Footer";
import FAQ from "../components/Faq";
import FinanceAssistant from "../components/FinanceAssistant";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <ProductCards />
  <LeadForm />
        <Benefits />

        <ODCalculator />

        <HowItWorks />
<FinanceAssistant/>
      

      </main>
<FAQ></FAQ>
      <Footer />
    </>
  );
}
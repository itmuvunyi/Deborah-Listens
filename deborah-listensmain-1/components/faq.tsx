import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is lay counselling?",
    answer:
      "Lay counselling is professional counselling provided by trained counsellors who offer emotional support, guidance, and practical coping strategies. While not licensed therapists, lay counsellors have specialized training in counselling techniques and provide valuable support for mental wellness.",
  },
  {
    question: "Is everything I share confidential?",
    answer:
      "Yes, confidentiality is a cornerstone of our practice. Everything discussed in sessions remains private, except in rare cases where there is risk of harm to yourself or others, or as required by law. We will always discuss these boundaries with you.",
  },
  {
    question: "How long are counselling sessions?",
    answer:
      "Standard sessions are 50 minutes long. We also offer extended 90-minute sessions for deeper work. The frequency of sessions is tailored to your needs, typically ranging from weekly to bi-weekly.",
  },
  {
    question: "Do you offer online sessions?",
    answer:
      "Yes! We offer flexible session formats including in-person, online video sessions, and hybrid options. Online sessions provide the same quality of care with added convenience and accessibility.",
  },
  {
    question: "What should I expect in my first session?",
    answer:
      "Your first session is about getting to know each other. We'll discuss what brought you to counselling, your goals, and answer any questions you have. There's no pressure to share more than you're comfortable with. We'll work together to create a plan that feels right for you.",
  },
  {
    question: "How much do sessions cost?",
    answer:
      "Session fees vary based on the type of service and session length. We offer sliding scale options based on financial need to ensure counselling is accessible. Please contact us for specific pricing information and to discuss payment options.",
  },
  {
    question: "Do you accept insurance?",
    answer:
      "We can provide receipts for sessions that may be submitted to your insurance provider for reimbursement, depending on your coverage. Please check with your insurance company about coverage for counselling services.",
  },
  {
    question: "What ages do you work with?",
    answer:
      "We work with girls (ages 8+), youth (ages 13-24), and adult women (18+). Services are tailored to be age-appropriate and developmentally suitable for each client.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Common questions about counselling, confidentiality, and what to expect
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-card px-6 rounded-lg border">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, ChevronDown, ChevronUp, Sparkles, Clock, ShieldCheck } from 'lucide-react';

const FAQS = [
  {
    q: 'What is the distinction between an Attar and an Extrait de Parfum?',
    a: 'An Attar is 100% pure concentrated perfume oil free from alcohol, historically hydro-distilled into pure sandalwood or botanical bases. It wears intimately and blossoms with body heat. An Extrait de Parfum is formulated at 28%–33% concentration with a delicate high-grade perfumer’s spirit base for expansive projection and radiating sillage.',
  },
  {
    q: 'Are your botanical musks cruelty-free?',
    a: 'Yes, absolutely. AARZEE STORE strictly formulates with 100% cruelty-free botanical ambrette seed absolutes and cruelty-free laboratory musk crystals. We never use animal deer musk.',
  },
  {
    q: 'How long does an AARZEE fragrance linger?',
    a: 'Due to our high concentration and aged natural heartwood resins, our attars typically project for 16–24+ hours on skin and multiple days on textiles.',
  },
  {
    q: 'What is your complimentary shipping policy?',
    a: 'We offer complimentary express courier shipping across India on all orders exceeding ₹2,999. Orders below ₹2,999 incur a flat ₹199 express transit fee.',
  },
  {
    q: 'Can I try samples before opening a full flacon?',
    a: 'Yes. Every full flacon arrives with a complimentary 1.5ml discovery vial of the same scent. We encourage you to test the vial on your skin before breaking the wax seal on the master presentation coffret.',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSent, setIsSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/5 text-brand-gold text-xs font-mono tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            PRIVATE CONCIERGE
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif text-white tracking-tight font-normal">
            CONTACT &amp; ENQUIRIES
          </h1>
          <p className="text-brand-muted text-base sm:text-lg mt-4 font-light leading-relaxed">
            Our olfactory advisors are available to guide your custom fragrance selection,
            assist with corporate gifting, or resolve order queries.
          </p>
        </div>

        {/* 2-Column: Details & Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          {/* Left Column: Direct Concierge Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 space-y-6">
              <h3 className="font-serif text-2xl text-white">Direct Atelier Concierge</h3>

              <div className="flex items-start gap-4 text-sm">
                <Mail className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-brand-muted uppercase block">
                    ELECTRONIC DISPATCH
                  </span>
                  <a href="mailto:concierge@aarzeestore.com" className="text-white hover:text-brand-gold transition-colors">
                    concierge@aarzeestore.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 text-sm">
                <Phone className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-brand-muted uppercase block">
                    TELEPHONE &amp; WHATSAPP CONCIERGE
                  </span>
                  <a href="tel:+919876543210" className="text-white hover:text-brand-gold transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 text-sm">
                <Clock className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-brand-muted uppercase block">
                    CONCIERGE HOURS
                  </span>
                  <span className="text-white">Monday – Saturday • 10:00 AM – 7:00 PM IST</span>
                </div>
              </div>

              <div className="flex items-start gap-4 text-sm pt-4 border-t border-white/10">
                <MapPin className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-brand-muted uppercase block">
                    HISTORIC ATELIER ROOTS
                  </span>
                  <span className="text-brand-muted text-xs leading-relaxed">
                    Aarzee Store Parfumerie, Kannauj Fragrance Quarter, Uttar Pradesh 209725, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Message Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0a0a0a] border border-white/10 shadow-2xl">
              <h3 className="font-serif text-2xl text-white mb-2">Send an Olfactory Inquiry</h3>
              <p className="text-brand-muted text-xs mb-8">
                We respond to all bespoke requests within one business day.
              </p>

              {isSent ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-brand-red/15 border border-brand-red text-brand-red flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif text-2xl text-white">Inquiry Received</h4>
                  <p className="text-xs text-brand-muted max-w-sm mx-auto leading-relaxed">
                    Thank you for connecting with AARZEE STORE. Our head fragrance advisor will reach out to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono tracking-wider text-brand-muted mb-1">
                        YOUR NAME *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Vikramaditya"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-brand-muted/40 focus:outline-none focus:border-brand-red"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono tracking-wider text-brand-muted mb-1">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-brand-muted/40 focus:outline-none focus:border-brand-red"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-wider text-brand-muted mb-1">
                      TOPIC OF INTEREST
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-red font-mono text-xs"
                    >
                      <option value="recommendation">Bespoke Fragrance Recommendation</option>
                      <option value="corporate">Corporate & Wedding Gifting Coffrets</option>
                      <option value="shipping">Order Tracking & Delivery Status</option>
                      <option value="craft">Inquiry on Kannauj Distillation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-wider text-brand-muted mb-1">
                      MESSAGE *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share your olfactory preferences or inquiry details..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-brand-muted/40 focus:outline-none focus:border-brand-red resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-brand-red hover:bg-brand-red-bright text-white uppercase tracking-widest text-xs font-semibold transition-all shadow-red-glow flex items-center justify-center gap-2 group"
                  >
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <span>DISPATCH CONCIERGE MESSAGE</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div id="faq" className="max-w-4xl mx-auto pt-12 border-t border-white/10">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-mono tracking-widest text-brand-gold uppercase block mb-1">
              QUESTIONS &amp; ANSWERS
            </span>
            <h2 className="text-3xl font-serif text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between font-serif text-base text-white hover:text-brand-gold transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-brand-gold" /> : <ChevronDown className="w-4 h-4 text-brand-muted" />}
                  </button>
                  {isOpen && (
                    <div className="p-6 pt-0 text-sm text-brand-muted leading-relaxed border-t border-white/5 font-light">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

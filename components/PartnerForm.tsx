'use client'

import { useState } from 'react'

export default function PartnerForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="form-success visible" role="alert">
        <p>&#10003; &nbsp;Thanks for reaching out! Our partnerships team will review your inquiry and be in touch within 3 business days.</p>
      </div>
    )
  }

  return (
    <form className="partner-inquiry-form" noValidate onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="company-name">Company Name</label>
        <input type="text" id="company-name" className="form-input" placeholder="e.g. Acme Hospitality Solutions" required />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="contact-name">Contact Name</label>
        <input type="text" id="contact-name" className="form-input" placeholder="Your full name" required />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="contact-email">Email Address</label>
        <input type="email" id="contact-email" className="form-input" placeholder="you@company.com" required />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="partner-category">Category</label>
        <select id="partner-category" className="form-select">
          <option value="">Select a category</option>
          <option>POS &amp; Technology</option>
          <option>Staffing &amp; Recruitment</option>
          <option>Food &amp; Beverage Supply</option>
          <option>Linen &amp; Laundry</option>
          <option>Scheduling &amp; HR Software</option>
          <option>Training &amp; Consulting</option>
          <option>Marketing &amp; Reputation</option>
          <option>Other</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="partner-message">Tell Us About Your Product or Service</label>
        <textarea id="partner-message" className="form-textarea" placeholder="Briefly describe what you offer and why it would be valuable to Guild members..."></textarea>
      </div>
      <button type="submit" className="btn btn--primary" style={{ width: '100%' }}>Submit Partner Inquiry</button>
    </form>
  )
}

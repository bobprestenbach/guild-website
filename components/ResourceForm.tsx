'use client'

import { useState } from 'react'

export default function ResourceForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="form-success visible" role="alert">
        <p>&#10003; &nbsp;You&apos;re all set! Check your inbox — your checklist is on its way.</p>
      </div>
    )
  }

  return (
    <form className="resource-teaser__form resource-form" noValidate onSubmit={handleSubmit}>
      <input type="text" className="form-input" placeholder="Your name" required aria-label="Your name" />
      <input type="email" className="form-input" placeholder="Your email address" required aria-label="Your email address" />
      <button type="submit" className="btn btn--primary">Send Me the Checklist</button>
    </form>
  )
}

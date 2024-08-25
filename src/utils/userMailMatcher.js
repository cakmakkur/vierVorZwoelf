

export default function userMailMatcher(email) {

  const KURSAT_EMAIL = process.env.KURSAT_EMAIL

  if (email === KURSAT_EMAIL) return "Kürsat"
  return
}
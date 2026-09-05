export function isConfiguredUrl(url?: string | null): url is string {
  return Boolean(url && url.trim())
}

export function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) {
    return `${digits.slice(0, 5)} ${digits.slice(5)}`
  }
  return phone
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/\s/g, '')}`
}

export function mailtoHref(email: string) {
  return `mailto:${email}`
}

function validateRule(value: any, rule: any): string | null {
  const empty = value === undefined || value === null || value === ''
  const stringValue = String(value ?? '')

  switch (rule.type) {
    case 'required':
      return empty ? (rule.message ?? 'This field is required.') : null
    case 'email':
      return !empty && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stringValue)
        ? (rule.message ?? 'Enter a valid email address.')
        : null
    case 'minLength':
      return !empty && stringValue.length < Number(rule.value)
        ? (rule.message ?? `Enter at least ${rule.value} characters.`)
        : null
    case 'pattern':
      return !empty && !new RegExp(String(rule.value)).test(stringValue)
        ? (rule.message ?? 'Invalid format.')
        : null
    
    default:
      return null
  }
}

export function validateField(
  field: any,
  values: any
) {


  for (const rule of field.validation ?? []) {
    const error = validateRule(values[field.name], rule)
    if (error) return error
  }

  return null
}

export function validateStep(
  visibleFields: any,
  values: any
) {
  const errors: any = {}

  for (const field of visibleFields) {
    const error = validateField(field, values)
    if (error) errors[field.name] = error
  }

  return errors
}
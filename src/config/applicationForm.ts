const applicationForm: any = {
  id: 'loan-application',
  title: 'Loan Application',
  description: 'Complete the following steps to submit your application.',
  steps: [
    {
      id: 'personal',
      title: 'Personal details',
      description: 'Tell us a little about yourself.',
      fields: [
        {
          name: 'fullName',
          label: 'Full name',
          type: 'text',
          placeholder: 'Enter your full name',
          required: true,
          validation: [
            { type: 'required', message: 'Full name is required.' },
            { type: 'minLength', value: 3, message: 'Name must contain at least 3 characters.' }
          ]
        },
        {
          name: 'email',
          label: 'Email address',
          type: 'email',
          placeholder: 'you@example.com',
          validation: [
            { type: 'required' },
            { type: 'email', message: 'Enter a valid email address.' }
          ]
        },
        {
          name: 'phone',
          label: 'Phone number',
          type: 'tel',
          placeholder: '10-digit phone number',
          validation: [
            { type: 'required' },
            { type: 'pattern', value: '^[0-9]{10}$', message: 'Enter a valid 10-digit phone number.' }
          ]
        },
        {
          name: 'dateOfBirth',
          label: 'Date of birth',
          type: 'date',
          validation: [{ type: 'required' }]
        },
      ]
    },
    {
      id: 'address',
      title: 'Address details',
      description: 'Where do you currently live?',
      fields: [
        {
          name: 'country',
          label: 'Country',
          type: 'select',
          placeholder: 'Select a country',
          options: [
            { label: 'India', value: 'IN' },
            { label: 'United States', value: 'US' }
          ],
          validation: [{ type: 'required' }]
        },
        {
          name: 'state',
          label: 'State',
          type: 'select',
          placeholder: 'Select a state',
          dependsOn: 'country',
          options: [
            { label: 'Karnataka', value: 'Karnataka' },
            { label: 'West Bengal', value: 'West Bengal' },
            { label: 'Maharashtra', value: 'Maharashtra' },
            { label: 'Tamil Nadu', value: 'Tamil Nadu' }
          ],
          validation: [{ type: 'required' }]
        },
        {
          name: 'city',
          label: 'City',
          type: 'text',
          placeholder: 'Enter your city',
          validation: [{ type: 'required' }]
        },
        {
          name: 'pincode',
          label: 'PIN / ZIP code',
          type: 'text',
          placeholder: 'Enter PIN or ZIP code',
          validation: [
            { type: 'required' },
            { type: 'pattern', value: '^[0-9A-Za-z -]{4,10}$', message: 'Enter a valid PIN or ZIP code.' }
          ]
        }
      ]
    },
    {
      id: 'professional',
      title: 'Professional details',
      description: 'Share your current employment details.',
      fields: [
        {
          name: 'employmentType',
          label: 'Employment type',
          type: 'radio',
          options: [
            { label: 'Salaried', value: 'salaried' },
            { label: 'Self-employed', value: 'self-employed' },
            { label: 'Student', value: 'student' }
          ],
          validation: [{ type: 'required' }]
        },
        {
          name: 'company',
          label: 'Company name',
          type: 'text',
          placeholder: 'Enter company name',
          showIf: { field: 'employmentType', equals: 'salaried' },
          validation: [{ type: 'required' }]
        },
        {
          name: 'businessName',
          label: 'Business name',
          type: 'text',
          placeholder: 'Enter business name',
          showIf: { field: 'employmentType', equals: 'self-employed' },
          validation: [{ type: 'required' }]
        },
        {
          name: 'experience',
          label: 'Total experience (years)',
          type: 'number',
          placeholder: 'e.g. 5',
          showIf: { field: 'employmentType', notEquals: 'student' },
          validation: [
            { type: 'required' },
            { type: 'min', value: 0, message: 'Experience cannot be negative.' },
            { type: 'max', value: 60, message: 'Enter a value below 60.' }
          ]
        },
        {
          name: 'monthlyIncome',
          label: 'Monthly income (₹)',
          type: 'number',
          placeholder: 'e.g. 75000',
          showIf: { field: 'employmentType', notEquals: 'student' },
          validation: [
            { type: 'required' },
            { type: 'min', value: 1, message: 'Income must be greater than zero.' }
          ]
        }
      ]
    },
    {
      id: 'review',
      title: 'Review your application',
      description: 'Check your details before submitting.',
      type: 'review',
      fields: []
    }
  ]
}

export default applicationForm

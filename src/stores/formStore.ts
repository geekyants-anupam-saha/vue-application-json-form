import applicationForm from '@/config/applicationForm'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useFormStore = defineStore('form', () => {
  const formData = ref<any>({})
  const currentStepId = ref('personal')
  const submitted = ref(false)

  const currentStepIndex = ref(0)

  const setField = (name: string, value: unknown) => {
    formData.value[name] = value
  }

  const saveProgress = (userData: any, stepId: string) => {
    formData.value[stepId] = userData;
  }

  const isFirstStep = computed(() => currentStepIndex.value === 0)

  const isLastStep = computed(() =>
    currentStepIndex.value === applicationForm.steps.length - 1
  )

  const nextStep = () => {
    if (isLastStep.value) {
      return
    }

    currentStepIndex.value += 1;
    currentStepId.value =
      applicationForm.steps[currentStepIndex.value].id
  }

  const previousStep = () => {
    if (isFirstStep.value) return

    currentStepIndex.value -= 1

    currentStepId.value =
      applicationForm.steps[currentStepIndex.value].id
  }

  const resetForm = () => {
    formData.value = {};
    currentStepId.value = 'personal';
    currentStepIndex.value = 0;
    submitted.value = false;
  }



  return {
    setField,
    currentStepId,
    saveProgress,
    nextStep,
    previousStep,
    isFirstStep,
    isLastStep,
    submitted,
    resetForm,
    formData
  }
})

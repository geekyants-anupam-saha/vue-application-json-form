<script setup>
import { useFormStore } from '../stores/formStore';
import applicationFormJson from '../config/applicationForm';
import DynamicField from '../components/DynamicField.vue';
import { ref, computed, watch, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { validateStep } from '../composables/useFormValidation';

const store = useFormStore()

const formValues = ref({});

const errors = reactive({});


const { currentStepId, isFirstStep, isLastStep, submitted } = storeToRefs(store);

const formDataObj = computed(() =>
    applicationFormJson.steps.find(
        (step) => step.id === currentStepId.value
    )
);

watch(
    currentStepId,
    (newStepId) => {
        const step = applicationFormJson.steps.find(
            (step) => step.id === newStepId
        );

        formValues.value = Object.fromEntries(
            step.fields.map((field) => [
                field.name,
                store.formData[newStepId]?.[field.name] ?? ''
            ])
        );
    },
    { immediate: true }
);

function clearErrors() {
    Object.keys(errors).forEach(key => delete errors[key])
}

const saveApplicationData = () => {
    clearErrors();
    const errorobj = validateStep(formDataObj.value, { ...formValues.value });
    console.log('errorobj', errorobj);
    Object.assign(errors, errorobj);

    if (Object.keys(errorobj).length > 0) {
        return;
    }
    store.saveProgress({ ...formValues.value }, currentStepId.value);
    store.nextStep();
};

function startNewApplication() {
    store.resetForm();
    clearErrors();
}

const reviewSteps = computed(() => applicationFormJson.steps?.filter((step) => step.id !== 'review'));

</script>


<template>
    <div class="form-layout">
        <!-- Left section -->
        <div class="side-section"></div>

        <!-- Middle section -->
        <div v-if="submitted" class="form-content success-content">

            <div class="success-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                </svg>
            </div>

            <span class="success-tag">SUBMISSION SUCCESSFUL</span>

            <h2>Thank You!</h2>

            <p class="success-message">
                Your application has been submitted successfully.
                We appreciate your time and will get back to you soon.
            </p>

            <div class="success-divider"></div>

            <p class="success-footer">
                Your application is now complete.
            </p>

            <button class="success-button" @click="startNewApplication">
                <span>Start a new application</span>
                <span>→</span>
            </button>

        </div>

        <div v-else class="form-content">
            <h1>{{ formDataObj.title }}</h1>
            <p>{{ formDataObj.description }}</p>

            <div v-if="currentStepId === 'review'" class="review-container">

                <div v-for="(step, index) in reviewSteps" :key="step.id" class="review-card">
                    <div class="review-header">
                        <div class="step-number">{{ index + 1 }}</div>
                        <h3>{{ step.title }}</h3>
                    </div>

                    <div class="review-fields">
                        <div v-for="field in step.fields" :key="field.name" class="review-field">
                            <span class="review-label">
                                {{ field.label }}
                            </span>

                            <span class="review-value">
                                {{ store.formData?.[step.id]?.[field.name] || 'Not provided' }}
                            </span>
                        </div>
                    </div>
                </div>

            </div>

            <div v-else class="fields-container">
                <div v-for="field in formDataObj.fields" :key="field.name" class="field-wrapper">
                    <DynamicField :field="field" v-model="formValues[field.name]" :error="errors[field.name]" />
                </div>
            </div>

            <div class="form-actions">
                <button v-if="!isFirstStep && !submitted" @click="store.previousStep">
                    Previous
                </button>

                <button v-if="isLastStep" @click="store.submitted = true">
                    Submit
                </button>

                <button v-else @click="saveApplicationData">
                    Save and next
                </button>
            </div>
        </div>

        <!-- Right section -->
        <div class="side-section"></div>
    </div>
</template>

<style scoped>
.form-layout {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    min-height: 100vh;
    width: 100%;
    background: #f8fafc;
}

.side-section {
    width: 100%;
}

.form-content {
    width: 100%;
    max-width: 550px;
    justify-self: center;
    align-self: center;
    padding: 35px;
    box-sizing: border-box;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.form-content h1 {
    font-size: 26px;
    margin-bottom: 10px;
    color: #1e293b;
}

.form-content p {
    color: #64748b;
    margin-bottom: 25px;
}

.fields-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.field-wrapper {
    width: 100%;
}

.form-actions {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-top: 35px;
}

.form-actions button {
    padding: 11px 22px;
    border: none;
    border-radius: 6px;
    background: #4f46e5;
    color: white;
    cursor: pointer;
    font-size: 14px;
}

.form-actions button:hover {
    background: #4338ca;
}

.success-content {
    text-align: center;
}

/* Responsive layout */
@media (max-width: 768px) {
    .form-layout {
        grid-template-columns: 1fr;
        padding: 20px;
        box-sizing: border-box;
    }

    .side-section {
        display: none;
    }

    .form-content {
        max-width: 550px;
        width: 100%;
        padding: 25px;
    }
}

/********** Review Section Styles ********** */
.review-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 25px;
}

.review-card {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 22px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.review-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #e5e7eb;
}

.review-header h3 {
    margin: 0;
    font-size: 17px;
    font-weight: 600;
    color: #1e293b;
}

.step-number {
    width: 30px;
    height: 30px;
    min-width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #eef2ff;
    color: #4f46e5;
    font-size: 14px;
    font-weight: 600;
}

.review-fields {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
}

.review-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.review-label {
    font-size: 13px;
    color: #64748b;
    font-weight: 500;
}

.review-value {
    font-size: 15px;
    color: #1e293b;
    font-weight: 600;
    overflow-wrap: anywhere;
}

/* Mobile responsive */
@media (max-width: 600px) {
    .review-fields {
        grid-template-columns: 1fr;
    }

    .review-card {
        padding: 16px;
    }
}

/** Success Section Styles */

.success-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 45px 35px;
}

.success-icon {
    width: 85px;
    height: 85px;
    border-radius: 50%;
    background: #dcfce7;
    color: #16a34a;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 25px;
}

.success-tag {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: #16a34a;
    background: #f0fdf4;
    padding: 8px 14px;
    border-radius: 20px;
    margin-bottom: 15px;
}

.success-content h2 {
    font-size: 30px;
    color: #1e293b;
    margin: 0 0 12px;
}

.success-message {
    font-size: 15px;
    line-height: 1.7;
    color: #64748b;
    max-width: 350px;
    margin: 0;
}

.success-divider {
    width: 100%;
    height: 1px;
    background: #e5e7eb;
    margin: 25px 0 18px;
}

.success-footer {
    font-size: 13px;
    color: #64748b;
    margin: 0 0 25px;
}

.success-button {
    width: 100%;
    padding: 14px 20px;
    background: #4f46e5;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background 0.2s ease;
}

.success-button:hover {
    background: #4338ca;
}
</style>

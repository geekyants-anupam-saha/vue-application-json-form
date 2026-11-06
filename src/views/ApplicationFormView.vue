<script setup>
import { useFormStore } from '../stores/formStore';
import applicationFormJson from '../config/applicationForm';
import DynamicField from '../components/DynamicField.vue';
import { ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';

const store = useFormStore()

const formValues = ref({});


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

const saveApplicationData = () => {
    store.saveProgress({ ...formValues.value }, currentStepId.value);
    store.nextStep();
};

function startNewApplication() {
    store.resetForm();
}

</script>


<template>
    <div v-if="submitted">
        <h2>APPLICATION COMPLETE</h2>
        <h3>Thank you!</h3>
        <p>Your application has been submitted successfully in this demo.</p>
        <button @click="startNewApplication">
            Start a new application
        </button>
    </div>
    <div v-else style="margin-left: 100px;">
        <h1>{{ formDataObj.title }}</h1>
        <p>{{ formDataObj.description }}</p>

        <div v-if="currentStepId === 'review'">
            <div v-for="step in applicationFormJson.steps">
                <h3>{{ step.title }}</h3>
                <ul>
                    <li v-for="field in step.fields" :key="field.name">
                        <strong>{{ field.label }}:</strong>
                        {{ store.formData?.[step.id]?.[field.name] }}
                    </li>
                </ul>
            </div>
        </div>
        <div style="margin-top: 20px;" v-else v-for="form in formDataObj.fields" :key="form.id">
            <DynamicField :field="form" v-model="formValues[form.name]" />
        </div>

        <div style="margin-top: 60px;">
            <button v-if="!isFirstStep && !submitted" @click="store.previousStep">Previous</button>
            <button v-if="isLastStep" @click="store.submitted = true">Submit</button>
            <button v-else @click="saveApplicationData">Save and next</button>
        </div>
    </div>
</template>

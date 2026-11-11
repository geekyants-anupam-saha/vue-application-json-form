<script setup>
import { computed, defineProps, defineModel } from 'vue';

const props = defineProps({
    field: {
        type: Object,
        required: true
    },
    error: {
        type: String,
        required: false
    },
    formValues: {
        type: Object,
        required: false
    }
})
const model = defineModel();

const options = computed(() => {
    const { dependsOn, options } = props.field;
    if (dependsOn) {
        const dependsOnValue = props.formValues[dependsOn];
        const filteredOptions = options.filter((option) => option.type === dependsOnValue)
        return filteredOptions;
    }
    return options ?? [];
})
</script>

<template>
    <!-- Input Fields -->
    <div v-if="['text', 'email', 'number', 'date', 'tel'].includes(field.type)">
        <label :for="field.id">{{ field.label }}</label>
        <input :id="field.id" :type="field.type" :required="field.required" :placeholder="field.placeholder"
            v-model="model" :class="{ 'input-error': error }" />
    </div>

    <!-- Select Field -->
    <div v-if="field.type === 'select'">
        <label :for="field.id">{{ field.label }}</label>
        <select :id="field.id" :required="field.required" v-model="model" class="form-select">
            <option value="" disabled>{{ field.placeholder ?? 'Select an option' }}</option>
            <option :value="option.value" v-for="option in options" :key="option.value">
                {{ option.label }}
            </option>
        </select>
    </div>

    <!-- Radio Buttons -->
    <div v-if="field.type === 'radio'" class="radio-group">
        <label v-for="option in field.options" :key="option.value" class="radio-option"
            :class="{ 'radio-selected': model === option.value }">
            <input v-model="model" type="radio" :name="field.name" :value="option.value" />

            <span class="radio-custom"></span>
            <span class="radio-label">{{ option.label }}</span>
        </label>
    </div>
    <span v-if="error" style="color: red;">{{ error }}</span>

</template>

<style scoped>
/* Input */
input {
    width: 100%;
    padding: 12px 14px;
    font-size: 15px;
    font-family: inherit;
    color: #333;
    background-color: #fff;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    outline: none;
    box-sizing: border-box;
    transition: all 0.2s ease;
}

input::placeholder {
    color: #9ca3af;
}

input:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
}

input.input-error {
    border-color: #ef4444;
}

input.input-error:focus {
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12);
}

/* Select */
.form-select {
    width: 100%;
    padding: 12px 40px 12px 14px;
    font-size: 15px;
    font-family: inherit;
    color: #333;
    background-color: #fff;

    border: 1px solid #d1d5db;
    border-radius: 8px;

    outline: none;
    box-sizing: border-box;

    cursor: pointer;
    appearance: none;

    /* Custom dropdown arrow */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");

    background-repeat: no-repeat;
    background-position: right 12px center;

    transition: all 0.2s ease;
}

.form-select:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
}

.form-select:hover {
    border-color: #a5b4fc;
}

.form-select option:disabled {
    color: #9ca3af;
}

.form-select.input-error {
    border-color: #ef4444;
}

.form-select.input-error:focus {
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12);
}

/* Radio Buttons */
.radio-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
}

.radio-option {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    background: #fff;
    cursor: pointer;
    transition: all 0.2s ease;
}

/* Hide default radio */
.radio-option input {
    display: none;
}

/* Custom radio circle */
.radio-custom {
    width: 18px;
    height: 18px;
    min-width: 18px;
    border: 2px solid #9ca3af;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

/* Selected radio */
.radio-selected {
    border-color: #6366f1;
    background: #f5f3ff;
}

.radio-selected .radio-custom {
    border-color: #6366f1;
}

/* Inner selected circle */
.radio-selected .radio-custom::after {
    content: '';
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #6366f1;
}

.radio-label {
    font-size: 15px;
    color: #374151;
}

/* Hover */
.radio-option:hover {
    border-color: #818cf8;
}
</style>
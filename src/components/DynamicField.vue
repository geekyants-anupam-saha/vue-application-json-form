<script setup>
const props = defineProps({
    field: {
        type: Object,
        required: true
    },
    value: {
        required: true
    }
})
const model = defineModel();
</script>

<template>
    <div v-if="field.type === 'text' || field.type === 'email' || field.type === 'number' || field.type === 'date'">
        <label :for="field.id">{{ field.label }}</label>
        <input :id="field.id" :type="field.type" :required="field.required" :placeholder="field.placeholder"
            v-model="model" />
    </div>

    <div v-if="field.type === 'select'">
        <label :for="field.id">{{ field.label }}</label>
        <select :id="field.id" :required="field.required" v-model="model">
            <option :value="option.value" v-for="option in field.options" :key="option.value">
                {{ option.label }}
            </option>
        </select>
    </div>

    <div v-if="field.type === 'radio'">
        <label v-for="option in field.options" :key="option.value">
            <input v-model="model" type="radio" :name="field.name" :value="option.value" />
            <span>{{ option.label }}</span>
        </label>
    </div>

</template>
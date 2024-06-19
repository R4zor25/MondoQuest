<!-- src/components/InputField.vue -->
<template>
    <div class="input-container">
      <label :for="id" class="input-label">{{ label }}</label>
      <input
        :id="id"
        type="text"
        class="input-field"
        :placeholder="placeholder"
        v-model="inputValue"
        @input="updateValue"
      />
    </div>
  </template>
  
  <script>
  export default {
    name: 'InputField',
    props: {
      id: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      placeholder: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        inputValue: ''
      };
    },
    methods: {
      updateValue(event) {
        this.$emit('input', event.target.value);
      }
    }
  };
  </script>
  
  <style scoped>
  .input-container {
    margin-bottom: 20px;
  }
  
  .input-label {
    display: block;
    margin-bottom: 5px;
    color: #ccc;
    font-size: 1.2em;
  }
  
  .input-field {
    width: 100%;
    padding: 10px;
    border: 1px solid #444;
    border-radius: 5px;
    background-color: #222;
    color: #fff;
    font-size: 1em;
  }
  
  .input-field::placeholder {
    color: #888;
  }
  
  .input-field:focus {
    outline: none;
    border-color: #555;
    background-color: #333;
  }
  </style>
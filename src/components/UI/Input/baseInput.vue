<script setup lang="ts">
import { ref, onMounted } from "vue";
const props = defineProps(["modelValue", 'regex', 'successMsg', 'errorMsg','labelName','InputType']);
const emit = defineEmits(["update:modelValue","InputValues"]);
const val = ref<string>('')
const Message = ref<string>('')
const validate = ref<boolean>(false)
const eventValue = ref<any>(null)
onMounted(()=>{
    
})
   
function emitInput(event: any){
    emit('update:modelValue', event.target.value)
    const regex = props.regex
    val.value = event.target.value
    if (val.value === "") {
        Message.value = 'this field reqired'
    }
    else if (regex.test(val.value)) {
        emit('InputValues', true)
        validate.value = true
        Message.value = props.successMsg
    }
    else {
        emit('InputValues', false)
        validate.value = false
        Message.value = props.errorMsg
    }
}
</script>
<template>
    <div class="input-container mt-5 mb-5">
        <input ref="email" id="firstname" :value="modelValue" @input="emitInput" class="input"
            :style="val != '' ? (validate ? 'border:2px solid green' : 'border:2px solid red') : Message = ''"
            :type="InputType" placeholder=" " />
        <div class="cut"></div>
        <label for="firstname" class="placeholder">{{labelName}}</label>
        <p ref="labelEmail" :style="validate ? 'color:green' : 'color:red'" class="text-xs z-50 absolute">{{ Message }}</p>
    </div>
</template>
<style scoped>
.input-container {
    height: 50px;
    position: relative;
    width: 100%;
}
.input {
    background-color: white;
    border-radius: 8px;
    border: 2px solid #ededed;
    box-sizing: border-box;
    color: black;
    font-size: 18px;
    height: 100%;
    outline: 0;
    padding: 4px 20px 0;
    width: 100%;
}

.cut {
    background-color: white;
    border-radius: 10px;
    height: 20px;
    left: 20px;
    position: absolute;
    top: -20px;
    transform: translateY(0);
    transition: transform 200ms;
    width: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
}


.input:focus~.cut,
.input:not(:placeholder-shown)~.cut {
    transform: translateY(8px);
}

.placeholder {
    color: black;
    font-family: sans-serif;
    left: 20px;
    line-height: 14px;
    pointer-events: none;
    position: absolute;
    transform-origin: 0 50%;
    transition: transform 200ms, color 200ms;
    top: 20px;
}

.input:focus~.placeholder,
.input:not(:placeholder-shown)~.placeholder {
    transform: translateY(-30px) translateX(10px) scale(0.75);
}

.input:not(:placeholder-shown)~.placeholder {
    color: black;
}

.input:focus~.placeholder {
    color: black
}
</style>
<script setup lang="ts">
import {ref, watch,onMounted,reactive } from 'vue';
import { useRouter } from 'vue-router'
import baseInput from './baseInput.vue';
import axios from "axios"
import { useItems,useKurs } from "../../././../store/index"
const store = useItems()
const storeTitle = useKurs()
const  router = useRouter()
const  disabled = ref<boolean>(false)
const  fullName = ref<boolean>(false)
const  phone = ref<boolean>(false)
const  pasportNUmber = ref<boolean>(false)
const  Pinfl = ref<boolean>(false)
const  studentDate = ref<boolean>(false)
const  selectValue = ref<string>("kurs1")
const selectDate = ref<boolean>(true)
const  formInput =  reactive<any>(
    {
      Input:{
        fullName: null,
        phone: null,
        pasportNUmber: null,
        Pinfl: null,
        birthday: "",
        }
    })
onMounted(() => {
      if (!!localStorage.getItem('inputForm')) {
        let res = localStorage.getItem('inputForm')
         formInput.Input = JSON.parse(`${res}`)
      } 
    if (store.Item.length!=0){
        formInput.Input = store.Item   
        selectDate.value = false
    }
})
async function Submited(){
    try {
   if(formInput.Input.id){
    await axios.patch(`http://localhost:3000/${storeTitle.kurs}/${formInput.Input.id}`,{
        "fullName": formInput.Input.fullName,
        "phone": formInput.Input.phone,
        "pasportNUmber": formInput.Input.pasportNUmber,
        "Pinfl": formInput.Input.Pinfl,
        "birthday": formInput.Input.birthday,
     })
     store.Items([])
     selectDate.value = true
   }
   else{
     await axios.post(`http://localhost:3000/${selectValue.value}`,{
        "fullName": formInput.Input.fullName,
        "phone": formInput.Input.phone,
        "pasportNUmber": formInput.Input.pasportNUmber,
        "Pinfl": formInput.Input.Pinfl,
        "birthday": formInput.Input.birthday,
     })
   }
    router.push({name: "table"})
    } catch (error) {
       console.log(error, "error"); 
    }finally{
        let List ={
            fullName: "",
            phone: "",
            pasportNUmber: "",
            Pinfl: "",
            birthday: ""
        }
         formInput.Input = List;
         localStorage.removeItem('inputForm')
    }
}

function focusTel() {
    if (formInput.Input.phone == "") {
        formInput.Input.phone = "+998"
    }
    else{  
    }
    }
watch(formInput,()=>{
    localStorage.setItem("inputForm", JSON.stringify(formInput.Input))
    if (store.Item.length==0){
            if ((fullName.value && phone.value &&  pasportNUmber.value && Pinfl.value && studentDate.value) ||(store.Item.length > 0)){
                    disabled.value = true 
                }
            else{
                    disabled.value = false
                }
        }
        else{
            disabled.value = true 
        }
    
})
function ValuefullName(val:boolean) {
    fullName.value = val
}
function Valuephone(val:boolean) {
    phone.value = val
}
function ValuepasportNUmber(val:boolean) {
    pasportNUmber.value = val
}
function ValuePinfl(val:boolean) {
    Pinfl.value = val
}
function ValueDate(val:boolean) {
    studentDate.value = val
}
function selectItem(val:any) {
    if (val.target.value == "Kusdi belgilang") {
        selectValue.value = "kurs1"
    }
    selectValue.value = val.target.value
}
</script>
<template>
    <div class="bg-white ">
        <div>
            <form action="" class="w-full " @submit.prevent="Submited">
               <div class="md:flex justify-between md:flex-wrap">
                <div class="md:w-[45%] f-full mx-6">
                    <baseInput @InputValues="ValuefullName" v-model="formInput.Input.fullName" :regex="/([a-zA-Z]{3,30}\s*)+/"
                    success-msg="All is good" InputType="text" error-msg="text must be Full name"
                    label-name="Full name"></baseInput>
                </div>
                <div  class="md:w-[45%] f-full mx-6">
                <baseInput @InputValues="Valuephone" @click="focusTel" 
                InputType="text" v-model="formInput.Input.phone" :regex="/^[+]?998[012345789][0-9]{8}$/"
                    success-msg="All is good" error-msg="text must be Uzb Phone"
                    label-name="Phone Number"></baseInput>
                </div>
                <div  class="md:w-[45%] f-full mx-6">
                <baseInput @InputValues="ValuepasportNUmber" v-model="formInput.Input.pasportNUmber" InputType="text" :regex="/^(?!^0+$)[A-Z0-9]{9}$/"
                    success-msg="All is good" error-msg="text must be pasport"
                    label-name="Paspord"></baseInput>
                </div>
                <div  class="md:w-[45%] f-full mx-6">
                <baseInput @InputValues="ValuePinfl" v-model="formInput.Input.Pinfl" InputType="text" :regex="/^(?!^0+$)[0-9]{14}$/"
                    success-msg="All is good" error-msg="text must be pasport"
                    label-name="Paspord"></baseInput>
                </div>
                <div  class="md:w-[45%] f-full mx-6">
                <baseInput @InputValues="ValueDate" v-model="formInput.Input.birthday" 
                    :regex="/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/"
                    success-msg="All is good" InputType="date" error-msg="text must be date"
                    label-name="date"></baseInput>
                </div>
                <div v-if="selectDate" class="md:w-[45%] f-full mx-6 mt-5">
                    <select @click="selectItem($event)" id="countries" class=" border h-12
                     border-gray-300 text-gray-900 text-sm rounded-lg
                      focus:border-cyan-500 block w-full p-2.5">
                    <option selected>Kusdi belgilang</option>
                    <option value="Kurs1">Kurs_1</option>
                    <option value="Kurs2">Kurs_2</option>
                    <option value="Kurs3">Kurs_3</option>
                    <option value="Kurs4">Kurs_4</option>
                    </select>
                </div>
               </div>
                <div>
                    <button :disabled="!disabled" type="submit" 
                       :class="{'bg-[#002F5F]': disabled,'bg-[#6b6d6f]': !disabled }" 
                         class=" text-white rounded-lg py-[12px] px-[30px] mx-6 mt-3">Send
                        message</button>
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>
.input-container {
    height: 50px;
    position: relative;
    width: 100%;
}
.ic1 {
    margin-top: 20px;
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
.input:focus {
    border: 2px solid cyan;
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
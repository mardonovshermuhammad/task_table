<script setup lang="ts">
 import baseInput from "@/components/UI/Input/baseInput.vue"
import axios from "axios";
import { useRouter } from 'vue-router'
import { ref,reactive } from "vue";
const  router = useRouter()
const Name = ref<boolean>(false)
const Password = ref<boolean>(false)
 const loginValue = reactive<any>({
    Input:{
        name: "",
        password: null,
    }
    })
 function ValuefullName(val:boolean) {
    Name.value = val;
 }
 function ValuePassword(val:boolean) {
    Password.value = val;
 }
 async function submitLogin() {
    if (loginValue.Input.name == "admin" && loginValue.Input.password == '12345678'){
      try {
        console.log(loginValue.Input);
        const res = await axios.get('http://localhost:3000/autifikatsiya')
        localStorage.setItem("access",res.data.token)
        router.push({name:'home'})
      } catch (error){
        
      }
    }
    else{
        alert("login yoki parol noto`g`ri")
    }
 }
</script>
<template>
    <div class=" w-full h-[100vh] flex justify-center items-center">
<div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800
           dark:border-gray-700">
    <form class="space-y-6" @submit.prevent="submitLogin">
        <div class=" f-full mx-6">
            <baseInput @InputValues="ValuefullName" v-model="loginValue.Input.name" :regex="/([a-zA-Z]{3,30}\s*)+/"
            success-msg="All is good" InputType="text" error-msg="text must be Full name"
            label-name="name"></baseInput>
        </div>
        <div  class=" f-full mx-6">
              <baseInput @InputValues="ValuePassword"
                InputType="text" v-model="loginValue.Input.password" :regex="/([0-9]{5,10}\s*)+/"
                    success-msg="All is good" error-msg="text must be Uzb Phone"
                    label-name="password"></baseInput>
        </div>
        <div class="flex items-start">
        </div>
        <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
         focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600
         dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
    </form>
</div>


    </div>
</template>
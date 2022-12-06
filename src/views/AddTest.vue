<script lang="ts" setup>
import axios from "axios";
import { ref,reactive } from "vue"
import DeleteTest from '@/views/DeleteTest.vue'
const selectValue = ref<string>("tur")
const isOpen = ref<boolean>(false)
const EditId = ref<any>(null)
const variants = ref<any[]>([
    {
        variant: "",
        Inputid: "ques1",
        id: 1,
    },
    {
        variant: "",
        Inputid: "ques2",
        id: 2,
    },
    {
        variant: "",
        Inputid: "ques3",
        id: 3,
    },
    {
        variant: "",
        Inputid: "ques4",
        id: 4,
    },
])
const QuestionsValue = ref<string>("")
const AnswerValue = ref<string>("")
const AnswerValue2 = ref<string>("")
const TestObject = reactive<any>({
       question: "",
       answer: "",
       type:"test",
       options:[],
})
const InputObject = reactive<any>({
       question: "",
       answer: "",
       type:"yozma",
        value: ""
})
const checkboxObject = reactive<any>({
    question: "3 chi savol",
      answer: "3 javob",
      answer2: "1 javob",
      type:"checkbox",
      options:[
          { "text": "", "check": false},
          { "text": "", "check": false},
          { "text": "", "check": false},
          { "text": "", "check": false}
      ]
})
function selectItem(val:any) {
    selectValue.value = val.target.value
}
 async function SubmitTest() {
    variants.value.forEach(e => {
        TestObject.options.push(e.variant) 
    });
    TestObject.question = QuestionsValue.value
    TestObject.answer = AnswerValue.value
    try { 
        EditId.value == null ? await axios.post('https://jsonserver-production-2b69.up.railway.app/test',TestObject)
        :await axios.patch(`https://jsonserver-production-2b69.up.railway.app/test/${EditId.value}`,TestObject)
    } catch (error) {
       alert(error);
        
    }finally{
        variants.value.forEach(e => {
        e.variant = ""
    });
     QuestionsValue.value = ""
     AnswerValue.value = ""
    }
}
async function SubmitInput() {
    InputObject.question = QuestionsValue.value
    InputObject.answer = AnswerValue.value
    try { 
       EditId.value == null ? await axios.post('https://jsonserver-production-2b69.up.railway.app/test',InputObject)
       :await axios.patch(`https://jsonserver-production-2b69.up.railway.app/test/${EditId.value}`,InputObject)
    } catch (error) {
        alert(error);
    }finally{
     QuestionsValue.value = ""
     AnswerValue.value = ""
    }
}
async function SubmitCheckbox() {
    variants.value.forEach(e => {  
    checkboxObject.options[e.id-1].text = e.variant
     });
    checkboxObject.question = QuestionsValue.value
    checkboxObject.answer = AnswerValue.value
    checkboxObject.answer2 = AnswerValue2.value
    try { 
        EditId.value == null ? await axios.post('https://jsonserver-production-2b69.up.railway.app/test',checkboxObject)
        : await axios.patch(`https://jsonserver-production-2b69.up.railway.app/test/${EditId.value}`,checkboxObject)
       
    } catch (error) {
       alert(error);
        
    }finally{
        variants.value.forEach(e => {
        e.variant = ""
    });
     QuestionsValue.value = ""
     AnswerValue.value = ""
     AnswerValue2.value = ""
    }
}
async function editItems(data:any){    
    EditId.value = data.id
    if (data.type == "test"){
        selectValue.value = data.type
        QuestionsValue.value = data.question
        AnswerValue.value = data.answer
        var count = 0;
        data.options.forEach((e:string)=>{
            variants.value[count].variant = e;
            count++;
        })
        count = 0;
    }
    if(data.type == "yozma"){
        selectValue.value = "input"
        AnswerValue.value = data.answer
        QuestionsValue.value = data.question
    }
    if(data.type == "yozma"){
        selectValue.value = "input"
        AnswerValue.value = data.answer
        QuestionsValue.value = data.question
    }
    if(data.type == "checkbox"){
        selectValue.value = data.type
        AnswerValue.value = data.answer
        AnswerValue2.value = data.answer2
        QuestionsValue.value = data.question
        var count = 0;
        data.options.forEach((e:any)=>{
            variants.value[count].variant = e.text;
            count++;
        })
        count = 0;
    }
}
</script>
<template>
  <div class="container mx-auto my-6">
    <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 mb-6 w-full group">
        <select @click="selectItem($event)" id="countries" class=" border h-12 mb-10
            border-gray-300 text-gray-900 text-sm rounded-lg
            focus:border-cyan-500 block w-full p-2.5">
            <option value="tur">test turini tanlang</option>
            <option value="test">Test</option>
            <option value="input">Input</option>
            <option value="checkbox">checked</option>
         </select>
    </div>
    <div class="z-40 mb-6 w-full group">
       <DeleteTest @editItems="editItems"></DeleteTest>
    </div>
  </div>
  
    
     <div v-if="selectValue == 'test'">
        <form @submit.prevent="SubmitTest">
            <div class="relative z-0 mb-6 w-full group">
                <input v-model="QuestionsValue" type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Question</label>
            </div>
            <div class="relative z-0 mb-6 w-full group">
                <input v-model="AnswerValue" type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">answer</label>
        </div>
        <div>
            <div>
            <div id="dropdown" class="relative">
            <div class="flex justify-center w-full">
                <div  @click="isOpen = true" class="w-64 cursor-pointer text-center items-center px-6  py-2 font-semibold text-white bg-gray-800
                rounded-lg hover:bg-gray-700 focus:outline-none focus:shadow-outline active:bg-gray-900">
                <p
                class="">
            variantlar
            </p>
            </div>
            </div>
            <div v-if="isOpen" @click="isOpen = false" class="fixed inset-0" tabindex="-1"></div>

            <transition 
                enter-class="opacity-0 transform scale-90 transition-all"
                enter-active-class="transition ease-out duration-75"
                enter-to-class="opacity-100 transform scale-100"
                leave-class="opacity-100 transform scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-to-class="opacity-0 transform scale-90">
                
                <div v-if="isOpen" class="absolute mt-3 w-full text-left z-75 transform origin-top-right">
                <div class="w-full bg-white rounded-lg shadow-lg p-5">
                    <div v-for="(item, i) in variants" class="relative z-0 mb-6 w-full group">
                        <input type="text" v-model="item.variant" name="floating_first_name" :id="item.Inputid" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label :for="item.Inputid" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Variant {{(i+1)}}</label>
                    </div>
                </div>
                </div>
            </transition>
            </div>
        </div>
        </div>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
     </div>
     <div v-if="selectValue == 'input'">
        <form @submit.prevent="SubmitInput">
            <div class="relative z-0 mb-6 w-full group">
                <input v-model="QuestionsValue" type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Question</label>
            </div>
            <div class="relative z-0 mb-6 w-full group">
                <input v-model="AnswerValue" type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">answer</label>
        </div>
        <div>
            <div>
        </div>
        </div>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
       
     </div>
     <div class="-z-40" v-if="selectValue == 'checkbox'">
        <form @submit.prevent="SubmitCheckbox">
            <div class="relative z-0 mb-6 w-full group">
                <input v-model="QuestionsValue" type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Question</label>
            </div>
            <div class="relative z-0 mb-6 w-full group">
                <input v-model="AnswerValue" type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">answer</label>
             </div>
             <div class="relative z-0 mb-6 w-full group">
                <input v-model="AnswerValue2" type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">answer 2</label>
             </div>     
        <div>
            <div>
            <div id="dropdown" class="relative">
            <div class="flex justify-center w-full">
                <div  @click="isOpen = true" class="w-64 cursor-pointer text-center items-center px-6  py-2 font-semibold text-white bg-gray-800
                rounded-lg hover:bg-gray-700 focus:outline-none focus:shadow-outline active:bg-gray-900">
                <p
                class="">
            variantlar
            </p>
            </div>
            </div>
            <div v-if="isOpen" @click="isOpen = false" class="fixed inset-0" tabindex="-1"></div>

            <transition 
                enter-class="opacity-0 transform scale-90 transition-all"
                enter-active-class="transition ease-out duration-75"
                enter-to-class="opacity-100 transform scale-100"
                leave-class="opacity-100 transform scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-to-class="opacity-0 transform scale-90">
                <div v-if="isOpen" class="absolute mt-3 w-full text-left z-30 transform origin-top-right">
                <div class="w-full bg-white rounded-lg shadow-lg p-5">
                    <div v-for="(item, i) in variants" class="relative z-0 mb-6 w-full group">
                        <input type="text" v-model="item.variant" name="floating_first_name" :id="item.Inputid" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
                        <label :for="item.Inputid" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Variant {{(i+1)}}</label>
                    </div>
                </div>
                </div>
            </transition>
            </div>

        </div>

        </div>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
     </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch,onMounted } from "vue"
import axios from "axios";
const questions = ref<any[]>([])
const quizComplated = ref<boolean>(false)
const disabled = ref<boolean>(false)
const answerValue = ref<any>('')
const answerValueChec = ref<number>(0)
const checkMassiv = ref<any[]>([])
const checkTrue = ref<boolean>(false)
const QuizValue = ref<number>(1)
const answerAll = ref<number>(0)
onMounted( ()=>{
    DateMassiv() 
})

async function DateMassiv() {
    try {
    const res  = await axios.get(`https://jsonserver-production-2b69.up.railway.app/test`)
    questions.value = res.data
    } catch (error) {
        alert(error)
    }
}
const setAnswer = (id:any) =>{
     const item = document.getElementsByClassName('LabelId')
      answerValue.value =item[id].textContent 
      disabled.value = true 
}
const TypeTextInput = (val:any)=>{
    if (val.target.value !="") {
        disabled.value = true 
    }
    
}
const setAnswerChecked = (val:any)=>{

    const item = document.getElementsByClassName('LabelIdCheck')
       questions.value[QuizValue.value-1].options[val.id].check = val.event.target.checked ;
       const res =questions.value[QuizValue.value-1].options
       answerValueChec.value = 0;
       checkMassiv.value = []
       res.forEach((e:any) => {
         if (e.check){
            answerValueChec.value++;
            checkMassiv.value.push(e.text)
         }
         if (answerValueChec.value > 1){
          disabled.value = true
         } 
         if (checkMassiv.value.includes(questions.value[QuizValue.value-1].answer) && 
         checkMassiv.value.includes(questions.value[QuizValue.value-1].answer2)) {
            checkTrue.value = true;
            
         }
       });
}
async function NextQuestion(){
    disabled.value = false
    if (QuizValue.value < questions.value.length){
        QuizValue.value++;
        if ( (answerValue.value == questions.value[QuizValue.value-2].answer)
            || (questions.value[QuizValue.value-2].value == questions.value[QuizValue.value-2].answer)
            || checkTrue.value){
            answerAll.value++;
        }
        checkTrue.value = false
    }
    else{
        if ( (answerValue.value == questions.value[QuizValue.value-1].answer)
            || (questions.value[QuizValue.value-1].value == questions.value[QuizValue.value-1].answer)
            || checkTrue.value){
                answerAll.value++;
        }
        
        quizComplated.value = true
        QuizValue.value = 1
        checkTrue.value = false
        
    }  
}
function Restart(){
    location.reload();
}
</script>
<template>
    <div>
    <main class="m-12">
      <h1> the quiz</h1>
      <section v-if="!quizComplated">
       <div v-for="(item,i) in questions " :key="i">
        <div v-if="QuizValue-1 == i">
            <div>
                <span>{{ item.question }}</span>
                <span class="ml-3">   score {{ QuizValue }}/{{ questions.length }}</span>
                </div>
               <div v-if="questions[i].type == 'yozma'">
                <input  v-model="questions[i].value" @input="TypeTextInput" class="border-2" type="text">
               </div>
                <div v-if="questions[i].type == 'test'" class="flex flex-col">
                    <label v-for="(option,index) in item.options" :key="index">
                    <input type="radio" class="mr-4"
                        v-model="item.selected"
                        :value="index"
                        @click="setAnswer(index)">
                        <span class="LabelId">{{ option }}</span>
                    </label>
                </div>
                <div v-if="questions[i].type == 'checkbox'" class=" flex flex-col">         
                    <label v-for="(option,index) in item.options" :key="index">
                    <input type="checkbox" class="mr-4"
                      v-model="option.check"
                        @click="setAnswerChecked({ event:$event,id:index})">
                        <span class="LabelIdCheck">{{ option.text }}</span>
                    </label>
                </div>
                <button :disabled="!disabled" class=" mt-3 px-10 py-2 text-white cursor-pointer font-medium rounded-md bg-blue-500 "
                 :class="{'bg-blue-300': !disabled }" @click="NextQuestion">
                 {{ QuizValue == questions.length ? "Finish": "Next quiz" }}
                </button>
        </div>
       </div>
      </section>
      <section v-else>
        <h1> you have finished the quiz</h1>
        <h1>your score is {{ answerAll }}/ {{ questions.length }}</h1>
        <button class=" mt-3 px-10 py-2 cursor-pointer text-white font-medium rounded-md bg-blue-500 "
                 @click="Restart">
                 Restart
                </button>
      </section>
    </main>
    </div>
</template>
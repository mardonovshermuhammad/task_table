<script setup lang="ts">
import { ref, watch } from "vue"
const questions = ref<any[]>([
    {
        question: "1 chi savol",
        answer: '1 javob',
        type:'test',
        options:[
            '1 javob','2 javob','3 javob',
        ],
    },
    {
        question: " 2 chi savol 16x16 ?",
        answer: '256',
        type:'yozma',
        value: "",

    },
    {
        question: "3 chi savol",
        answer: '3 javob',
        answer2: '1 javob',
        type:'checkbox',
        options:[
            { text: '1 javob', check: false},
            { text: '2 javob', check: false},
            { text: '3 javob', check: false},
            { text: '4 javob', check: false},
        ],
    },
    {
        question: "4 chi savol",
        answer: '1 javob',
        type:'test',
        options:[
            '1 javob','2 javob','3 javob','4 javob',
        ],
    },
    {
        question: " 5 chi savol 15x15 ?",
        answer: '225',
        type:'yozma',
        value: "",

    },
    {
        question: "6 chi savol",
        answer: '3 javob',
        answer2: '1 javob',
        type:'checkbox',
        options:[
            { text: '1 javob', check: false},
            { text: '2 javob', check: false},
            { text: '3 javob', check: false},
            { text: '4 javob', check: false},
        ],
    },
    {
        question: "7 chi savol",
        answer: '1 javob',
        type:'test',
        options:[
            '1 javob','2 javob','3 javob',
        ],
    },
    {
        question: " 8 chi savol 20x20 ?",
        answer: '400',
        type:'yozma',
        value: "",

    },
    {
        question: "9 chi savol",
        answer: '3 javob',
        answer2: '1 javob',
        type:'checkbox',
        options:[
            { text: '1 javob', check: false},
            { text: '2 javob', check: false},
            { text: '3 javob', check: false},
            { text: '4 javob', check: false},
        ],
    },
    {
        question: "10 chi savol",
        answer: '1 javob',
        type:'test',
        options:[
            '1 javob','2 javob','3 javob',
        ],
    },
])
watch(questions.value,()=>{
       if (questions.value[QuizValue.value-1].type !="checkbox") {
         disabled.value = true
       }
   
    
})
const quizComplated = ref<boolean>(false)
const disabled = ref<boolean>(false)
const answerValue = ref<any>('')
const answerValueChec = ref<number>(0)
const checkMassiv = ref<any[]>([])
const checkTrue = ref<boolean>(false)
const QuizValue = ref<number>(1)
const answerAll = ref<number>(0)
const setAnswer = (id:any) =>{
     const item = document.getElementsByClassName('LabelId')
      answerValue.value =item[id].textContent  
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
function NextQuestion(){
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
                <input v-model="questions[i].value" class="border-2" type="text">
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
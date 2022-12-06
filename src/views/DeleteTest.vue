<script lang="ts" setup>
import { ref,Ref,onMounted, defineEmits } from "vue"
import axios from "axios";
const emit = defineEmits(['editItems'])
const isOpen = ref<boolean>(false)
    const Items:Ref<any[]> = ref([])
onMounted( ()=> {
    GetItem();
})
async function GetItem(){
    const res =  await axios.get(`https://jsonserver-production-2b69.up.railway.app/test`);
    Items.value = res.data
}
async function Deletes(id: number) {
    try {
       await axios.delete(`https://jsonserver-production-2b69.up.railway.app/test/${id}`);
    } catch (error){
       alert(error)
    }finally{
        GetItem();
    }
}
async function Edits(id:number) {
    try {
        const res = await axios.get(`https://jsonserver-production-2b69.up.railway.app/test/${id}`)
        emit('editItems', res.data)
        isOpen.value = false
    } catch (error){
        alert(error)
    }
    
}
</script>
<template>
     <div>
            <div>
            <div id="dropdown">
            <div class="flex justify-center w-full">
                <div  @click="isOpen = true" class="w-64 cursor-pointer text-center items-center px-6  py-2 font-semibold text-white bg-gray-800
                rounded-lg hover:bg-gray-700 focus:outline-none focus:shadow-outline active:bg-gray-900">
                <p
                class="">
               Test Table
            </p>
            </div>
            </div>
            <div v-if="isOpen" @click="isOpen = false" class="fixed inset-0 z-30 " tabindex="-1"></div>
            <transition 
                enter-class="opacity-0 transform scale-90 transition-all"
                enter-active-class="transition ease-out duration-75"
                enter-to-class="opacity-100 transform scale-100"
                leave-class="opacity-100 transform scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-to-class="opacity-0 transform scale-90">
                <div v-if="isOpen" class="absolute z-30 mt-3 w-full text-left transform left-0">
                <div class="w-full bg-white rounded-lg shadow-lg p-5 h-[80vh] overflow-auto">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="py-3 px-6">
                    Question
                </th>
                <th scope="col" class="py-3 px-6">
                    Answer
                </th>
                <th scope="col" class="py-3 px-6">
                    Test Type
                </th>
                <th scope="col" class="py-3 px-6">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for=" (item,i) in Items" :key="i" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700
                  hover:bg-gray-200">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ item.question }}
                </th>
                <td class="py-4 px-6">
                   {{item.answer}}
                   <div v-if="item.answer2">{{item.answer2}}</div>
                </td>
                <td class="py-4 px-6">
                   {{item.type}}
                </td>
                <td class="py-4 px-6 flex">
                    <img @click="Edits(item.id)"  class="mr-4 w-[18px] cursor-pointer"
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/OOjs_UI_icon_edit-ltr-progressive.svg/1024px-OOjs_UI_icon_edit-ltr-progressive.svg.png"
                      alt="">
                     <img @click.stop="Deletes(item.id)"  class="w-[15px] cursor-pointer z-100 "
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Delete-button.svg/1200px-Delete-button.svg.png"
                      alt="">
                </td>
            </tr>
        </tbody>
    </table>
                </div>
                </div>
            </transition>
            </div>

        </div>

        </div>
</template>
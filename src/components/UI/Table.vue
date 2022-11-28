<script setup lang="ts">
import axios from 'axios';
import { ref,Ref, onMounted} from 'vue'
import { useRouter } from 'vue-router'
import { useItems,useKurs } from "../../store/index"
const store = useItems()
const storeTitle = useKurs()
const router = useRouter()
const selectValue = ref<string>("kurs1")
const Items:Ref<any[]> = ref([])

onMounted( async ()=> {
    getItems(`${selectValue.value}`)
})
async function selectItem(val:any) {
    selectValue.value = val.target.value
    getItems(`${selectValue.value}`)
}
 async function Deletes(id: number) {
    try {
       await axios.delete(`http://localhost:3000/${selectValue.value}/${id}`);
       getItems(`${selectValue.value}`)
    } catch (error){
       alert(error)
    }
}
async function Edits(id:number){
    try {
        const res = await axios.get(`http://localhost:3000/${selectValue.value}/${id}`)
        store.Items(res.data)
        storeTitle.editKurs(selectValue.value)
        router.push({name: 'home'})
    } catch (error){
        alert(error)
    }
}
async function getItems(name:any) {
    const res =  await axios.get(`http://localhost:3000/${name}`);
    Items.value = res.data 
}
</script>
<template>

<div class="md:mx-12 mx-3">
    <div class="  overflow-x-auto relative shadow-md sm:rounded-lg mt-5">
    <div>
        <select @click="selectItem($event)" id="countries" class=" border h-12
            border-gray-300 text-gray-900 text-sm rounded-lg
            focus:border-cyan-500 block w-40 p-2.5">
            <option value="Kurs1">Kurs_1</option>
            <option value="Kurs2">Kurs_2</option>
            <option value="Kurs3">Kurs_3</option>
            <option value="Kurs4">Kurs_4</option>
        </select>
    </div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="py-3 px-6">
                    name
                </th>
                <th scope="col" class="py-3 px-6">
                    phone
                </th>
                <th scope="col" class="py-3 px-6">
                    birthday Date
                </th>
                <th scope="col" class="py-3 px-6">
                    Pinfl
                </th>
                <th scope="col" class="py-3 px-6">
                    passport
                </th>
                <th scope="col" class="py-3 px-6">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for=" (item,i) in Items " :key="i" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700
                  hover:bg-gray-200 cursor-pointer">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ item.fullName }}
                </th>
                <td class="py-4 px-6">
                   {{item.phone}}
                </td>
                <td class="py-4 px-6">
                    {{item.birthday}}
                </td>
                <td class="py-4 px-6">
                   {{item.Pinfl}}
                </td>
                <td class="py-4 px-6">
                   {{item.pasportNUmber}}
                </td>
                <td class="py-4 px-6 flex">
                     <img @click="Edits(item.id)"  class="mr-4 w-[18px]"
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/OOjs_UI_icon_edit-ltr-progressive.svg/1024px-OOjs_UI_icon_edit-ltr-progressive.svg.png" alt="">
                     <img @click="Deletes(item.id)"  class="w-[15px]"
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Delete-button.svg/1200px-Delete-button.svg.png" alt="">
                </td>
            </tr>
        </tbody>
    </table>
</div>
</div>

</template>
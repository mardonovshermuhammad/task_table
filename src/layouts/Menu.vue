<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
function Logout(){
  localStorage.removeItem("access")
  router.push({name: 'login'})
}
</script>
<template>
<div>
    <div class="bg-gray-200 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
  <div class="container flex flex-wrap items-center justify-between mx-auto">
    <a class="flex items-center">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Logo</span>
    </a>
    <div class="block" id="navbar-default">
      <ul class="flex p-4 mt-4 border border-gray-100 rounded-lg
       bg-gray-200 md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0
        dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <p @click="router.push({name: 'home'})" class="block py-2 pl-3 pr-4 text-gray-700 rounded cursor-pointer
           hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0
            dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white
             md:dark:hover:bg-transparent">Home</p>
        </li>
        <li>
          <a @click="router.push({name: 'table'} )" class="block py-2 pl-3 pr-4 text-gray-700 rounded cursor-pointer
          hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400
           md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Table</a>
        </li>
        <li>
          <a @click="router.push({name: 'test'} )" class="block py-2 pl-3 pr-4 text-gray-700 rounded cursor-pointer
           hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0
            dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700
             dark:hover:text-white md:dark:hover:bg-transparent">Test</a>
        </li>
      </ul>
    </div>
    <div>
      <h1 @click="Logout" class=" text-red-500 font-medium mr-3 cursor-pointer">Logout</h1>
    </div>
  </div>
</div>
<div>
<router-view></router-view>
</div>
</div>

</template>
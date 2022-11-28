import { defineStore} from "pinia";

export const useItems = defineStore('EditItems', {
   state: () =>({
      Item: []
      }),
   actions: {
     Items(vals:any){
      this.Item = vals
    }
   },
   getters: {
    dabulItem: (state:any)=> state.Item
   }
});
export const useKurs = defineStore('useKurs', {
  state: () =>({
      kurs: ""
    }),
  actions: {
   editKurs(val:any){
     this.kurs = val
   }
  },
  getters: {
   dabulItem: (state:any)=> state.kurs
  }
});

import {ref, computed, onMounted, onBeforeMount} from 'vue'
import { defineStore } from 'pinia'
import {collection, getDocs, QueryDocumentSnapshot, doc, getDoc} from "firebase/firestore";
import db from "@/firestore/firestoreInit";

import { sortEntriesByMetric} from "@/helper/SortFirestoreEntries";

export const useEntryStore = defineStore('entry', () => {
  const entries = ref<QueryDocumentSnapshot[] | undefined>()
  const categories = ref()
  const totalTimeSpentList = ref<Array<number>>([0])

  /**
   * Reloads Entries from DB and recalculates totalTimeSpentList
   * */
  const reloadEntries = async () =>{
    entries.value = ((await getDocs(collection(db, "Entries"))).docs
        .sort((a,b)=>
            sortEntriesByMetric(a,b,'date')))

    totalTimeSpent()
  }
  const loadCategories = async () =>{
    categories.value = ((await getDoc(doc(db, "Categories", "Predefined"))))?.data()?.Name
  }

  const totalTimeSpent = () =>{
    if (!entries.value || entries.value?.length === 0){return [0]}
    console.log(entries.value)
    totalTimeSpentList.value[0] = entries.value[0].data().time
    for (let i = 1; i < entries.value?.length; i++) {
      totalTimeSpentList.value.push(entries.value[i].data().time + totalTimeSpentList.value[i-1])
    }

  }

  onBeforeMount( async () => {
    await loadCategories()
    await reloadEntries()
    totalTimeSpent()
  })
  return { entries, reloadEntries, categories, totalTimeSpentList, loadCategories }
})

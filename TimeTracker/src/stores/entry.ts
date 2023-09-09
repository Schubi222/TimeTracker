import {ref, computed, onMounted, onBeforeMount} from 'vue'
import { defineStore } from 'pinia'
import {collection, getDocs, QueryDocumentSnapshot, doc, getDoc} from "firebase/firestore";
import db from "@/firestore/firestoreInit";
import {calculateTimeFromTimeProp} from "@/helper/CalculateTime";
import { sortEntriesByMetric} from "@/helper/SortFirestoreEntries";

export const useEntryStore = defineStore('entry', () => {
  const entries = ref<QueryDocumentSnapshot[] | undefined>()
  const categories = ref()
  const totalTimeSpentList = ref<Array<number>>([0])

  const reloadEntries = async () =>{
    entries.value = ((await getDocs(collection(db, "Entries"))).docs
        .sort((a,b)=>
            sortEntriesByMetric(a,b,'date')))
  }
  const loadCategories = async () =>{
    categories.value = ((await getDoc(doc(db, "Categories", "Predefined"))))?.data()?.Name
  }

  const totalTimeSpent = () =>{
    if (!entries.value){return [0]}
    totalTimeSpentList.value[0] = calculateTimeFromTimeProp(entries.value[0])
    for (let i = 1; i < entries.value?.length; i++) {
      totalTimeSpentList.value.push(calculateTimeFromTimeProp(entries.value[i])+totalTimeSpentList.value[i-1])
    }

  }

  onBeforeMount( async () => {
    await loadCategories()
    await reloadEntries()
    totalTimeSpent()
  })
  return { entries, reloadEntries, categories, totalTimeSpentList, loadCategories }
})

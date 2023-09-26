import {ref, computed, onMounted, onBeforeMount} from 'vue'
import { defineStore } from 'pinia'
import {QueryDocumentSnapshot} from "firebase/firestore";
import db from "@/firestore/firestoreInit";

import {sortEntriesByMetric, sortString} from "@/helper/SortFirestoreEntries";
import {calculateTotalTime} from "@/helper/CalculateTime";
import {getDocFromFirestore, getSortedDocs} from "@/helper/FirestoreInteraction";

export const useEntryStore = defineStore('entry', () => {
  const entries = ref<QueryDocumentSnapshot[] | undefined>()
  const categories = ref()
  const totalTimeSpentList = ref<Array<number>>([0])
  const missingTimePerCategory = ref<Map<string,number>>(new Map<string, number>())
  const goalTimeMapping = ref<Map<string,number>>(new Map<string, number>())
  const totalTimePerCategory  = ref<Map<string,number>>(new Map<string, number>())

  /**
   * Reloads Entries from DB and recalculates totalTimeSpentList
   * */
  const reloadEntries = async () =>{
    entries.value = await getSortedDocs("Entries")
    totalTimeSpent()
    await loadCategories()
    calculateTotalTimePerCategory()
    await calculateMissingTime()
  }
  const loadCategories = async () =>{
    categories.value = (await getDocFromFirestore("Categories", "Predefined"))?.data()?.Name.sort()
  }

  const totalTimeSpent = () =>{
    if (!entries.value || entries.value?.length === 0){return}

    totalTimeSpentList.value[0] = entries.value[0].data().time
    for (let i = 1; i < entries.value?.length; i++) {
      totalTimeSpentList.value.push(entries.value[i].data().time + totalTimeSpentList.value[i-1])
    }

  }
  const calculateTotalTimePerCategory = () =>{
    let overallTotalTime = 0
    for (const category of categories.value)
    {
      if (!entries.value){
        totalTimePerCategory.value.set(category, 0)
        continue
      }

      const entries_belonging_to_category =
          entries.value.filter((e) => e.data().category === category)

      const time_total = calculateTotalTime(entries_belonging_to_category)
      overallTotalTime += time_total
      totalTimePerCategory.value.set(category, time_total)
    }
    totalTimePerCategory.value = new Map ([...totalTimePerCategory.value.entries()].sort(
        (a,b) =>{return sortString(a[0][0],b[0][0])}
    ))
    totalTimePerCategory.value.set('Total', overallTotalTime)
  }

  const calculateMissingTime = async () => {
    const GoalTimeMap = (await getDocFromFirestore("Categories", "Predefined"))?.data()?.CategoryTimeGoalMap
    for (const testElement of Object.entries(GoalTimeMap)) {
      if (typeof testElement[1] !== "number") return
      goalTimeMapping.value.set(testElement[0], testElement[1])
    }
    goalTimeMapping.value = new Map ([...goalTimeMapping.value.entries()].sort(
        (a,b) =>{return sortString(a[0][0],b[0][0])}
    ))
    for (const entry of goalTimeMapping.value) {
        const missingTime:number = (entry[1] || 0) - (totalTimePerCategory.value.get(entry[0]) || 0)
        missingTimePerCategory.value?.set(entry[0],missingTime)
      }
  }

  onBeforeMount( async () => {
    await loadCategories()
    await reloadEntries()
    totalTimeSpent()
    calculateTotalTimePerCategory()
    await calculateMissingTime()
  })

  return {
    entries, reloadEntries, categories, totalTimeSpentList, loadCategories,
    missingTimePerCategory,totalTimePerCategory, goalTimeMapping, calculateMissingTime }
})

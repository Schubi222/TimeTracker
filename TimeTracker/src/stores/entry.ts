import {ref, computed, onMounted} from 'vue'
import { defineStore } from 'pinia'
import {collection, getDocs, QueryDocumentSnapshot} from "firebase/firestore";
import db from "@/firestore/firestoreInit";

export const useEntryStore = defineStore('entry', () => {
  const entries = ref<QueryDocumentSnapshot[] | undefined>()
  function sortEntriesByDate(a:QueryDocumentSnapshot, b:QueryDocumentSnapshot) {
    return a.data().date - b.data().date;
  }
  const reloadEntries = async () =>{
    entries.value = ((await getDocs(collection(db, "Entries"))).docs.sort(sortEntriesByDate))
  }

  onMounted( () =>{ reloadEntries()})
  return { entries, reloadEntries }
})

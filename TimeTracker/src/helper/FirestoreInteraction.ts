import {collection, getDocs, QueryDocumentSnapshot, doc, getDoc, setDoc, addDoc} from "firebase/firestore";
import db from "@/firestore/firestoreInit";
import {sortEntriesByMetric} from "@/helper/SortFirestoreEntries";
import {calculateMinutesFromString} from "@/helper/CalculateTime";
import {deleteDoc} from "@firebase/firestore";


export async function getDocsFromFirestore (path:string){
    return ((await getDocs(collection(db, path))).docs)
}
export async function getDocFromFirestore (path:string, pathSegment:string){
    return (await getDoc(doc(db, path, pathSegment)))
}

export async function getSortedDocs(path:string){
    return (await getDocsFromFirestore(path))
        .sort((a,b)=>
        sortEntriesByMetric(a,b,'date'))
}

export async function updateGoalTimes(time:number, category:string){
    const doRef = doc(db, 'Categories', 'Predefined')
    await setDoc(doRef, { CategoryTimeGoalMap:  {[category]: time}}, { merge: true })
}

export async function deleteDocFromFirestore(path:string, id:string){
    await deleteDoc(doc(db, "Entries", id));
}

export async function addDocToFirestore(newEntry:Object){
    await addDoc(collection(db, "Entries"), newEntry).catch(() =>{
        alert('Something went wrong. Could not add entry!')
    })
}
import {collection, getDocs, QueryDocumentSnapshot, doc, getDoc, setDoc, addDoc, updateDoc,deleteField} from "firebase/firestore";
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

export async function addCategoryToFirestore(category:string){
    const docRef =
        (await getDocFromFirestore('Categories','Predefined'))

    const array = [...docRef.data()?.Name || null]
    array.push(category)
    const mapping = {...docRef.data()?.CategoryTimeGoalMap || null}
    mapping[category] = 0

    await updateDoc(docRef.ref,{Name:array})
    await updateDoc(docRef.ref,{CategoryTimeGoalMap:mapping})
}

export async function deleteDocFromFirestore(path:string, id:string){
    await deleteDoc(doc(db, "Entries", id));
}

export async function deleteCategoryFromFirestore(category:string){
    const docRef =
        (await getDocFromFirestore('Categories','Predefined'))

    if (!docRef.data()?.Name || !docRef.data()?.CategoryTimeGoalMap){console.log("return in delete");return}

    let array = [...docRef.data()?.Name || undefined]
    array = array.filter((e) =>{ return e !== category})

    const mapping1 = {...docRef.data()?.CategoryTimeGoalMap || null}
    delete mapping1[category]
    console.log(mapping1)
    await updateDoc(docRef.ref,{Name:array})
    await updateDoc(docRef.ref,{CategoryTimeGoalMap:mapping1})
    console.log(docRef.data()?.CategoryTimeGoalMap)
}

export async function addDocToFirestore(newEntry:Object){
    await addDoc(collection(db, "Entries"), newEntry).catch(() =>{
        alert('Something went wrong. Could not add entry!')
    })
}
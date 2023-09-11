import {QueryDocumentSnapshot} from "firebase/firestore";

export function calculateTotalTime(times:Array<QueryDocumentSnapshot>):number{
    let time_total = 0
    times.forEach((e) =>{
        time_total += e.data().time
    })
    return time_total
}

export function calculateMinutesFromString(time:string):number{
    const time_object = time.split(':')
    return (+time_object[0])*60 + (+time_object[1])
}
import {QueryDocumentSnapshot} from "firebase/firestore";

export function calculateTotalTime(times:Array<QueryDocumentSnapshot>):number{
    let time_total = 0
    times.forEach((e) =>{
        time_total += calculateTimeFromTimeProp(e)
    })
    return time_total
}

export function calculateTimeFromTimeProp(time:QueryDocumentSnapshot):number{
    const time_object = time.data().time.split(':')
    return (+time_object[0])*60 + (+time_object[1])
}
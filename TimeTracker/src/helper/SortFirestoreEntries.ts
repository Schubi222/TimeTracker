import {QueryDocumentSnapshot} from "firebase/firestore";
import {calculateMinutesFromString} from "@/helper/CalculateTime";

export function sortEntriesByMetric(a:QueryDocumentSnapshot, b:QueryDocumentSnapshot, metric:string, ascending=true):number {

    const first_data = a.data()[metric]
    const second_data = b.data()[metric]

    if (metric === 'date') {
      return ascending ? first_data - second_data : second_data - first_data
    } else if (metric === 'time') {

      const time_a = calculateMinutesFromString(first_data)
      const time_b = calculateMinutesFromString(second_data)

      return ascending ? time_a - time_b : time_b - time_a
    }else{
        if (first_data === second_data) return 0
        if (first_data < second_data){
            return ascending ? -1 : 1
        }else{
            return ascending ? 1 : -1
        }

    }
}
import {QueryDocumentSnapshot} from "firebase/firestore";

export function sortEntriesByMetric(a:QueryDocumentSnapshot, b:QueryDocumentSnapshot, metric:string, ascending=true):number {

    const first_data = a.data()[metric]
    const second_data = b.data()[metric]

    if (metric === 'date') {
      return ascending ? first_data - second_data : second_data - first_data
    } else if (metric === 'time') {
      const time_object_a = first_data.split(':')
      const time_object_b = second_data.split(':')

      const time_a = +time_object_a[0] * 60 + +time_object_a[1]
      const time_b = +time_object_b[0] * 60 + +time_object_b[1]

      return ascending ? time_a - time_b : time_b - time_a
    }else{
        console.log(first_data, second_data)
        console.log(first_data < second_data)
        console.log(typeof first_data)
        if (first_data === second_data) return 0
        if (first_data < second_data){
            return ascending ? -1 : 1
        }else{
            return ascending ? 1 : -1
        }

    }
}
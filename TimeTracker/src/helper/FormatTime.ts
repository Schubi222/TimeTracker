export const FormatDate = (Minutes:number):string =>{
    if (Minutes < 0) return `Hours: 0 Minutes: 0`
    return `Hours: ${Math.floor(Minutes/60)} Minutes: ${Minutes%60}`
}

export const FormatDateToHHmm = (Minutes:number):string =>{
    if (Minutes < 0) return `00:00`

    const minutes = Minutes%60
    const hours = Math.floor(Minutes/60)

    const minute_string:string  = minutes < 10 ? '0'+ minutes : minutes.toString()
    const hour_string:string  = hours < 10 ? '0'+ hours: hours.toString()

    return `${hour_string}:${minute_string}`
}
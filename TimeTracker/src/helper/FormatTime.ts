export const FormatDate = (Minutes:number):string =>{
    if (Minutes < 0) return `Hours: 0 Minutes: 0`
    return `Hours: ${Math.floor(Minutes/60)} Minutes: ${Minutes%60}`
}
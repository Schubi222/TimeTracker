export const FormatDate = (Minutes:number):string =>{
    return `Hours: ${Math.floor(Minutes/60)} Minutes: ${Minutes%60}`
}
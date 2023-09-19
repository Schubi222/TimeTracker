export const timeValidation = [
    (time:string) => time !== '00:00' || "Enter a correct time",
    (time:string) => time !== '' || "Enter a correct time",
]
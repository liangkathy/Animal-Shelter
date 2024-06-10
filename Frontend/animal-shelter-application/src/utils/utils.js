import { decodeToken, useJwt } from "react-jwt";

export const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    
    let age = today.getFullYear() - birthDate.getFullYear();
    let ageString = age + " years old"

    if(age === 1) {
        ageString = age + " year old"
    }  

    if (today.getMonth() < birthDate.getMonth() ||
        today.getMonth == birthDate.getMonth() && today.getMonth() < birthDate.getMonth()) {
            age--; //ensures pets accurately calculated if under one year
        }

    if (age < 1) {
        age = today.getMonth() - birthDate.getMonth()
        if (today.getMonth() < birthDate.getMonth()) {
            age += 12; //accounts for negative numbers if current month < birth month
        }
        
        ageString = age + " months old"
        if (age === 1) {
            ageString = age + " month old"
        }
    }

    return ageString;
}


export const timestampFormatter = (timestamp) => {
    const convertedTimestamp = new Date(timestamp) //parse into date object

    const month = convertedTimestamp.getMonth() + 1 //starts at zero for Date object
    const date = convertedTimestamp.getDate()
    const year = convertedTimestamp.getFullYear()

    let hours = convertedTimestamp.getHours()
    const minutes = convertedTimestamp.getMinutes()

    const timeOfDay = hours < 12 ? "AM" : "PM"

    //hours tracked on military time (24hours)
    if (hours > 12) {
        hours -= 12; //subtract 12
    } else if (hours === 0) {
        hours = 12; //for midnight
    }

    const finalTimestamp = `${month}/${date}/${year} ${hours}:${minutes.toString().padStart(2, '0')} ${timeOfDay}` //gives two digits to minute
    return finalTimestamp
}

export const decodeJWTRoles = (token) => {
    let decode = {}
    try {
        decode = decodeToken(token)
        console.log("Token decoded: ", decode);
    } catch (error) {
        console.error("Error decoding token: ", error);
    }

    if (decode.roles.includes("ROLE_ADMIN")) {
        return true; 
    } else {
        return false;
    }
}
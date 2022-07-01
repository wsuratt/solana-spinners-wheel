import React from "react";

export interface UserData {
    mint: string,
    uri: string,
    updateAuth: string
}


export interface imageStuff {
    src: string
}

export const LoadImage = async (userData: UserData[], setIsLoading: any) => {
    //@ts-ignore
    let settings = {method: "Get"};
    let arraytoReturn = [{myRes: "", mint: "", attributes: [], name: ""}]
    arraytoReturn.pop()
    for (let i of userData) {
        try {
            let res = await fetch(i.uri, settings)
            if (!res) {
                continue
            }
            let myRes = await res.json();
            console.log(myRes)
           
            let newObject = {
                myRes: myRes.image, mint: i.mint,
                attributes: myRes.attributes, name: myRes.name
            }
            // console.log(newObject)
            arraytoReturn.push(newObject);


        } catch {
         
        }
    }
   
    return arraytoReturn
}


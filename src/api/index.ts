import fetch from "node-fetch";

export const fetchResponseByURL = async (relativeURL : String): Promise<any> => {
    return await fetch(`https://api.chucknorris.io/jokes${relativeURL}`)
                .then( (res: { json: () => any; }) => res.json())
                .then( data => data);
}

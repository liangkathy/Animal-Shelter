
const backendBaseURL = "http://localhost:8080"

//get requests
export const getDataPublic = async (endpoint) => {
    console.log("Get request calling " + endpoint);

    try {
        const response = await fetch(`${backendBaseURL}/${endpoint}`); 
        const data = response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data: response may be null", error);
        throw error;
    }
}

export const getData = async (endpoint) => {
    console.log("Get request calling " + endpoint);
    const headers = {'Authorization': 'Bearer ' + localStorage.getItem("token")};

    try {
        const response = await fetch(`${backendBaseURL}/${endpoint}`, {headers}); 
        const data = response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data: response may be null", error);
        throw error;
    }
}

//post request unrestricted access (no token on sign up)
export const postData = async (endpoint, body) => {
    console.log(`Post request calling ${endpoint}`, body);

    try {
        const response = await fetch(`${backendBaseURL}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }); 
        const data = response.json();
        return data;
    } catch (error) {
        console.error("Error posting data: ", error);
        throw error;
    }
}

export const postDataRestricted = async (endpoint, body) => {
    console.log(`Post request calling ${endpoint}`, body);

    try {
        const response = await fetch(`${backendBaseURL}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify(body)
        }); 
        const data = response.json();
        return data;
    } catch (error) {
        console.error("Error posting data: ", error);
        throw error;
    }
}

export const putData = async (endpoint) => {
    console.log(`Put request calling ${endpoint}`);

    try {
        const response = await fetch(`${backendBaseURL}/${endpoint}`, {
            method: "PUT",
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("token")
            }
        }); 
        const data = response.json();
        return data;
    } catch (error) {
        console.error("Error updating data: ", error);
        throw error;
    }
}

export const putDataBody = async (endpoint, body) => {
    console.log(`Put request calling ${endpoint}`, body);

    try {
        const response = await fetch(`${backendBaseURL}/${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify(body)
        }); 
        const data = response.json();
        return data;
    } catch (error) {
        console.error("Error updating data: ", error);
        throw error;
    }
}

export const deleteData = async (endpoint) => {
    console.log(`Delete request calling ${endpoint}`);

    try {
        const response = await fetch(`${backendBaseURL}/${endpoint}`, {
            method: "DELETE",
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("token")
            }
        }); 
        const data = response.json();
        return data;
    } catch (error) {
        console.error("Error deleting data: ", error);
        throw error;
    }
}

export const verifyAdmin = async (endpoint) => {
    console.log("Get request calling " + endpoint);
    const headers = {'Authorization': 'Bearer ' + localStorage.getItem("token")};

    try {
        const response = await fetch(`${backendBaseURL}/${endpoint}`, {headers}); 
        const data = response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data: response may be null", error);
        throw error;
    }
}
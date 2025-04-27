import axios from 'axios'

export const getJudge0LanguageId = (language) =>{
    const languageMap = {
        "C++":54, //  (GCC 9.2.0)
        "JAVA":62,
        "PYTHON":71,
        "JAVASCRIPT":63 
    }

    return languageMap[language.toUpperCase()];
}


export const submitBatch = async (submissions) => {
    const url = process.env.JUDGE0_API_URL;

    const {data} = await axios.post(`${url}/submissions/batch?base64_encoded=false`, {submissions})

    return data;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const pollBatchResult = async (token) => {
    const url = process.env.JUDGE0_API_URL;

    let data;
    let isAllDone = false;

    while(!isAllDone) {
        data = await axios.get(`${url}/submissions/batch`, {
            params:{
                tokens: token.join(","),
                base64_encoded:false
            }
        })

        const result = data.submissions

        isAllDone = result.every((result) => result.status.id >= 3)

        await sleep(1000); 
    }

    return data.submissions;
}
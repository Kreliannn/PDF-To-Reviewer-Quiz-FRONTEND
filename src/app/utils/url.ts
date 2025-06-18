export const backendUrl = ( endPoint : string ) => {
    const onlineUrl = "https://pdf-to-reviewer-backend.onrender.com/"
    const localhostUrl = "http://localhost:5000/"
    return localhostUrl + endPoint
}
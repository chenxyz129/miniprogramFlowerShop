import http from "../utils/http";

export const reqAddUserAddress=(addr)=>http.post("/userAddress/save",addr)

export const reqAddressList =()=>http.get('/userAddress/findUserAddress')

export const reqGetAddressById =(id)=>http.get(`/userAddress/${id}`)

export const reqUpdateAddress=(addrObj)=>http.post('/userAddress/update',addrObj)

export const reqDelAddress = (id)=>http.get(`/userAddress/delete/${id}`)
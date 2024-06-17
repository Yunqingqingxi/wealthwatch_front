import request from "@/util/request.js"

export const PayMes = (data) =>{
    return request({
        method:"POST",
        url:"money/payMes",
        data
    })
}
export const PayMesList = () =>{
    return request({
        method:"GET",
        url:"money/payMesList",
    })
}
export const PayMesDelete = (data) =>{
    return request({
        method:"DELETE",
        url:"money/payMesDelete",
        data
    })
}
export const PayMesListIncome = () =>{
    return request({
        method:"GET",
        url:"money/payMesListIncome",
    })
    
}
export const PayMesListOutcome = () =>{
    return request({
        method:"GET",
        url:"money/payMesListExpense",
    })
}
export const PayMesListDatecome = (data) =>{
    return request({
        method:"POST",
        url:"money/payMesListDatecome",
        data
    })

}
import Instance from "./Instance"


export const topAttractionMapping = async (data: any) => {
    if (data?.data_type === "google") {
        try {
            const result = await Instance.get(`place/${data?.place_id}`)
            if (result?.status === 200) {
                return result?.data
            }
        } catch (error) {

        }
    } else {
        return data
    }
}

export const handleFilter = (arr: any, name: string) => {
    const newArr = [...arr];
    if(!newArr.length){
        return []
    }
    // console.log("hiiiiiiiiiii fun", arr)
    const newData = newArr.filter((val: any) => {
        if (val?.parishName === name) {
            return val
        }
    })
    return (name === "Any" ? arr : newData)
}
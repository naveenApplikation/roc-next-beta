import Instance from "./Instance"


export const topAttractionMapping = async (data: any) => {
    if (data?.data_type === "google") {
        try {
            const result = await Instance.get(`place/${data?.place_id}`)
            console.log("result google place api", result)
            if (result?.status === 200) {
                return result?.data
            }
        } catch (error) {

        }
    } else {
        return data
    }


}
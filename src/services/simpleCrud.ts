import { UserData } from "../types";
import { models } from "../utils/client";

type ModelName = keyof typeof models;

const getDataById = async (modelName: ModelName, id: number | null, email?: string) => {
    const model = models[modelName] as any
    if (!model) {
        throw new Error(`Model '${modelName}' does not exist.`);
    }
    
    let detectWhere: object;
    if(id === null){
        detectWhere = { email }
    }else {
        detectWhere = { id }
    }


    return await model.findFirst({ where: detectWhere })
}

const createData = async (modelName: ModelName, data: UserData) => {
    const model = models[modelName] as any
    if (!model) {
        throw new Error(`Model '${modelName}' does not exist.`);
    }
    return await model.create({ data })
}

export { getDataById, createData }
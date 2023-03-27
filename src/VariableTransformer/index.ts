import { AssetUtils } from "../assetUtils"
import TransformerStrategies from "./strategies"
import { Staretgy } from "./strategies/strategy.abstract"

export class VariableTransformer {

    private strategies: {[key: string] : Staretgy} = {}
    

    constructor() {
        for(let strategy of TransformerStrategies) {
            const strategyInstance = new strategy()
            this.strategies[strategyInstance.key] = strategyInstance
        }
    }


    public run(dataToTransform: string, variables: {[key:string]: any} | {name: string, value: any[]}[]): string {
        dataToTransform = this.removeTags(dataToTransform)
        dataToTransform = this.transformVariables(dataToTransform, variables)
        dataToTransform = this.transformIcons(dataToTransform)

        return dataToTransform

    }

    private transformVariables(dataToTransform: string, variables: {[key:string]: any} | {name: string, value: any[]}[]): string {
        if(!dataToTransform) {
            return null
        }
        const dataArray = dataToTransform.split("@")
        let processedVariables = {}

        if(Array.isArray(variables)) {
            for(let row of variables) {
                processedVariables[row.name] = row.value?.join("/")
            }
        } else {
            processedVariables = variables
        }

        for(let i = 1; i < dataArray.length; i+=2) {
            dataToTransform = dataToTransform.replaceAll(`@${dataArray[i]}@`, this.strategies[this.selectStrategy(dataArray[i], variables)].run(dataArray[i], variables))
        }

        return dataToTransform
    }

    private transformIcons(dataToTransform: string): string {
        if(!dataToTransform) {
            return null
        }

        for(const key of Object.keys(AssetUtils.IconTransformer)) {
            dataToTransform = dataToTransform.replaceAll(key, `#img${AssetUtils.getAsset(AssetUtils.IconTransformer[key])}#img`)
        }

        return dataToTransform
    }

    private removeTags(str:string) : string {
        return str?.replace( /(<([^>]+)>)/ig, '');
    }

    private selectStrategy(stringToCheck: string, variables: any): string {
        if(stringToCheck.indexOf("*") > -1) {
            return "OPERATIONAL_TRANSFORM"
        } 

        if(Object.keys(variables).includes(stringToCheck)) {
            return "DIRECT_TRANSFORM"
        }

        return "HASH_TRANSFORM"
    }

}
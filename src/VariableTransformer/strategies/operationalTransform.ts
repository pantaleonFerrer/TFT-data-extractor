import { Staretgy } from "./strategy.abstract"


export class OperationalTransform extends Staretgy {

    public key = "OPERATIONAL_TRANSFORM"

    public run(variableToSearch: string, variables:  {[key: string]: any}): string {

        for(let row of Object.keys(variables)) {

            let [varName, varOperation] = variableToSearch.split("*") 

            if(row.toLowerCase() === varName.toLowerCase()) {
                return eval(`${variables[row]}*${varOperation}`)
            }

        }
    }

}
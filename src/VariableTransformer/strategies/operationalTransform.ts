import { Staretgy } from "./strategy.abstract"
import hash from 'fnv1a';


export class OperationalTransform extends Staretgy {

    public key = "OPERATIONAL_TRANSFORM"

    public run(variableToSearch: string, variables:  {[key: string]: any}): string {
        
        for(let row of Object.keys(variables)) {

            let [varName, varOperation] = variableToSearch.split("*") 

            if(hash(varName.toLowerCase()).toString(16) === row.substring(1, row.length - 1)) {
                return eval(`${variables[row]}*${varOperation}`)
            }

            if(row.toLowerCase() === varName.toLowerCase()) {
                return eval(`${variables[row]}*${varOperation}`)
            }

        }
    }

}
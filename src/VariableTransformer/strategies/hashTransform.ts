import { Staretgy } from "./strategy.abstract"
import hash from "fnv1a"
import hashMap from "../hashMap.json"


export class HashTransform extends Staretgy {

    public key = "HASH_TRANSFORM"

    public run(variableToSearch: string, variables:  {[key: string]: any}): string {

        for(let row of Object.keys(variables)) {

            console.log(variableToSearch)

            row = row.substring(1, row.length - 1)

            if(hashMap[row] || hash(variableToSearch.toLowerCase()).toString(16) === row) {
                return variables[`{${row}}`]
            }

        }
    }

}
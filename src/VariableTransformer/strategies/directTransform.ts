import { Staretgy } from "./strategy.abstract"


export class DirectTransform extends Staretgy {

    public key = "DIRECT_TRANSFORM"

    public run(variableToSearch: string, variables:  {[key: string]: any}): string {

        return variables[variableToSearch]
    }

}
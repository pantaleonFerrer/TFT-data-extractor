import { Trait } from "./traits"
import { VariableTransformer } from "./VariableTransformer"
import { AssetUtils } from "./assetUtils"


export interface Item {
    apiName: string
    composition: string[]
    desc: string
    effects: {[x: string]: any}
    from?: number[]
    associatedTraits: Trait["apiName"][]
	incompatibleTraits: Trait["apiName"][]
    icon: string
    unique: boolean
}

export class Items {

    static transformer: VariableTransformer = new VariableTransformer()

    static ExtractItems(data: Item[]): Item[] {
        return data.map((x) => ({
            ...x,
            icon: AssetUtils.getAsset(x.icon),
            desc: x.desc && this.transformer.run(x.desc, x.effects) as string
        }))
    }

}


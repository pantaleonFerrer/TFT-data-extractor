import { VariableTransformer } from "./VariableTransformer"
import { AssetUtils } from "./assetUtils"


export interface Trait {
    apiName: string
    desc: string
    effects: any[]
    icon: string
    tiers: {
        desc: string;
        effects: {value: string, effects: any[]}[]
    }[]
    name: string
}

export class Traits {

    static transformer: VariableTransformer = new VariableTransformer()

    static ExtractTraits(data: Trait[]): Trait[] {
        return data.map((x) => ({
            ...x,
            tiers: x.effects.map((y) => ({
                desc: this.transformer.run(x.desc, y),
                effects: y
            }))
        }))
    }

}


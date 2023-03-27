import { TFTPackage } from "./TFTDataExtractor"
import { Trait, Traits } from "./traits"
import { VariableTransformer } from "./VariableTransformer"
import { Champion, Champions } from "./champions"


export interface SingularSet {
    champions: Champion[]
    name: string
    traits: Trait[]
    setNumber: number
}

export interface SetObject {
    [x: string]: SingularSet
}

export interface SetData {
    champions: Champion[]
    mutator: string
    name: string
    number: number
    traits: Trait[]

}

export class Sets {

    static transformer: VariableTransformer = new VariableTransformer()

    static ExtractSet(data: TFTPackage, set: number): SingularSet {
        return {
            name: data.sets[set].name,
            champions: Champions.ExtractChampions(data.sets[set].champions),
            traits: Traits.ExtractTraits(data.sets[set].traits),
            setNumber: set
        }
    }

    static ExtractSetData(data: SetData[]): SetData[] {

        return data.map((x) => ({
            ...x,
            champions: Champions.ExtractChampions(x.champions),
            traits: Traits.ExtractTraits(x.traits)
        }))

    }

}


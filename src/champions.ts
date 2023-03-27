import { VariableTransformer } from "./VariableTransformer"
import { AssetUtils } from "./assetUtils"


export interface Champion {
    ability: Ability
    apiName: string
    cost: number
    icon: string
    splash: string
    name: string
    stats: {
        armor: number
        attackSpeed: number
        critChance: number
        critMultiplier: number
        damage: number
        hp: number
        initialMana: number
        magicResist: number
        mana: number
        range: number
    }
    traits: string[]
}

export interface Ability {
    desc: string
    icon: string
    variables?: {name: string, value: any[]}[]
}

export class Champions {

    static transformer: VariableTransformer = new VariableTransformer()

    static ExtractChampions(data: Champion[]): Champion[] {
        return data.map((x) => ({
            ...x,
            ability: this.FormatChampionAbilities(x.ability),
            icon: AssetUtils.getAsset(x.icon),
            splash: AssetUtils.getCharacterIcon(x.apiName)
        }))
    }

    static FormatChampionAbilities(ability: Ability): Ability {

        return {
            ...ability,
            desc: this.transformer.run(ability.desc, ability.variables)
        }
    }

}


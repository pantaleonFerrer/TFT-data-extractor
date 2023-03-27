import { VariableTransformer } from "./VariableTransformer";
import { AssetUtils } from "./assetUtils";

interface TFTPackage {
    items: Item[]
    setData: SetData[]
    sets: SetObject
}

interface TFTResponse {
    items: Item[],
    champions: Champion[]
    traits: Trait[]
    setName: string
    version: string
}

interface Item {
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

interface SetData {
    champions: Champion[]
    mutator: string
    name: string
    number: number
    traits: Trait[]

}

interface Champion {
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

interface Trait {
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

interface SingularSet {
    champions: Champion[]
    name: string
    traits: Trait[]
}

interface SetObject {
    [x: string]: SingularSet
}

interface Ability {
    desc: string
    icon: string
    variables?: {name: string, value: any[]}[]
}

export class TFTDataExtractor {

   
    private transformer = new VariableTransformer()

    public async run(set: number): Promise<TFTResponse> {

        const JSONData: TFTPackage = await this.getData();

        const data = this.ExtractAndCleanData(JSONData);

        return {
            ...data,
            champions: data.sets[set].champions,
            traits: data.sets[set].traits,
            setName: data.sets[set].name,
            version: await this.getVersion()
        }

    }

    private async getData(): Promise<TFTPackage> {
        return (await fetch('https://raw.communitydragon.org/latest/cdragon/tft/en_us.json'))?.json();

    }

    private async getVersion(): Promise<string> {
        return (await (await fetch('https://raw.communitydragon.org/latest/content-metadata.json'))?.json()).version;
    }

    private ExtractAndCleanData(data: TFTPackage): TFTPackage {

        const [items, setData, sets] = [this.ExtractItems(data.items), this.ExtractSetData(data.setData), this.ExtractSets(data.sets)]

        return {
            items,
            setData,
            sets
        } as TFTPackage

    }

    private ExtractItems(data: Item[]): Item[] {

        return data.map((x) => ({
            ...x,
            icon: AssetUtils.getAsset(x.icon),
            desc: x.desc && this.transformer.run(x.desc, x.effects) as string
        }))

    }

    private ExtractSetData(data: SetData[]): SetData[] {

        return data.map((x) => ({
            ...x,
            champions: this.ExtractChampions(x.champions),
            traits: this.ExtractTraits(x.traits)
        }))

    }

    private ExtractSets(data: SetObject): SetObject {

        let newObj: SetObject = {}

        Object.keys(data).map((x) => {
            newObj[x] = {
                ...data[x],
                champions: this.ExtractChampions(data[x].champions),
                traits: this.ExtractTraits(data[x].traits)
            }
        })

        return newObj

    }

    private ExtractTraits(data: Trait[]): Trait[] {

        return data.map((x) => ({
            ...x,
            tiers: x.effects.map((y) => ({
                desc: this.transformer.run(x.desc, y),
                effects: y
            }))
        }))

    }

    private ExtractChampions(data: Champion[]): Champion[] {

        return data.map((x) => ({
            ...x,
            ability: this.FormatChampionAbilities(x.ability),
            icon: AssetUtils.getAsset(x.icon),
            splash: AssetUtils.getCharacterIcon(x.apiName)
        }))

    }

    private FormatChampionAbilities(ability: Ability): Ability {

        return {
            ...ability,
            desc: this.transformer.run(ability.desc, ability.variables)
        }
    }
}
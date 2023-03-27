import { Trait } from "./traits";
import { Champion, Champions } from "./champions";
import { Item, Items } from "./items";
import { SetData, SetObject, Sets, SingularSet } from "./sets";

export interface TFTPackage {
    items: Item[]
    setData: SetData[]
    sets: SetObject
}

export interface TFTPackageTransformed {
    items: Item[]
    setData: SetData[]
    sets: SingularSet
}

interface TFTResponse {
    items: Item[],
    champions: Champion[]
    traits: Trait[]
    setName: string
    version: string
}

export class TFTDataExtractor {

    set: number

    public async run(set: number): Promise<TFTResponse> {

        this.set = set

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

    private ExtractAndCleanData(data: TFTPackage): TFTPackageTransformed {

        const [items, setData, sets] = [Items.ExtractItems(data.items), Sets.ExtractSetData(data.setData), Sets.ExtractSet(data, this.set)]

        return {
            items,
            setData,
            sets
        }

    }

    
}
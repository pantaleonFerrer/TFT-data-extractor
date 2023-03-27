

export class AssetUtils {

    static readonly GAME_URL: string = 'https://raw.communitydragon.org/latest/game'
    static readonly CHARACTER_DIRECTORY : string = '/assets/characters/{name}/hud/{name}_square.tft_set{setNumber}.png'
    static readonly MODS_URL = "assets/perks/statmods"
    static readonly IconTransformer = {
        "%i:scaleArmor%": `${this.MODS_URL}/statmodsarmoricon.png`,
        "%i:scaleMR%": `${this.MODS_URL}/statmodsmagicresicon.magicresist_fix.png`,
        "%i:scaleMana%": `${this.MODS_URL}/statmodsadaptiveforceicon.png`,
        "%i:scaleAP%": `${this.MODS_URL}/statmodsabilitypowericon.png`,
        "%i:scaleAD%": `${this.MODS_URL}/statmodsattackdamageicon.png`,
        "%i:star%": `${this.MODS_URL}/statmodsadaptiveforcescalingicon.png`,
        "%i:scaleAS%": `${this.MODS_URL}/statmodsattackspeedicon.png`,
        "%i:scaleHealth%": `${this.MODS_URL}/statmodshealthscalingicon.png`,
        "%i:scaleRange%": `${this.MODS_URL}/statmodsattackdamageicon.png`
    }

    static getCharacterIcon(characterId: string): string {
        return this.getAsset(this.CHARACTER_DIRECTORY.replaceAll("{name}", characterId.toLowerCase()).replaceAll("{setNumber}", characterId.substring(3,4)))
    }

    static getAsset(asset: string): string {
        return `${this.GAME_URL}/${asset?.toLowerCase().replace('dds', 'png')}`
    }
}
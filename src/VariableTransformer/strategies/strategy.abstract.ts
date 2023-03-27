
export abstract class Staretgy {

    public key: string

    abstract run(stringToTransform: string, variables: any) : string

}
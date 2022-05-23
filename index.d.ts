declare type Modality = any;
export interface Modes {
    [modeName: string]: Modality;
}
interface ClassMode {
    [modality: string]: string;
}
export interface ClassModes {
    [modeName: string]: ClassMode | string;
}
export declare const classModes: (classModes: ClassModes) => (modes?: Modes) => string;
export {};

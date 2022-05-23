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
export declare const tarquin: (classModes: ClassModes) => (modes?: Modes) => string;
export {};

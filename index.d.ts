declare type Modality = any;
export interface Modes {
    [modeName: string]: Modality;
}
declare type ClassMode = string | {
    [modality: string]: string;
} | ((modes: Modes) => string);
export interface ClassModes {
    [modeName: string]: ClassMode;
}
export declare function tarquin(classes: ClassModes | string): (modes?: Modes | undefined) => string;
export {};

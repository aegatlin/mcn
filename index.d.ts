declare type Modality = any;
export interface Modes {
    [modeName: string]: Modality;
}
declare type ClassMode = string | {
    [modality: string]: string | ClassModes;
} | ((modes: Modes) => string);
export interface ClassModes {
    [modeName: string]: ClassMode;
}
export declare function mcn(classes: ClassModes | string): (modes?: Modes | undefined) => string;
export {};

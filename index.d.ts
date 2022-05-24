declare type Modality = any;
export interface Modes {
    [modeName: string]: Modality;
}
interface ClassMode {
    [modality: string]: string;
}
export interface ClassModes {
    [modeName: string]: ClassMode | string | FMode;
}
declare type FMode = (modes?: Modes) => string;
export declare const tarquin: (classModesOrString: ClassModes | string) => (modes?: Modes | undefined) => string;
export {};

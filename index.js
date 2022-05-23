export class Clxss {
    #base = new Set();
    #classModes = {};
    static base(...args) {
        return new Clxss(...args);
    }
    constructor(...baseClasses) {
        baseClasses.forEach((c) => this.add(c));
    }
    modes(classModes) {
        Object.assign(this.#classModes, classModes);
        return this;
    }
    mode(classModeName, classMode) {
        this.#classModes[classModeName] = classMode;
        return this;
    }
    put(modes) {
        return [
            ...Array.from(this.#base),
            ...Array.from(this.#setFrom(modes ?? {})),
        ].join(' ');
    }
    add(classes, set = this.#base) {
        classes
            .split(' ')
            .map((s) => s.trim())
            .filter((s) => s.length > 0)
            .forEach((s) => set.add(s));
        return this;
    }
    #setFrom(modes) {
        const modesSet = new Set();
        Object.keys(this.#classModes).forEach((_classModeName) => {
            const classMode = this.#classModes[_classModeName];
            const mode = modes[_classModeName];
            const modeString = `${mode}`;
            if (modeString != 'undefined') {
                this.add(classMode[modeString], modesSet);
            }
            else {
                classMode.default && this.add(classMode.default, modesSet);
            }
        });
        return modesSet;
    }
}

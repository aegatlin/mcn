export function tarquin(classes) {
    return function (modes) {
        const classModes = typeof classes == 'string' ? { _: classes } : classes;
        return getClassesFromModes(classModes, modes ?? {});
    };
}
function getClassesFromModes(classModes, modes) {
    let classes = new Set();
    Object.keys(classModes).forEach(mode => {
        const classMode = classModes[mode];
        const classesToAdd = getClasses(classMode, mode, modes);
        add(classes, classesToAdd);
    });
    return Array.from(classes.values()).join(' ');
}
function getClasses(classMode, mode, modes) {
    switch (typeof classMode) {
        case 'string':
            return classMode;
        case 'function':
            return classMode(modes);
        case 'object': {
            const isRegistered = modes && Object.keys(modes).some(k => k == mode);
            if (!isRegistered)
                throw Errors.Unregistered(mode);
            const modality = modes[mode];
            const modalityString = `${modality}`;
            if (modalityString != 'undefined' && classMode[modalityString]) {
                return classMode[modalityString];
            }
            else
                return '';
        }
        default: {
            throw new Error(`type of classMode: ${typeof classMode} not supported`);
        }
    }
}
function add(set, classes) {
    classes
        .split(' ')
        .map(c => c.trim())
        .forEach(c => set.add(c));
}
const Errors = {
    Unregistered: (key) => new Error(`Registered mode not provided: ${key}`),
};

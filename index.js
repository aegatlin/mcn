export function scn(classes) {
    return function (modes) {
        const classModes = typeof classes == 'string' ? { _: classes } : classes;
        return getClassesFromModes(classModes, modes ?? {});
    };
}
function getClassesFromModes(classModes, modes) {
    let classes = new Set();
    Object.keys(classModes).forEach(mode => {
        const classMode = classModes[mode];
        const classesToAdd = getClassesFromMode(classMode, mode, modes);
        add(classes, classesToAdd);
    });
    return Array.from(classes.values()).join(' ');
}
function getClassesFromMode(classMode, mode, modes) {
    switch (typeof classMode) {
        case 'string':
            return classMode;
        case 'function':
            return classMode(modes);
        case 'object': {
            const isRegistered = modes && Object.keys(modes).some(k => k == mode);
            if (!isRegistered)
                throw Err.Unregistered(mode);
            const modality = modes[mode];
            const modalityString = `${modality}`;
            const classModeModality = classMode[modalityString];
            if (modalityString != 'undefined' && classModeModality) {
                if (typeof classModeModality == 'object') {
                    return getClassesFromModes(classModeModality, modes);
                }
                else
                    return classModeModality;
            }
            else
                return '';
        }
        default: {
            throw Err.Unsupported(classMode);
        }
    }
}
function add(set, classes) {
    classes
        .split(' ')
        .map(c => c.trim())
        .forEach(c => set.add(c));
}
const Err = {
    Unregistered: (key) => new Error(`Registered mode not provided: ${key}`),
    Unsupported: (classMode) => new Error(`Type of classMode: ${typeof classMode} not supported`),
};

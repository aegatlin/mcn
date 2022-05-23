export const tarquin = (classModes) => (modes) => getClasses(classModes, modes);
function getClasses(classModes, modes) {
    const modeKeys = Object.keys(classModes);
    let classes = new Set();
    modeKeys.forEach(modeKey => {
        const classMode = classModes[modeKey];
        if (typeof classMode == 'string') {
            add(classes, classMode);
        }
        else {
            const modality = modes[modeKey];
            const modalityString = `${modality}`;
            if (modalityString != 'undefined' && classMode[modalityString]) {
                add(classes, classMode[modalityString]);
            }
        }
    });
    return Array.from(classes.values()).join(' ');
}
function add(set, classes) {
    classes
        .split(' ')
        .map(c => c.trim())
        .forEach(c => set.add(c));
}

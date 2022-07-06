type Modality = any

export interface Modes {
  [modeName: string]: Modality
}

type ClassMode =
  | string
  | { [modality: string]: string | ClassModes }
  | ((modes: Modes) => string)

export interface ClassModes {
  [modeName: string]: ClassMode
}

export function mcn(classes: ClassModes | string) {
  return function (modes?: Modes): string {
    const classModes = typeof classes == 'string' ? { _: classes } : classes
    return getClassesFromModes(classModes, modes ?? {})
  }
}

function getClassesFromModes(classModes: ClassModes, modes: Modes): string {
  let classes = new Set<string>()

  Object.keys(classModes).forEach(mode => {
    const classMode = classModes[mode]
    const classesToAdd = getClassesFromMode(classMode, mode, modes)
    add(classes, classesToAdd)
  })

  return Array.from(classes.values()).join(' ')
}

function getClassesFromMode(
  classMode: ClassMode,
  mode: string,
  modes: Modes
): string {
  switch (typeof classMode) {
    case 'string':
      return classMode
    case 'function':
      return classMode(modes)
    case 'object': {
      const isRegistered = modes && Object.keys(modes).some(k => k == mode)
      if (!isRegistered) throw Err.Unregistered(mode)

      const modality = modes[mode]
      const modalityString = `${modality}`
      const classModeModality = classMode[modalityString]
      if (modalityString != 'undefined' && classModeModality) {
        if (typeof classModeModality == 'object') {
          return getClassesFromModes(classModeModality, modes)
        } else return classModeModality
      } else return ''
    }
    default: {
      throw Err.Unsupported(classMode)
    }
  }
}

function add(set: Set<string>, classes: string) {
  classes
    .split(' ')
    .map(c => c.trim())
    .forEach(c => set.add(c))
}

const Err = {
  Unregistered: (key: string) =>
    new Error(`Registered mode not provided: ${key}`),
  Unsupported: (classMode: ClassMode) =>
    new Error(`Type of classMode: ${typeof classMode} not supported`),
}

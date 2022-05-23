type Modality = any

export interface Modes {
  [modeName: string]: Modality
}

interface ClassMode {
  [modality: string]: string
}

export interface ClassModes {
  [modeName: string]: ClassMode | string
}

export const classModes = (classModes: ClassModes) => (modes?: Modes) =>
  getClasses(classModes, modes)

function getClasses(classModes: ClassModes, modes: Modes) {
  const modeKeys = Object.keys(classModes)

  let classes = new Set<string>()
  modeKeys.forEach((modeKey) => {
    const classMode = classModes[modeKey]
    if (typeof classMode == 'string') {
      add(classes, classMode)
    } else {
      const modality = modes[modeKey]
      const modalityString = `${modality}`
      if (modalityString != 'undefined') {
        add(classes, classMode[modalityString])
      }
    }
  })

  return Array.from(classes.values()).join(' ')
}

function add(set: Set<string>, classes: string) {
  classes
    .split(' ')
    .map((c) => c.trim())
    .forEach((c) => set.add(c))
}

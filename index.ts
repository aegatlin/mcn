type Modality = any

export interface Modes {
  [modeName: string]: Modality
}

interface ClassMode {
  [modality: string]: string
}

export interface ClassModes {
  [modeName: string]: ClassMode | string | FMode
}

type FMode = (modes?: Modes) => string

export const tarquin = (classModes: ClassModes) => (modes?: Modes) =>
  getClasses(classModes, modes)

function getClasses(classModes: ClassModes, modes: Modes) {
  const modeKeys = Object.keys(classModes)

  let classes = new Set<string>()
  modeKeys.forEach(modeKey => {
    const classMode = classModes[modeKey]

    switch (typeof classMode) {
      case 'string': {
        add(classes, classMode)
        break
      }
      case 'function': {
        add(classes, classMode(modes))
        break
      }
      case 'object': {
        const modality = modes[modeKey]
        const modalityString = `${modality}`
        if (modalityString != 'undefined' && classMode[modalityString]) {
          add(classes, classMode[modalityString])
        }
        break
      }
      default: {
        throw new Error(`type of classMode: ${typeof classMode} not supported`)
      }
    }

    if (typeof classMode == 'string') {
      add(classes, classMode)
    } else {
      const modality = modes[modeKey]
      const modalityString = `${modality}`
      if (modalityString != 'undefined' && classMode[modalityString]) {
        add(classes, classMode[modalityString])
      }
    }
  })

  return Array.from(classes.values()).join(' ')
}

function add(set: Set<string>, classes: string) {
  classes
    .split(' ')
    .map(c => c.trim())
    .forEach(c => set.add(c))
}

interface Modes {
  [modeName: string]: any
}

interface ClassMode {
  default?: string
  [modality: string]: string
}

interface ClassModes {
  [modeName: string]: ClassMode
}

export class Clxss {
  #base: Set<string> = new Set<string>()
  #classModes: ClassModes = {}

  static base(...args: string[]): Clxss {
    return new Clxss(...args)
  }

  constructor(...baseClasses: string[]) {
    baseClasses.forEach((c) => this.add(c))
  }

  modes(classModes: ClassModes): Clxss {
    Object.assign(this.#classModes, classModes)
    return this
  }

  mode(classModeName: string, classMode: ClassMode): Clxss {
    this.#classModes[classModeName] = classMode
    return this
  }

  put(modes?: Modes): string {
    return [
      ...Array.from(this.#base),
      ...Array.from(this.#setFrom(modes ?? {})),
    ].join(' ')
  }

  add(classes: string, set: Set<string> = this.#base): Clxss {
    classes
      .split(' ')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .forEach((s) => set.add(s))

    return this
  }

  #setFrom(modes: Modes): Set<string> {
    const modesSet = new Set<string>()

    Object.keys(this.#classModes).forEach((_classModeName) => {
      const classMode = this.#classModes[_classModeName]
      const mode = modes[_classModeName]
      const modeString = `${mode}`
      if (modeString != 'undefined') {
        this.add(classMode[modeString], modesSet)
      } else {
        classMode.default && this.add(classMode.default, modesSet)
      }
    })

    return modesSet
  }
}

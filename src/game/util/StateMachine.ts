interface IState
{
  name: string
  onEnter?: () => void
  onUpdate?: (dt: number) => void
  onExit?: () => void
}

// simple global id counter
let idCount = 0

export default class StateMachine<T> {
  private states = new Map<string, IState>()
  private currentState?: IState
  private id = (++idCount).toString()
  private context: T
  private isChangingState = false
  private changeStateQueue: Array<string> = []

  constructor (context: T, id?: string) {
    this.id = id ?? this.id
    this.context = context
  }

  addState (name: string, config?: { onEnter?: () => void, onUpdate?: (dt: number) => void, onExit?: () => void }) {
    const context = this.context

    this.states.set(name, {
      name,
      onEnter: config?.onEnter?.bind(context),
      onUpdate: config?.onUpdate?.bind(context),
      onExit: config?.onExit?.bind(context)
    })

    return this
  }

  isCurrentState (name: string) {
    if (!this.currentState) {
      return false
    }

    return this.currentState.name === name
  }

  setState (name: string) {
    if (!this.states.has(name)) {
      console.warn(`Tried to change to unknown state: ${name}`)
      return
    }

    if (this.isCurrentState(name)) {
      return
    }

    if (this.isChangingState) {
      this.changeStateQueue.push(name)
      return
    }

    this.isChangingState = true

    console.log(`[StateMachine (${this.id})] change from ${this.currentState?.name ?? 'none'} to ${name}`)

    if (this.currentState && this.currentState.onExit) {
      this.currentState.onExit()
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.currentState = this.states.get(name)!

    if (this.currentState.onEnter) {
      this.currentState.onEnter()
    }

    this.isChangingState = false
  }

  update (dt: number) {
    if (this.changeStateQueue.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.setState(this.changeStateQueue.shift()!)
      return
    }

    if (this.currentState && this.currentState.onUpdate) {
      this.currentState.onUpdate(dt)
    }
  }
}

type State = {
  loading: boolean
}

type Action = { type: 'setLoading'; payload: { loading: boolean } }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setLoading':
      return { loading: action.payload.loading }
    default:
      return state
  }
}

export const initialState: State = {
  loading: false,
}

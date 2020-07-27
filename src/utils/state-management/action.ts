export default interface IAction<P> {
  type: string
  payload: P
}
import { Action, createReducer, on } from '@ngrx/store';
import { changeDataChart } from './dataChart.actions';
 
export const initialState: number[] = [];
 
const _changeDataReducer = createReducer(
  initialState,
  on(changeDataChart, (state, {data}) => data),
);
 
export function chartDataReducer(state: number[] | undefined, action: Action) {
  return _changeDataReducer(state, action);
}
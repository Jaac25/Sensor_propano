import { createAction, props } from '@ngrx/store';

export const changeDataChart = createAction('changeDataChart',
    props<{data: number[]}>()
);

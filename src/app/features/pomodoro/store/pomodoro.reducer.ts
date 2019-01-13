import { PomodoroActions, PomodoroActionTypes } from './pomodoro.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const POMODORO_FEATURE_NAME = 'pomodoro';

export interface PomodoroState {
  isManualPause: boolean;
  isBreak: boolean;
  currentCycle: number;
}

export const initialPomodoroState: PomodoroState = {
  isManualPause: true,
  isBreak: undefined,
  currentCycle: 0,
};

// SELECTORS
export const selectPomodoroFeatureState = createFeatureSelector<PomodoroState>(POMODORO_FEATURE_NAME);
export const selectIsManualPause = createSelector(selectPomodoroFeatureState, state => state.isManualPause);
export const selectIsBreak = createSelector(selectPomodoroFeatureState, state => state.isBreak);
export const selectCurrentCycle = createSelector(selectPomodoroFeatureState, state => state.currentCycle);


export function pomodoroReducer(state = initialPomodoroState, action: PomodoroActions): PomodoroState {
  switch (action.type) {

    case  PomodoroActionTypes.StartPomodoro: {
      return {
        ...state,
        isManualPause: false,
      };
    }

    case  PomodoroActionTypes.PausePomodoro: {
      console.log('PAUSE  POMODORO');

      return {
        ...state,
        isManualPause: true,
      };
    }

    case  PomodoroActionTypes.StopPomodoro: {
      return {
        ...initialPomodoroState
      };
    }

    case  PomodoroActionTypes.FinishPomodoroSession: {
      return {
        ...state,
        isBreak: !state.isBreak,
        currentCycle: (state.isBreak ? (state.currentCycle + 1) : state.currentCycle),
      };
    }

    default:
      return state;
  }
}

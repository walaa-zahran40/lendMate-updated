// logger.metareducer.ts
import { ActionReducer, Action } from '@ngrx/store';

export function actionLogger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action: Action) => {
    // capture the branches slice from the previous state
    console.log('state', state);
    const prevBranches = state?.branches;
    console.log('   🕘 prev branches slice:', prevBranches);

    const nextState = reducer(state, action);
    console.log('   🛠️ action payload:', action as any);

    const nextBranches = nextState?.branches;
    console.log('   🔜 next branches slice:', nextBranches);

    console.groupCollapsed(`🛎️ ${action.type}`);
    console.groupEnd();

    return nextState;
  };
}

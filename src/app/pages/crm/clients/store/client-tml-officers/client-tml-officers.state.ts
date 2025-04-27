export interface TMLOfficersState {
  items: any[];
  history: any[];
  loading: boolean;
  error: any;
}

export const initialTMLOfficersState: TMLOfficersState = {
  items: [],
  history: [],
  loading: false,
  error: null,
};

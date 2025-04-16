export interface ClientTypesState {
  types: any[];
  loading: boolean;
  error: any;
}

export const initialClientTypesState: ClientTypesState = {
  types: [],
  loading: false,
  error: null,
};

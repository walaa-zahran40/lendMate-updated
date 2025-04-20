import { Individual } from '../../../../../shared/app.state';

export interface IndividualState {
  selectedIndividual: Individual | null;
  individuals: Individual[];
  loading: boolean;
  error: string | null;
}

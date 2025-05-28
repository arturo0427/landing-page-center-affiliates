import { IndividualConfig } from 'ngx-toastr';
import { ApiMessage } from '../api/api-response.interface';

export interface ToastrNotification {
  type: 'success' | 'error' | 'info' | 'warning';
  message: ApiMessage;
  title?: string;
  config?: Partial<IndividualConfig<any>>;
}

import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  confirmLeave,
  confirmLeave2,
} from '../../../pages/crm/clients/store/client-form/client-form.actions';

@Component({
  selector: 'app-toolbar-form',
  standalone: false,
  templateUrl: './toolbar-form.component.html',
  styleUrl: './toolbar-form.component.scss',
})
export class ToolbarFormComponent {
  items!: MenuItem[];
  selectedActionLabel = '';
  selectedActionId: number | null = null;
  comment: string = '';
  showCommentDialog = false;
  defaultAction = true;
  @Input() header!: string | boolean;
  @Input() backExists!: boolean;
  @Input() viewOnly!: boolean;
  @Input() editMode: boolean = false;
  @Input() backIcon!: string;
  @Input() closeIcon!: string;
  @Input() closeExists!: boolean;
  @Input() close2Exists!: boolean;
  @Input() selectedAction!: string;
  @Input() workFlowItems!: any[];

  @Output() saveAction = new EventEmitter<{
    actionId: number;
    actionName: string;
    comment: string;
  }>();

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private store: Store
  ) {}
  ngOnInit() {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
      },
    ];
    this.route.queryParams.subscribe((params) => {
      const mode = params['mode'];
      this.viewOnly = mode === 'view';
      this.editMode = mode === 'edit';
    });
  }
  goBack() {
    this.location.back();
  }

  onCloseClick() {
    this.store.dispatch(confirmLeave());
  }
  onClose2Click() {
    this.store.dispatch(confirmLeave2());
  }

  get workFlowMenu(): MenuItem[] {
    if (!this.workFlowItems || this.workFlowItems.length === 0) {
      return [{ label: 'No workflow available', disabled: true }];
    }
    return this.workFlowItems.map((item) => ({
      ...item,
      command: () => {
        this.selectedActionId = item.id;
        // this.selectedActionLabel = item.label;
        this.comment = '';
        this.showCommentDialog = true;
      },
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.selectedAction || this.selectedAction != '') {
      this.selectedActionLabel = this.selectedAction;
      this.defaultAction = false;
    }
    if (!this.workFlowItems || this.workFlowItems.length === 0) {
      this.workFlowItems = [{ label: 'No workflow available', disabled: true }];
    } else {
      this.workFlowItems = this.workFlowItems.map((item) => ({
        id: item.id,
        label: item.label,
        icon: item.icon,
        command: () => {
          this.selectedActionId = item.id;
          // this.selectedActionLabel = item.label;
          this.comment = '';
          this.showCommentDialog = true;
          console.log('selectedActionId', this.selectedActionId);
        },
      }));
    }
  }

  submitWorkflowAction = (event: any): void => {
    this.saveAction.emit(event);
    this.showCommentDialog = false;
    const selected = this.workFlowItems.find(
      (item) => item.id === event.actionId
    );
    this.selectedAction = selected?.label;
    this.selectedActionLabel = selected?.label ?? 'Workflow Actions';
  };
}

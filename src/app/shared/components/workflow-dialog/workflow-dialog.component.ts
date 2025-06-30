import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  standalone: false,
  selector: 'app-workflow-dialog',
  styleUrl: './workflow-dialog.component.scss',
  templateUrl: './workflow-dialog.component.html',
})
export class WorkflowDialogComponent {
  @Input() selectedActionLabel: string = '';
  @Input() selectedActionId: number | null = null;
  @Input() comment: string = '';
  @Input() visible: boolean = false;
  // @Input() onSaveAction!: (data: { actionId: number, comment: string }) => void;
  @Output() onSaveAction = new EventEmitter<{
    actionId: number;
    actionName: string;
    comment: string;
  }>();

  @Output() visibleChange = new EventEmitter<boolean>();

  onSave(): void {
    debugger;
    if (this.selectedActionId && this.onSaveAction) {
      console.log('saves', this.selectedActionId);
      this.onSaveAction.emit({
        actionId: this.selectedActionId,
        actionName: this.selectedActionLabel,
        comment: this.comment,
      });
    }
    this.comment = '';
  }

  onCancel(): void {
    this.visibleChange.emit(false);
    this.comment = '';
  }
}

import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-workflow-dialog',
  styleUrl: './workflow-dialog.component.scss',
  templateUrl: './workflow-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowDialogComponent {
  @Input() selectedActionLabel: string = '';
  @Input() selectedActionId: number | null = null;
  @Input() comment: string = '';
  // @Input() onSaveAction!: (data: { actionId: number, comment: string }) => void;
  @Output() onSaveAction = new EventEmitter<{
    actionId: number;
    actionName: string;
    comment: string;
  }>();
  private _visible = false;
  @Input()
  set visible(v: boolean) {
    this._visible = v;
    if (v) this.cd.markForCheck();
  }
  get visible() {
    return this._visible;
  }
  constructor(private cd: ChangeDetectorRef) {}

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

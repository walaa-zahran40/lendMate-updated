import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-module',
  standalone: false,
  templateUrl: './delete-module.component.html',
  styleUrl: './delete-module.component.scss',
})
export class DeleteModuleComponent {
  @Input() visible: boolean = false;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}

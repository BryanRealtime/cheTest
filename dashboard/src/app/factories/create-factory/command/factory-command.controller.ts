/*
 * Copyright (c) 2015-2017 Codenvy, S.A.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Codenvy, S.A. - initial API and implementation
 */
'use strict';

/**
 * Defines controller of directive for displaying factory command.
 * @ngdoc controller
 * @name factory.directive:FactoryCommandController
 * @author Florent Benoit
 */
export class FactoryCommandController {
  private $mdDialog: ng.material.IDialogService;
  private factoryObject: any;
  private onChange: Function;

  /**
   * Default constructor that is using resource injection
   * @ngInject for Dependency injection
   */
  constructor($mdDialog: ng.material.IDialogService) {
    this.$mdDialog = $mdDialog;
  }

  /**
   * User clicked on the add button to add a new command
   * @param $event
   */
  addCommand(): void {
    if (!this.factoryObject) {
      this.factoryObject = {};
    }

    if (!this.factoryObject.workspace) {
      this.factoryObject.workspace = {};
    }

    if (!this.factoryObject.workspace.commands) {
      this.factoryObject.workspace.commands = [];
    }
    let command = {
      "commandLine": this.commandLine,
      "name": this.commandLineName,
      "attributes": {
        "previewUrl": ""
      },
      "type": "custom"
    };

    this.factoryObject.workspace.commands.push(command);

    this.onChange();
  }

  /**
   * Remove command based on the provided index
   * @param index the index in the array of workspace commands
   */
  removeCommand(index: number): void {
    this.factoryObject.workspace.commands.splice(index, 1);

    this.onChange();
  }

  /**
   * Edit the command based on the provided index
   * @param $event the mouse event
   * @param index the index in the array of workspace commands
   */
  editCommand($event: any, index: number): void {
    this.$mdDialog.show({
      targetEvent: $event,
      controller: 'FactoryCommandDialogEditController',
      controllerAs: 'factoryCommandDialogEditCtrl',
      bindToController: true,
      clickOutsideToClose: true,
      locals: {
        callbackController: this,
        index: index,
        selectedValue: this.factoryObject.workspace.commands[index].commandLine
      },
      templateUrl: 'app/factories/create-factory/command/factory-command-edit.html'
    });
  }

  /**
   * Callback on edit action.
   *
   * @param index commands index
   * @param newValue value to update with
   */
  callbackEditAction(index: number, newValue: string) {
    this.factoryObject.workspace.commands[index].commandLine = newValue;

    this.onChange();
  }
}

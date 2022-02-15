import bind from 'bind-decorator';
import Model from '../model/model';
import { userOptions } from '../model/optionsTypes';
import { ObserverCallback } from '../observer/observer';
import View from '../view/view';

export default class Presenter {
  private model!: Model;

  private view!: View;

  constructor(parent: HTMLElement, sliderModel: Model) {
    this.init(parent, sliderModel);
  }

  public subscribeToModel(fn: ObserverCallback) {
    this.model.observer.subscribe(fn);
  }

  public disableSlider(): void {
    this.view.disableView();
  }

  public enableSlider(): void {
    this.view.enableView();
  }

  public deleteSlider(): void {
    this.view.deleteView();
  }

  private init(parent: HTMLElement, model: Model) {
    this.model = model;
    this.view = new View(parent, model.getOptions());

    this.subscribeToView(this.updateModel);
    this.subscribeToModel(this.updateView);
  }

  private subscribeToView(fn: ObserverCallback): void {
    this.view.observer.subscribe(fn);
  }

  @bind
  private updateModel(data: userOptions) {
    this.model.update(data);
  }

  @bind
  private updateView(data: userOptions) {
    this.view.update(data);
  }
}

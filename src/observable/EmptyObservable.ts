import {Scheduler} from '../Scheduler';
import {Subscriber} from '../Subscriber';
import {Observable} from '../Observable';
import {TeardownLogic} from '../Subscription';

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
export class EmptyObservable<T> extends Observable<T> {

  /**
   * Creates an Observable that emits no items to the Observer and immediately
   * emits a complete notification.
   *
   * <span class="informal">Just emits 'complete', and nothing else.
   * </span>
   *
   * <img src="./img/empty.png" width="100%">
   *
   * This static operator is useful for creating a simple Observable that only
   * emits the complete notification. It can be used for composing with other
   * Observables, such as in a {@link mergeMap}.
   *
   * @example <caption>Emit the number 7, then complete.</caption>
   * var result = Rx.Observable.empty().startWith(7);
   * result.subscribe(x => console.log(x));
   *
   * @example <caption>Map and flatten only odd numbers to the sequence 'a', 'b', 'c'</caption>
   * var interval = Rx.Observable.interval(1000);
   * var result = interval.mergeMap(x =>
   *   x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty()
   * );
   * result.subscribe(x => console.log(x));
   *
   * @see {@link create}
   * @see {@link never}
   * @see {@link of}
   * @see {@link throw}
   *
   * @param {Scheduler} [scheduler] A {@link Scheduler} to use for scheduling
   * the emission of the complete notification.
   * @return {Observable} An "empty" Observable: emits only the complete
   * notification.
   * @static true
   * @name empty
   * @owner Observable
   */
  static create<T>(scheduler?: Scheduler): Observable<T> {
    return new EmptyObservable<T>(scheduler);
  }

  static dispatch({ subscriber }) {
    subscriber.complete();
  }

  constructor(private scheduler?: Scheduler) {
    super();
  }

  protected _subscribe(subscriber: Subscriber<T>): TeardownLogic {

    const scheduler = this.scheduler;

    if (scheduler) {
      return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber });
    } else {
      subscriber.complete();
    }
  }
}

import {FilterType} from '../const';
import {isPontFuture, isPointFinished} from './task';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => isPontFuture(point.dateStart)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointFinished(point.dateEnd)),
};

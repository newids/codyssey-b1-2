import type { Lesson } from './types';
import { components } from './01-components';
import { propsVsState } from './02-props-vs-state';
import { eventsRendering } from './03-events-rendering';
import { useEffectLesson } from './04-use-effect';
import { routing } from './05-routing';
import { forms } from './06-forms';
import { asyncStates } from './07-async-states';
import { customHooks } from './08-custom-hooks';

export type { Lesson, LessonBlock, QuizQuestion } from './types';

/** 미션의 "과제 목표" 5개를 8개 레슨으로 쪼갰다. 순서가 곧 학습 순서다. */
export const LESSONS: Lesson[] = [
  components,
  propsVsState,
  eventsRendering,
  useEffectLesson,
  routing,
  forms,
  asyncStates,
  customHooks,
];

export const LESSON_BY_SLUG: Record<string, Lesson> = Object.fromEntries(LESSONS.map((l) => [l.slug, l]));

export function getLesson(slug: string | undefined): Lesson | undefined {
  return slug ? LESSON_BY_SLUG[slug] : undefined;
}

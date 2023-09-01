import type { AllowedComponentProps, Component, VNodeProps } from 'vue';

/**
 * Extracts the type of props from the given component
 *
 * {@link https://stackoverflow.com/questions/68602712/extracting-the-prop-types-of-a-component-in-vue-3-typescript-to-use-them-somew Source}
 */
export type ComponentProps<C extends Component> = C extends new (
  ...args: unknown[]
) => unknown
  ? Omit<
      InstanceType<C>['$props'],
      keyof VNodeProps | keyof AllowedComponentProps
    >
  : never;

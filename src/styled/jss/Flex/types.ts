declare module '@mui/styles/makeStyles' {
  import type { ClassNameMap, Styles, WithStylesOptions } from '@mui/styles/withStyles';
  import type { DefaultTheme } from '@mui/styles/defaultTheme';
  import '@js-toolkit/utils/types';

  export default function makeStyles<
    Theme = DefaultTheme,
    Props extends object = {},
    ClassKey extends string = string,
  >(
    styles: Styles<Theme, Props, ClassKey>,
    options?: Omit<WithStylesOptions<Theme>, 'withTheme'> | undefined
  ): keyof Props extends never
    ? // `makeStyles` where the passed `styles` do not depend on props
      (
        props?:
          | { classes?: OptionalToUndefined<Partial<ClassNameMap<ClassKey>>> | undefined }
          | undefined
      ) => ClassNameMap<ClassKey>
    : // `makeStyles` where the passed `styles` do depend on props
      (
        props: Props & {
          classes?: OptionalToUndefined<Partial<ClassNameMap<ClassKey>>> | undefined;
        }
      ) => ClassNameMap<ClassKey>;
}

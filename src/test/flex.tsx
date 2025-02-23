/* eslint-disable */
import React from 'react';
import Flex, {
  type FlexAllProps,
  type FlexComponentProps,
  type DefaultComponentType,
  type GetStylesTransformers,
} from '../Flex';
import ResponsiveFlex from '../responsive/ResponsiveFlex';
import Responsive from '../responsive/Responsive';
import TweakableElementWrapper from '../TweakableElementWrapper';
import type { ComponentProps } from '../types';

export const S = <C extends React.ElementType = DefaultComponentType>({
  mSize,
  pSize,
  ...rest
}: FlexAllProps<C>) => (
  <Flex mSize="s" pSize="s" {...(rest as FlexAllProps<DefaultComponentType>)} />
);

export const M = <C extends React.ElementType = DefaultComponentType>({
  mSize,
  pSize,
  ...rest
}: FlexAllProps<C>) => (
  <Flex mSize="m" pSize="m" {...(rest as FlexAllProps<DefaultComponentType>)} />
);

export const L = <C extends React.ElementType = DefaultComponentType>({
  mSize,
  pSize,
  ...rest
}: FlexAllProps<C>) => (
  <Flex mSize="l" pSize="l" {...(rest as FlexAllProps<DefaultComponentType>)} />
);

// function onAbort(event: React.SyntheticEvent<SVGElement>) {
function onAbort(event: React.SyntheticEvent<HTMLDivElement>) {
  event;
}

let element: Element | null = null;

export function keepRef(el: HTMLDivElement | null): void {
  element = el;
  element;
}

const classNameTransformer: GetStylesTransformers<MYYProps>['classNameTransformer'] = (
  calcClassName,
  userClassName
) => {
  if (!userClassName) {
    return calcClassName as any;
  }
  return '' as any;
};

export function test() {
  return (
    <>
      <Flex component="div" onAbort={onAbort} />
      <Flex component={TweakableElementWrapper} element={<MYY />} />
      {/* @ts-expect-error */}
      <Flex component={MYY} ref={keepRef} />;
      <Flex component={MYY} myy />
      <Flex component={MyClass} myy classNameTransformer={classNameTransformer} />
      <Flex component={MyClass2} myy aa="" />
      <Flex ref={keepRef} />
      <Flex component="svg" overflow="auto" scrollable="scroll" />
      <Flex key="1" p />
      {/*  */}
      <Flex component={MYY} aa="" p />
      <Flex>123</Flex>
      {/*  */}
      <WidthContainer>123</WidthContainer>
      {/*  */}
      {/* @ts-expect-error */}
      <Flex component={WithoutChildren}>
        <div />
      </Flex>
      <Flex component={WithoutChildren}></Flex>
      {/*  */}
      <Responsive
        component={MYY}
        breakpoints={{
          s: { aa: 's' },
          l: { aa: 'l' },
          xxl: { aa: 'xxl' },
        }}
      />
      <Responsive component="div" breakpoints={{ l: {} }} />
      <Responsive breakpoints={{ l: {} }} />
      {/*  */}
      <ResponsiveFlex component={MYY} breakpoints={{ l: { order: 1 } }} />
      <ResponsiveFlex component="nav" breakpoints={{ l: { order: 1 } }} />
      <ResponsiveFlex breakpoints={{ l: undefined }} />
      <ResponsiveFlex breakpoints={{ xl: { justifyContent: 'space-around' } }} />
      {/*  */}
      <Component2 component={MYY} />
    </>
  );
}

export interface Classes {
  base: string;
  afterOpen: string;
  beforeClose: string;
}

interface MYYProps {
  aa?: string | undefined;
  myy?: boolean | undefined;
  gg?: boolean | undefined;
  className?: string | Classes | undefined;
  // className?: Classes;
  // className?: string;
  // className?: string | number | undefined;
  // style?: number;
  style?:
    | { content?: { [P: string]: any } | undefined; overlay?: { [P: string]: any } | undefined }
    | undefined;
  // style?: { [P: string]: any };
}

function MYY({ aa, myy, gg }: React.PropsWithChildren<MYYProps>) {
  return <div data-myy={aa || myy || gg} />;
}

function WithoutChildren({ aa, myy, gg }: MYYProps) {
  return <div data-myy={aa || myy || gg} />;
}

class MyClass extends React.Component<MYYProps> {}
class MyClass2 extends React.Component<FlexComponentProps<typeof MyClass>> {}

export type A = FlexAllProps<
  typeof MyClass,
  { omitProps: false; inferStyleProps: { className: true } }
>['classNameTransformer'];

function WidthContainer({ className, ...rest }: React.PropsWithChildren<FlexComponentProps>) {
  return <Flex className={className} {...rest} />;
}

export function Component2<C extends React.ElementType = DefaultComponentType>({
  component = 'div' as C,
  className,
  ...rest
}: FlexAllProps<C>) {
  return <Flex className={className} {...rest} />;
}

export function Component3({ type, ...rest }: FlexComponentProps<'button'>) {
  return <Flex component="button" type={type} {...rest} />;
}

export function Component4({ type, ...rest }: FlexComponentProps<'button'>) {
  return <Flex component="button" type={type} {...rest} />;
}

export function Component5(props: ComponentProps<'button'> & { a: number }) {
  return <Flex component="button" {...props} />;
}

export class B extends React.Component {
  override render() {
    return <div />;
  }
}

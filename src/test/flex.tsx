/* eslint-disable */
import React from 'react';
import Flex, { FlexAllProps, FlexComponentProps, DefaultComponentType } from '../Flex';
import FlexWithRef from '../FlexWithRef';
import ResponsiveFlex from '../responsive/ResponsiveFlex';
import Responsive from '../responsive/Responsive';
import TweakableElementWrapper from '../TweakableElementWrapper';

export const S = <C extends React.ElementType = DefaultComponentType>({
  mSize,
  pSize,
  ...rest
}: FlexAllProps<C>) => <Flex mSize="s" pSize="s" {...rest} />;

export const M = <C extends React.ElementType = DefaultComponentType>({
  mSize,
  pSize,
  ...rest
}: FlexAllProps<C>) => <Flex mSize="m" pSize="m" {...rest} />;

export const L = <C extends React.ElementType = DefaultComponentType>({
  mSize,
  pSize,
  ...rest
}: FlexAllProps<C>) => <Flex mSize="l" pSize="l" {...rest} />;

// function onAbort(event: React.SyntheticEvent<SVGElement>) {
function onAbort(event: React.SyntheticEvent<HTMLDivElement>) {
  event;
}

let element: Element | null = null;

export function keepRef(el: HTMLDivElement | null): void {
  element = el;
  element;
}

const classNameTransformer: FlexAllProps<typeof MyClass>['classNameTransformer'] = (
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
      {/* $ExpectedError */}
      {/* <Flex component={MYY} componentRef={keepRef} />; */}
      <Flex component={MYY} myy />
      <Flex component={MyClass} myy classNameTransformer={classNameTransformer} />
      <Flex componentRef={keepRef} />

      <Flex component="svg" overflow="auto" scrollable="scroll" />

      <Flex key="1" p />

      <FlexWithRef component={MyClass} aa="" ref={(el) => el} />
      <FlexWithRef component="a" href="" ref={(el) => el} />
      <FlexWithRef component="div" ref={(el) => el} />
      <FlexWithRef component="button" hidden ref={(el) => el} />
      {/* $ExpectedError */}
      {/* <FlexWithRef /> */}
      <Flex component={MYY} aa="" p />
      <Flex>123</Flex>
      <WidthContainer>123</WidthContainer>
      {/* $ExpectedError */}
      {/* <Flex component={WithoutChildren}>
        <div />
      </Flex> */}
      <Flex component={WithoutChildren}></Flex>

      {/* <Flex component={React.DOM.div} about="" alignItems="baseline" alignContent="center" /> */}
      {/* <Flex component={React.DOM.form} onSubmit={() => {}} alignContent="center" /> */}

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

      <ResponsiveFlex component={MYY} breakpoints={{ l: { order: 1 } }} />
      <ResponsiveFlex component="nav" breakpoints={{ l: { order: 1 } }} />
      <ResponsiveFlex breakpoints={{ l: undefined }} />

      <ResponsiveFlex breakpoints={{ xl: { justifyContent: 'space-around' } }} />

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
  aa?: string;
  myy?: boolean;
  gg?: boolean;
  // className?: string | Classes;
  className?: Classes;
  // className?: string;
  // className?: string | number | undefined;
  // style?: number;
  // style?: { content: { [P: string]: any }; overlay: { [P: string]: any } };
  style?: { [P: string]: any };
}

function MYY({ aa, myy, gg }: React.PropsWithChildren<MYYProps>) {
  return <div data-myy={aa || myy || gg} />;
}

function WithoutChildren({ aa, myy, gg }: MYYProps) {
  return <div data-myy={aa || myy || gg} />;
}

class MyClass extends React.Component<MYYProps> {}

function WidthContainer({ className, ...rest }: React.PropsWithChildren<FlexAllProps>) {
  return <Flex className={className} {...rest} />;
}

export function Component2<C extends React.ElementType = DefaultComponentType>({
  className,
  ...rest
}: FlexAllProps<C, true>) {
  return <Flex className={className} {...rest} />;
}

export function Component3({ type, ...rest }: FlexComponentProps<'button'>) {
  return <Flex component="button" type={type} {...rest} />;
}

export class B extends React.Component {
  render() {
    return <div />;
  }
}

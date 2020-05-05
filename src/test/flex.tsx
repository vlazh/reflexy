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
      {/* <Flex alignContent={{ phone: 'flex-start', phoneM: "space-around" }} />; */}
      {/* <Flex component={MYY} />; */}
      <Flex component="div" onAbort={onAbort} />
      {/* <Flex component={<MYY />} componentRef={keepRef} />; */}
      {/* <Flex component={<div ref={keepRef} />} /> */}
      <Flex component={TweakableElementWrapper} element={<MYY />} />
      <Flex component={MYY} myy />
      <Flex component={MyClass} myy classNameTransformer={classNameTransformer} />
      <Flex componentRef={keepRef} />

      <Flex component="svg" overflow="auto" scrollable="scroll" />

      <Flex key="1" />

      <FlexWithRef component={MyClass} aa="" ref={(el) => el} />
      <FlexWithRef component="a" href="" ref={(el) => el} />
      <FlexWithRef component="div" ref={(el) => el} />
      <FlexWithRef component="button" hidden ref={(el) => el} />

      <Flex component={MYY} aa="" />
      {/* <Flex component={<MYY />} /> */}

      {/* <Flex component={<a />} onClick={} />; */}
      {/* <Flex<JSX.IntrinsicElements['button']> component="button" autoFocus />; */}
      {/* <Flex ref={(el: Element) => (element = el)} alignContent="center" about="" onAbort={onAbort}>
        <div ref={el => (element = el)} />
        <svg />
      </Flex> */}
      {/* <Flex componentRef={keepRef} aaaa="" />; */}
      {/* <Flex order={1} component={<div onAbort={onAbort} />} /> */}
      {/* <Flex component={<div />}>123</Flex> */}
      <Flex>123</Flex>
      <WidthContainer>123</WidthContainer>
      {/* <Flex component={React.DOM.div} about="" alignItems="baseline" alignContent="center" /> */}
      {/* <Flex component={React.DOM.form} onSubmit={() => {}} alignContent="center" /> */}
      <Flex p />

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
      {/* <ResponsiveFlex component={<nav />} breakpoints={{ l: { order: 1 } }} /> */}
      <ResponsiveFlex breakpoints={{ l: undefined }} />

      {/* <ResponsiveFlex
        component={<nav />}
        breakpoints={{ xl: { justifyContent: 'space-around' } }}
      /> */}
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

class MyClass extends React.Component<MYYProps> {}

function WidthContainer({ className, ...rest }: FlexAllProps) {
  return <Flex className={className} {...rest} />;
}

export function Component2<C extends TweakableComponentType = DefaultComponentType>({
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

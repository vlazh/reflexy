/* eslint-disable */
import React from 'react';
import Flex, { FlexAllProps, FlexComponentProps } from '../Flex';
import FlexWithRef from '../FlexWithRef';
import ResponsiveFlex from '../ResponsiveFlex';
import Responsive from '../Responsive';

// function onAbort(event: React.SyntheticEvent<SVGElement>) {
function onAbort(event: React.SyntheticEvent<HTMLDivElement>) {
  event;
}

let element: Element | null = null;

export function keepRef(el: HTMLDivElement | null): void {
  element = el;
  element;
}

export function test() {
  return (
    <>
      {/* <Flex alignContent={{ phone: 'flex-start', phoneM: "space-around" }} />; */}
      {/* <Flex component={MYY} />; */}
      {/* <Flex component="div" onAbort={} />; */}
      {/* <Flex component={<MYY />} componentRef={keepRef} />; */}
      <Flex component={<div ref={keepRef} />} />
      <Flex component={<MYY />} />
      <Flex component={MYY} />
      <Flex component={MyClass} />
      <Flex componentRef={keepRef} />

      <FlexWithRef component={MyClass} aa="" ref={(el: MyClass | null) => el} />
      <FlexWithRef component="div" ref={keepRef} />

      <Flex component={MYY} aa="" />
      <Flex component={<MYY />} />

      {/* <Flex component={<a />} onClick={} />; */}
      {/* <Flex<JSX.IntrinsicElements['button']> component="button" autoFocus />; */}
      {/* <Flex ref={(el: Element) => (element = el)} alignContent="center" about="" onAbort={onAbort}>
        <div ref={el => (element = el)} />
        <svg />
      </Flex> */}
      {/* <Flex componentRef={keepRef} aaaa="" />; */}
      <Flex order={1} component={<div onAbort={onAbort} />} />
      <Flex component={<div />}>123</Flex>
      <Flex>123</Flex>
      <WidthContainer>123</WidthContainer>
      {/* <Flex component={React.DOM.div} about="" alignItems="baseline" alignContent="center" /> */}
      {/* <Flex component={React.DOM.form} onSubmit={() => {}} alignContent="center" /> */}
      <Flex p />

      <Responsive component={MYY} breakpoints={{ l: { aa: '' } }} />
      <Responsive component="div" breakpoints={{ l: {} }} />

      <ResponsiveFlex component={MYY} breakpoints={{ l: { order: 1 } }} />
      <ResponsiveFlex component={<nav />} breakpoints={{ l: { order: 1 } }} />
      <ResponsiveFlex breakpoints={{ l: undefined }} />

      <ResponsiveFlex
        component={<nav />}
        breakpoints={{ xl: { justifyContent: 'space-around' } }}
      />
      <ResponsiveFlex breakpoints={{ xl: { justifyContent: 'space-around' } }} />
    </>
  );
}

interface MYYProps {
  aa?: string;
  myy?: boolean;
  gg?: boolean;
}
function MYY({ aa, myy, gg }: React.PropsWithChildren<MYYProps>) {
  return <div data-myy={aa || myy || gg} />;
}

class MyClass extends React.Component<MYYProps> {}

function WidthContainer({ className, ...rest }: FlexAllProps) {
  return <Flex className={className} {...rest} />;
}

export function Component2({ className, ...rest }: FlexComponentProps) {
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

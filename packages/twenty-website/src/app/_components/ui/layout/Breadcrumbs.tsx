'use client';

import React from 'react';
import styled from '@emotion/styled';
import { IconChevronLeft } from '@tabler/icons-react';
import Link from 'next/link';

import {
  DeviceType,
  useDeviceType,
} from '@/app/_components/client-utils/useDeviceType';
import { Theme } from '@/app/_components/ui/theme/theme';

const Container = styled.div`
  display: flex;
  gap: ${Theme.spacing(2)};
  color: #b3b3b3;
`;

const InternalLinkItem = styled(Link)`
  text-decoration: none;
  color: #b3b3b3;
  &:hover {
    color: ${Theme.text.color.quarternary};
  }
`;

const ExternalLinkItem = styled.a`
  text-decoration: none;
  color: #b3b3b3;
`;

const ActivePage = styled.span`
  color: ${Theme.text.color.secondary};
  font-weight: ${Theme.font.weight.medium};
`;

const StyledSection = styled.div`
  font-size: ${Theme.font.size.sm};
  font-weight: ${Theme.font.weight.medium};
  color: ${Theme.text.color.quarternary};
  display: flex;
  flex-direction: row;
  gap: ${Theme.spacing(2)};
`;

const StyledMobileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${Theme.spacing(1)};
  color: ${Theme.text.color.quarternary};
  font-size: ${Theme.font.size.sm};
`;

interface BreadcrumbsProps {
  items: {
    uri: string;
    label: string;
    isExternal?: boolean;
  }[];
  activePage: string;
  separator: string;
}

export const Breadcrumbs = ({
  items,
  activePage,
  separator,
}: BreadcrumbsProps) => {
  const isMobile = useDeviceType() === DeviceType.MOBILE;
  if (isMobile) {
    const lastItem = items[items.length - 1];
    return (
      <StyledMobileContainer>
        <IconChevronLeft size={Theme.icon.size.md} />
        <InternalLinkItem href={lastItem.uri}>
          {lastItem.label}
        </InternalLinkItem>
      </StyledMobileContainer>
    );
  }
  return (
    <Container>
      {items.map((item, index) => (
        <StyledSection key={`${item?.uri ?? 'item'}-${index}`}>
          {item.isExternal ? (
            <ExternalLinkItem href={item.uri}>{item.label}</ExternalLinkItem>
          ) : (
            <InternalLinkItem href={item.uri}>{item.label}</InternalLinkItem>
          )}
          <div>{separator}</div>
        </StyledSection>
      ))}
      <ActivePage>{activePage}</ActivePage>
    </Container>
  );
};

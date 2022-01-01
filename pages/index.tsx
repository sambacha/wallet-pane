import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { BiSearch } from 'react-icons/bi';
import { AnimatePresence } from 'framer-motion';
import { slate } from '@radix-ui/colors';
//import { AtomWithQueryOptions} from 'jotai-query-toolkit';
//import { getInitialPropsFromQueries } from 'jotai-query-toolkit/nextjs';
//import { useAtom } from 'jotai';

import { Text } from '@components/base/Text';
import { View } from '@components/base/View';
import { Button } from '@components/Button';
import { addressesFromQueryString } from '@lib/addressesFromQueryString';
import { Chains } from '@features/wallet';
import {
  AddressInputContainer,
  SuggestionsCombobox,
  useAddressInput,
} from '@components/SearchAddressInput';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { LoadingIndicator } from '@components/base/LoadingIndicator';

const SearchAddressInput = ({ onSubmit }) => {
  const {
    searchQuery,
    suggestions,
    onChange,
    error,
    isLoading,
    verifyAndSubmitAddress,
  } = useAddressInput(onSubmit);

  const [isEnterPressed, setEnterPressed] = useState(false);
  const onKeyDown = (e) => e.key === 'Enter' && setEnterPressed(true);
  const onEnter = () => {
    if (isLoading) return;
    setEnterPressed(false);
    setTimeout(() => verifyAndSubmitAddress(), 350);
  };

  const showSubmitIndicator = !isLoading && searchQuery.length !== 0;

  return (
    <View
      css={{ flexDirection: 'column', alignItems: 'center', width: '100%' }}
    >
      <AddressInputContainer variant={'large'}>
        <SuggestionsCombobox
          css={{ p: 15 }}
          onChange={onChange}
          onEnter={onEnter}
          onKeyDown={onKeyDown}
          onSelectSuggestion={verifyAndSubmitAddress}
          suggestions={suggestions}
          placeholder="Search any wallet address or ENS"
        />
        <AnimatePresence>
          <View
            onTap={verifyAndSubmitAddress}
            whileHover={{ scale: 0.98 }}
            css={
              showSubmitIndicator && {
                backgroundColor: 'black',
                opacity: isEnterPressed ? 0.8 : 1,
                transform: `scale(${isEnterPressed ? 0.97 : 1})`,
                py: 6,
                px: 10,
                mr: -7,
                borderRadius: 12,
                alignItems: 'center',
                cursor: 'pointer',
              }
            }
          >
            {showSubmitIndicator && (
              <Text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                css={{
                  fontWeight: '$bold',
                  color: 'white',
                  mr: 8,
                  fontSize: '$md',
                }}
              >
                Search
              </Text>
            )}
            {isLoading ? (
              <LoadingIndicator size={25} />
            ) : (
              <BiSearch
                size={25}
                color={showSubmitIndicator ? 'white' : 'black'}
              />
            )}
          </View>
        </AnimatePresence>
      </AddressInputContainer>
      {error && (
        <Text
          css={{
            fontSize: '$sm',
            fontWeight: '$semibold',
            color: '$error',
            mt: '0.5rem',
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const SupportedChains = ({ css }) => (
  <View
    css={{
      fontSize: '$regular',
      fontWeight: '$semibold',
      flexWrap: 'wrap',
      justifyContent: 'center',
      ...css,
    }}
  >
    {Chains.map((chain) => (
      <View
        key={chain.nickname}
        css={{
          borderRadius: 8,
          px: 14,
          py: 5,
          m: 6,
          backgroundColor: chain.backgroundColor,
          color: chain.color,
        }}
      >
        {chain.displayFullName}
      </View>
    ))}
  </View>
);

export const getServerSideProps = async (ctx) => {
  const addresses = ctx.query.a;

  if (addressesFromQueryString(addresses).length > 0)
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  return { props: {} };
};

export default function App() {
  const router = useRouter();
  const onSubmit = async ({ address }) => {
    router.push(`/dashboard?a=${address}`);
  };
  useEffect(() => {
    router.prefetch('/dashboard');
  }, []);

  return (
    <>
      <Header />
      <View
        css={{
          maxWidth: '580px',
          px: '1rem',
          mx: 'auto',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Text as="h1" css={{ fontSize: '$xxl', fontWeight: '$black', mb: 0 }}>
          Multichain Wallet Pane
        </Text>
        <SupportedChains css={{ my: '1.5rem' }} />
        <SearchAddressInput onSubmit={onSubmit} />
        <Text
          css={{
            mt: '1rem',
            maxWidth: 480,
            fontSize: '$xs',
            fontWeight: '$regular',
            color: slate.slate10,
          }}
        >
          version: v0.1.2
          <br />
          <br />
          @disco3 web3 react{' '}
          <a href="https://github.com/manifoldfinance/disco-web3/">GitHub</a>
        </Text>
        <Text css={{ my: '1rem', color: slate.slate9 }}>Manually</Text>
        <Button size="lg">Connect Wallet</Button>
      </View>
      <Footer />
    </>
  );
}

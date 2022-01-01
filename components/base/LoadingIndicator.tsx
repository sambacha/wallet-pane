import { slate } from '@radix-ui/colors';
import Loading from 'react-loading';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const LoadingIndicator = ({ size = 24 }) => (
  <Loading type="spokes" color={slate.slate9} width={size} height={size} />
);

export const SkeletonLoading = ({}) => (
  <SkeletonTheme baseColor="#202020" highlightColor="#444">
    <p>
      <Skeleton count={3} />
    </p>
  </SkeletonTheme>
);

import { FallingLines } from 'react-loader-spinner';

import * as S from './styles';

function LibraryLoader() {
  return (
    <S.LoaderContainer>
      <FallingLines
        visible
        color="#2148C0"
        width="100"
      />
    </S.LoaderContainer>
  );
}

export default LibraryLoader;

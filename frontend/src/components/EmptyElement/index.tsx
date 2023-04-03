import { EmptyLayout, ImageContainer } from './styled';

interface EmptyElementProps {
  src: string;
}

function EmptyElement({ src }: EmptyElementProps) {
  return (
    <EmptyLayout>
      <ImageContainer elevation={4}>
        <img src={src} />
      </ImageContainer>
    </EmptyLayout>
  );
}

export default EmptyElement;

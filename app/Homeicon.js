import Image from 'next/image';

export default function Homeicon() {
  return (
    <Image
      src="/code.png"
      alt="App Icon"
      width={64}
      height={64}
    />
  );
}
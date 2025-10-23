'use client';
import { FiInfo } from 'react-icons/fi';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export type InfoComponentType = {
  data: string[];
  current_index: number;
  setCurrIndex: (index: number) => void;
};

export const InfoComponentContext = createContext<InfoComponentType | null>(
  null,
);

export function useInfoComponentContext() {
  const context = useContext(InfoComponentContext);
  if (!context) {
    throw new Error('Please use inside of the correct provider');
  }
  return context;
}

export function InfoComponent({
  datas,
  className,
}: {
  datas: string[];
  className?: string;
  infoBoxStyle?: string;
}) {
  const [data, setInfoData] = useState<string[]>(datas);
  const [current_index, setCurrIndex] = useState<number>(0);
  const next = useCallback(() => {
    if (current_index === data.length) {
      return setCurrIndex(0);
    }
    return setCurrIndex(current_index + 1);
  }, [current_index, data.length]);

  const setIndex = useCallback(
    (index: number) => {
      setCurrIndex(index);
    },
    [setCurrIndex],
  );
  useEffect(() => {
    const interval = setInterval(next, 3000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <InfoComponentContext.Provider
      value={{ data, current_index, setCurrIndex: setIndex }}
    >
      <InfoCircle />
      <InfoBox className={className} />
    </InfoComponentContext.Provider>
  );
}

const InfoBox: React.FC<{ className?: string }> = ({ className }) => {
  const { data, current_index } = useInfoComponentContext();
  const cc = Array.from({ length: data.length }, (_, i) => (
    <div className="px-5" key={i}>
      <div
        key={i}
        className={`flex gap-3 justify-center items-center border border-white p-3 rounded-md  ${className}`}
      >
        <FiInfo size={20} />
        <p key={i} className="text-sm text-white-700 max-md:text-xs">
          {data[i % data.length]}
        </p>
      </div>
    </div>
  ));

  return <>{cc[current_index]}</>;
};

const InfoCircle: React.FC = () => {
  const { data, setCurrIndex, current_index } = useInfoComponentContext();
  return (
    <div className="flex gap-2 w-full justify-center items-center">
      {Array.from({ length: data.length }, (_, index) => (
        <div
          key={index}
          className={`rounded-full w-2 h-2 ${
            current_index === index ? 'bg-white' : 'bg-slate-700'
          } cursor-pointer`}
          onClick={() => setCurrIndex(index)}
        />
      ))}
    </div>
  );
};

type TargetParams = {
  rotation: number;
}

export default function Target({ rotation }: TargetParams) {
  return (
    <div className="flex justify-center text-black items-center h-[100%]" style={{ transform: `rotate(${rotation}deg)` }}>
      A
    </div>
  );
}
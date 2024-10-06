import Image from "next/image";

interface IProps {
  name: string;
  picture: string;
  winner?: string;
}
export default function NomineeCard({ picture, name, winner }: IProps) {
  return (
    <div className="relative max-w-[380px] max-h-[380px] w-full h-full overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
      <div className="relative w-full h-full">
        <Image
          src={`/nominees/${picture}`}
          alt={name}
          width={380}
          height={380}
          objectFit="cover"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent flex flex-col gap-2 ">
        {winner === name && (
          <span className="bg-[#f93fff] text-black font-bold p-1 w-fit">
            GANHADOR
          </span>
        )}
        <h3 className="text-2xl font-bold  text-white">{name}</h3>
      </div>
    </div>
  );
}

import { Table } from "@radix-ui/themes";
import { v4 as uuidv4 } from 'uuid';

export default function TableBoard({ type }: { type: string }) {


    const handleClick = () => {

    }
    return (
        <>
            <div className="w-full flex flex-col mt-[16px] justify-start items-center">
                <h2>Assign To Me</h2>

                <div className="w-full flex flex-col gap-2 items-center">
                    {[...Array(5)].map(() =>
                        <button key={uuidv4()} onClick={handleClick} className="w-full relative flex gap-1 items-center hover:bg-slate-160">
                            <img src="https://placehold.co/24"/>
                            <p>video validate</p>
                            <img className="absolute right-1" src="https://placehold.co/24"/>
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
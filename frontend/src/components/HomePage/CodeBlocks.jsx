import { TypeAnimation } from "react-type-animation";


const CodeBlocks = ({codeBlock,codeColor}) => {
    return(
        <div className="w-[45%] shadow-xl shadow-indigo-500/50 bg-opacity-40 bg-[#0e1c36] p-4 border-2 rounded-lg border-[#314976] flex flex-row justify-between">
            {/*bg Gradient */}
            <div className="w-[8%] flex flex-col text-center text-[#6E727F] px-2">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>
            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                <TypeAnimation
                 style={{
                    whiteSpace: "pre-line",
                    height: "full",
                    display: "block",
                  }}
                 sequence={[
                   codeBlock,
                   0,
                   '',
                 ]}
                 repeat={Infinity}
                 omitDeletionAnimation={true}
                 speed={60}
                />
            </div>
        </div>
    )
}

export default CodeBlocks;
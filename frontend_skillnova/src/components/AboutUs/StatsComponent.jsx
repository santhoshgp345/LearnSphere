
const statsData = [
    { count:"5K", label:"Active Students" },
    { count:"10+", label:"Mentors" },
    { count:"200+", label:"Courses" },
    { count:"50+", label:"Awards" }
]

const StatsComponent = () => {
    return(
        <section className="w-[100vw] flex flex-col items-center justify-between bg-[#161D29] text-white">
            <div className="w-[90%] mx-auto flex flex-wrap md:flex-row gap-4 justify-around items-center my-8 p-6">
                {
                    statsData.map((value,index) => {
                        return(
                            <div key={index} className="flex flex-col gap-2 items-center p-2">
                                <div className="text-[#F1F2FF] text-3xl font-semibold">
                                    {value.count}
                                </div>
                                <div className="font-semibold text-[#585D69]">
                                    {value.label}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default StatsComponent;
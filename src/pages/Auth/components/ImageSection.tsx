import LoginImage from 'assets/login.webp'

const ImageSection = () => {
    return (
        <div className='w-6/12 h-[700px]'>
            <div className='relative h-[700px] bg-qss-secondary ' >
                <img className="absolute w-full h-full -z-1 opacity-75" src={LoginImage} alt="LoginImg" />
                <div className="absolute z-1 bottom-[10%] right-[10%] w-6/12 text-white flex flex-col gap-7">
                    <h2 className="text-4xl">Welcome to our Talent scoring system</h2>
                    <h4 className="text-2xl">Talent Scoring - a comprehensive tool, designed for comparing individuals with others in their age group. </h4>
                </div>
            </div>
        </div>
    );
}

export default ImageSection
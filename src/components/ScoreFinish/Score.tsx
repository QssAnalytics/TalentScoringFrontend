import React from "react";
import bgScore from "../../assets/bgScore.png";
import logo from "../../assets/logo2.png";
import profile from "../../assets/profile.png";
import chart1 from "../../assets/chart1.png";
import chart2 from "../../assets/chart2.png";
import chart3 from "../../assets/chart3.png";
import { SiVerizon } from "react-icons/si";

const Score = () => {
  return (
    <div className="w-100 relative  bg-white">
      <div className="absolute right-[60px] z-index-[-1] w-1/2 mt-5 ">
        <img src={bgScore} className="w-100 bg-cover" />
      </div>
      <div>
        <div className="absolute l-[-20px] top-[450px] w-[300px] h-[1px] rotate-90 bg-[#1fedc9]"></div>
        <div className="w-100 mx-52 ">
          <div className=" w-[91px] ">
            <img src={logo} className="h-12 object-scale-down" />
          </div>
          <div className="mx-auto   align-center w-full">
            <p className="w-[75%] text-center text-base mx-auto my-8 ">
              Congratulations! You've just finished a complete assessment of
              your talent and you're well on your way to discovering your ideal
              career path.
            </p>
          </div>
          <div className="">
            <div className="w-[40%] mt-20 flex flex-col">
              <div className="w-full h-[600px] border border-[#f5f9fa]  shadow-[0_3px_8px_0_rgba(0,0,0,0.1)] rounded-xl">
                <div className="w-[90%] mx-auto h-[80px] pb-10 my-5    ">
                  <div className="h-1">
                    <img src={logo} className=" object-scale-down" />
                  </div>
                  <div className="flex space-x-[145px] border-b  border-[#edf4f6]-800">
                    <p className="text-[9px] my-auto leading-3">
                      Yashar Nasibov, 23 year old
                      <br />
                      Test date: 20/06/2023 <br />
                      Test ID: xxxxxxxxx
                    </p>
                    <img
                      src={profile}
                      className="w-[74px] h-[74px] mb-1 object-scale-down "
                    />
                  </div>
                  <div className="flex py-1">
                    <p className="pr-[10%] py-1 leading-3 text-[9px] border-r border-[#edf4f6]-800">
                      Yashar's test results position him in the 89th percentile,
                      indicating that he has outperformed 89% of his peers.
                    </p>
                    <p className="pl-[10%] py-1 leading-3 text-[9px]">
                      Furthermore, in terms of the overall percentile, Yashar is
                      placed in the 77th percentile, indicating that he is
                      better than 77 percent of everyone
                    </p>
                  </div>
                  <div className="flex w-100 my-2">
                    <div className="w-1/3">
                      <img
                        src={chart2}
                        className="w-100 h-100 object-scale-down"
                      />
                    </div>

                    <div className=" w-1/3">
                      <h6 className="text-[10px] text-center">Percentile Ranges</h6>
                      <div className="flex ml-[12px] ">
                        <ul className="mt-1 m-[5px]">
                          <li className="text-[9px] ">0-20</li>
                          <li className="text-[9px] ">21-40</li>
                          <li className="text-[9px] ">41-60</li>
                          <li className="text-[9px] ">61-80</li>
                          <li className="text-[9px] ">81-100</li>
                        </ul>
                        <ul className="mt-1 mr-[8px]">
                          <li className="text-[9px] ">Low</li>
                          <li className="text-[9px] ">Marginal</li>
                          <li className="text-[9px] ">Average</li>
                          <li className="text-[9px] ">Good</li>
                          <li className="text-[9px] ">Outstanding</li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-1/3">
                      <img
                        src={chart3}
                        className="w-100 h-100 object-scale-down"
                      />
                    </div> 
                  </div>

                  <div className='text-center w-[90%] mx-auto my-4'>
                    <p className="text-[9px] leading-3">
                      The following charts show your ability compared to peer
                      averages by field. A short description of each skill and
                      competency is included in the report
                    </p>
                  </div>

                  <div className='flex flex-col'>
                    <img src={chart1} className="w-[80%] mx-auto object-scale-down" />
                    <div className="text-center w-[90%] mx-auto my-4">
                      <p className="text-[9px] leading-3">
                        Your general abilities tells that you're quite capable
                        and skillfull person. However your work experience is
                        not a lot. We offer you to focus on your work
                        experience....
                      </p>
                      <div className="absolute left-[410px] w-[200px] bottom-[160px] font-normal text-[#edf4f6] text-[20px] rotate-[-30deg] ">NOT VERIFED</div>
                    </div>
                  </div>
                  <div className='w-100'>
                    <img src={logo} className="object-scale-down w-40 mx-auto p-0 m-0"/>
                    <p className="text-[#00ebc2] text-[6px] text-center  mt-[-5px] ">SÜNİ İNTELLEKT SİSTEMİ</p>
                  </div>
                </div>
              </div>
              <button className="p-2 text-center my-4 mx-auto w-[180px] bg-[#238579] rounded-xl border-0 text-white text-[14px] outline outline-offset-2 outline-1 outline-[#238579]">
                Download or share your full report
              </button>
            </div>
            <div className="absolute w-[30%] right-[200px] top-[200px]">
            <h2 className="text-2xl text-[#038477] py-1">Get your Premium Report</h2>
              <p className='text-base py-1'>
                The free report represents just a few ideas based on your
                results, but there are many more possibilities to explore! Your
                full report offers a complete list of suggested fields,
                tailor-made for your individual interests.
              </p>
              <p className='text-base py-1'>
                We are sure that your final and accurate results will bring you
                insight into your ideal career, self-improvement, best job
                offers and different suggestions based on your profile.
              </p>
              <div className="w-[440px] bg-[#f5f9fa] flex shadow-[0_3px_8px_0_rgba(0,0,0,0.1)] flex-col mt-8 rounded-t-xl h-[500px]" >
                <h4 className="text-center text-base px-4 pt-11 pb-4 font-semibold">What you will get in the Premium Report </h4>
                <ul className="w-[400px] ml-[50px]">
                  <li className="m-3 flex justify-items-center ">
                    <SiVerizon className=" mr-6 text-2xl text-[#08D0B0]" />
                    Verified Certification
                  </li>
                  <li className="m-3 flex justify-items-center ">
                    <SiVerizon className=" mr-6 text-2xl text-[#08D0B0]" />
                    Career Planning
                  </li>
                  <li className="m-3 flex justify-items-center ">
                    <SiVerizon className=" mr-6 text-2xl text-[#08D0B0]" />
                    Job fit Assesment
                  </li>
                  <li className="m-3 flex justify-items-center text-[#6D6866]">
                    <SiVerizon className=" mr-6 text-2xl text-[#88D7CA]" />
                    Talent bot
                  </li>
                  <li className="m-3 flex justify-items-center text-[#A29C9A]">
                    <SiVerizon className=" mr-6 text-2xl text-[#BDDED9]"/>
                    Professional Development Guide
                  </li>
                  <li className="m-3 flex justify-items-center text-[#DAD5D5] ">
                    <SiVerizon className=" mr-6 text-2xl text-[#DFEDEB]" />
                    ...
                  </li>
                </ul>
                <button className="p-2 text-center my-1 mx-auto w-[180px] bg-[#238579]  rounded-xl border-0 text-white text-[14px] outline outline-offset-2 outline-1 outline-[#238579]">
                  See the Premium report features and prices
                </button>
               
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Score;

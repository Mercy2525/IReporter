import ContactUs from '../assets/ContactUs.gif'
import Todo from '../assets/Todo.gif'
import Law from '../assets/Law.gif'

function HowItWorks() {

    const itWorks=[
        {
            image:ContactUs,
            text1:'Tell us what happened',
            text2:'Report corruption or an intervention',
        },
        {
            image:Todo,
            text1:'Get your next steps',
            text2:'Find out what you can do protect yourself',
        },
        {
            image:Law,
            text1:'Help stop Corruption',
            text2:'We use and share reports with our law enforcement partners to help with investigations',
        },

    ]
  return (
    <div className='bg-color-primary '>
        <div className="font-bold text-5xl text-center text-color-blue2 p-3">How It Works</div>

        <div className='flex flex-row flex-wrap mb-4'> 

        {itWorks.map((works,idx)=>(
        <div key={idx} className="max-w-sm rounded-lg  mt-4 overflow-hidden shadow-lg w-11/12 m-auto  ">
                <img className="w-full hover:scale-105" src={works.image} alt={works.image}/>
            <div className="px-6 py-4">
                
                <p className="text-2xl font-semibold"> {works.text1}</p>
                <p className="text-2xl font-light ">{works.text2}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-color-white hover:bg-black hover:text-color-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">#Corruption</span>
                <span className="inline-block hover:bg-black hover:text-color-white  bg-color-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">#Intervention</span>
                <span className="inline-block hover:bg-black hover:text-color-white bg-color-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">#Justice</span>
            </div>
        </div>
    ))}
    </div>
    </div>
  )
}

export default HowItWorks
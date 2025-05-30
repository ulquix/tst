import React,{useRef,useEffect} from 'react'

const Fun = () => {
  const ref = useRef()
  useEffect(()=>{
    console.log(ref.current.children[0])

  },[])
  return (
    <div ref={ref} >
      <div >
        <span>yokoso</span>
        <div>
          <h1>bankai</h1>
        </div>
      </div>
    </div>
  )
}

export default Fun
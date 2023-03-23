import MembershipCard from "../components/MembershipCard"


function Test() {
	
  return (
    <div className="d-flex justify-content-center align-items-center col-md-10 mx-auto">
      <MembershipCard string={'free'} price={'-'}/>  
      <MembershipCard string={'basic'} price={'$5'}/>  
      <MembershipCard string={'prem'} price={'$10'}/>  
    </div>
  )
}

export default Test
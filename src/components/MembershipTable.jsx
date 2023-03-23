import MembershipCard from "../components/MembershipCard"

function MembershipTable({openModal, activePlan}) {
  return (
    <div className="d-flex justify-content-center align-items-center col-md-10 mx-auto">
      <MembershipCard string={'free'} price={'-'} openModal={openModal} activePlan={activePlan}/>  
      <MembershipCard string={'basic'} price={'$5'} openModal={openModal} activePlan={activePlan} />  
      <MembershipCard string={'premium'} price={'$10'} openModal={openModal} activePlan={activePlan}/>  
    </div>
  )
}

export default MembershipTable
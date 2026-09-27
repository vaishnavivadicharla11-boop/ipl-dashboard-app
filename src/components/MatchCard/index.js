import './index.css'
const MatchCard = props => {
  const {matchDetails} = props
  const {competingTeam, competingTeamLogo, result, matchStatus} = matchDetails

  return (
    <li>
      <img src={competingTeamLogo} alt={`competing team ${competingTeam}`} />
      <p>{competingTeam}</p>
      <p>{result}</p>
      <p>{matchStatus}</p>
    </li>
  )
}

export default MatchCard

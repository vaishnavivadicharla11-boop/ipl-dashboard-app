import {Link} from 'react-router-dom'

const TeamCard = props => {
  const {teamDetails} = props
  const {id, name, teamImageUrl} = teamDetails

  return (
    <li>
      <Link to={`/team-matches/${id}`}>
        <img src={teamImageUrl} alt={name} />
        <p>{name}</p>
      </Link>
    </li>
  )
}

export default TeamCard

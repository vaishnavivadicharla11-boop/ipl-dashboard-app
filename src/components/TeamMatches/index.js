import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {teamData: null, isLoading: true}

  componentDidMount() {
    this.getTeamMatches()
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const updatedData = {
      teamBannerUrl: data.team_banner_url,

      latestMatch: {
        umpires: data.latest_match_details.umpires,
        result: data.latest_match_details.result,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        id: data.latest_match_details.id,
        date: data.latest_match_details.date,
        venue: data.latest_match_details.venue,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        firstInnings: data.latest_match_details.first_innings,
        secondInnings: data.latest_match_details.second_innings,
        matchStatus: data.latest_match_details.match_status,
      },

      recentMatches: data.recent_matches.map(each => ({
        id: each.id,
        competingTeam: each.competing_team,
        competingTeamLogo: each.competing_team_logo,
        result: each.result,
        matchStatus: each.match_status,
      })),
    }

    this.setState({teamData: updatedData, isLoading: false})
  }

  render() {
    const {teamData, isLoading} = this.state

    if (isLoading) {
      return (
        <div testid="loader">
          <Loader type="Oval" color="#ffffff" height={50} />
        </div>
      )
    }

    return (
      <div>
        <img src={teamData.teamBannerUrl} alt="team banner" />

        <LatestMatch details={teamData.latestMatch} />

        <ul>
          {teamData.recentMatches.map(match => (
            <MatchCard key={match.id} matchDetails={match} />
          ))}
        </ul>
      </div>
    )
  }
}

export default TeamMatches

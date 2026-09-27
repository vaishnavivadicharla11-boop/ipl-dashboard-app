import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import TeamCard from '../TeamCard'

class Home extends Component {
  state = {
    teamsData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeams()
  }

  getTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()

    const updatedData = data.teams.map(team => ({
      id: team.id,
      name: team.name,
      teamImageUrl: team.team_image_url,
    }))

    this.setState({teamsData: updatedData, isLoading: false})
  }

  render() {
    const {teamsData, isLoading} = this.state

    return (
      <div>
        <h1>IPL Dashboard</h1>

        <img
          src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
          alt="ipl logo"
        />

        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} />
          </div>
        ) : (
          <ul>
            {teamsData.map(team => (
              <TeamCard key={team.id} teamDetails={team} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default Home

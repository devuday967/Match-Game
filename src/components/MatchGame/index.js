import {Component} from 'react'
import './index.css'

class MatchGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: 60,
      score: 0,
      isGameOver: false,
      category: 'FRUIT',
      imgUrl: props.imagesList[0].imageUrl,
      id : "",
    }
  }

  componentDidMount() {
    const timerId = setInterval(this.tick, 1000)
    this.setState({id : timerId})
  }

  tick = () => {
    const {timer} = this.state
    if (timer > 0) {
      this.setState({timer : timer-1})
    } else {
      this.clearTimerInterval()
      this.setState({isGameOver: true})
    }
  }

  clearTimerInterval = () => {
    const {id} = this.state
    clearInterval(id)
  }

  onClickTab = event => {
    this.setState({category: event.target.id})
  }

  onClickImg = event => {
    const {imagesList} = this.props
    const selectThumbnail = event.target.id
    const image = imagesList.filter(
      each => each.thumbnailUrl === selectThumbnail,
    )
    const {imgUrl} = this.state
    const {imageUrl} = image[0]
   
    if (imgUrl === imageUrl) {
      const newImgUrl =
        imagesList[Math.floor(Math.random() * imagesList.length)].imageUrl
      this.setState(prevState => ({
        score: prevState.score + 1,
        imgUrl: newImgUrl,
      }))
    } else {
      this.clearTimerInterval()
      this.setState({isGameOver: true})
    }
  }

  onClickPlayAgain = () => {
    const {imagesList} = this.props
    const newImgUrl =
      imagesList[Math.floor(Math.random() * imagesList.length)].imageUrl
    this.setState({
      timer: 60,
      score: 0,
      isGameOver: false,
      category: 'FRUIT',
      imgUrl: newImgUrl,
      id : "",
    })
    const timerId = setInterval(this.tick, 1000)
    this.setState({id : timerId})
  }

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  render() {
    const {timer, score, category, isGameOver, imgUrl} = this.state
    const {imagesList, tabsList} = this.props
    const thumbnailList = imagesList.filter(
      eachimg => eachimg.category === category,
    )

    return (
        <>
        <nav className="topBar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            className="logo"
            alt="website logo"
          />
          <ul className="topRightDiv">
            <li className="scoreP">
              <p>
                Score: <span className="timer">{score}</span>
              </p>
            </li>
            <li className="topRightDiv">
              <img
                className="timerImg"
                alt="timer"
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
              />
              <p className="timer">{`     ${timer} sec`}</p>
            </li>
          </ul>
        </nav>
        
      <div className="mainDiv">
        
        {!isGameOver && (
          <div className="gameDiv">
            <img src={imgUrl} className="mainimg" alt="match" />
            <ul className="tabUl">
              {tabsList.map(eachItem => (
                <li key={eachItem.tabId}>
                  <button
                    type="button"
                    className={`tabItem ${
                      category === eachItem.tabId ? 'selectedTab' : ''
                    }`}
                    id={eachItem.tabId}
                    onClick={this.onClickTab}
                  >
                    {eachItem.displayText}
                  </button>
                </li>
              ))}
            </ul>
            <ul className="imgUl">
              {thumbnailList.map(eachItem => (
                <li key={eachItem.id}>
                  <button
                    type="button"
                    className="imgButton"
                    onClick={this.onClickImg}
                    id={eachItem.thumbnailUrl}
                  >
                    <img
                      src={eachItem.thumbnailUrl}
                      className="thumbImg"
                      alt="thumbnail"
                      id={eachItem.thumbnailUrl}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {isGameOver && (
          <div className="overMainDiv">
            <div className="gameOverDiv">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/70/Game_Over_logo.png" alt="gamedone" className='gamedone'/>
                <div className='gameOverContent'>
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
                        className="trophy"
                        alt="trophy"
                    />
                    <p className="fScore">YOUR SCORE</p>
                    <p className="finalScore">{score}</p>
                    <button
                        type="button"
                        className="playButton"
                        onClick={this.onClickPlayAgain}
                    >
                        <img
                        src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                        alt="reset"
                        className="playImg"
                        />
                        PLAY AGAIN
                    </button>
              </div>
            </div>
          </div>
        )}
      </div>
      </>
    )
  }
}

export default MatchGame